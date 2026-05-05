import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

/**
 * U-Calm Aviation — Tailwind v3 theme extension
 *
 * Drop this into the project root as `tailwind.config.ts` (or merge with
 * an existing config). Pair with 05-CSS-Variables.css so that `hsl(var(--token))`
 * references resolve correctly at runtime.
 *
 * Conventions:
 * - HSL triplets for alpha composability: `hsl(var(--primary) / 0.5)`
 * - Shadcn/Radix-compatible naming (DEFAULT / foreground)
 * - Named aliases (`deep-teal`, `serene-teal`, `champagne`, `ivory`, `still-navy`)
 *   for copy-friendly class names
 * - Narrower container (1280px) and slower motion (500ms) than Ascent —
 *   the concierge register, expressed in layout and time
 * - No red, no orange — those belong to the Ascent sister brand
 */

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        md: "2rem",
        lg: "2.5rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        /* shadcn / Radix compatible */
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          hero: "hsl(var(--primary-hero))",
          mist: "hsl(var(--primary-mist))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          mist: "hsl(var(--secondary-mist))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--surface))",
          foreground: "hsl(var(--foreground-muted))",
        },
        destructive: {
          DEFAULT: "hsl(var(--error))",
          foreground: "hsl(var(--primary-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },

        /* Named brand aliases — readable class names */
        "deep-teal":      "hsl(var(--primary))",
        "serene-teal":    "hsl(var(--primary-hero))",
        "mist-teal":      "hsl(var(--primary-mist))",
        champagne:        "hsl(var(--secondary))",
        "champagne-mist": "hsl(var(--secondary-mist))",
        "still-navy":     "hsl(var(--foreground))",
        "harbour-grey":   "hsl(var(--foreground-muted))",
        ivory:            "hsl(var(--background))",
        "cloud-white":    "hsl(var(--surface-cool))",
        linen:            "hsl(var(--surface))",
        whisper:          "hsl(var(--border))",
        "deep-night":     "hsl(var(--dark-bg))",

        /* Semantic */
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        info:    "hsl(var(--info))",
      },

      backgroundImage: {
        "gradient-primary":   "var(--gradient-primary)",
        "gradient-champagne": "var(--gradient-champagne)",
        "gradient-calm":      "var(--gradient-calm)",
        "gradient-horizon":   "var(--gradient-horizon)",
        "gradient-hero-overlay": "var(--gradient-hero-overlay)",
      },

      fontFamily: {
        serif: [
          "Cormorant Garamond",
          "Playfair Display",
          "Georgia",
          "Times New Roman",
          "serif",
        ],
        sans: [
          "Gill Sans",
          "Gill Sans Nova",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },

      fontSize: {
        hero:    ["clamp(3.5rem, 6vw, 5.5rem)",   { lineHeight: "1.15", letterSpacing: "-0.01em",  fontWeight: "300" }],
        h1:      ["clamp(2.5rem, 4.5vw, 4rem)",   { lineHeight: "1.15", letterSpacing: "-0.01em",  fontWeight: "300" }],
        h2:      ["clamp(2.25rem, 4vw, 3.5rem)",  { lineHeight: "1.2",  letterSpacing: "-0.005em", fontWeight: "400" }],
        h3:      ["clamp(1.75rem, 2.5vw, 2.5rem)",{ lineHeight: "1.25", fontWeight: "500" }],
        h4:      ["1.5rem",    { lineHeight: "1.3", fontWeight: "600" }],
        h5:      ["1.25rem",   { lineHeight: "1.4", fontWeight: "600" }],
        h6:      ["1rem",      { lineHeight: "1.5", fontWeight: "600" }],
        "body-lg":["1.1875rem",{ lineHeight: "1.65" }],
        body:    ["1.0625rem", { lineHeight: "1.7" }],
        small:   ["0.875rem",  { lineHeight: "1.5" }],
        caption: ["0.8125rem", { lineHeight: "1.5" }],
        nav:     ["0.875rem",  { lineHeight: "1", fontWeight: "500" }],
        eyebrow: ["0.75rem",   { lineHeight: "1", fontWeight: "500", letterSpacing: "0.12em" }],
        button:  ["0.9375rem", { lineHeight: "1", fontWeight: "500" }],
      },

      letterSpacing: {
        tighter: "-0.01em",
        tight:   "-0.005em",
        wide:    "0.04em",
        eyebrow: "0.12em",
      },

      borderRadius: {
        none: "0",
        sm:   "8px",
        DEFAULT: "14px",
        md:   "14px",
        lg:   "20px",
        xl:   "24px",
        pill: "999px",
      },

      boxShadow: {
        whisper: "var(--shadow-whisper)",
        calm:    "var(--shadow-calm)",
        float:   "var(--shadow-float)",
        gold:    "var(--shadow-gold)",
      },

      transitionTimingFunction: {
        calm:     "cubic-bezier(0.25, 0.8, 0.25, 1)",
        standard: "cubic-bezier(0.4, 0, 0.2, 1)",
        "ease-out-custom": "cubic-bezier(0, 0, 0.2, 1)",
        "ease-in-custom":  "cubic-bezier(0.4, 0, 1, 1)",
      },

      transitionDuration: {
        "200":  "200ms",
        "300":  "300ms",
        "500":  "500ms",
        "600":  "600ms",
        "800":  "800ms",
        "4000": "4000ms",
      },

      keyframes: {
        "fade-soft": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        breathe: {
          "0%, 100%": { opacity: "1",    transform: "scale(1)" },
          "50%":      { opacity: "0.88", transform: "scale(1.01)" },
        },
        drift: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-3px)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
      },

      animation: {
        "fade-soft": "fade-soft 1s cubic-bezier(0.25, 0.8, 0.25, 1) both",
        "slide-up":  "slide-up 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) both",
        breathe:     "breathe 4s cubic-bezier(0.25, 0.8, 0.25, 1) infinite",
        drift:       "drift 8s ease-in-out infinite",
        shimmer:     "shimmer 3s linear infinite",
        "accordion-down": "accordion-down 0.3s ease-out",
        "accordion-up":   "accordion-up 0.3s ease-out",
      },

      spacing: {
        "section":        "6rem",
        "section-mobile": "3.5rem",
        "gutter":         "2rem",
        "gutter-wide":    "3rem",
      },

      maxWidth: {
        container: "1280px",
        prose: "72ch",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
