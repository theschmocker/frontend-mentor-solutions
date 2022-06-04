import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
	colors: {
		darkBlue: "#334253",
		moderateBlue: "#5357b6",
		lightGrayishBlue: "#c5c6ef",
		darkGray: "#67727e",
		verLightGray: "#f5f6fa",
		lightGray: "#e9ebf0",
		softRed: "#ce484d",
		paleRed: "#ffb8bb",
	},
};

export const color = (name: keyof DefaultTheme["colors"]) => (props: { theme: DefaultTheme }) =>
	props.theme.colors[name];
