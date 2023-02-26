import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: [
			{
				find: '@commons',
				replacement: '/src/commons'
			},
			{
				find: '@components',
				replacement: '/src/components'
			},
			{
				find: '@middleware',
				replacement: '/src/middleware'
			},
			{
				find: '@models',
				replacement: '/src/models'
			},
			{
				find: '@services',
				replacement: '/src/services'
			},
			{
				find: '@stores',
				replacement: '/src/stores'
			},
			{
				find: '@util',
				replacement: '/src/util'
			},
		]
	}
});
