const Purgecss = require("purgecss");
const path = require("path");
const fs = require("fs");

const basePath = path.resolve(__dirname, "../templates");
const cssPath = path.resolve(__dirname, "../_css");
const cssOutputPath = path.resolve(__dirname, "../_compiled/css");

fs.mkdirSync(cssOutputPath);
const purgeCss = new Purgecss({
	content: [`${basePath}/**/*.twig`],
	css: [`${cssPath}/**/*.css`],
});

const purgecssResult = purgeCss.purge();
purgecssResult.forEach(result => {
	const filename = result.file.replace(/.*\//, "");
	fs.writeFile(`${cssOutputPath}/${filename}`, result.css, error => {
		if (error) {
			console.log(error);
		}
	});
});
