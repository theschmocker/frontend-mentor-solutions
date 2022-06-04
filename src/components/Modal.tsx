import styled from "styled-components";
import { createPortal } from "react-dom";
import { DetailedHTMLProps, HTMLAttributes, KeyboardEventHandler, ReactNode, useEffect, useRef } from "react";
import FocusLock from "react-focus-lock";

const modalOutlet = document.querySelector<HTMLElement>("#modal-outlet");

const StyledModal = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	inset: 0;
	padding: 1rem;

	.backdrop {
		position: absolute;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.content {
		position: relative;
		background: white;
		border-radius: 0.5rem;
		z-index: 1;
		padding: 1.5rem 1.6875rem;

		@media screen and (min-width: 1024px) {
			padding: 2rem;
		}
	}
`;

type Props = Omit<
	DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
	"ref" | "role" | "aria-modal" | "onKeyDown"
> & {
	children: ReactNode;
	onClose?: () => void;
};

export default function Modal({ children, onClose, ...props }: Props) {
	useEffect(() => {
		const previouslyFocused = document.activeElement as HTMLElement;
		const scrollY = window.scrollY;
		document.body.style.setProperty("position", "fixed");
		document.body.style.setProperty("top", `-${scrollY}px`);
		document.body.style.setProperty("left", "0");
		document.body.style.setProperty("right", "0");
		document.body.style.setProperty("overflowY", "hidden");

		return () => {
			document.body.style.setProperty("position", null);
			document.body.style.setProperty("top", null);
			document.body.style.setProperty("left", null);
			document.body.style.setProperty("right", null);
			document.body.style.setProperty("overflowY", null);
			window.scrollTo({ top: scrollY });
			previouslyFocused.focus?.();
		};
	}, []);

	const handleKeyDown: KeyboardEventHandler = e => {
		if (e.key === "Escape") {
			onClose?.();
		}
	};

	if (!modalOutlet) {
		throw new Error("modal outlet missing from document");
	}

	return createPortal(
		<StyledModal {...props} onKeyDown={handleKeyDown}>
			<div className="backdrop" onClick={onClose} />
			<FocusLock>
				<div className="content" role="dialog" aria-modal="true">
					{children}
				</div>
			</FocusLock>
		</StyledModal>,
		modalOutlet
	);
}
