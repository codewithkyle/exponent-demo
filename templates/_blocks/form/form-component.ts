import { env } from "djinnjs/env";

interface FormError {
	input: string;
	error: string;
}

class FormComponent extends HTMLElement {
	private form: HTMLFormElement;
	private nextButtons: Array<HTMLButtonElement>;
	private pages: Array<HTMLElement>;
	private currPageIndex: number;
	private subButton: HTMLButtonElement;
	private csrf: string;
	private submittedDuringCSRFFetch: boolean;
	constructor() {
		super();
		this.submittedDuringCSRFFetch = false;
		this.currPageIndex = 0;
		this.form = this.querySelector("form");
		this.nextButtons = Array.from(this.form.querySelectorAll('button[type="button"]'));
		this.pages = Array.from(this.form.querySelectorAll("form-page"));
		this.subButton = this.form.querySelector('button[type="submit"]');
		this.csrf = null;
	}

	private validatePage(page: HTMLElement): boolean {
		let valid = true;
		page.querySelectorAll("input, select, textarea").forEach((input: HTMLInputElement) => {
			if (!input.checkValidity() && valid) {
				valid = false;
				input.reportValidity();
			}
		});
		return valid;
	}

	private reportErrors(errors: Array<FormError>): void {
		errors.map(error => {
			const input = this.form.querySelector(`[name="${error.input}"]`) as HTMLInputElement;
			if (input) {
				input.setCustomValidity(error.error);
				input.reportValidity();
				input.addEventListener("change", () => {
					input.setCustomValidity("");
				});
			}
		});
	}

	private async submitForm(e: Event = null) {
		if (e) {
			e.preventDefault();
		}
		if (this.validatePage(this.pages[this.currPageIndex])) {
			const ticket = env.startLoading();
			if (!this.csrf) {
				this.submittedDuringCSRFFetch = true;
				return;
			}

			const data = new FormData(this.form);
			data.append("CRAFT_CSRF_TOKEN", this.csrf);

			this.subButton.style.pointerEvents = "none";
			this.subButton.style.filter = "grayscale(100%)";
			this.subButton.style.cursor = "not-allowed";
			this.subButton.style.opacity = "0.3";
			const request = await fetch("/pwa/form-submit", {
				method: "POST",
				headers: new Headers({
					Accept: "application/json",
					"X-Requested-With": "XMLHttpRequest",
				}),
				credentials: "include",
				body: data,
			});
			if (request.ok) {
				const response = await request.json();
				if (response.success) {
					this.form.reset();
					this.switchPage(0);
					this.resetInputs();
				} else {
					this.form.classList.add("has-errors");
					if (response.errors.length) {
						this.reportErrors(response.errors);
					}
				}
			}
			env.stopLoading(ticket);
			this.subButton.style.pointerEvents = "all";
			this.subButton.style.filter = "grayscale(0%)";
			this.subButton.style.cursor = "pointer";
			this.subButton.style.opacity = "1";
		}
	}
	private handleFormSubmit: EventListener = this.submitForm.bind(this);

	private resetInputs(): void {
		this.form.querySelectorAll("input, select, textarea").forEach((input: HTMLInputElement) => {
			if (input.value === "") {
				input.classList.remove("has-value");
			}
		});
	}

	private switchPage(newPageIndex: number): void {
		this.pages[this.currPageIndex].style.display = "none";
		this.currPageIndex = newPageIndex;
		this.pages[this.currPageIndex].style.display = "block";

		if (this.pages.length - 1 === this.currPageIndex) {
			this.subButton.parentElement.style.display = "flex";
		} else {
			this.subButton.parentElement.style.display = "none";
		}
	}

	private handleNext(e: Event): void {
		const target = e.currentTarget as HTMLButtonElement;
		const nextPageNum = parseInt(target.dataset.nextPage);
		if (this.validatePage(this.pages[this.currPageIndex])) {
			this.switchPage(nextPageNum);
		}
	}
	private handleNextButtonClick: EventListener = this.handleNext.bind(this);

	private async fetchCSRF() {
		const request = await fetch("/pwa/get-csrf", {
			credentials: "include",
			headers: new Headers({
				Accept: "application/json",
				"X-Requested-With": "XMLHttpRequest",
			}),
		});
		if (request.ok) {
			const response = await request.json();
			if (response.success) {
				this.csrf = response.csrf;
				return;
			}
		}
	}

	connectedCallback() {
		this.form.addEventListener("submit", this.handleFormSubmit);

		this.nextButtons.map(button => {
			button.addEventListener("click", this.handleNextButtonClick);
		});

		this.fetchCSRF().then(() => {
			if (this.submittedDuringCSRFFetch) {
				this.submitForm();
			}
		});
	}
}
customElements.define("form-component", FormComponent);
