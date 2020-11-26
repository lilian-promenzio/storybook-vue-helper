/* eslint-disable import/no-extraneous-dependencies */
// @ts-ignore
import kebab from 'kebab-case';

function lowercaseFirst(str: string) {
	return kebab(str.charAt(0).toLowerCase() + str.substr(1));
}

export function parseArgs(storyArgs: any) {
	const listeners: any = {};
	const args: any = {};
	for (const key in storyArgs) {
		// Se o argumento começa com "onAlgumaCoisa" é convertido para uma action "alguma-coisa"
		if (key.match(/^on[A-Z]/)) {
			const eventName = lowercaseFirst(key.substr(2));
			listeners[eventName] = storyArgs[key];
		} else {
			args[key] = storyArgs[key];
		}
	}
	return { listeners, args };
}
