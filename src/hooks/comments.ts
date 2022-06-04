import { useCallback, useEffect, useMemo, useState } from "react";
import data from "../data.json";
import { useMounted } from "./mounted";

const user = data.currentUser as User;

export function useComments(storage: Storage = localStorage) {
	const [commentsMap, setCommentsMap] = useState<Map<number, Comment>>(new Map());

	const allComments = useMemo(() => Array.from(commentsMap.values()), [commentsMap]);
	const topLevelComments = useMemo(() => allComments.filter(c => !c.parentCommentId), [allComments]);
	const maxId = useMemo(() => allComments.reduce((max, c) => (c.id > max ? c.id : max), 0), [allComments]);

	const updateComments = useCallback(
		(updatedComments: FlatComment[]) => {
			const comments = buildCommentTreeMap(updatedComments);
			storage.setItem("fementor_comments", JSON.stringify(Array.from(comments.entries())));
			setCommentsMap(comments);
		},
		[storage]
	);

	function addComment(content: string, parentCommentId: number | null = null) {
		const comment: FlatComment = {
			id: maxId + 1,
			content,
			createdAt: "Now",
			user,
			score: 0,
			parentCommentId,
		};

		updateComments([...allComments, comment]);
	}

	function deleteComment(id: number) {
		const newComments = allComments.filter(c => c.id !== id);
		updateComments(newComments);
	}

	function updateComment(id: number, content: string) {
		const newComments = allComments.map(c => (c.id !== id ? c : { ...c, content }));
		updateComments(newComments);
	}

	const loadFromLocalStorage = useCallback(() => {
		try {
			const stored = JSON.parse(storage.getItem("fementor_comments") ?? "null");
			if (!stored) {
				throw new Error("nothing in localStorage");
			}

			setCommentsMap(new Map(stored));
		} catch (e) {
			updateComments(data.comments as unknown as FlatComment[]);
		}
	}, [storage, updateComments]);

	useMounted(() => {
		loadFromLocalStorage();
	});

	useEffect(() => {
		window.addEventListener("storage", loadFromLocalStorage);
		return () => window.removeEventListener("storage", loadFromLocalStorage);
	}, [loadFromLocalStorage]);

	return {
		comments: topLevelComments,
		user,
		addComment,
		deleteComment,
		updateComment,
	};
}

function buildCommentTreeMap(comments: FlatComment[]): Map<number, Comment> {
	const map = new Map<number, Comment>(
		comments.map(c => [
			c.id,
			{
				...c,
				replies: [],
			},
		])
	);

	map.forEach(comment => {
		if (comment.parentCommentId != null) {
			map.get(comment.parentCommentId)?.replies.push(comment);
		}
	});

	return map;
}

export interface User {
	username: string;
	image: {
		png: string;
		webp: string;
	};
}

export interface Comment extends FlatComment {
	replies: Comment[];
}

interface FlatComment {
	id: number;
	createdAt: string;
	content: string;
	score: number;
	user: User;
	parentCommentId: number | null;
	replyingTo?: string;
}
