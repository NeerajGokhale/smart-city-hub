/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: "#050505",
        deep: "#0a0e17",
        cyan: {
          DEFAULT: "#00f5ff",
        },
        violet: {
          DEFAULT: "#8b5cf6",
        },
        amber: {
          DEFAULT: "#f59e0b",
        },
        rose: {
          DEFAULT: "#f43f5e",
        },
        emerald: {
          DEFAULT: "#22e0a0",
        },
        ink: {
          hi: "#eaf1fb",
          mid: "#a6b0c3",
          lo: "#6b7690",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      keyframes: {
        pulseDot: {
          "0%, 100%": { opacity: 1, transform: "scale(1)" },
          "50%": { opacity: 0.45, transform: "scale(1.5)" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        drift: {
          "0%": { strokeDashoffset: 0 },
          "100%": { strokeDashoffset: -400 },
        },
        criticalPulse: {
          "0%, 100%": { boxShadow: "0 0 0px rgba(244,63,94,0.0)" },
          "50%": { boxShadow: "0 0 26px rgba(244,63,94,0.55)" },
        },
        fadeIn: {
          from: { opacity: 0, transform: "translateY(6px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        fadeInUp: {
          from: { opacity: 0, transform: "translateY(18px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        toastIn: {
          from: { opacity: 0, transform: "translateX(30px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
      },
      animation: {
        pulseDot: "pulseDot 2.2s ease-in-out infinite",
        floatY: "floatY 5s ease-in-out infinite",
        drift: "drift 14s linear infinite",
        criticalPulse: "criticalPulse 1.8s ease-in-out infinite",
        fadeIn: "fadeIn .4s ease both",
        fadeInUp: "fadeInUp .6s ease both",
        toastIn: "toastIn .3s ease both",
      },
    },
  },
  plugins: [],
}
