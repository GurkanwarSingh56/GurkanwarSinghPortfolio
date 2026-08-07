import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { QueryProvider } from "@/components/providers/QueryProvider";
import "./globals.css";

const sansFont = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap"
});

const monoFont = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Gurkanwar Singh — Senior Staff Software Engineer & Systems Architect",
  description: "DevOS Studio Portfolio of Gurkanwar Singh. Award-level interactive SaaS developer platform engineered with Next.js 15, React 19, Three.js, Framer Motion, and Firebase.",
  keywords: [
    "Gurkanwar Singh",
    "Senior Staff Engineer",
    "Systems Architect",
    "Next.js 15",
    "React 19",
    "Three.js",
    "SaaS Architecture",
    "Fullstack Engineer"
  ],
  authors: [{ name: "Gurkanwar Singh", url: "https://harryharvey.in" }],
  openGraph: {
    title: "Gurkanwar Singh — DevOS SaaS Developer Portfolio",
    description: "Award-level interactive developer platform featuring real-time telemetry, 3D R3F graphics, interactive CLI terminal, and AI agent orchestration.",
    url: "https://harryharvey.in",
    siteName: "Gurkanwar Singh Portfolio",
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Gurkanwar Singh — Senior Staff Engineer Portfolio",
    description: "DevOS SaaS Developer Control Plane with Next.js 15, React 19 & Three.js."
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${sansFont.variable} ${monoFont.variable}`}>
      <body className="font-sans bg-zinc-950 text-zinc-100 antialiased selection:bg-indigo-600/30 selection:text-white">
        
        {/* WCAG Accessibility Skip Link */}
        <a
          href="#projects"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-indigo-600 text-white rounded-lg font-mono text-xs shadow-xl"
        >
          Skip to main content
        </a>

        <QueryProvider>{children}</QueryProvider>

      </body>
    </html>
  );
}
