import formatDistance from "date-fns/formatDistance/index";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Comment, User } from "../state/comments";
import { mediaQueries } from "../styles/media-queries";
import { color } from "../styles/theme";
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
				<span className="comment-card__created-at">
					<CommentDate createdAt={comment.createdAt} />
				</span>
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
			<DeleteCommentModal
				show={showDeleteConfirmModal}
				onCancel={() => setShowDeleteConfirmModal(false)}
				onDelete={() => {
					onDelete?.();
					setShowDeleteConfirmModal(false);
				}}
			/>
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
		color: ${color("darkBlue")};
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.comment-card__you-badge {
		border-radius: 2px;
		padding: 1px 6px 3px 6px;
		background-color: ${color("moderateBlue")};
		color: white;
		font-size: 0.8125rem;
		line-height: 1.18;
	}

	.comment-card__created-at {
		line-height: 1.5;
		color: ${color("darkGray")};
	}

	.comment-card__content {
		grid-area: content;
		font-family: "Rubik";
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 1.5;
		color: ${color("darkGray")};
	}

	.comment-card__tag {
		color: ${color("moderateBlue")};
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
		color: ${color("moderateBlue")};
		font-weight: 500;
		font-size: 1rem;
		line-height: 1.5;
		appearance: none;
		border: none;
		font-family: Rubik;
		background: transparent;
		cursor: pointer;
		transition: all 0.1s ease-in-out;
		border-radius: 0.5rem;
		padding: 0 0.5rem;

		&:hover {
			background-color: var(--hover-background);
			box-shadow: 0 0 0 5px var(--hover-background);
		}

		&:active {
			background-color: var(--active-background);
			box-shadow: 0 0 0 2px var(--active-background);
		}

		img {
			width: 14px;
			height: 14px;
			object-fit: contain;
		}
	}

	.comment-card__action--primary {
		color: ${color("moderateBlue")};
		--hover-background: ${color("moderateBlue")}11;
		--active-background: ${color("moderateBlue")}33;
		margin-right: -0.5rem;
	}

	.comment-card__action--delete {
		color: ${color("softRed")};
		--hover-background: ${color("softRed")}11;
		--active-background: ${color("softRed")}33;
	}
`;

function CommentDate({ createdAt }: { createdAt: string }) {
	const createdAtDate = useMemo(() => new Date(createdAt), [createdAt]);
	const [currentDate, setCurrentDate] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => setCurrentDate(new Date()), 10000);
		() => clearInterval(interval);
	}, []);

	const formatted = useMemo(
		() => formatDistance(createdAtDate, currentDate, { addSuffix: true }),
		[createdAtDate, currentDate]
	);

	return <>{formatted}</>;
}
