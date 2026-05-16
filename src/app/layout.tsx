import type { Metadata } from "next";
import { Be_Vietnam_Pro, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/utils";
import { LocaleProvider } from "@/context/LocaleContext";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

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
  title: "Smart Wardrobe",
  description:
    "AI-powered fashion platform with smart wardrobe management, outfit suggestions, and style planning.",
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
      <body
        suppressHydrationWarning
        className={cn(
          "min-h-full flex flex-col",
          "bg-background text-on-surface",
          "font-body"
        )}
      >
        <LocaleProvider>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}