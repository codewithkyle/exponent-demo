class HeroCarouselComponent extends HTMLElement {
	private slides: Array<HTMLElement>;
	private buttons: Array<HTMLButtonElement>;

	constructor() {
		super();
		this.slides = Array.from(this.querySelectorAll('carousel-slide'));
		this.buttons = Array.from(this.querySelectorAll('carousel-controls button'));
	}

	private handleButtonClickEvent = (e: Event) => {
		const button = e.currentTarget as HTMLButtonElement;
		this.buttons.map(button => {
			button.classList.remove('is-active');
		});
		button.classList.add('is-active');
	};

	connectedCallback() {
		if (this.buttons.length) {
			this.buttons[0].parentElement.style.visibility = 'visible';
			this.buttons[0].parentElement.style.opacity = '1';

			this.buttons.map(button => {
				button.addEventListener('click', this.handleButtonClickEvent);
			});
		}
	}
}
customElements.define('hero-carousel', HeroCarouselComponent);
