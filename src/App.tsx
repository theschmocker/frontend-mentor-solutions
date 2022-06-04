import { AddCommentForm } from "./components/AddCommentForm";
import { Comment } from "./components/Comment";
import styled, { createGlobalStyle } from "styled-components";
import { mediaQueries } from "./styles/media-queries";
import { useComments } from "./state/comments";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useAnimateContext } from "./animate-context";
import { useLayoutEffect, useState } from "react";
import ExpandAnimation from "./components/ExpandAnimation";

function App() {
	const { comments, user, addComment } = useComments();

	return (
		<>
			<GlobalStyles />
			<Root>
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

	.comment {
		padding-top: 1rem;
		${mediaQueries.medium(
			css => css`
				padding-top: 1.25rem;
			`
		)}
	}

	${mediaQueries.medium(
		css => css`
			padding: 64px 0;
		`
	)}

	.comment-form {
		padding-top: 1rem;
		${mediaQueries.large(
			css => css`
				padding-top: 1.5rem;
			`
		)}
	}
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
