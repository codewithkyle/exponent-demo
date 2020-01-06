class PhotoGalleryComponent extends HTMLElement {
	private images: Array<HTMLImageElement>;
	private view: HTMLElement;
	private spinner: HTMLElement;
	constructor() {
		super();
		this.view = this.querySelector('image-viewer');
		this.spinner = this.view.querySelector('loading-spinner');
		this.images = Array.from(this.querySelectorAll('photo-thumbnails button img'));
	}
	private render(index: number) {
		const image = this.images[index];
		const img = this.view.querySelector('img') || document.createElement('img');
		img.style.opacity = '0';
		img.style.visibility = 'hidden';
		this.spinner.style.opacity = '1';
		this.spinner.style.visibility = 'visible';
		img.srcset = image.dataset.srcset;
		img.alt = image.alt;
		img.setAttribute('draggable', 'false');
		img.addEventListener('load', () => {
			img.style.opacity = '1';
			img.style.visibility = 'visible';
			this.spinner.style.opacity = '0';
			this.spinner.style.visibility = 'hidden';
		});
		if (!img.isConnected) {
			this.view.appendChild(img);
		}
	}

	private handleClickEvent: EventListener = (e: Event) => {
		const target = e.currentTarget as HTMLElement;
		this.render(parseInt(target.dataset.index));
	};

	private handleKeypressEvent: EventListener = (e: KeyboardEvent) => {
		if (e.key.toLowerCase() === 'enter') {
			const target = e.currentTarget as HTMLElement;
			this.render(parseInt(target.dataset.index));
		}
	};

	connectedCallback() {
		this.render(0);
		this.images.map(img => {
			img.parentElement.addEventListener('click', this.handleClickEvent);
			img.parentElement.addEventListener('keypress', this.handleKeypressEvent);
		});
	}
}
customElements.define('photo-gallery', PhotoGalleryComponent);
