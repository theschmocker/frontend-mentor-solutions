import { AddCommentForm } from "./components/AddCommentForm";
import { Comment } from "./components/Comment";
import styled, { createGlobalStyle } from "styled-components";
import { mediaQueries } from "./styles/media-queries";
import { useComments } from "./state/comments";
import { AnimatePresence } from "framer-motion";
import ExpandAnimation from "./components/ExpandAnimation";
import ScreenreaderText from "./components/ScreenreaderText";

function App() {
	const { comments, user, addComment } = useComments();

	return (
		<>
			<GlobalStyles />
			<Root>
				<ScreenreaderText as="h1">Interactive comments section</ScreenreaderText>
				<AnimatePresence>
					{comments.map(comment => (
						<ExpandAnimation key={comment.id} k={comment.id}>
							<Comment comment={comment} currentUser={user} />
						</ExpandAnimation>
					))}
				</AnimatePresence>
				<div className="comment-form">
					<AddCommentForm user={user} onSubmit={addComment} />
				</div>
			</Root>
		</>
	);
}

export default App;

const Root = styled.main`
	max-width: 730px;
	margin: 0 auto;

	${mediaQueries.medium(
		css => css`
			padding: 64px 0;
		`
	)}

	.comment {
		padding-top: var(--comment-list-item-spacing);
	}

	.comment-form {
		padding-top: var(--comment-list-item-spacing);
	}
`;

const GlobalStyles = createGlobalStyle`
	:root {
		// colors
		--dark-blue: #334253;
		--moderate-blue: #5357b6;
		--light-grayish-blue: #c5c6ef;
		--dark-gray: #67727e;
		--very-light-gray: #f5f6fa;
		--light-gray: #e9ebf0;
		--soft-red: #ce484d;
		--pale-red: #ffb8bb;

		// layout
		--comment-list-item-spacing: 1rem;

		${mediaQueries.large(
			css => css`
				--comment-list-item-spacing: 1.25rem;
			`
		)}
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
