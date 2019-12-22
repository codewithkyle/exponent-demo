import { env } from 'djinnjs/env';

class GoogleMapComponent extends HTMLElement {
	connectedCallback() {
		/** Don't waste the users data with an iframe map */
		if (env.connection === '2g' || env.connection === 'slow-2g' || env.dataSaver) {
			return;
		}
		try {
			const src = this.dataset.map
				.match(/src\=\".*?\"/g)[0]
				.replace(/(src\=)|[\"]/g, '')
				.trim();
			const iframe = document.createElement('iframe');
			iframe.src = src;
			iframe.setAttribute('aria-label', 'Embedded Google Map');
			iframe.width = '600';
			iframe.height = '450';
			iframe.frameBorder = '0';
			iframe.style.border = '0';
			iframe.allowFullscreen = false;
			this.append(iframe);
		} catch (error) {
			console.error(error);
		}
	}
}
customElements.define('google-map', GoogleMapComponent);
