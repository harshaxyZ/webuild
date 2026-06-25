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
        background: "var(--bg)",
        foreground: "var(--text)",
        muted: "var(--muted)",
        border: "var(--border)",
        glass: "var(--glass)",
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "sans-serif"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
export default config;
