module.exports = {
	src: "./_compiled",
	noCachePattern: /(\/webmaster\/)|(\/cpresources\/)|(index\.php)|(cachebust\.js)|(\/pwa\/)|(\.json)$/gi,
	cachebustURL: "/pwa/cachebust.json",
	env: "dev",
	usePercentage: true,
};
