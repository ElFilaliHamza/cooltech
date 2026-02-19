import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
	base: "/cooltech/",
	worker: {
		format: "es",
	},
	plugins: [
		react(),
		visualizer({
			filename: "bundle-analysis.html",
			open: true,
			gzipSize: true,
			brotliSize: true,
		}),
	],
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ["react", "react-dom"],
					ui: ["@mantine/core", "@mantine/hooks"],
				},
			},
		},
	},
});
