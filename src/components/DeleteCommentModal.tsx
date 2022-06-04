import styled from "styled-components";
import { mediaQueries } from "../styles/media-queries";
import Button from "./Button";
import Modal from "./Modal";

export function DeleteCommentModal({
	show,
	onCancel,
	onDelete,
}: {
	show: boolean;
	onCancel: () => void;
	onDelete: () => void;
}) {
	return (
		<Modal show={show} onClose={onCancel}>
			<DeleteModalInner>
				<DeleteModalTitle>Delete comment</DeleteModalTitle>
				<DeleteModalContent>
					Are you sure you want to delete this comment? This will remove the comment and can’t be undone.
				</DeleteModalContent>
				<DeleteModalActions>
					<Button variant="subdued" padding="small" onClick={onCancel}>
						No, cancel
					</Button>
					<Button variant="danger" padding="small" onClick={onDelete}>
						Yes, delete
					</Button>
				</DeleteModalActions>
			</DeleteModalInner>
		</Modal>
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

	${mediaQueries.large(
		css => css`
			margin: 1.25rem 0;
		`
	)}
`;

const DeleteModalActions = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.75rem;
	& > * {
		flex: 1 0 auto;
	}

	${mediaQueries.large(
		css => css`
			gap: 0.875rem;
		`
	)}
`;

const DeleteModalInner = styled.div`
	max-width: 336px;
`;
