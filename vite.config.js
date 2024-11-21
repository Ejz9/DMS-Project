import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import {viteStaticCopy} from "vite-plugin-static-copy";

export default defineConfig({
    optimizeDeps: {
        include: ['vue', 'vue-router'], // Add any major dependencies here
    },
    plugins: [
        vue(),
        viteStaticCopy({
            targets: [
                {
                    src: 'public/index.html', // Path to your HTML file
                    dest: '' // Copy it to the root of the `dist` directory
                }
            ]
        })
    ],
    resolve: {
        alias: {
            '@': '/src'
        }
    },
    server: {
        hmr: true, // Enable Hot Module Replacement (HMR)
        port: 5173, // Default port for Vite
    },
    build: {
        outDir: 'dist', // Adjust to match your Electron expectations
        emptyOutDir: true,
        rollupOptions: {
            input: 'src/main.js', // Replace with your app's main entry file
        },
    }
});
