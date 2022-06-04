import "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		colors: {
			darkBlue: string;
			moderateBlue: string;
			lightGrayishBlue: string;
			darkGray: string;
			verLightGray: string;
			lightGray: string;
			softRed: string;
			paleRed: string;
		};
	}
}
