interface ImageSource {
	width: number;
	src: string;
}

class LazyImageComponent extends HTMLElement {
	private _io: IntersectionObserver;
	private _img: HTMLImageElement;
	private _sources: Array<ImageSource>;
	private _hasLoaded: boolean;

	constructor() {
		super();

		this._io = null;
		this._img = this.querySelector('img');
		this._sources = [];
		this._hasLoaded = false;
	}

	private handleResizeEvent: EventListener = this.windowResized.bind(this);
	private onIntersection: IntersectionObserverCallback = this.manageIntersection.bind(this);
	private loadEvent: EventListener = this.imageHasLoaded.bind(this);

	private imageHasLoaded(): void {
		this.setAttribute('image-state', 'loaded');
		this._img.removeEventListener('load', this.loadEvent);
		this._hasLoaded = true;
	}

	private lazyLoadImage(): void {
		this.setAttribute('image-state', 'loading');
		const image = this.querySelector('img');

		if (image) {
			let container: HTMLElement = null;

			switch (this.dataset.container) {
				case 'parent':
					container = image.parentElement;
					break;
				default:
					container = image;
					break;
			}

			const containerWidth = container.scrollWidth;

			let bestFit: ImageSource = null;
			let diffToBeat: number = null;

			for (let i = 0; i < this._sources.length; i++) {
				const diff = Math.abs(containerWidth - this._sources[i].width);

				if (diffToBeat === null) {
					bestFit = this._sources[i];
					diffToBeat = diff;
				} else {
					if (diff < diffToBeat) {
						bestFit = this._sources[i];
						diffToBeat = diff;
					}
				}
			}

			let newImageSrc = null;

			if (bestFit.src.match(/(https\:\/\/)|(http\:\/\/)/)) {
				newImageSrc = bestFit.src;
			} else {
				newImageSrc = window.location.origin + bestFit.src;
			}

			if (this._img.src !== newImageSrc) {
				this._img.addEventListener('load', this.loadEvent);
				this._img.src = newImageSrc;
			}
		}
	}

	private manageIntersection(entires: Array<IntersectionObserverEntry>): void {
		for (let i = 0; i < entires.length; i++) {
			if (entires[i].isIntersecting) {
				this.lazyLoadImage();
			}
		}
	}

	private windowResized(): void {
		if (this._hasLoaded) {
			this.lazyLoadImage();
		}
	}

	private getSources(): void {
		const sources = this._img.dataset.srcset.replace(/,(\s?)/g, '&&');
		const sourceSets = sources.split('&&');

		for (let i = 0; i < sourceSets.length; i++) {
			const values = sourceSets[i].split(/(\s.*)/);
			const newSource: ImageSource = {
				width: parseInt(values[1]),
				src: values[0],
			};
			this._sources.push(newSource);
		}
	}

	connectedCallback() {
		if (!this._img) {
			console.error('Missing image element');
			return;
		}

		this.setAttribute('image-state', 'unseen');
		this.getSources();

		this._io = new IntersectionObserver(this.onIntersection, { rootMargin: '0px', threshold: 0.01 });
		this._io.observe(this);

		window.addEventListener('resize', this.handleResizeEvent, { passive: true });
	}
}

customElements.define('lazy-image', LazyImageComponent);
