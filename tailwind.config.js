const primeui = require("tailwindcss-primeui");
export default {
	content: ["./index.html", "./src/**/*.{vue,js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Roboto", "sans-serif"],
			},
		},
		plugins: [primeui],
	},
};
