class FormComponent extends HTMLElement {
	private form: HTMLFormElement;
	constructor() {
		super();
		this.form = this.querySelector('form');
	}

	private submitForm(e: Event): void {
		e.preventDefault();
		const data = new FormData(this.form);
		console.log(data);
	}
	private handleFormSubmit: EventListener = this.submitForm.bind(this);

	connectedCallback() {
		this.form.addEventListener('submit', this.handleFormSubmit);

		const subButton = this.form.querySelector('button[type="submit"]') as HTMLElement;
		subButton.style.opacity = '1';
		subButton.style.visibility = 'visible';
	}
}
customElements.define('form-component', FormComponent);
