import type { Metadata } from "next";
import { Be_Vietnam_Pro, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

// Heading font: Be Vietnam Pro — angular, modern, fashionable
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

// Body font: Inter — clean, highly legible at small sizes
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Atelier — Smart Wardrobe AI",
  description:
    "AI-powered fashion platform with 3D mannequin fitting, body analysis, and smart wardrobe management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={cn(
        "h-full antialiased",
        beVietnamPro.variable,
        inter.variable,
        geistMono.variable
      )}
    >
      <body suppressHydrationWarning
        className={cn(
          "min-h-full flex flex-col",
          "bg-[var(--background)] text-[var(--foreground)]",
          "font-[var(--font-sans)]"
        )}
      >
        {children}
      </body>
    </html>
  );
}