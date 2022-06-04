import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useAnimateContext } from "../animate-context";

export default function ExpandAnimation({ k: key, children }: { k: string | number; children: ReactNode }) {
	const shouldAnimate = useAnimateContext();
	return (
		<motion.div
			key={key}
			style={{ overflow: "hidden" }}
			animate={{
				height: "auto",
			}}
			initial={
				shouldAnimate
					? {
							height: "0",
					  }
					: false
			}
			exit={{
				height: "0",
			}}
		>
			{children}
		</motion.div>
	);
}
