class HeroCarouselComponent extends HTMLElement {
	private slides: Array<HTMLElement>;
	private buttons: Array<HTMLButtonElement>;
	private index: number;

	constructor() {
		super();
		this.slides = Array.from(this.querySelectorAll('carousel-slide'));
		this.buttons = Array.from(this.querySelectorAll('carousel-controls button'));
		this.index = 0;
	}

	private switchSlide(newSlideIndex: number): void {
		const currentSlide = this.slides[this.index];
		const newSlide = this.slides[newSlideIndex];

		currentSlide.style.opacity = '0';
		currentSlide.style.visibility = 'hidden';
		currentSlide.style.zIndex = '1';
		currentSlide.classList.remove('is-active');

		newSlide.style.opacity = '1';
		newSlide.style.visibility = 'visible';
		newSlide.style.zIndex = '5';
		newSlide.classList.add('is-active');

		this.index = newSlideIndex;
	}

	private handleButtonClickEvent = (e: Event) => {
		const button = e.currentTarget as HTMLButtonElement;
		this.buttons.map(button => {
			button.classList.remove('is-active');
		});
		button.classList.add('is-active');
		this.switchSlide(parseInt(button.dataset.index));
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
