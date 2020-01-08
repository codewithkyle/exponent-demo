class SolidTextareaComponents extends HTMLElement {
	private _textarea: HTMLTextAreaElement;

	constructor() {
		super();
		this._textarea = this.querySelector("textarea");
	}

	private handleBlurEvent: EventListener = this.validate.bind(this);

	private validate(): void {
		if (this._textarea.value === "") {
			this._textarea.classList.remove("has-value");
		} else {
			this._textarea.classList.add("has-value");
		}

		if (!this._textarea.validity.valid && !this._textarea.classList.contains("is-invalid")) {
			this._textarea.classList.add("is-invalid");
			this._textarea.reportValidity();
		} else {
			this._textarea.classList.remove("is-invalid");
		}
	}

	connectedCallback() {
		this._textarea.addEventListener("blur", this.handleBlurEvent);
	}
}

customElements.define("solid-textarea-component", SolidTextareaComponents);
