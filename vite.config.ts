import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		eslint(),
	],
	css: {
		preprocessorOptions: {
			scss: {
				quietDeps: true,
				logger: {
					warn: function (message) {
						if (!message.includes('legacy JS API') && !message.includes('https://sass-lang.com/d/legacy-js-api')) {
							console.warn(message);
						}
					},
				},
			},
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),  
		},
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return id.toString().split('node_modules/')[1].split('/')[0].toString();
					}
				},
			},
		},
	},
});
