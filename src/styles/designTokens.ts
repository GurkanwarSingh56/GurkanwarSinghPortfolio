/**
 * DevOS SaaS Design System — Tokens & Specifications
 * Single source of truth for design tokens, typography, layout, motion, and component states.
 */

export const DESIGN_TOKENS = {
  colors: {
    background: {
      primary: "#09090b", // Obsidian Black Base
      secondary: "#121217", // Dark Slate Surface
      tertiary: "#181822", // Elevated Card Surface
      floating: "#22222f", // Popovers, Tooltips & Floating Panels
    },
    accent: {
      indigo: "#6366f1", // Primary Brand Accent
      cyan: "#06b6d4", // Electric Cyan Data Telemetry
      violet: "#8b5cf6", // Vibrant Violet Highlight
      emerald: "#10b981", // Operational Live Status
      rose: "#f43f5e", // Critical Alert / Error
      amber: "#f59e0b", // Warning / Medium Priority
    },
    text: {
      primary: "#fafafa", // 98% Light High Contrast
      secondary: "#a1a1aa", // 65% Muted Body Copy
      muted: "#71717a", // 46% Low Contrast Metadata
      code: "#06b6d4", // Monospaced Code Cyan
    },
    border: {
      hairline: "rgba(255, 255, 255, 0.08)",
      subtle: "rgba(255, 255, 255, 0.12)",
      glow: "rgba(99, 102, 241, 0.35)",
    },
  },

  typography: {
    fontFamily: {
      sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: '"JetBrains Mono", "Space Grotesk", monospace',
    },
    fontSize: {
      display1: { size: "4rem", lineHeight: "1.1", tracking: "-0.04em" }, // 64px
      h1: { size: "2.25rem", lineHeight: "1.25", tracking: "-0.03em" }, // 36px
      h2: { size: "1.5rem", lineHeight: "1.33", tracking: "-0.02em" }, // 24px
      h3: { size: "1.125rem", lineHeight: "1.44", tracking: "-0.01em" }, // 18px
      bodyLarge: { size: "1rem", lineHeight: "1.625", tracking: "0em" }, // 16px
      bodyStandard: { size: "0.875rem", lineHeight: "1.57", tracking: "0em" }, // 14px
      caption: { size: "0.75rem", lineHeight: "1.33", tracking: "0.02em" }, // 12px
      code: { size: "0.8125rem", lineHeight: "1.53", tracking: "0em" }, // 13px
    },
  },

  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
    "2xl": "4rem", // 64px
  },

  grid: {
    columns: 12,
    gutter: "1.5rem", // 24px
    maxWidth: "1440px",
  },

  radius: {
    sm: "0.375rem", // 6px
    md: "0.75rem", // 12px
    lg: "1rem", // 16px
    xl: "1.5rem", // 24px
    full: "9999px",
  },

  glassmorphism: {
    submerged: {
      bg: "rgba(9, 9, 11, 0.75)",
      blur: "16px",
      border: "1px solid rgba(255, 255, 255, 0.08)",
    },
    elevated: {
      bg: "rgba(18, 18, 23, 0.7)",
      blur: "20px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
    },
    floatingPopover: {
      bg: "rgba(24, 24, 34, 0.92)",
      blur: "24px",
      border: "1px solid rgba(99, 102, 241, 0.3)",
    },
  },

  shadows: {
    level1: "0 4px 20px -2px rgba(0, 0, 0, 0.5)",
    level2: "0 10px 30px -5px rgba(0, 0, 0, 0.7), 0 0 20px 0 rgba(99, 102, 241, 0.15)",
    level3: "0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 40px 0 rgba(6, 182, 212, 0.2)",
  },

  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  motion: {
    springSnappy: { type: "spring", stiffness: 400, damping: 25 },
    springGentle: { type: "spring", stiffness: 200, damping: 20 },
    staggerFast: 0.05,
    staggerNormal: 0.1,
  },
} as const;
