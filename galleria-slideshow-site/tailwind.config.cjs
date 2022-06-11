const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				black: '#000',
				white: '#fff',
				gray: {
					100: '#f3f3f3',
					200: '#e5e5e5',
					300: '#7d7d7d'
				}
			},
		}
	},
	plugins: [plugin(({ addComponents }) => {
		addComponents({
			".heading-display": {
				fontSize: "12.5rem",
				lineHeight: 0.75,
				fontWeight: "bold",
				color: "theme('colors.gray.100')"
			},
			".heading-1": {
				fontSize: "3.5rem",
				lineHeight: "calc(8 / 7)",
				fontWeight: "bold",
				color: "theme('colors.black')"
			},
			".heading-2": {
				fontSize: "1.5rem",
				lineHeight: "calc(29 / 24)",
				fontWeight: "bold",
				color: "theme('colors.black')"
			},
			".heading-3": {
				fontSize: "1.125rem",
				lineHeight: "calc(11 / 9)",
				fontWeight: "bold",
				color: "theme('colors.black')"
			},
			".subhead-1": {
				fontSize: "0.9375rem",
				lineHeight: "calc(19 / 15)",
				fontWeight: 400,
				color: "theme('colors.black')"
			},
			".subhead-2": {
				fontSize: "0.8125rem",
				lineHeight: "calc(17 / 13)",
				fontWeight: 'bold',
				color: "theme('colors.black')"
			},
			".link-1": {
				fontSize: "0.75rem",
				lineHeight: 1.25,
				fontWeight: "bold",
				color: "theme('colors.gray.300')",
				letterSpacing: "2.5px",
				textTransform: 'uppercase',
				'&:hover': {
					color: "theme('colors.black')"
				}
			},
			".link-2": {
				fontSize: "0.5625rem",
				lineHeight: "calc(11 / 9)",
				fontWeight: "bold",
				color: "theme('colors.gray.300')",
				letterSpacing: "2px",
				textDecoration: "underline",
				textTransform: 'uppercase',
				"&:hover": { color: "theme('colors.black')" },
			},
			".body": {
				fontSize: "0.875rem",
				lineHeight: 2,
				fontWeight: "bold",
				color: "theme('colors.gray.300')"
			}
		})
	})]
};
