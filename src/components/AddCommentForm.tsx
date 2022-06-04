/* eslint-disable indent */
import { useState } from "react";
import Button from "./Button";
import Card from "./Card";
import { User } from "../hooks/comments";
import styled from "styled-components";
import { mediaQueries } from "../styles/media-queries";
import ScreenreaderText from "./ScreenreaderText";

export function AddCommentForm({
	user,
	onSubmit,
}: {
	user: User;
	onSubmit: (content: string) => void | Promise<void>;
}) {
	const [content, setContent] = useState("");
	const trimmed = content.trim();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!trimmed) {
			return;
		}

		await onSubmit(trimmed);
		setContent("");
	}

	return (
		<Root as="form" className="add-comment" onSubmit={handleSubmit}>
			<img src={user.image.png} alt="" className="add-comment__image" />
			<label className="add-comment__label">
				<ScreenreaderText>Add a comment</ScreenreaderText>
				<textarea
					name="content"
					className="add-comment__content"
					placeholder="Add a comment..."
					required
					value={content}
					onChange={e => setContent(e.target.value)}
				></textarea>
			</label>
			<Button className="add-comment__send" disabled={!trimmed}>
				Send
			</Button>
		</Root>
	);
}

const Root = styled(Card)`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-areas:
		"textarea textarea"
		"image    submit";
	align-items: center;
	gap: 1rem;

	${mediaQueries.large(
		css => css`
			grid-template-columns: min-content 1fr min-content;
			grid-template-areas: "image textarea submit";
			align-items: flex-start;
			padding: 1.5rem;
		`
	)}

	.add-comment__image {
		grid-area: image;
		width: 32px;
		${mediaQueries.large(css => {
			return css`
				width: 40px;
				margin-top: 4px;
			`;
		})}
	}

	.add-comment__label {
		grid-area: textarea;
		width: 100%;
	}

	.add-comment__send {
		grid-area: submit;
		justify-self: end;
	}

	.add-comment__send:hover:not(:disabled) {
		opacity: 0.8;
	}

	.add-comment__send:disabled {
		background-color: var(--light-grayish-blue);
		cursor: not-allowed;
	}

	textarea {
		width: 100%;
		max-width: 100%;
		padding: 0.75rem 1.5rem;
		min-height: 96px;
		border-radius: 0.5rem;
		border: 1px solid var(--light-gray);
		font-size: 1rem;
		line-height: 1.5;
		resize: vertical;
	}

	textarea:focus {
		border-color: var(--moderate-blue);
		outline: none;
	}

	textarea::placeholder {
		font-family: "Rubik";
		color: var(--dark-gray);
	}
`;
