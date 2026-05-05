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
        zenith: {
          bg: "#0B0E14",
          card: "#12151C",
          primary: "#9333ea",
          highlight: "#a855f7",
        },
      },
    },
  },
  plugins: [],
};
export default config;