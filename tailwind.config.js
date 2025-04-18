/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        Poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        dark: {
          primary: "#1a1a1a",
          secondary: "#2d2d2d",
          text: "#ffffff",
          textSecondary: "#a0a0a0",
          border: "#3d3d3d",
        },
        light: {
          primary: "#ffffff",
          secondary: "#f5f5f5",
          text: "#000000",
          textSecondary: "#666666",
          border: "#e5e5e5",
        },
      },
      height: {
        "screen/1.2": "calc(100vh/1.2)",
        "screen/1.5": "calc(100vh/1.5)",
        "screen/2": "50vh",
        "screen/3": "calc(100vh / 3)",
        "screen/4": "calc(100vh / 4)",
        "screen/5": "calc(100vh / 5)",
      },
    },
  },
  plugins: [],
};
