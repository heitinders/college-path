import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        /* Tier colors - Tonal variations of warm bronze */
        tier: {
          reach: "hsl(var(--tier-reach))",
          target: "hsl(var(--tier-target))",
          safety: "hsl(var(--tier-safety))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "sans-serif",
        ],
      },
      fontSize: {
        "xs": ["0.75rem", { lineHeight: "1.6", letterSpacing: "0.01em" }],
        "sm": ["0.875rem", { lineHeight: "1.6", letterSpacing: "0.01em" }],
        "base": ["1rem", { lineHeight: "1.7", letterSpacing: "0.01em" }],
        "lg": ["1.125rem", { lineHeight: "1.7", letterSpacing: "0.005em" }],
        "xl": ["1.25rem", { lineHeight: "1.7", letterSpacing: "0.005em" }],
        "2xl": ["1.5rem", { lineHeight: "1.5", letterSpacing: "0em" }],
        "3xl": ["1.875rem", { lineHeight: "1.4", letterSpacing: "-0.01em" }],
        "4xl": ["2.25rem", { lineHeight: "1.3", letterSpacing: "-0.015em" }],
        "5xl": ["3rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "6xl": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      boxShadow: {
        /* Premium luxury shadows - Extremely subtle */
        "luxury-sm": "0 1px 2px 0 rgba(0, 0, 0, 0.02)",
        "luxury": "0 2px 8px rgba(0, 0, 0, 0.04)",
        "luxury-lg": "0 4px 16px rgba(0, 0, 0, 0.06)",
        /* Legacy apple shadows for compatibility - mapped to luxury shadows */
        "apple-sm": "0 1px 2px 0 rgba(0, 0, 0, 0.02)",
        "apple": "0 2px 8px rgba(0, 0, 0, 0.04)",
        "apple-lg": "0 4px 16px rgba(0, 0, 0, 0.06)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        "slide-up": "slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        "slide-down": "slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
