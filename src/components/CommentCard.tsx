import { Comment, User } from "../hooks/comments";
import "./CommentCard.css";

interface Props {
	comment: Comment;
	currentUser: User;
	onReply?: () => void;
	onEdit?: () => void;
	onDelete?: () => void;
}

export default function CommentCard({ comment, currentUser, onReply, onEdit, onDelete }: Props) {
	const isCurrentUser = currentUser.username === comment.user.username;
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
						<button className="comment-card__action comment-card__action--delete" onClick={onDelete}>
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
