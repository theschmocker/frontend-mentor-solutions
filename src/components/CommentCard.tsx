import { useState } from "react";
import styled from "styled-components";
import { Comment, User } from "../state/comments";
import { mediaQueries } from "../styles/media-queries";
import Card from "./Card";
import CommentCardScore from "./CommentCardScore";
import { DeleteCommentModal } from "./DeleteCommentModal";
import EditCommentForm from "./EditCommentForm";

interface Props {
	comment: Comment;
	currentUser: User;
	onReply?: () => void;
	onEdit: (content: string) => void;
	onDelete?: () => void;
	onUpvote?: () => void;
	onDownvote?: () => void;
}

export default function CommentCard({ comment, currentUser, onReply, onEdit, onDelete, onUpvote, onDownvote }: Props) {
	const isCurrentUser = currentUser.username === comment.user.username;

	const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
	const [editComment, setEditComment] = useState(false);

	function handleScoreChange(direction: "up" | "down") {
		switch (direction) {
			case "up":
				onUpvote?.();
				break;

			case "down":
				onDownvote?.();
				break;
		}
	}

	return (
		<Root>
			<div className="comment-card__header">
				<img src={comment.user.image.png} alt="" className="comment-card__image" />
				<span className="comment-card__username">
					{comment.user.username}
					{isCurrentUser && <span className="comment-card__you-badge">you</span>}
				</span>
				<span className="comment-card__created-at">{comment.createdAt}</span>
			</div>
			<div className="comment-card__content">
				{editComment ? (
					<EditCommentForm
						content={comment.content}
						onSubmit={content => {
							onEdit(content);
							setEditComment(false);
						}}
					/>
				) : (
					<>
						{"replyingTo" in comment && !!comment.replyingTo && (
							<span className="comment-card__tag">@{comment.replyingTo} </span>
						)}
						{comment.content}
					</>
				)}
			</div>

			<div className="comment-card__score">
				<CommentCardScore score={comment.score} onChange={handleScoreChange} />
			</div>

			<div className="comment-card__actions">
				{isCurrentUser ? (
					<>
						{!editComment && (
							<button
								className="comment-card__action comment-card__action--delete"
								onClick={() => setShowDeleteConfirmModal(true)}
							>
								<img src="/images/icon-delete.svg" alt="" />
								Delete
							</button>
						)}
						<button
							className="comment-card__action comment-card__action--primary"
							onClick={() => setEditComment(edit => !edit)}
							aria-label={editComment ? "Cancel Editing Comment" : "Edit Comment"}
						>
							<img src="/images/icon-edit.svg" alt="" />
							{editComment ? "Cancel" : "Edit"}
						</button>
					</>
				) : (
					<button className="comment-card__action comment-card__action--primary" onClick={onReply}>
						<img src="/images/icon-reply.svg" alt="" />
						Reply
					</button>
				)}
			</div>
			{showDeleteConfirmModal && (
				<DeleteCommentModal
					onCancel={() => setShowDeleteConfirmModal(false)}
					onDelete={() => {
						onDelete?.();
						setShowDeleteConfirmModal(false);
					}}
				/>
			)}
		</Root>
	);
}

const Root = styled(Card)`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-areas:
		"header  header"
		"content content"
		"score   actions";
	flex-direction: column;
	gap: 1rem;

	${mediaQueries.large(
		css => css`
			grid-template-columns: min-content 1fr min-content;
			grid-template-rows: min-content 1fr min-content;
			grid-template-areas:
				"score header  actions"
				"score content content"
				"score content content";
			gap: 15px 24px;
		`
	)}

	.comment-card__header {
		grid-area: header;
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.comment-card__image {
		width: 32px;
		aspect-ratio: 1;
	}

	.comment-card__username {
		font-weight: 500;
		line-height: 1.1875;
		color: var(--dark-blue);
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.comment-card__you-badge {
		border-radius: 2px;
		padding: 1px 6px 3px 6px;
		background-color: var(--moderate-blue);
		color: white;
		font-size: 0.8125rem;
		line-height: 1.18;
	}

	.comment-card__created-at {
		line-height: 1.5;
		color: var(--dark-gray);
	}

	.comment-card__content {
		grid-area: content;
		font-family: "Rubik";
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 1.5;
		color: var(--dark-gray);
	}

	.comment-card__tag {
		color: var(--moderate-blue);
		font-weight: 500;
	}

	.comment-card__score {
		grid-area: score;
	}

	.comment-card__actions {
		grid-area: actions;
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
	}

	.comment-card__action {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--moderate-blue);
		font-weight: 500;
		font-size: 1rem;
		line-height: 1.5;
		appearance: none;
		border: none;
		background: transparent;
		cursor: pointer;
	}

	.comment-card__action--primary {
		color: var(--moderate-blue);
	}

	.comment-card__action--delete {
		color: var(--soft-red);
	}
`;
