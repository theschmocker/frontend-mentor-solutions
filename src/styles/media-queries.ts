import { css as _css } from "styled-components";

type MediaQueries<T extends Record<string, number>> = {
	[K in keyof T]: (func: (css: typeof _css) => ReturnType<typeof _css>) => ReturnType<typeof _css>;
};

function generateMediaQueries<T extends Record<string, number>>(definition: T): MediaQueries<T> {
	return Object.entries(definition).reduce(
		(mq, [breakpointName, minWidth]) => ({
			...mq,
			[breakpointName]: func => _css`
			@media screen and (min-width: ${minWidth}px) {
				${func(_css)}
			}
		`,
		}),
		{} as MediaQueries<T>
	);
}

export const mediaQueries = generateMediaQueries({
	medium: 730,
	large: 1024,
});
