import { defineStory } from './story';
import type { VueConstructor } from 'vue';
import type { ArgTypes, Args } from '@storybook/vue';
import { parseArgs } from './util';

type DefineStoryComponentOptions = {
	component: VueConstructor;
	args?: Partial<Args>;
	argTypes?: ArgTypes;
	slot?: string;
};

export function defineStoryComponent(options: DefineStoryComponentOptions) {
	return defineStory({
		args: options.args,
		argTypes: options.argTypes,
		story: (storyArgs, { argTypes }) => {
			return {
				components: {
					StoryComponent: options.component as any,
				},
				props: Object.keys(argTypes),
				computed: {
					storyData() {
						const { listeners, args } = parseArgs(this.$props);
						return { args, listeners };
					},
					args(this: any) {
						return this.storyData.args;
					},
				},
				template: `<story-component v-bind="storyData.args" v-on="storyData.listeners">
					${options.slot ?? ''}
				</story-component>`,
			};
		},
	});
}
