import { useState } from "react";
import { AddCommentForm } from "./AddCommentForm";
import CommentCard from "./CommentCard";
import { Comment as IComment, useComments, User } from "../state/comments";
import styled, { css } from "styled-components";
import { mediaQueries } from "../styles/media-queries";
import { AnimatePresence, motion } from "framer-motion";
import { useAnimateContext } from "../animate-context";
import ExpandAnimation from "./ExpandAnimation";

export function Comment({ comment, currentUser }: { comment: IComment; currentUser: User }) {
	const [reply, setReply] = useState(false);
	const { deleteComment, addComment, updateComment, upvoteComment, downvoteComment } = useComments();
	const shouldAnimate = useAnimateContext();

	function handleSubmit(content: string) {
		addComment(content, comment.id);
		setReply(false);
	}

	return (
		<Root className="comment">
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
const Root = styled.div`
	display: flex;
	flex-direction: column;

	.comment__replies {
		position: relative;
		/* gap: 1rem; */
		padding-left: 1rem;

		&::before {
			content: "";
			position: absolute;
			top: 1rem;
			left: 0;
			bottom: 0;
			width: 2px;
			height: 100%;
			background-color: var(--light-gray);

			${mediaQueries.large(
				css => css`
					top: 1.5rem;
				`
			)}
		}

		comment {
			padding-top: 1rem;
			${mediaQueries.large(
				css => css`
					padding-top: 1.5rem;
				`
			)}
		}

		${mediaQueries.large(
			css => css`
				margin-left: 43px;
				padding-left: 43px;
				border-left: 2px solid var(--light-gray);
			`
		)}

		.reply-form {
			padding-top: 1rem;
			${mediaQueries.large(
				css => css`
					padding-top: 1.5rem;
				`
			)}
		}
	}
`;

const NestedRootSelected = () =>
	css`
		${Root}
	`;
