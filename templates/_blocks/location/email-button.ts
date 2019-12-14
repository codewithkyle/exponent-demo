import { notify } from '../../../packages/notify';

class EmailButtonComponent extends HTMLElement {
	private input: HTMLInputElement;

	constructor() {
		super();
		this.input = this.querySelector('input');
	}

	connectedCallback(): void {
		this.addEventListener('click', () => {
			if ('clipboard' in navigator) {
				navigator.clipboard.writeText(this.input.value).then(() => {
					notify({
						message: 'Email address copied to clipboard.',
						closeable: true,
						duration: 2,
					});
				});
			} else {
				this.input.select();
				this.input.setSelectionRange(0, 99999);
				document.execCommand('copy');
				notify({
					message: 'Email address copied to clipboard.',
					closeable: true,
					duration: 2,
				});
			}
		});
	}
}
customElements.define('email-button', EmailButtonComponent);
