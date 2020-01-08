class SolidInputComponent extends HTMLElement {
	private _input: HTMLInputElement;

	constructor() {
		super();
		this._input = this.querySelector("input");
	}

	private handleBlurEvent: EventListener = this.validate.bind(this);

	private validate(): void {
		if (this._input.value === "") {
			this._input.classList.remove("has-value");
		} else {
			this._input.classList.add("has-value");
		}

		if (!this._input.validity.valid && !this._input.classList.contains("is-invalid")) {
			this._input.classList.add("is-invalid");
			this._input.reportValidity();
		} else {
			this._input.classList.remove("is-invalid");
		}
	}

	connectedCallback() {
		this._input.addEventListener("blur", this.handleBlurEvent);
	}
}
customElements.define("solid-input-component", SolidInputComponent);
