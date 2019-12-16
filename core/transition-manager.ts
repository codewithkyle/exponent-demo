import { env } from './env';

/** Import transitions */
import { fade } from '../transitions/fade';
import { slide } from '../transitions/slide';
import { noneAuto } from '../transitions/none';

export function transitionManager(newHTML: string, transition: string | null, transitionData: string | null): Promise<{}> {
	return new Promise(resolve => {
		if (env.connection === '2g' || env.connection === 'slow-2g') {
			noneAuto(newHTML).then(() => {
				resolve();
			});
		} else {
			/** Add custom transitions to the switch statement. Transitions must return a promise. */
			switch (transition) {
				case 'slide':
					slide(newHTML, transitionData).then(() => {
						resolve();
					});
					break;
				default:
					fade(newHTML).then(() => {
						resolve();
					});
					break;
			}
		}
	});
}
