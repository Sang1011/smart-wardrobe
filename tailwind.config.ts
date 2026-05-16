import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Primary: deep teal
                "primary": "#2e6764",
                "on-primary": "#ffffff",
                "primary-container": "#b4ede8",
                "on-primary-container": "#104f4c",
                "primary-fixed": "#b4ede8",
                "primary-fixed-dim": "#98d1cc",
                "on-primary-fixed": "#00201e",
                "on-primary-fixed-variant": "#104f4c",
                // Secondary: warm neutral
                "secondary": "#605e57",
                "on-secondary": "#ffffff",
                "secondary-container": "#e6e2d9",
                "on-secondary-container": "#484740",
                "secondary-fixed": "#e6e2d9",
                "secondary-fixed-dim": "#cac6be",
                "on-secondary-fixed": "#1c1c16",
                "on-secondary-fixed-variant": "#484740",
                // Tertiary: brighter teal
                "tertiary": "#006a60",
                "on-tertiary": "#ffffff",
                "tertiary-container": "#8cf5e4",
                "on-tertiary-container": "#005048",
                "tertiary-fixed": "#8cf5e4",
                "tertiary-fixed-dim": "#6fd8c8",
                "on-tertiary-fixed": "#00201c",
                "on-tertiary-fixed-variant": "#005048",
                // Surfaces
                "background": "#eefcfa",
                "on-background": "#111e1d",
                "surface": "#eefcfa",
                "on-surface": "#111e1d",
                "surface-variant": "#d7e5e3",
                "on-surface-variant": "#324b49",
                "surface-dim": "#cedddb",
                "surface-bright": "#eefcfa",
                "surface-tint": "#2e6764",
                "surface-container-lowest": "#ffffff",
                "surface-container-low": "#e8f7f4",
                "surface-container": "#e2f1ef",
                "surface-container-high": "#ddebe9",
                "surface-container-highest": "#d7e5e3",
                // Misc
                "outline": "#627c7a",
                "outline-variant": "#b0ccc9",
                "error": "#ba1a1a",
                "on-error": "#ffffff",
                "error-container": "#ffdad6",
                "on-error-container": "#93000a",
                "inverse-surface": "#263332",
                "inverse-on-surface": "#e5f4f1",
                "inverse-primary": "#98d1cc",
                // Custom colors for login page
                "primary-hover": "#245654",
                "dark-overlay": "#004643",
            },
            borderRadius: {
                DEFAULT: "0.5rem",
                sm: "0.25rem",
                md: "0.75rem",
                lg: "1rem",
                xl: "1.5rem",
                "2xl": "2rem",
                full: "9999px",
            },
            spacing: {
                base: "8px",
                xs: "4px",
                sm: "8px",
                md: "16px",
                lg: "24px",
                xl: "32px",
                gutter: "24px",
                margin: "32px",
            },
            fontFamily: {
                headline: ["Be Vietnam Pro", "sans-serif"],
                display: ["Be Vietnam Pro", "sans-serif"],
                body: ["Inter", "sans-serif"],
                label: ["Inter", "sans-serif"],
            },
        },
    },
};

export default config;