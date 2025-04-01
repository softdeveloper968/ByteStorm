/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				mw_black: "#28252B",
				mw_dark_gray: "#474747",
				mw_gray: "#EDEDED",
				mw_white: "#F9F9F9",
				mw_red: "#F40357",
				mw_olive: "#84BA4E",
				mw_turq: "#74E4B8",
				mw_green: "#D1EE00",
			},
			screens: {
				"sm": "240px",
			},
		},
	},
	plugins: [
		require("@tailwindcss/forms"),
		require('tailwind-scrollbar'),
	],
};
