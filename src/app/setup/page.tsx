"use client";

import { useState, useMemo } from "react";
import { ArrowRight, RotateCcw, ZoomIn, Ruler, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { Mannequin } from "@/components/Mannequin";

// ── Types ─────────────────────────────────────────────────────────────────────

type InputMode = "visual" | "precise";

interface BodyProfile {
    // For visual mode
    bodySize: number;       // 0–1: slim → đô con
    fatDist: number;        // 0–1: ngực to ↔ hông to
    muscleTone: number;     // 0–1: ít cơ → nhiều cơ
    // Derived height (affects leg length in 3D)
    height: number;
}

// ── Visual body type presets ──────────────────────────────────────────────────

interface BodyPreset {
    id: string;
    label: string;
    sublabel: string;
    emoji: string;
    profile: Omit<BodyProfile, "height">;
}

const BODY_PRESETS: BodyPreset[] = [
    {
        id: "lean",
        label: "GẦY",
        sublabel: "Mảnh mai, ít mỡ",
        emoji: "🌿",
        profile: { bodySize: 0.05, fatDist: 0.3, muscleTone: 0.2 },
    },
    {
        id: "slim",
        label: "THON",
        sublabel: "Cân đối, nhẹ nhàng",
        emoji: "✨",
        profile: { bodySize: 0.2, fatDist: 0.4, muscleTone: 0.3 },
    },
    {
        id: "fit",
        label: "THỂ THAO",
        sublabel: "Săn chắc, cơ bắp rõ",
        emoji: "⚡",
        profile: { bodySize: 0.35, fatDist: 0.25, muscleTone: 0.85 },
    },
    {
        id: "balanced",
        label: "CÂN ĐỐI",
        sublabel: "Trung bình, hài hoà",
        emoji: "🌀",
        profile: { bodySize: 0.35, fatDist: 0.45, muscleTone: 0.45 },
    },
    {
        id: "curvy",
        label: "ĐẦY ĐẶN",
        sublabel: "Đường cong rõ nét",
        emoji: "🌸",
        profile: { bodySize: 0.55, fatDist: 0.78, muscleTone: 0.25 },
    },
    {
        id: "heavy",
        label: "TO CON",
        sublabel: "Vóc dáng lớn",
        emoji: "🏔",
        profile: { bodySize: 0.85, fatDist: 0.6, muscleTone: 0.4 },
    },
];

// ── BMI-to-profile converter ──────────────────────────────────────────────────
function bmiToProfile(bmi: number): Omit<BodyProfile, "height"> {
    // Clamp BMI 14–40
    const b = Math.max(14, Math.min(40, bmi));

    // bodySize: BMI 14→0, BMI 40→1 (nhưng smooth)
    const bodySize = Math.pow(Math.max(0, (b - 14) / 26), 0.8);

    // fatDist: BMI thấp = ngực teo, hông bình thường; BMI cao = ngực/hông đều to
    // Khoảng 0.3 (gầy) → 0.65 (béo)
    const fatDist = 0.28 + Math.max(0, (b - 16) / 28) * 0.42;

    // muscleTone: peak ở BMI 22-24 (athletic), giảm 2 đầu
    const musclePeak = 24;
    const dist = Math.abs(b - musclePeak);
    const muscleTone = Math.max(0, 0.7 - dist * 0.045);

    return {
        bodySize: Math.min(1, bodySize),
        fatDist: Math.min(1, fatDist),
        muscleTone: Math.min(1, muscleTone),
    };
}

// ── BMI label ─────────────────────────────────────────────────────────────────
function getBMIInfo(bmi: number) {
    if (bmi < 18.5) return { label: "Thiếu cân", color: "#60a5fa" };
    if (bmi < 25) return { label: "Bình thường", color: "#4ade80" };
    if (bmi < 30) return { label: "Thừa cân", color: "#fbbf24" };
    return { label: "Béo phì", color: "#f87171" };
}

// ── Mini body silhouette icon ─────────────────────────────────────────────────
function BodyIcon({ preset, selected }: { preset: BodyPreset; selected: boolean }) {
    const { bodySize, muscleTone } = preset.profile;
    const w = 18 + bodySize * 20;
    const muscle = muscleTone > 0.6;

    return (
        <svg viewBox="0 0 60 90" className="w-8 h-12" fill="none">
            {/* Head */}
            <ellipse cx={30} cy={12} rx={7 + bodySize * 2} ry={9} fill="currentColor" opacity={0.7} />
            {/* Body */}
            <path
                d={`M ${30 - w / 2} 25 Q ${30 - w / 2 - bodySize * 4} 50 ${30 - w / 2 + 2} 62
                    L ${30 + w / 2 - 2} 62 Q ${30 + w / 2 + bodySize * 4} 50 ${30 + w / 2} 25 Z`}
                fill="currentColor" opacity={selected ? 0.9 : 0.5}
            />
            {/* Arms */}
            <rect x={30 - w / 2 - 8 - bodySize * 3} y={27} width={7 + (muscle ? 3 : 0)} height={28} rx={3} fill="currentColor" opacity={0.45} />
            <rect x={30 + w / 2 + 1 + bodySize * 3} y={27} width={7 + (muscle ? 3 : 0)} height={28} rx={3} fill="currentColor" opacity={0.45} />
            {/* Legs */}
            <rect x={30 - w / 2 + 2} y={62} width={w / 2 - 4 + bodySize * 3} height={24} rx={4} fill="currentColor" opacity={0.5} />
            <rect x={30 + 2} y={62} width={w / 2 - 4 + bodySize * 3} height={24} rx={4} fill="currentColor" opacity={0.5} />
        </svg>
    );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function SetupPage() {
    const [mode, setMode] = useState<InputMode>("visual");

    // Visual mode state
    const [selectedPreset, setSelectedPreset] = useState<string>("balanced");

    // Precise mode state
    const [height, setHeight] = useState(170);
    const [weight, setWeight] = useState(65);

    // Fine-tune sliders (shown in both modes, but optional)
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [muscleBias, setMuscleBias] = useState(0); // -1 to +1 fine-tune

    // Compute final body profile
    const bodyProfile = useMemo<BodyProfile>(() => {
        if (mode === "visual") {
            const preset = BODY_PRESETS.find((p) => p.id === selectedPreset)!;
            const base = preset.profile;
            return {
                ...base,
                muscleTone: Math.max(0, Math.min(1, base.muscleTone + muscleBias * 0.3)),
                height: height, // default in visual mode
            };
        } else {
            const bmi = weight / (height / 100) ** 2;
            const base = bmiToProfile(bmi);
            return {
                ...base,
                muscleTone: Math.max(0, Math.min(1, base.muscleTone + muscleBias * 0.3)),
                height,
            };
        }
    }, [mode, selectedPreset, height, weight, muscleBias]);

    // BMI display (precise mode only)
    const bmi = useMemo(() => weight / (height / 100) ** 2, [height, weight]);
    const bmiRounded = Math.round(bmi * 10) / 10;
    const bmiInfo = getBMIInfo(bmi);

    const currentPreset = BODY_PRESETS.find((p) => p.id === selectedPreset)!;

    return (
        <div className="bg-[var(--background)] text-[var(--on-background)] min-h-screen overflow-hidden flex flex-col">
            {/* Header */}
            <header className={cn(
                "w-full z-50 flex justify-center items-center px-8 h-20 fixed top-0",
                "bg-[var(--background)]/80 backdrop-blur-xl",
                "border-b border-[var(--secondary)]/10"
            )}>
                <div className="text-xl font-bold tracking-tighter text-[var(--on-background)] font-[var(--font-heading)] uppercase">
                    ATELIER
                </div>
            </header>

            {/* Main split layout */}
            <main className="flex-1 flex flex-col md:flex-row mt-20 h-[calc(100vh-80px)]">

                {/* ── Left: Input Panel ── */}
                <section className={cn(
                    "w-full md:w-5/12 lg:w-1/3",
                    "p-8 flex flex-col justify-center",
                    "border-r border-[var(--secondary)]/10",
                    "overflow-y-auto",
                    "bg-[var(--surface-container-lowest)]",
                    "relative z-10",
                    "shadow-[0_20px_50px_rgba(0,70,67,0.3)]"
                )}>
                    <div className="max-w-md mx-auto w-full space-y-6">

                        {/* Header */}
                        <div className="mb-8">
                            <span className="font-[var(--font-heading)] text-xs font-bold text-[var(--tertiary)] tracking-[0.1em] mb-2 block uppercase">
                                BƯỚC 1/3
                            </span>
                            <h1 className="text-3xl font-semibold tracking-tight text-[var(--on-background)] mb-3 font-[var(--font-heading)]">
                                Vóc Dáng Của Bạn
                            </h1>
                            <p className="text-sm text-[var(--on-surface-variant)] leading-relaxed">
                                Chọn cách nhập thông tin phù hợp nhất với bạn.
                            </p>
                        </div>

                        {/* Mode Toggle */}
                        <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-[var(--surface-variant)]/30 border border-[var(--outline-variant)]/20">
                            <button
                                onClick={() => setMode("visual")}
                                className={cn(
                                    "flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg",
                                    "text-xs font-bold tracking-wider font-[var(--font-heading)] uppercase",
                                    "transition-all duration-200",
                                    mode === "visual"
                                        ? "bg-[var(--secondary)] text-[var(--on-tertiary)] shadow-md"
                                        : "text-[var(--on-surface-variant)] hover:text-[var(--on-background)]"
                                )}
                            >
                                <Sparkles size={13} />
                                Ngoại hình
                            </button>
                            <button
                                onClick={() => setMode("precise")}
                                className={cn(
                                    "flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg",
                                    "text-xs font-bold tracking-wider font-[var(--font-heading)] uppercase",
                                    "transition-all duration-200",
                                    mode === "precise"
                                        ? "bg-[var(--secondary)] text-[var(--on-tertiary)] shadow-md"
                                        : "text-[var(--on-surface-variant)] hover:text-[var(--on-background)]"
                                )}
                            >
                                <Ruler size={13} />
                                Số đo
                            </button>
                        </div>

                        {/* ── VISUAL MODE ── */}
                        {mode === "visual" && (
                            <div className="space-y-4">
                                <p className="text-[11px] text-[var(--on-surface-variant)] tracking-wide">
                                    Chọn dáng người gần nhất với bạn
                                </p>
                                <div className="grid grid-cols-3 gap-3">
                                    {BODY_PRESETS.map((preset) => {
                                        const isSelected = selectedPreset === preset.id;
                                        return (
                                            <button
                                                key={preset.id}
                                                onClick={() => setSelectedPreset(preset.id)}
                                                className={cn(
                                                    "flex flex-col items-center gap-2 py-4 px-2 rounded-2xl",
                                                    "border transition-all duration-200 active:scale-95",
                                                    "font-[var(--font-heading)]",
                                                    isSelected
                                                        ? "border-[var(--tertiary)] bg-[var(--surface-variant)]/60 text-[var(--tertiary)]"
                                                        : "border-[var(--outline-variant)]/40 text-[var(--secondary)] hover:border-[var(--secondary)]/40 hover:bg-[var(--surface-variant)]/20"
                                                )}
                                            >
                                                <BodyIcon preset={preset} selected={isSelected} />
                                                <div className="text-center">
                                                    <div className="text-[10px] font-black tracking-widest leading-none">
                                                        {preset.label}
                                                    </div>
                                                    <div className="text-[9px] font-normal tracking-wide opacity-60 mt-0.5">
                                                        {preset.sublabel}
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Height fine-tune in visual mode */}
                                <div className="pt-2">
                                    <label className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] font-bold tracking-[0.1em] text-[var(--secondary)] uppercase font-[var(--font-heading)]">
                                            Chiều cao (ước tính)
                                        </span>
                                        <span className="text-xs font-semibold text-[var(--primary)]">{height} cm</span>
                                    </label>
                                    <input
                                        type="range" min={140} max={220} value={height}
                                        onChange={(e) => setHeight(Number(e.target.value))}
                                        className="w-full"
                                    />
                                    <div className="flex justify-between text-[9px] text-[var(--on-surface-variant)] mt-1">
                                        <span>140</span><span>220</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ── PRECISE MODE ── */}
                        {mode === "precise" && (
                            <div className="space-y-6">
                                {/* Height */}
                                <div>
                                    <label className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-bold tracking-[0.1em] text-[var(--secondary)] uppercase font-[var(--font-heading)]">
                                            Chiều cao
                                        </span>
                                        <span className="text-sm font-semibold text-[var(--primary)]">{height} cm</span>
                                    </label>
                                    <input
                                        type="range" min={140} max={220} value={height}
                                        onChange={(e) => setHeight(Number(e.target.value))}
                                        className="w-full"
                                    />
                                    <div className="flex justify-between text-[9px] text-[var(--on-surface-variant)] mt-1">
                                        <span>140 cm</span><span>220 cm</span>
                                    </div>
                                </div>

                                {/* Weight */}
                                <div>
                                    <label className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-bold tracking-[0.1em] text-[var(--secondary)] uppercase font-[var(--font-heading)]">
                                            Cân nặng
                                        </span>
                                        <span className="text-sm font-semibold text-[var(--primary)]">{weight} kg</span>
                                    </label>
                                    <input
                                        type="range" min={40} max={150} value={weight}
                                        onChange={(e) => setWeight(Number(e.target.value))}
                                        className="w-full"
                                    />
                                    <div className="flex justify-between text-[9px] text-[var(--on-surface-variant)] mt-1">
                                        <span>40 kg</span><span>150 kg</span>
                                    </div>
                                </div>

                                {/* BMI display */}
                                <div className="flex items-center gap-4 px-4 py-3 rounded-xl bg-[var(--surface-variant)]/40 border border-[var(--outline-variant)]/30">
                                    <div>
                                        <p className="text-[10px] font-bold tracking-[0.1em] text-[var(--on-surface-variant)] uppercase font-[var(--font-heading)]">
                                            BMI
                                        </p>
                                        <p className="text-xl font-bold text-[var(--on-background)] font-[var(--font-heading)]">
                                            {bmiRounded}
                                        </p>
                                    </div>
                                    <div className="flex-1">
                                        {/* BMI bar */}
                                        <div className="h-2 rounded-full bg-[var(--surface-variant)] overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${Math.min(100, Math.max(5, ((bmi - 14) / 26) * 100))}%`,
                                                    backgroundColor: bmiInfo.color,
                                                }}
                                            />
                                        </div>
                                        <p className="text-xs font-semibold mt-1" style={{ color: bmiInfo.color }}>
                                            {bmiInfo.label}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ── MUSCLE FINE-TUNE (both modes) ── */}
                        <div>
                            <button
                                onClick={() => setShowAdvanced(!showAdvanced)}
                                className="text-[10px] font-bold tracking-widest text-[var(--tertiary)] opacity-70 hover:opacity-100 transition-opacity font-[var(--font-heading)] uppercase flex items-center gap-1.5"
                            >
                                <span>{showAdvanced ? "▾" : "▸"}</span>
                                Điều chỉnh nâng cao
                            </button>

                            {showAdvanced && (
                                <div className="mt-3 space-y-3 pl-3 border-l border-[var(--tertiary)]/20">
                                    <div>
                                        <label className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] font-bold tracking-[0.1em] text-[var(--secondary)] uppercase font-[var(--font-heading)]">
                                                Độ cơ bắp
                                            </span>
                                            <span className="text-[10px] text-[var(--on-surface-variant)]">
                                                {muscleBias > 0.1 ? "Nhiều cơ hơn" : muscleBias < -0.1 ? "Ít cơ hơn" : "Mặc định"}
                                            </span>
                                        </label>
                                        <input
                                            type="range" min={-10} max={10} value={Math.round(muscleBias * 10)}
                                            onChange={(e) => setMuscleBias(Number(e.target.value) / 10)}
                                            className="w-full"
                                        />
                                        <div className="flex justify-between text-[9px] text-[var(--on-surface-variant)] mt-1">
                                            <span>Mềm mại</span><span>Săn chắc</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* CTA */}
                        <div className="pt-4">
                            <Link href="/setup/body-analysis">
                                <button className={cn(
                                    "w-full rounded-xl py-4",
                                    "bg-[var(--secondary)] text-[var(--on-tertiary)]",
                                    "font-[var(--font-heading)] text-lg font-semibold",
                                    "flex items-center justify-center gap-2",
                                    "hover:bg-white transition-colors duration-300",
                                    "active:scale-[0.98]"
                                )}>
                                    <span>Tiếp tục</span>
                                    <ArrowRight size={20} />
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ── Right: 3D Canvas ── */}
                <section className={cn(
                    "w-full md:w-7/12 lg:w-2/3 relative",
                    "bg-[var(--surface)] flex items-center justify-center overflow-hidden"
                )}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[var(--primary-container)]/20 via-[var(--background)] to-[var(--background)]" />

                    <div className="relative w-full h-full max-w-2xl max-h-[80vh] flex items-center justify-center p-8">
                        <div className={cn(
                            "w-full h-full rounded-2xl overflow-hidden relative",
                            "glass-panel",
                            "shadow-[0_0_80px_rgba(0,70,67,0.4)]"
                        )}>
                            <div className="w-full h-full bg-gradient-to-br from-[var(--primary)]/10 via-[var(--surface-container)] to-[var(--primary)]/5 flex flex-col items-center justify-center min-h-[400px] gap-6">

                                <Canvas camera={{ fov: 45 }}>
                                    <ambientLight intensity={1.5} />
                                    <directionalLight position={[5, 5, 5]} intensity={2} />
                                    <directionalLight position={[-5, 3, -2]} intensity={0.8} />
                                    <Suspense fallback={null}>
                                        <Mannequin profile={bodyProfile} />
                                    </Suspense>
                                    <OrbitControls enableZoom={false} />
                                </Canvas>

                                {/* Stats row */}
                                <div className="flex items-center gap-4 px-5 py-3 rounded-2xl bg-[var(--surface-container)]/60 border border-[var(--outline-variant)]/20 backdrop-blur-sm flex-wrap justify-center">
                                    {mode === "visual" ? (
                                        <>
                                            <div className="text-center">
                                                <p className="text-[10px] font-bold tracking-[0.1em] text-[var(--on-surface-variant)] uppercase font-[var(--font-heading)]">Dáng</p>
                                                <p className="text-sm font-bold text-[var(--tertiary)] font-[var(--font-heading)]">{currentPreset.label}</p>
                                            </div>
                                            <div className="w-px h-8 bg-[var(--outline-variant)]/30" />
                                            <div className="text-center">
                                                <p className="text-[10px] font-bold tracking-[0.1em] text-[var(--on-surface-variant)] uppercase font-[var(--font-heading)]">Cao</p>
                                                <p className="text-sm font-bold text-[var(--on-background)] font-[var(--font-heading)]">{height} cm</p>
                                            </div>
                                            <div className="w-px h-8 bg-[var(--outline-variant)]/30" />
                                            <div className="text-center">
                                                <p className="text-[10px] font-bold tracking-[0.1em] text-[var(--on-surface-variant)] uppercase font-[var(--font-heading)]">Cơ bắp</p>
                                                <p className="text-sm font-bold text-[var(--on-background)] font-[var(--font-heading)]">
                                                    {bodyProfile.muscleTone > 0.65 ? "Cao" : bodyProfile.muscleTone > 0.35 ? "TB" : "Thấp"}
                                                </p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="text-center">
                                                <p className="text-[10px] font-bold tracking-[0.1em] text-[var(--on-surface-variant)] uppercase font-[var(--font-heading)]">Cao</p>
                                                <p className="text-sm font-bold text-[var(--on-background)] font-[var(--font-heading)]">{height} cm</p>
                                            </div>
                                            <div className="w-px h-8 bg-[var(--outline-variant)]/30" />
                                            <div className="text-center">
                                                <p className="text-[10px] font-bold tracking-[0.1em] text-[var(--on-surface-variant)] uppercase font-[var(--font-heading)]">Nặng</p>
                                                <p className="text-sm font-bold text-[var(--on-background)] font-[var(--font-heading)]">{weight} kg</p>
                                            </div>
                                            <div className="w-px h-8 bg-[var(--outline-variant)]/30" />
                                            <div className="text-center">
                                                <p className="text-[10px] font-bold tracking-[0.1em] text-[var(--on-surface-variant)] uppercase font-[var(--font-heading)]">BMI</p>
                                                <p className="text-sm font-bold font-[var(--font-heading)]" style={{ color: bmiInfo.color }}>
                                                    {bmiRounded}
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Canvas controls */}
                            <div className="absolute top-6 right-6 flex flex-col gap-3">
                                <button className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-[var(--secondary)] hover:text-[var(--primary)] transition-colors">
                                    <RotateCcw size={18} />
                                </button>
                                <button className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-[var(--secondary)] hover:text-[var(--primary)] transition-colors">
                                    <ZoomIn size={18} />
                                </button>
                            </div>

                            {/* Live badge */}
                            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 glass-panel px-6 py-2 rounded-full border border-[var(--secondary)]/20">
                                <span className="text-xs font-bold tracking-widest text-[var(--secondary)] flex items-center gap-2 whitespace-nowrap font-[var(--font-heading)] uppercase">
                                    <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
                                    ĐANG CẬP NHẬT THEO THỜI GIAN THỰC
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}