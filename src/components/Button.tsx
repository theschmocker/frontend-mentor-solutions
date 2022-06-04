import styled, { css } from "styled-components";
import { color } from "../styles/theme";

const variants = {
	primary: css`
		--button-variant-color: ${color("moderateBlue")};
	`,
	danger: css`
		--button-variant-color: ${color("softRed")};
	`,
	subdued: css`
		--button-variant-color: ${color("darkGray")};
	`,
} as const;

const horizontalPadding = {
	small: css`
		--button-horizontal-padding: 1.3125rem;
	`,
	normal: css`
		--button-horizontal-padding: 1.875rem;
	`,
} as const;

export default styled.button<{
	variant?: keyof typeof variants;
	padding?: keyof typeof horizontalPadding;
}>`
	${props => variants[props.variant ?? "primary"]}
	${props => horizontalPadding[props.padding ?? "normal"]}

	border-radius: 0.5rem;
	text-transform: uppercase;
	background-color: var(--button-variant-color);
	color: white;
	padding: 0.75rem var(--button-horizontal-padding);
	font-size: 1rem;
	line-height: 1.5;
	font-weight: 500;
	cursor: pointer;
	border: none;
	box-shadow: none;

	&:hover:not(:disabled) {
		opacity: 0.8;
	}

	&:disabled {
		background-color: ${color("lightGrayishBlue")};
		cursor: not-allowed;
	}
`;
