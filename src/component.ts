import { defineStory } from './story';
import type { VueConstructor } from 'vue';
import type { ArgTypes, Args } from '@storybook/vue';

type DefineStoryComponentOptions = {
	component: VueConstructor;
	args?: Partial<Args>;
	argTypes?: ArgTypes;
};

export function defineStoryComponent(options: DefineStoryComponentOptions) {
	return defineStory({
		story: (args, { argTypes }) => ({
			props: Object.keys(argTypes),
			components: {
				StoryComponent: options.component as any,
			},
			template: `<story-component v-bind="$props" />`,
		}),
		args: options.args,
		argTypes: options.argTypes,
	});
}