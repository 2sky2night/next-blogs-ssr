import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        wiggle: "wiggle 1s 1",
      },
      keyframes: {
        wiggle: {
          "20%": {
            transform: "rotate(-15deg)",
          },
          "40%": {
            transform: "rotate(15deg)",
          },
          "60%": {
            transform: "rotate(-10deg)",
          },
          "80%": {
            transform: "rotate(10deg)",
          },
          "100%": {
            transform: "rotate(0deg)",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
