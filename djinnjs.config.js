module.exports = {
	src: ["./_compiled", "./web_modules"],
	noCachePattern: /(\/webmaster\/)|(\/cpresources\/)|(index\.php)|(cachebust\.js)|(\/pwa\/)|(\.json)$/gi,
	cachebustURL: "/pwa/cachebust.json",
	env: "dev",
	usePercentage: true,
};
