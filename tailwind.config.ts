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
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: {
          gold: "#D4AF37",
          silver: "#C0C0C0",
          bronze: "#CD7F32",
        }
      },
      backgroundImage: {
        "cinematic-gradient": "linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.4))",
      }
    },
  },
  plugins: [],
};
export default config;
