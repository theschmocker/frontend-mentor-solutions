import { useState } from "react";
import { AddCommentForm } from "./AddCommentForm";
import CommentCard from "./CommentCard";
import { Comment as IComment, useComments, User } from "../state/comments";
import styled from "styled-components";
import { mediaQueries } from "../styles/media-queries";

export function Comment({ comment, currentUser }: { comment: IComment; currentUser: User }) {
	const [reply, setReply] = useState(false);
	const { deleteComment, addComment, updateComment, upvoteComment, downvoteComment } = useComments();

	const showRepliesSection = reply || !!comment.replies.length;

	function handleSubmit(content: string) {
		addComment(content, comment.id);
		setReply(false);
	}

	return (
		<Root>
			<CommentCard
				comment={comment}
				currentUser={currentUser}
				onDelete={() => deleteComment(comment.id)}
				onReply={() => setReply(r => !r)}
				onEdit={content => updateComment(comment.id, content)}
				onUpvote={() => upvoteComment(comment.id)}
				onDownvote={() => downvoteComment(comment.id)}
			/>
			{showRepliesSection && (
				<div className="comment__replies">
					{comment.replies?.map(reply => (
						<Comment key={reply.id} comment={reply} currentUser={currentUser} />
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
