import type { Story, Meta, ArgTypes, Args } from '@storybook/vue';

export type DefineStoryOptions = {
	args?: Partial<Args>;
	argTypes?: ArgTypes;
	story: Story;
};

export function defineStory(options: DefineStoryOptions) {
	const story = options.story.bind({}) as any;
	story.args = options.args;
	story.argTypes = options.argTypes;
	return story;
}

export function defineStoryMeta(options: Meta) {
	return options;
}
