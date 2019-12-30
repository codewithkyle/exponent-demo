// @ts-ignore
import { env } from 'djinnjs/env';

class LazyVideoComponent extends HTMLElement {
	private video: HTMLIFrameElement | null;
	private playerState: 'loading' | 'loaded' | 'waiting';

	constructor() {
		super();
		this.video = null;
		this.playerState = 'waiting';
	}

	private handleVideoLoadEvent: EventListener = () => {
		this.playerState = 'loaded';
		this.setAttribute('player-state', 'playing');
	};

	private loadYouTube(userTriggerd: boolean): void {
		const iframe = document.createElement('iframe') as HTMLIFrameElement;
		iframe.width = '320';
		iframe.height = '180';
		iframe.src = `https://www.youtube-nocookie.com/embed/${this.dataset.videoId.trim()}?rel=0${userTriggerd ? '&autoplay=1' : ''}`;
		iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
		iframe.frameBorder = '0';
		iframe.setAttribute('loading', 'eager');
		iframe.setAttribute('allowfullscreen', 'true');
		iframe.style.zIndex = '5';
		iframe.addEventListener('load', this.handleVideoLoadEvent);
		this.video = iframe;
		this.append(iframe);
	}

	private loadVimeo(userTriggerd: boolean): void {
		const iframe = document.createElement('iframe') as HTMLIFrameElement;
		iframe.width = '320';
		iframe.height = '180';
		iframe.src = `https://player.vimeo.com/video/${this.dataset.videoId.trim()}?title=0&byline=0&portrait=0${userTriggerd ? '&autoplay=1' : ''}`;
		iframe.allow = 'autoplay; fullscreen';
		iframe.frameBorder = '0';
		iframe.setAttribute('loading', 'eager');
		iframe.setAttribute('allowfullscreen', 'true');
		iframe.style.zIndex = '5';
		iframe.addEventListener('load', this.handleVideoLoadEvent);
		this.video = iframe;
		this.append(iframe);
	}

	private loadVideo(userTriggerd = false): void {
		const loadingSpinner = document.createElement('loading-spinner');
		loadingSpinner.classList.add('-floating');
		this.append(loadingSpinner);

		switch (this.dataset.platform.toLowerCase().trim()) {
			case 'youtube':
				this.loadYouTube(userTriggerd);
				break;
			case 'vimeo':
				this.loadVimeo(userTriggerd);
				break;
			default:
				console.error(`Unknown platform: ${this.dataset.platform}`);
				break;
		}
	}

	private handleButtonClickEvent: EventListener = () => {
		if (this.playerState === 'waiting') {
			this.playerState = 'loading';
			this.setAttribute('player-state', 'loading');
			this.loadVideo(true);
		} else if (this.playerState == 'loading') {
			this.setAttribute('player-state', 'loading');
		} else if (this.playerState === 'loaded' && this.video) {
			this.setAttribute('player-state', 'playing');
		}
	};

	connectedCallback(): void {
		if (env.connection == '4g') {
			this.loadVideo();
		}

		this.addEventListener('click', this.handleButtonClickEvent);
	}
}
customElements.define('lazy-video', LazyVideoComponent);
