import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
    build: { target: 'esnext', outDir: 'build' },
    plugins: [reactRefresh()],
    base: "/gosling-react-example/"
});