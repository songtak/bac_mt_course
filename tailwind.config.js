/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-white": "#F8F8F8",
        "main-black": "#1E1E1E",
        "main-green-400": "#043F2E",
        "main-green-300": "#2A6F2B",
        "main-green-200": "#78C51C",
        "main-green-100": "#C8F169",
        "main-blue-300": "#7D9CAA",
        "main-blue-200": "#70A4BB",
        "main-blue-100": "#9DC4D5",
        "main-gray-400": "#444444",
        "main-gray-300": "#808080",
        "main-gray-200": "#D1D3D4",
        "main-gray-100": "#EFEFEF",
        "main-bookmark": "#F9D100",
      },
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
        pan: {
          "0%": { backgroundPosition: "center" },
          "50%": { backgroundPosition: "top" },
          "100%": { backgroundPosition: "center" },
        },
        fade: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "arrow-shake": "arrowShake 0.5s ease-in-out",
        shake: "shake 0.5s ease-in-out 0s 3",
        pan: "pan 30s linear infinite",
        fade: "fade 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};
