import { env } from "djinnjs/env";
import { notify } from "@codewithkyle/notifyjs";
import { broadcaster } from "djinnjs/broadcaster";

class UserFormComponent extends HTMLElement {
	private form: HTMLFormElement;
	private csrf: string;
	private submittedDuringCSRFFetch: boolean;
	private inputs: NodeListOf<HTMLInputElement>;
	private successMessage: HTMLElement;
	constructor() {
		super();
		this.form = this.querySelector("form");
		this.csrf = null;
		this.submittedDuringCSRFFetch = false;
		this.inputs = this.form.querySelectorAll("input");
		this.successMessage = this.querySelector("success-message");
	}

	private async submit(e: Event = null) {
		if (e) {
			e.preventDefault();
		}
		const ticket = env.startLoading();
		if (!this.csrf) {
			this.submittedDuringCSRFFetch = true;
			return;
		}
		const data = new FormData(this.form);
		data.append("CRAFT_CSRF_TOKEN", this.csrf);

		const request = await fetch(this.dataset.route, {
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
			if (response?.success) {
				if (this.successMessage) {
					this.form.style.display = "none";
					this.successMessage.style.display = "block";
				} else if (this.dataset.redirect) {
					broadcaster.message("pjax", {
						type: "load",
						url: `${this.dataset.redirect}`,
					});
				}
			} else {
				if (response?.error) {
					notify({
						message: response.error,
						closeable: true,
					});
				} else if (response?.errors) {
					notify({
						message: response.errors?.password || response.errors?.email,
						closeable: true,
					});
				}
				this.inputs.forEach(input => {
					input.parentElement.classList.add("is-invalid");
				});
			}
		} else {
			const response = await request.text();
			console.log(response);
		}
		env.stopLoading(ticket);
	}
	private handleSubmitEvent: EventListener = this.submit.bind(this);

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
		this.form.addEventListener("submit", this.handleSubmitEvent);
		this.fetchCSRF().then(() => {
			if (this.submittedDuringCSRFFetch) {
				this.submit();
			}
		});
		this.inputs[0].focus();
	}
}
customElements.define("user-form", UserFormComponent);
