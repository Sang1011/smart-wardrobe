import { cn } from "@/lib/utils";

interface StepBadgeProps {
    current: number;
    total: number;
    label?: string;
    className?: string;
}

export function StepBadge({ current, total, label, className }: StepBadgeProps) {
    return (
        <div
            className={cn(
                "inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium",
                "bg-[var(--surface-container-high)] text-[var(--on-surface-variant)]",
                className
            )}
        >
            <span className="w-4 h-4 rounded-full bg-[var(--primary)] text-[var(--on-primary)] text-[10px] font-bold flex items-center justify-center">
                {current}
            </span>
            <span>
                {label ?? `Bước ${current}/${total}`}
            </span>
        </div>
    );
}