class SolidSelectComponent extends HTMLElement {
	private _select: HTMLSelectElement;

	constructor() {
		super();
		this._select = this.querySelector("select");
	}

	private handleBlurEvent: EventListener = this.validate.bind(this);

	private validate(): void {
		if (this._select.value === "") {
			this._select.classList.remove("has-value");
		} else {
			this._select.classList.add("has-value");
		}

		if (!this._select.validity.valid && !this._select.classList.contains("is-invalid")) {
			this._select.classList.add("is-invalid");
			this._select.reportValidity();
		} else {
			this._select.classList.remove("is-invalid");
		}
	}

	connectedCallback() {
		this._select.addEventListener("blur", this.handleBlurEvent);
	}
}

customElements.define("solid-select-component", SolidSelectComponent);
