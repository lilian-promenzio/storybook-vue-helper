# Helper para o Storybook

## Instalando

```sh
yarn add --dev @lilian.promenzio/storybook-vue-helper
```

## Usando

Crie um arquivo qualquer com:
```ts
export * from '@lilian.promenzio/storybook-vue-helper';
```

Depois use:

```ts
import { defineStoryComponent, defineStoryMeta } from '@@story';
import MeuComponente from './MeuComponente.vue';

export default defineStoryMeta({
	title: 'componente/MeuComponente',
	component: MeuComponente,
});

export const Default = defineStoryComponent({
	component: MeuComponente,
});
```
