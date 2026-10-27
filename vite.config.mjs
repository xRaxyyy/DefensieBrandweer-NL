import { defineConfig } from 'vite';

export default defineConfig({
    root: 'docs',
    appType: 'mpa',
    server: {
        port: 5173,
        strictPort: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true
            },
            '/uploads': {
                target: 'http://localhost:3000',
                changeOrigin: true
            }
        }
    },
    build: {
        outDir: '../dist',
        emptyOutDir: true
    }
});
