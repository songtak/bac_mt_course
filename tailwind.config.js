/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        arrowShake: {
          "0%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-2px)" },
          "50%": { transform: "translateX(2px)" },
          "75%": { transform: "translateX(-2px)" },
          "100%": { transform: "translateX(0)" },
        },
        shake: {
          "0%": { transform: "translateX(0) scale(1)" },
          "25%": { transform: "translateX(-2px) scale(1.03)" },
          "50%": { transform: "translateX(2px) scale(1.03)" },
          "75%": { transform: "translateX(-2px) scale(1.03)" },
          "100%": { transform: "translateX(0) scale(1)" },
        },
      },
      animation: {
        "arrow-shake": "arrowShake 0.5s ease-in-out",
        shake: "shake 0.5s ease-in-out 0s 3",
      },
    },
  },
  plugins: [],
};
