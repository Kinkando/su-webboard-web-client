import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: [
			{
				find: '@services',
				replacement: '/src/services'
			},
			{
				find: '@components',
				replacement: '/src/components'
			},
			{
				find: '@models',
				replacement: '/src/models'
			},
		]
	}
});
