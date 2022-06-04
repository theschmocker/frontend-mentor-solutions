import { useState } from "react";
import Button from "./Button";
import Card from "./Card";
import { User } from "../state/comments";
import styled from "styled-components";
import { mediaQueries } from "../styles/media-queries";
import ScreenreaderText from "./ScreenreaderText";
import CommentField from "./CommentField";

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
				<CommentField
					name="content"
					placeholder="Add a comment..."
					required
					value={content}
					onChange={e => setContent(e.target.value)}
				/>
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
`;
