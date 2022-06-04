import styled from "styled-components";
import { createPortal } from "react-dom";
import { DetailedHTMLProps, HTMLAttributes, KeyboardEventHandler, ReactNode, useEffect } from "react";
import FocusLock from "react-focus-lock";
import { mediaQueries } from "../styles/media-queries";
import { AnimatePresence, motion } from "framer-motion";

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

		${mediaQueries.large(
			css => css`
				padding: 2rem;
			`
		)}
	}
`;

type Props = Omit<
	DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
	"ref" | "role" | "aria-modal" | "onKeyDown"
> & {
	children: ReactNode;
	onClose?: () => void;
	show: boolean;
};

export default function Modal({ show, children, onClose, ...props }: Props) {
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
		<div style={{ pointerEvents: show ? "auto" : "none" }}>
			<AnimatePresence>
				{show && (
					<StyledModal {...props} onKeyDown={handleKeyDown}>
						<motion.div
							animate="visible"
							initial="hidden"
							exit="exit"
							variants={{
								visible: {
									opacity: 1,
									transition: {
										duration: 0.2,
									},
								},
								hidden: {
									opacity: 0,
								},
								exit: {
									opacity: 0,
								},
							}}
							className="backdrop"
							onClick={onClose}
						/>
						<FocusLock>
							<motion.div
								animate="visible"
								initial="hidden"
								exit="exit"
								variants={{
									visible: {
										opacity: 1,
										y: 0,
										transition: {
											y: {
												type: "spring",
												damping: 9,
												stiffness: 120,
												mass: 0.5,
											},
										},
									},
									hidden: {
										opacity: 0,
										y: 75,
									},
									exit: {
										opacity: 0,
										y: 50,
										transition: {
											y: {
												type: "spring",
												stiffness: 90,
											},
										},
									},
								}}
								className="content"
								role="dialog"
								aria-modal="true"
							>
								{children}
							</motion.div>
						</FocusLock>
					</StyledModal>
				)}
			</AnimatePresence>
		</div>,
		modalOutlet
	);
}
