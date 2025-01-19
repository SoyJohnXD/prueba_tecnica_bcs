import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        base: "1.625rem",
      },
      colors: {
        primary: {
          50: "#F0F5FD",
          100: "#E3ECFC",
          200: "#CDDBF8",
          300: "#AEC3F3",
          400: "#8EA2EB",
          500: "#7283E2",
          600: "#5760D4",
          700: "#474DBB",
          800: "#3C4297",
          900: "#373078",
          950: "#202346",
        },
        neutral: {
          light: "#F8F8F8",
          gray: "#AFAFAF",
        },
        success: "#16A34A",
        error: "#DC2626",
      },
    },
  },
  plugins: [],
} satisfies Config;
