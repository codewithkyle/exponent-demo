class FormComponent extends HTMLElement {
	private form: HTMLFormElement;
	private nextButtons: Array<HTMLButtonElement>;
	private pages: Array<HTMLElement>;
	private currPageIndex: number;
	constructor() {
		super();
		this.currPageIndex = 0;
		this.form = this.querySelector('form');
		this.nextButtons = Array.from(this.form.querySelectorAll('button[type="button"]'));
		this.pages = Array.from(this.form.querySelectorAll('form-page'));
	}

	private validatePage(page: HTMLElement): boolean {
		let valid = true;
		page.querySelectorAll('input, select, textarea').forEach((input: HTMLInputElement) => {
			if (!input.checkValidity() && valid) {
				valid = false;
				input.reportValidity();
			}
		});
		return valid;
	}

	private submitForm(e: Event): void {
		e.preventDefault();
		const data = new FormData(this.form);
		if (this.validatePage(this.pages[this.currPageIndex])) {
			console.log('valid');
		}
	}
	private handleFormSubmit: EventListener = this.submitForm.bind(this);

	private handleNext(e: Event): void {
		const target = e.currentTarget as HTMLButtonElement;
		const nextPageNum = parseInt(target.dataset.nextPage);
		if (this.validatePage(this.pages[this.currPageIndex])) {
			this.pages[this.currPageIndex].style.display = 'none';
			this.currPageIndex = nextPageNum;
			this.pages[this.currPageIndex].style.display = 'block';

			if (this.pages.length - 1 === this.currPageIndex) {
				const subButton = this.form.querySelector('button[type="submit"]') as HTMLButtonElement;
				subButton.parentElement.style.display = 'flex';
			}
		}
	}
	private handleNextButtonClick: EventListener = this.handleNext.bind(this);

	connectedCallback() {
		this.form.addEventListener('submit', this.handleFormSubmit);

		this.nextButtons.map(button => {
			button.addEventListener('click', this.handleNextButtonClick);
		});
	}
}
customElements.define('form-component', FormComponent);
