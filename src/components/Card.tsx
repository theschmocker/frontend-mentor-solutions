import styled from "styled-components";
import { mediaQueries } from "../styles/media-queries";

export default styled.div`
	padding: 1rem;
	background-color: white;
	border-radius: 0.5rem;

	${mediaQueries.large(
		css => css`
			.card {
				padding: 1.5rem;
			}
		`
	)}
`;
