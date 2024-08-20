import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';


export default defineConfig({
	plugins: [sveltekit()],
	test: {
		globals: true,
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.{js,ts}'],
		coverage: {
			include: [
				'src/pages/**',
				'src/routes/**/*',
			],exclude: [
				'src/routes/+layout.svelte'
			]
		},
		setupFiles: './vitest.setup.ts'
	}
});
