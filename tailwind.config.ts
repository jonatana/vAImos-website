import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1a365d",
          dark: "#0f2847",
          light: "#2d4a7c",
        },
        accent: {
          DEFAULT: "#f97316",
          dark: "#ea580c",
          light: "#fb923c",
        },
        background: "#fafafa",
        text: {
          DEFAULT: "#1f2937",
          light: "#6b7280",
        },
        success: "#10b981",
        error: "#ef4444",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontWeight: {
        normal: "400",
        semibold: "600",
      },
    },
  },
  plugins: [],
};
export default config;

