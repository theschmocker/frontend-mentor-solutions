import { useId, useState } from "react";
import "./App.css";
import Button from "./components/Button";
import CommentCard from "./components/CommentCard";
import Modal from "./components/Modal";
import { Comment as IComment, useComments, User } from "./hooks/comments";

function App() {
	const { comments, user, addComment, deleteComment } = useComments();
	return (
		<main>
			<div className="App">
				{Object.entries(comments).map(([id, comment]) => (
					<Comment key={id} comment={comment} currentUser={user} onDelete={deleteComment} onReply={addComment} />
				))}
				<AddCommentForm user={user} onSubmit={addComment} />
			</div>
		</main>
	);
}

export default App;

function Comment({
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
		<div className="comment">
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
		</div>
	);
}

function AddCommentForm({ user, onSubmit }: { user: User; onSubmit: (content: string) => void | Promise<void> }) {
	const [content, setContent] = useState("");
	const trimmed = content.trim();
	const id = useId();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!trimmed) {
			return;
		}

		await onSubmit(trimmed);
		setContent("");
	}

	return (
		<form className="card add-comment" onSubmit={handleSubmit}>
			<img src={user.image.png} alt="" className="add-comment__image" />
			<label htmlFor={id} className="add-comment__label">
				<span className="sr-only">Add a comment</span>
				<textarea
					name="content"
					id={id}
					className="add-comment__content"
					placeholder="Add a comment..."
					required
					value={content}
					onChange={e => setContent(e.target.value)}
				></textarea>
			</label>
			<Button className="add-comment__send" disabled={!trimmed}>
				Send
			</Button>
		</form>
	);
}
