import { createContext, ReactNode, useContext, useEffect, useLayoutEffect, useState } from "react";
import { useMounted } from "./hooks/mounted";
import { useComments } from "./state/comments";

const context = createContext(false);

export function useAnimateContext() {
	return useContext(context);
}

export function AnimateContextProvider({ children }: { children: ReactNode }) {
	const { comments } = useComments();
	const [commentsReady, setCommentsReady] = useState(false);

	useLayoutEffect(() => {
		if (commentsReady) return;

		if (comments?.length) {
			setCommentsReady(true);
		}
	}, [comments?.length, commentsReady]);

	return <context.Provider value={commentsReady}>{children}</context.Provider>;
}
