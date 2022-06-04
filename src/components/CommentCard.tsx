import { useState } from "react";
import styled from "styled-components";
import { Comment, User } from "../hooks/comments";
import Button from "./Button";
import "./CommentCard.css";
import Modal from "./Modal";

interface Props {
	comment: Comment;
	currentUser: User;
	onReply?: () => void;
	onEdit?: () => void;
	onDelete?: () => void;
}

export default function CommentCard({ comment, currentUser, onReply, onEdit, onDelete }: Props) {
	const isCurrentUser = currentUser.username === comment.user.username;

	const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

	return (
		<div className="card comment-card">
			<div className="comment-card__header">
				<img src={comment.user.image.png} alt="" className="comment-card__image" />
				<span className="comment-card__username">
					{comment.user.username}
					{isCurrentUser && <span className="comment-card__you-badge">you</span>}
				</span>
				<span className="comment-card__created-at">{comment.createdAt}</span>
			</div>
			<div className="comment-card__content">
				{"replyingTo" in comment && !!comment.replyingTo && (
					<span className="comment-card__tag">@{comment.replyingTo} </span>
				)}
				{comment.content}
			</div>

			<CommentScore score={comment.score} />

			<div className="comment-card__actions">
				{isCurrentUser ? (
					<>
						<button
							className="comment-card__action comment-card__action--delete"
							onClick={() => setShowDeleteConfirmModal(true)}
						>
							<img src="/images/icon-delete.svg" alt="" />
							Delete
						</button>
						<button className="comment-card__action comment-card__action--primary" onClick={onEdit}>
							<img src="/images/icon-edit.svg" alt="" />
							Edit
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
				<Modal onClose={() => setShowDeleteConfirmModal(false)}>
					<DeleteModalInner>
						<DeleteModalTitle>Delete comment</DeleteModalTitle>
						<DeleteModalContent>
							Are you sure you want to delete this comment? This will remove the comment and can’t be undone.
						</DeleteModalContent>
						<DeleteModalActions>
							<Button variant="subdued" padding="small" onClick={() => setShowDeleteConfirmModal(false)}>
								No, cancel
							</Button>
							<Button
								variant="danger"
								padding="small"
								onClick={() => {
									onDelete?.();
									setShowDeleteConfirmModal(false);
								}}
							>
								Yes, delete
							</Button>
						</DeleteModalActions>
					</DeleteModalInner>
				</Modal>
			)}
		</div>
	);
}

function CommentScore({ score, onChange }: { score: number; onChange?: (dir: "up" | "down") => void }) {
	return (
		<div className="comment-score">
			<button className="comment-score__button">
				<img src="/images/icon-plus.svg" alt="" />
			</button>
			<span className="comment-score__value">{score}</span>
			<button className="comment-score__button">
				<img src="/images/icon-minus.svg" alt="" />
			</button>
		</div>
	);
}

const DeleteModalTitle = styled.h2`
	font-size: 1.25rem;
	font-weight: 500;
	line-height: 1.185;
	color: var(--dark-blue);
	margin: 0;
`;

const DeleteModalContent = styled.p`
	font-size: 1rem;
	line-height: 1.5;
	color: var(--dark-gray);
	margin: 1rem 0;

	@media screen and (min-width: 1024px) {
		margin: 1.25rem 0;
	}
`;

const DeleteModalActions = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.75rem;
	& > * {
		flex: 1 0 auto;
	}

	@media screen and (min-width: 1024px) {
		gap: 0.875rem;
	}
`;

const DeleteModalInner = styled.div`
	max-width: 336px;
`;
