import { AddCommentForm } from "./components/AddCommentForm";
import { useComments } from "./hooks/comments";
import { Comment } from "./components/Comment";
import styled, { createGlobalStyle } from "styled-components";
import { mediaQueries } from "./styles/media-queries";

function App() {
	const { comments, user, addComment, deleteComment, updateComment } = useComments();
	return (
		<>
			<GlobalStyles />
			<Root>
				{Object.entries(comments).map(([id, comment]) => (
					<Comment
						key={id}
						comment={comment}
						currentUser={user}
						onDelete={deleteComment}
						onReply={addComment}
						onEdit={content => updateComment(comment.id, content)}
					/>
				))}
				<AddCommentForm user={user} onSubmit={addComment} />
			</Root>
		</>
	);
}

export default App;

const Root = styled.main`
	display: grid;
	gap: 1rem;
	max-width: 730px;
	margin: 0 auto;

	${mediaQueries.medium(
		css => css`
			padding: 64px 0;
			gap: 1.25rem;
		`
	)}
`;

const GlobalStyles = createGlobalStyle`
	:root {
		--dark-blue: #334253;
		--moderate-blue: #5357b6;
		--light-grayish-blue: #c5c6ef;
		--dark-gray: #67727e;
		--very-light-gray: #f5f6fa;
		--light-gray: #e9ebf0;
		--soft-red: #ed6368;
		--pale-red: #ffb8bb;
	}

	*,
	*::after,
	*::before {
		box-sizing: border-box !important;
	}

	body {
		margin: 0;
		background-color: #f2f2f2;
		font-family: "Rubik", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell",
			"Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		padding: 1rem;
	}
`;
