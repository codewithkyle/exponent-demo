module.exports = {
	outDir: "_css",
	sources: ["./templates"],
	blacklist: ["./templates/frameworks"],
	purgeCSS: {
		content: ["./templates/**/*.twig"],
	},
};
