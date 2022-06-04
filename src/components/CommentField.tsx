import styled from "styled-components";

export default styled.textarea`
	width: 100%;
	max-width: 100%;
	padding: 0.75rem 1.5rem;
	min-height: 96px;
	border-radius: 0.5rem;
	border: 1px solid var(--light-gray);
	font-size: 1rem;
	line-height: 1.5;
	resize: vertical;
	font-family: "Rubik";

	&:focus {
		border-color: var(--moderate-blue);
		outline: none;
	}

	&::placeholder {
		font-family: "Rubik";
		color: var(--dark-gray);
	}
`;
