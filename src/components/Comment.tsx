import { useState } from "react";
import { AddCommentForm } from "./AddCommentForm";
import CommentCard from "./CommentCard";
import { Comment as IComment, useComments, User } from "../state/comments";
import styled from "styled-components";
import { mediaQueries } from "../styles/media-queries";
import { AnimatePresence } from "framer-motion";
import ExpandAnimation from "./ExpandAnimation";
import { color } from "../styles/theme";

export function Comment({ comment, currentUser }: { comment: IComment; currentUser: User }) {
	const [reply, setReply] = useState(false);
	const { deleteComment, addComment, updateComment, upvoteComment, downvoteComment } = useComments();

	function handleSubmit(content: string) {
		addComment(content, comment.id);
		setReply(false);
	}

	return (
		<Root className="comment" hasChildren={!!comment.replies.length || reply}>
			<CommentCard
				comment={comment}
				currentUser={currentUser}
				onDelete={() => deleteComment(comment.id)}
				onReply={() => setReply(r => !r)}
				onEdit={content => updateComment(comment.id, content)}
				onUpvote={() => upvoteComment(comment.id)}
				onDownvote={() => downvoteComment(comment.id)}
			/>

			<div className="comment__replies">
				<AnimatePresence>
					{comment.replies?.map(reply => (
						<ExpandAnimation key={reply.id} k={reply.id}>
							<Comment comment={reply} currentUser={currentUser} />
						</ExpandAnimation>
					))}
					{reply && (
						<ExpandAnimation k="reply-form">
							<div className="reply-form">
								<AddCommentForm user={currentUser} onSubmit={handleSubmit} autoFocus />
							</div>
						</ExpandAnimation>
					)}
				</AnimatePresence>
			</div>
		</Root>
	);
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
const Root = styled.div<{ hasChildren: boolean }>`
	display: flex;
	flex-direction: column;

	.comment__replies {
		position: relative;
		padding-left: 1rem;

		&::before {
			display: ${props => (props.hasChildren ? "block" : "none")};
			content: "";
			position: absolute;
			left: 0;
			bottom: 0;
			width: 2px;
			height: calc(100% - var(--comment-list-item-spacing));
			background-color: ${color("lightGray")};
		}

		${mediaQueries.large(
			css => css`
				margin-left: 43px;
				padding-left: 43px;
			`
		)}

		.comment {
			padding-top: var(--comment-list-item-spacing);
		}

		.reply-form {
			padding-top: var(--comment-list-item-spacing);
		}
	}
`;
