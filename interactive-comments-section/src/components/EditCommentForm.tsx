import { FormEventHandler, useRef, useState } from "react";
import styled from "styled-components";
import { useAutoFocus } from "../hooks/auto-focus";
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

	const [textarea, form] = useAutoFocus<HTMLTextAreaElement, HTMLFormElement>();

	return (
		<Form onSubmit={handleSubmit} ref={form}>
			<CommentField value={editedContent} onChange={e => setEditedContent(e.target.value)} ref={textarea} />
			<Button disabled={editedContent === content || !trimmed}>Update</Button>
		</Form>
	);
}

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 1rem;
	scroll-margin: 100px;
`;
