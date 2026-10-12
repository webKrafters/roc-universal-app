import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ command, mode }) => ({
	build: process.env.VITE_SSR_BUILD === 'true' ? {
		minify: false,
		outDir: 'dist/server',
		rollupOptions: {
			input: {
				server: resolve( __dirname, './src/server.jsx' )
			},
			output: {
				format: 'esm',
				entryFileNames: '[name].js',
			}
		},
		ssr: true
	} : {
		minify: 'false',
		outDir: 'dist/client',
		rollupOptions: {
			input: {
				main: resolve( __dirname, './index.html' ),
			}
		},
		sourcemap: true,
		ssrManifest: true
	},
	plugins: [ react() ],
	resolve: {
		alias: {
			'@': resolve( __dirname, './src' )
		}
	}
}));
