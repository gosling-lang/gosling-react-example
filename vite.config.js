import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
    build: { target: 'esnext', outDir: 'build' },
    optimizeDeps: {
        include: ['gosling.js']
    },
    plugins: [reactRefresh()]
});