const sass = require("node-sass");
const glob = require("glob");
const fs = require("fs");

const sourceDir = "templates";

const mode = process.env.NODE_ENV === "production" ? "production" : "development";

let output = "_css";
if (mode === "development") {
	output = "_compiled/css";
}

class SassCompiler {
	constructor() {
		this.run();
	}

	async run() {
		try {
			await this.preflight();
			const files = await this.getFiles();
			await this.compile(files);
		} catch (error) {
			console.log(error);
		}
	}

	preflight() {
		return new Promise(resolve => {
			if (!fs.existsSync("_css")) {
				fs.mkdirSync("_css");
			}
			if (mode === "development" && !fs.existsSync("_compiled/css")) {
				fs.mkdirSync("_compiled/css");
			}
			resolve();
		});
	}

	getFiles() {
		return new Promise((resolve, reject) => {
			glob(`${sourceDir}/**/*.scss`, (error, files) => {
				if (error) {
					reject(error);
				}

				resolve(files);
			});
		});
	}

	compile(files) {
		return new Promise((resolve, reject) => {
			let count = 0;

			for (let i = 0; i < files.length; i++) {
				const file = files[i];
				sass.render(
					{
						file: file,
						outputStyle: "compressed",
					},
					(error, result) => {
						if (error) {
							reject(`${error.message} at line ${error.line} ${error.file}`);
						} else {
							let fileName = result.stats.entry.replace(/.*\//g, "").toLowerCase();
							fileName = fileName.replace(/(.scss)|(.sass)/g, "").trim();
							if (fileName) {
								const newFile = `${output}/${fileName}.css`;
								fs.writeFile(newFile, result.css.toString(), error => {
									if (error) {
										reject("Something went wrong saving the file" + error);
									}

									count++;
									if (count === files.length) {
										resolve();
									}
								});
							} else {
								reject("Something went wrong with the file name of " + result.stats.entry);
							}
						}
					}
				);
			}
		});
	}
}

new SassCompiler();
