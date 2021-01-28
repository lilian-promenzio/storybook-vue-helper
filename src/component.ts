import { defineStory } from './story';
import type { default as Vue, ComponentOptions, VueConstructor } from 'vue';
import type { ArgTypes, Args } from '@storybook/vue';
import { parseArgs } from './util';

type VueComponent = ComponentOptions<Vue> | VueConstructor;

export type DefineStoryComponentOptions = {
	component: VueComponent;
	mixins?: VueComponent[];
	args?: Partial<Args>;
	argTypes?: ArgTypes;
	slot?: string;
	template?: string;
};

/**
 * Um componente para a história, repassando todos os argumentos da história e slots
 */
export const StoryComponent = {
	inject: ['storyComponentParent', 'storyComponent'],
	inheritAttrs: false,
	computed: {
		args(this: any) {
			return {
				...this.storyComponentParent.storyData.args,
				...this.$attrs,
			};
		},
		listeners(this: any) {
			return {
				...this.storyComponentParent.storyData.listeners,
				...this.$listeners,
			};
		},
	},
	template: `<component :is="storyComponent" v-bind="args" v-on="listeners">
		<slot v-for="(_, name) in $slots" :name="name" :slot="name"></slot>
		<template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="scope">
			<slot name="name" v-bind="scope"></slot>
		</template>
	</component>`,
};

/**
 * Define uma história para um determinado componente
 * @param options
 */
export function defineStoryComponent(options: DefineStoryComponentOptions) {
	const getTemplate = () => {
		if (options.template) return options.template;
		return `<story-component>${options.slot ?? ''}</story-component>`;
	};
	const template = getTemplate();

	return defineStory({
		args: options.args,
		argTypes: options.argTypes,
		story: (storyArgs, { argTypes }) => {
			return {
				name: 'StoryComponentWrapper',
				mixins: options.mixins,
				components: {
					StoryComponent,
					StoryComponentRaw: options.component,
				},
				provide() {
					return {
						storyComponentParent: this,
						storyComponent: options.component,
					};
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
				template,
			};
		},
	});
}
