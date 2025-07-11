import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
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
        // Fixel Technologies brand colors
        fixel: {
          blue: "hsl(var(--fixel-blue))",
          purple: "hsl(var(--fixel-purple))",
          cyan: "hsl(var(--fixel-cyan))",
          pink: "hsl(var(--fixel-pink))",
          green: "hsl(var(--fixel-green))",
          orange: "hsl(var(--fixel-orange))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        // Performance-optimized keyframes using transform3d
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translate3d(0, 20px, 0)",
          },
          "100%": {
            opacity: "1",
            transform: "translate3d(0, 0, 0)",
          },
        },
        "slide-in-left": {
          "0%": {
            opacity: "0",
            transform: "translate3d(-30px, 0, 0)",
          },
          "100%": {
            opacity: "1",
            transform: "translate3d(0, 0, 0)",
          },
        },
        "slide-in-right": {
          "0%": {
            opacity: "0",
            transform: "translate3d(30px, 0, 0)",
          },
          "100%": {
            opacity: "1",
            transform: "translate3d(0, 0, 0)",
          },
        },
        "bounce-subtle": {
          "0%, 100%": {
            transform: "translate3d(0, 0, 0)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translate3d(0, -4px, 0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        glow: {
          "0%, 100%": {
            boxShadow: "0 0 5px hsl(var(--fixel-blue))",
          },
          "50%": {
            boxShadow:
              "0 0 20px hsl(var(--fixel-blue)), 0 0 30px hsl(var(--fixel-blue))",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translate3d(0, 0, 0)",
            animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
          },
          "50%": {
            transform: "translate3d(0, -8px, 0)",
            animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
          },
        },
        "pulse-slow": {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.6",
          },
        },
        "rotate-slow": {
          "0%": {
            transform: "rotate3d(0, 0, 1, 0deg)",
          },
          "100%": {
            transform: "rotate3d(0, 0, 1, 360deg)",
          },
        },
        "scale-in": {
          "0%": {
            opacity: "0",
            transform: "scale3d(0.95, 0.95, 1)",
          },
          "100%": {
            opacity: "1",
            transform: "scale3d(1, 1, 1)",
          },
        },
        shimmer: {
          "0%": {
            backgroundPosition: "-200% 0",
          },
          "100%": {
            backgroundPosition: "200% 0",
          },
        },
        wiggle: {
          "0%, 100%": {
            transform: "rotate3d(0, 0, 1, -3deg)",
          },
          "50%": {
            transform: "rotate3d(0, 0, 1, 3deg)",
          },
        },
        // High-performance entrance animations
        "slide-up": {
          "0%": {
            opacity: "0",
            transform: "translate3d(0, 100%, 0)",
          },
          "100%": {
            opacity: "1",
            transform: "translate3d(0, 0, 0)",
          },
        },
        "slide-down": {
          "0%": {
            opacity: "0",
            transform: "translate3d(0, -100%, 0)",
          },
          "100%": {
            opacity: "1",
            transform: "translate3d(0, 0, 0)",
          },
        },
        "zoom-in": {
          "0%": {
            opacity: "0",
            transform: "scale3d(0.3, 0.3, 1)",
          },
          "100%": {
            opacity: "1",
            transform: "scale3d(1, 1, 1)",
          },
        },
        "flip-in": {
          "0%": {
            opacity: "0",
            transform: "perspective(400px) rotate3d(1, 0, 0, 90deg)",
          },
          "40%": {
            transform: "perspective(400px) rotate3d(1, 0, 0, -20deg)",
          },
          "60%": {
            transform: "perspective(400px) rotate3d(1, 0, 0, 10deg)",
          },
          "80%": {
            transform: "perspective(400px) rotate3d(1, 0, 0, -5deg)",
          },
          "100%": {
            opacity: "1",
            transform: "perspective(400px) rotate3d(1, 0, 0, 0deg)",
          },
        },
        // Performance-optimized loading animations
        "loading-dots": {
          "0%, 80%, 100%": {
            transform: "scale3d(0, 0, 1)",
            opacity: "0.5",
          },
          "40%": {
            transform: "scale3d(1, 1, 1)",
            opacity: "1",
          },
        },
        "loading-bars": {
          "0%, 40%, 100%": {
            transform: "scaleY(0.4)",
          },
          "20%": {
            transform: "scaleY(1)",
          },
        },
        // Smooth gradient animations
        "gradient-x": {
          "0%, 100%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
        },
        "gradient-y": {
          "0%, 100%": {
            backgroundPosition: "50% 0%",
          },
          "50%": {
            backgroundPosition: "50% 100%",
          },
        },
        "gradient-xy": {
          "0%, 100%": {
            backgroundPosition: "0% 0%",
          },
          "25%": {
            backgroundPosition: "100% 0%",
          },
          "50%": {
            backgroundPosition: "100% 100%",
          },
          "75%": {
            backgroundPosition: "0% 100%",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // High-performance entrance animations
        "fade-in": "fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-left":
          "slide-in-left 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-right":
          "slide-in-right 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-up": "slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-down": "slide-down 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "zoom-in": "zoom-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "flip-in": "flip-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        // Smooth continuous animations
        "bounce-subtle":
          "bounce-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glow: "glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-slow": "pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "rotate-slow": "rotate-slow 15s linear infinite",
        shimmer: "shimmer 1.5s linear infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        // Loading animations
        "loading-dots": "loading-dots 1.4s infinite ease-in-out both",
        "loading-bars": "loading-bars 1s infinite ease-in-out both",
        // Gradient animations
        "gradient-x": "gradient-x 3s ease infinite",
        "gradient-y": "gradient-y 3s ease infinite",
        "gradient-xy": "gradient-xy 6s ease infinite",
      },
      // Enhanced easing functions for smoother animations
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-back": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
        "in-out-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
        spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        "smooth-in": "cubic-bezier(0.4, 0, 1, 1)",
        "smooth-out": "cubic-bezier(0, 0, 0.2, 1)",
      },
      // Optimized transition durations
      transitionDuration: {
        "50": "50ms",
        "75": "75ms",
        "250": "250ms",
        "350": "350ms",
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "1200": "1200ms",
        "1500": "1500ms",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
