import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#5A31F4", 50: "#F1ECFF", 500: "#6E3BFF", 600: "#5A31F4", 700: "#4A1FBF" },
        ink: "#15151D",
        muted: "#6B6B76",
        canvas: "#F4F4F8",
        accent: "#FF4E5B",
      },
      fontFamily: { sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"] },
      boxShadow: { card: "0 12px 30px rgba(42,30,102,0.07)", soft: "0 4px 16px rgba(0,0,0,0.04)" },
    },
  },
  plugins: [],
};
export default config;
