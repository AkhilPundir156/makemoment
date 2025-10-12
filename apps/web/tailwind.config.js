import sharedConfig from "@makemymoment/tailwind-config/tailwind.config.js";

/** @type {import('tailwindcss').Config} */
const config ={
  presets: [sharedConfig],
  content:[
    "./app/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/**/*.{ts,tsx,js,jsx}",
  ]

};

export default config;