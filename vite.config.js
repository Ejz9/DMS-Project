import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import {viteStaticCopy} from "vite-plugin-static-copy";

export default defineConfig({
    optimizeDeps: {
        include: ['vue', 'vue-router'],
    },
    plugins: [
        vue(),
        viteStaticCopy({
            targets: [
                {
                    src: 'public/index.html',
                    dest: ''
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
        hmr: true,
        port: 5173,
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: 'src/main.js',
        },
    }
});
