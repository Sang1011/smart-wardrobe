"use client";

import { useState, useCallback, useRef } from "react";
import { Camera, CloudUpload, Sparkles, SkipForward, ArrowLeft, HelpCircle, UserCircle, Ruler } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BottomNavBar } from "@/components/BottomNavBar";

interface UploadZoneProps {
    title: string;
    icon: React.ReactNode;
    backgroundIcon: React.ReactNode;
    file: File | null;
    onFileChange: (file: File | null) => void;
}

function UploadZone({ title, icon, backgroundIcon, file, onFileChange }: UploadZoneProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setDragging(false);
            const dropped = e.dataTransfer.files[0];
            if (dropped && dropped.type.startsWith("image/")) {
                onFileChange(dropped);
            }
        },
        [onFileChange]
    );

    const preview = file ? URL.createObjectURL(file) : null;

    return (
        <div
            className={cn(
                "bg-[var(--surface-container-lowest)] rounded-xl p-6",
                "border border-[var(--outline-variant)]/40",
                "shadow-[0_4px_24px_rgba(46,103,100,0.04)]",
                "relative overflow-hidden group"
            )}
        >
            {/* Background ghost icon */}
            <div className="absolute top-0 right-0 p-4 opacity-10 text-[var(--on-surface)] pointer-events-none">
                <div className="text-[80px] leading-none">{backgroundIcon}</div>
            </div>

            <div className="relative z-10 flex flex-col h-full">
                {/* Card header */}
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-[var(--on-surface)] font-[var(--font-heading)]">
                        {title}
                    </h3>
                    <span className="p-2 rounded-full bg-[var(--primary-container)] text-[var(--primary)]">
                        {icon}
                    </span>
                </div>

                {/* Drop zone */}
                <div
                    onClick={() => inputRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    className={cn(
                        "flex-grow border-2 border-dashed rounded-lg",
                        "bg-[var(--surface)] flex flex-col items-center justify-center p-8",
                        "cursor-pointer transition-all duration-200 min-h-[200px]",
                        dragging
                            ? "border-[var(--primary)] bg-[var(--primary-container)]/20 scale-[0.99]"
                            : "border-[var(--outline-variant)]/60 hover:border-[var(--primary)]"
                    )}
                >
                    {preview ? (
                        <div className="w-full h-full flex flex-col items-center gap-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={preview}
                                alt="Preview"
                                className="max-h-40 object-contain rounded-lg"
                            />
                            <span className="text-xs text-[var(--tertiary)] font-medium font-[var(--font-sans)]">
                                ✓ Đã tải lên — nhấn để thay đổi
                            </span>
                        </div>
                    ) : (
                        <>
                            <CloudUpload size={36} className="text-[var(--on-surface-variant)] mb-2" />
                            <span className="text-sm font-medium text-[var(--on-surface)] text-center font-[var(--font-sans)]">
                                Kéo thả hoặc{" "}
                                <span className="text-[var(--primary)] font-semibold">Tải ảnh lên</span>
                            </span>
                            <span className="text-xs text-[var(--on-surface-variant)] mt-1 text-center font-[var(--font-sans)]">
                                JPG, PNG (Tối đa 5MB)
                            </span>
                        </>
                    )}
                </div>

                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
                />
            </div>
        </div>
    );
}

// ─── Skeleton SVG for the analysis preview ───────────────────────────────────
function SkeletonPreview({ hasData }: { hasData: boolean }) {
    return (
        <svg
            viewBox="0 0 200 380"
            className={cn(
                "w-40 h-auto transition-opacity duration-700",
                hasData ? "opacity-100" : "opacity-30"
            )}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Head */}
            <circle cx="100" cy="35" r="22" stroke="#2e6764" strokeWidth="1.5" strokeDasharray={hasData ? "0" : "4 3"} fill="none" />
            {/* Neck */}
            <line x1="100" y1="57" x2="100" y2="75" stroke="#2e6764" strokeWidth="2" />
            {/* Shoulders */}
            <line x1="100" y1="90" x2="45" y2="100" stroke="#2e6764" strokeWidth="2" />
            <line x1="100" y1="90" x2="155" y2="100" stroke="#2e6764" strokeWidth="2" />
            {/* Spine */}
            <line x1="100" y1="75" x2="100" y2="200" stroke="#2e6764" strokeWidth="2" />
            {/* Arms */}
            <line x1="45" y1="100" x2="30" y2="170" stroke="#2e6764" strokeWidth="1.5" />
            <line x1="155" y1="100" x2="170" y2="170" stroke="#2e6764" strokeWidth="1.5" />
            {/* Hands */}
            <circle cx="30" cy="175" r="5" fill="#006a60" fillOpacity="0.5" />
            <circle cx="170" cy="175" r="5" fill="#006a60" fillOpacity="0.5" />
            {/* Hips */}
            <line x1="100" y1="200" x2="70" y2="210" stroke="#2e6764" strokeWidth="2" />
            <line x1="100" y1="200" x2="130" y2="210" stroke="#2e6764" strokeWidth="2" />
            {/* Legs */}
            <line x1="70" y1="210" x2="65" y2="310" stroke="#2e6764" strokeWidth="2" />
            <line x1="130" y1="210" x2="135" y2="310" stroke="#2e6764" strokeWidth="2" />
            {/* Feet */}
            <line x1="65" y1="310" x2="55" y2="320" stroke="#2e6764" strokeWidth="2" />
            <line x1="135" y1="310" x2="145" y2="320" stroke="#2e6764" strokeWidth="2" />
            {/* Joints highlight */}
            {[
                [100, 75], [45, 100], [155, 100],
                [30, 170], [170, 170],
                [100, 200], [70, 210], [130, 210],
                [65, 310], [135, 310],
            ].map(([cx, cy], i) => (
                <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r={hasData ? 4 : 3}
                    fill={hasData ? "#006a60" : "#b0ccc9"}
                    className={hasData ? "animate-pulse" : ""}
                    style={{ animationDelay: `${i * 0.12}s` }}
                />
            ))}
        </svg>
    );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function BodyAnalysisPage() {
    const [frontPhoto, setFrontPhoto] = useState<File | null>(null);
    const [sidePhoto, setSidePhoto] = useState<File | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [analyzed, setAnalyzed] = useState(false);

    const hasPhotos = frontPhoto !== null && sidePhoto !== null;

    const handleAnalyze = async () => {
        if (!hasPhotos) return;
        setAnalyzing(true);
        // Simulate analysis delay
        await new Promise((r) => setTimeout(r, 2400));
        setAnalyzing(false);
        setAnalyzed(true);
    };

    return (
        <div className="bg-[var(--background)] text-[var(--on-background)] min-h-screen flex flex-col pt-[72px] pb-[88px] md:pb-0">
            {/* Top App Bar */}
            <header className="bg-[var(--surface)]/90 backdrop-blur-xl border-b border-[var(--outline-variant)]/30 fixed w-full top-0 z-50 flex justify-between items-center px-6 h-[72px]">
                <div className="flex items-center gap-4">
                    <Link
                        href="/setup"
                        className="flex items-center justify-center p-2 rounded-full text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-high)] transition-colors active:scale-95"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="text-xl font-bold tracking-tight text-[var(--primary)] font-[var(--font-heading)] uppercase">
                        Veridian AI
                    </h1>
                </div>
                <div className="flex items-center gap-1">
                    <button className="p-2 rounded-full text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-high)] transition-colors">
                        <HelpCircle size={20} />
                    </button>
                    <button className="p-2 rounded-full text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-high)] transition-colors">
                        <UserCircle size={20} />
                    </button>
                </div>
            </header>

            {/* Main */}
            <main className="flex-grow flex flex-col items-center w-full px-4 md:px-8 py-6 max-w-7xl mx-auto gap-8">
                {/* Header copy */}
                <div className="w-full text-center max-w-2xl mx-auto space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--surface-container-high)] rounded-full text-sm font-medium text-[var(--on-surface-variant)]">
                        <Ruler size={16} />
                        <span>Bước 2/3</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--on-surface)] font-[var(--font-heading)]">
                        Tinh chỉnh Tỉ lệ Cơ thể
                    </h2>
                    <p className="text-base text-[var(--on-surface-variant)] leading-relaxed font-[var(--font-sans)]">
                        Tải lên ảnh mặt trước và mặt bên để công nghệ MediaPipe phân tích
                        chính xác các điểm neo trên cơ thể, giúp tạo ra bản phác thảo tỉ
                        lệ 1:1 hoàn hảo cho bạn.
                    </p>
                </div>

                {/* Bento grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-5xl mx-auto">
                    {/* Upload zones (7 cols) */}
                    <div className="md:col-span-7 flex flex-col gap-6">
                        <UploadZone
                            title="Ảnh Mặt Trước"
                            icon={<Camera size={20} />}
                            backgroundIcon={<span style={{ fontFamily: "sans-serif" }}>🧍</span>}
                            file={frontPhoto}
                            onFileChange={setFrontPhoto}
                        />
                        <UploadZone
                            title="Ảnh Mặt Bên"
                            icon={<Camera size={20} />}
                            backgroundIcon={<span style={{ fontFamily: "sans-serif" }}>🧍</span>}
                            file={sidePhoto}
                            onFileChange={setSidePhoto}
                        />
                    </div>

                    {/* Analysis Preview (5 cols) */}
                    <div
                        className={cn(
                            "md:col-span-5 bg-[var(--surface-container-lowest)] rounded-xl p-6",
                            "border border-[var(--outline-variant)]/40",
                            "shadow-[0_4px_24px_rgba(46,103,100,0.04)]",
                            "flex flex-col relative overflow-hidden"
                        )}
                    >
                        <h3 className="text-lg font-semibold text-[var(--on-surface)] mb-4 font-[var(--font-heading)]">
                            Mô phỏng Phân tích
                        </h3>

                        {/* Skeleton preview */}
                        <div
                            className={cn(
                                "relative flex-grow bg-[var(--surface)] rounded-lg overflow-hidden",
                                "flex items-center justify-center min-h-[360px]"
                            )}
                        >
                            <SkeletonPreview hasData={analyzed} />

                            {/* Gradient overlay + status */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)]/80 to-transparent flex flex-col justify-end p-4">
                                <div
                                    className={cn(
                                        "bg-[var(--surface-container-lowest)]/90 backdrop-blur-sm",
                                        "rounded-lg p-3 border border-[var(--outline-variant)]/30",
                                        "flex items-center gap-3"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "w-2 h-2 rounded-full",
                                            analyzed
                                                ? "bg-[var(--tertiary)] animate-pulse"
                                                : analyzing
                                                    ? "bg-amber-400 animate-pulse"
                                                    : "bg-[var(--outline-variant)]"
                                        )}
                                    />
                                    <span className="text-sm font-medium text-[var(--on-surface)] font-[var(--font-sans)]">
                                        {analyzed
                                            ? "Phân tích hoàn tất ✓"
                                            : analyzing
                                                ? "Đang phân tích dữ liệu..."
                                                : "Hệ thống đang chờ dữ liệu..."}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="mt-6 flex flex-col gap-3">
                            {analyzed ? (
                                <Link href="/setup/complete">
                                    <button
                                        className={cn(
                                            "w-full bg-[var(--primary)] text-[var(--on-primary)]",
                                            "py-4 px-6 rounded-lg font-semibold text-base",
                                            "flex justify-center items-center gap-2",
                                            "hover:bg-[var(--surface-tint)] transition-colors active:scale-[0.98]",
                                            "font-[var(--font-heading)]"
                                        )}
                                    >
                                        <Sparkles size={18} />
                                        Tiếp tục Bước 3
                                    </button>
                                </Link>
                            ) : (
                                <button
                                    onClick={handleAnalyze}
                                    disabled={!hasPhotos || analyzing}
                                    className={cn(
                                        "w-full py-4 px-6 rounded-lg font-semibold text-base",
                                        "flex justify-center items-center gap-2",
                                        "transition-colors active:scale-[0.98] font-[var(--font-heading)]",
                                        hasPhotos && !analyzing
                                            ? "bg-[var(--primary)] text-[var(--on-primary)] hover:bg-[var(--surface-tint)]"
                                            : "bg-[var(--surface-container-high)] text-[var(--on-surface-variant)] cursor-not-allowed"
                                    )}
                                >
                                    {analyzing ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                            Đang phân tích...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles size={18} />
                                            Bắt đầu Phân tích
                                        </>
                                    )}
                                </button>
                            )}

                            <Link href="/setup/complete">
                                <button
                                    className={cn(
                                        "w-full bg-transparent text-[var(--primary)]",
                                        "py-3 px-6 rounded-lg font-medium text-sm",
                                        "border border-[var(--primary)]",
                                        "hover:bg-[var(--primary-container)]/20 transition-colors",
                                        "flex items-center justify-center gap-2 font-[var(--font-sans)]"
                                    )}
                                >
                                    <SkipForward size={16} />
                                    Bỏ qua bước này
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            {/* Mobile Bottom Nav */}
            <BottomNavBar />
        </div>
    );
}