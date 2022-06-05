import styled from "styled-components";
import { mediaQueries } from "../styles/media-queries";
import { color } from "../styles/theme";

export default function CommentCardScore({
	score,
	onChange,
}: {
	score: number;
	onChange: (dir: "up" | "down") => void;
}) {
	return (
		<Root>
			<button className="comment-score__button" onClick={() => onChange("up")} aria-label="Upvote">
				<img src="/images/icon-plus.svg" alt="" />
			</button>
			<span className="comment-score__value">{score}</span>
			<button className="comment-score__button" onClick={() => onChange("down")} aria-label="Downvote">
				<img src="/images/icon-minus.svg" alt="" />
			</button>
		</Root>
	);
}

const Root = styled.div`
	display: inline-flex;
	align-items: center;
	justify-self: start;
	gap: 5.5px;
	background-color: ${color("verLightGray")};
	padding: 5px;
	border-radius: 10px;
	${mediaQueries.large(
		css => css`
			display: flex;
			flex-direction: column;
		`
	)}

	.comment-score__value {
		color: ${color("moderateBlue")};
		font-weight: 500;
	}

	.comment-score__button {
		position: relative;
		appearance: none;
		border: none;
		background-color: transparent;
		padding: 10px;
		cursor: pointer;
		width: 30px;
		height: 30px;
		border-radius: 0.5rem;
		transition: all 0.1s ease-in-out;

		img {
			position: absolute;
			top: 50%;
			left: 50%;
			width: 11px;
			height: 11px;
			transform: translate(-50%, -50%);
			object-fit: contain;
		}

		--hover-background: ${color("darkGray")}11;
		--active-background: ${color("darkGray")}33;

		&:hover {
			background-color: var(--hover-background);
			transform: scale(1.1);
		}

		&:active {
			background-color: var(--active-background);
			transform: scale(0.9);
		}
	}
`;
