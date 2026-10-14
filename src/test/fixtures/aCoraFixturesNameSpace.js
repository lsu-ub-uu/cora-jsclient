const browserWindow = typeof window !== "undefined" ? window : undefined;

const CORAFIXTURES = (browserWindow && browserWindow.CORAFIXTURES) || {};
if (browserWindow) {
	browserWindow.CORAFIXTURES = CORAFIXTURES;
}

export default CORAFIXTURES;
