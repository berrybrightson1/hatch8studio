/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#ffffff",
                foreground: "#111111",
                "hatch8-black": "#111111",
                "hatch8-gray": "#444444",
                "hatch8-accent": "#000000", // Solid black as per strict rules
            },
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
            },
            tracking: {
                tighter: "-0.05em",
            },
        },
    },
    plugins: [],
};
