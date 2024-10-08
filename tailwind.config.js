const primeui = require("tailwindcss-primeui");
export default {
	content: ["./index.html", "./src/**/*.{vue,js,jsx,ts,tsx}"],
	theme: {
		fontFamily: {
			roboto: ["Roboto", "sans-serif"],
		},
		extend: {},
		plugins: [primeui],
	},
};
