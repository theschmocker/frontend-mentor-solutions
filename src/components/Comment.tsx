/* eslint-disable indent */
import { useState } from "react";
import { AddCommentForm } from "./AddCommentForm";
import CommentCard from "./CommentCard";
import { Comment as IComment, User } from "../hooks/comments";
import styled from "styled-components";
import { mediaQueries } from "../styles/media-queries";

export function Comment({
	comment,
	currentUser,
	onDelete,
	onReply,
}: {
	comment: IComment;
	currentUser: User;
	onDelete: (id: number) => void;
	onReply: (content: string, parentCommentId: number) => void;
}) {
	const [reply, setReply] = useState(false);

	const showRepliesSection = reply || !!comment.replies.length;

	function handleSubmit(content: string) {
		onReply(content, comment.id);
		setReply(false);
	}

	return (
		<Root>
			<CommentCard
				comment={comment}
				currentUser={currentUser}
				onDelete={() => onDelete(comment.id)}
				onReply={() => setReply(r => !r)}
			/>
			{showRepliesSection && (
				<div className="comment__replies">
					{comment.replies?.map(reply => (
						<Comment key={reply.id} comment={reply} currentUser={currentUser} onDelete={onDelete} onReply={onReply} />
					))}
					{reply && <AddCommentForm user={currentUser} onSubmit={handleSubmit} />}
				</div>
			)}
		</Root>
	);
}

const Root = styled.div`
	display: grid;
	gap: 1rem;

	.comment__replies {
		display: grid;
		gap: 1rem;
		padding-left: 1rem;
		border-left: 2px solid var(--light-gray);

		${mediaQueries.large(
			css => css`
				gap: 1.5rem;
				margin-left: 43px;
				padding-left: 43px;
				border-left: 2px solid var(--light-gray);
			`
		)}
	}
`;
