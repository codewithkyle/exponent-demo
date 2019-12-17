import { env } from './env';

/**
 * Appends resources to the documents head if it hasn't already been loaded.
 * @param resourceList - a filename `sting` or an array of `string` CSS filenames (excluding the filetype)
 * @param local - if `true` files are fetched from `public/assets/` otherwise filenames are treated as URLs
 */
export function fetchCSS(filenames: string | Array<string>, local = true): Promise<{}> {
	return new Promise(resolve => {
		const resourceList = [...filenames];
		if (resourceList.length === 0) {
			resolve();
		}

		const loadingMessage = document.body.querySelector('page-loading span');

		let loaded = 0;
		for (let i = 0; i < resourceList.length; i++) {
			const filename = resourceList[i];
			let el = document.head.querySelector(`link[file="${filename}.css"]`) as HTMLLinkElement;
			if (!el) {
				el = document.createElement('link');
				el.setAttribute('file', `${filename}.css`);
				document.head.append(el);
				el.setAttribute('rel', 'stylesheet');
				if (local) {
					el.href = `${window.location.origin}/assets/${filename}.css`;
				} else {
					el.href = filename;
				}
				el.addEventListener('load', () => {
					loaded++;
					if (env.domState === 'hard-loading') {
						loadingMessage.innerHTML = `Loading resource: <resource-counter>${loaded}</resource-counter<span class="-slash">/</span><resource-total>${resourceList.length}</resource-total>`;
					}
					if (loaded === resourceList.length) {
						resolve();
					}
				});
				el.addEventListener('error', () => {
					loaded++;
					if (env.domState === 'hard-loading') {
						loadingMessage.innerHTML = `Loading resource: <resource-counter>${loaded}</resource-counter<span class="-slash">/</span><resource-total>${resourceList.length}</resource-total>`;
					}
					if (loaded === resourceList.length) {
						resolve();
					}
				});
			} else {
				loaded++;
				if (env.domState === 'hard-loading') {
					loadingMessage.innerHTML = `Loading resource: <resource-counter>${loaded}</resource-counter<span class="-slash">/</span><resource-total>${resourceList.length}</resource-total>`;
				}
				if (loaded === resourceList.length) {
					resolve();
				}
			}
		}
	});
}
