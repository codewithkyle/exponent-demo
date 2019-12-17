/**
 * Appends JavaScript resources to the documents head if it hasn't already been loaded.
 * @param resourceList - a filename `sting` or an array of `string` JS filenames -- exclude the file extension if local
 * @param local - if `true` files are fetched from `public/assets/` otherwise filenames are treated as URLs
 */
export function fetchJS(filenames: string | Array<string>, local = true): Promise<{}> {
	return new Promise(resolve => {
		const resourceList = filenames instanceof Array ? filenames : [filenames];
		if (resourceList.length === 0) {
			resolve();
		}

		let loaded = 0;
		for (let i = 0; i < resourceList.length; i++) {
			const filename = resourceList[i];
			let el: HTMLScriptElement = local ? document.head.querySelector(`script[file="${filename}.js"]`) : document.head.querySelector(`script[src="${filename}"]`);
			if (!el) {
				el = document.createElement('script');
				if (local) {
					el.setAttribute('file', `${filename}.js`);
				}
				el.type = 'module';
				if (local) {
					el.src = `${window.location.origin}/assets/${filename}.js`;
				} else {
					el.src = filename;
				}
				el.addEventListener('load', () => {
					loaded++;
					if (loaded === resourceList.length) {
						resolve();
					}
				});
				el.addEventListener('error', () => {
					loaded++;
					if (loaded === resourceList.length) {
						resolve();
					}
				});
				document.head.append(el);
			} else {
				loaded++;
				if (loaded === resourceList.length) {
					resolve();
				}
			}
		}
	});
}
