const sass = require("node-sass");
const glob = require("glob");
const fs = require("fs");
const path = require("path");

const mode = process.env.NODE_ENV === "production" ? "production" : "development";
const sourceDir = "templates";
const ignoreDirs = ["frameworks"];
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
			const cleanFiles = await this.removeIgnored(files);
			await this.compile(cleanFiles);
		} catch (error) {
			console.log(error);
		}
	}

	preflight() {
		return new Promise(resolve => {
			if (!fs.existsSync("_compiled")) {
				fs.mkdirSync("_compiled");
			}
			if (!fs.existsSync("_compiled/css")) {
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

	removeIgnored(files) {
		return new Promise(resolve => {
			if (files.length === 0) {
				resolve();
			}
			const cleanFiles = [];
			for (let i = 0; i < files.length; i++) {
				let clean = true;
				for (let k = 0; k < ignoreDirs.length; k++) {
					const pathname = path.normalize(`/${ignoreDirs[k]}/`);
					if (new RegExp(pathname, "gi").test(files[i])) {
						clean = false;
						break;
					}
				}
				if (clean) {
					cleanFiles.push(files[i]);
				}
			}
			resolve(cleanFiles);
		});
	}

	compile(files) {
		return new Promise((resolve, reject) => {
			if (files.length === 0) {
				resolve();
			}
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
