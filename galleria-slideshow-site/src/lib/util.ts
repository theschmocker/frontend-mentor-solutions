export function getImageSrc(image: string): string {
	return new URL(`./assets/${image}`, import.meta.url).href;
}

export function loadImage(image: string): Promise<string> {
	return new Promise<string>((resolve, reject) => {
		const src = getImageSrc(image);
		const img = new Image();

		img.onload = () => {
			resolve(src);
		};

		img.onerror = (e) => {
			reject(e);
		};

		img.src = src;
	});
}
