import { FormEventHandler, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import CommentField from "./CommentField";

export default function EditCommentForm({
	content,
	onSubmit,
}: {
	content: string;
	onSubmit?: (content: string) => void;
}) {
	const [editedContent, setEditedContent] = useState(content);
	const trimmed = editedContent.trim();

	const handleSubmit: FormEventHandler = e => {
		e.preventDefault();
		if (!trimmed) {
			return;
		}

		onSubmit?.(trimmed);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<CommentField value={editedContent} onChange={e => setEditedContent(e.target.value)} />
			<Button disabled={editedContent === content || !trimmed}>Update</Button>
		</Form>
	);
}

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 1rem;
`;
