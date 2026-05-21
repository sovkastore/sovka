import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#0B1220",       // page background
        surface: "#111A2E",      // cards
        "surface-2": "#0E1626",  // nested panels
        line: "rgba(255,255,255,0.08)",
        ink: "#F3F4F6",          // primary text
        muted: "#9AA4B2",        // secondary text
        brand: {
          DEFAULT: "#0EA5FF",
          50: "#0E2A45",
          100: "#10314f",
          400: "#38BDF8",
          500: "#0EA5FF",
          600: "#0A84FF",
          700: "#0A6CD6",
        },
        accent: "#38BDF8",
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "Inter", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 12px rgba(0,0,0,0.30)",
        card: "0 10px 34px rgba(0,0,0,0.40)",
        glow: "0 12px 40px rgba(14,165,255,0.40)",
      },
      maxWidth: { content: "1240px" },
      backgroundImage: {
        "brand-grad": "linear-gradient(180deg,#38BDF8 0%,#0A84FF 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
