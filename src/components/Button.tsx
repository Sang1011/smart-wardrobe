import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = "primary",
            size = "md",
            fullWidth = false,
            className,
            children,
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                className={cn(
                    // Base
                    "inline-flex items-center justify-center gap-2 font-semibold",
                    "rounded-xl transition-all duration-200",
                    "active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none",
                    "font-[var(--font-heading)]",
                    // Sizes
                    size === "sm" && "py-2 px-4 text-sm",
                    size === "md" && "py-3 px-6 text-base",
                    size === "lg" && "py-4 px-8 text-lg",
                    // Variants
                    variant === "primary" &&
                    "bg-[var(--primary)] text-[var(--on-primary)] hover:bg-[var(--surface-tint)]",
                    variant === "secondary" &&
                    "bg-[var(--secondary)] text-[var(--on-primary-fixed)] hover:bg-white",
                    variant === "outline" &&
                    "bg-transparent text-[var(--primary)] border border-[var(--primary)] hover:bg-[var(--primary-container)]/20",
                    variant === "ghost" &&
                    "bg-transparent text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-high)]",
                    // Full width
                    fullWidth && "w-full",
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";