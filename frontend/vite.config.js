import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Ensure relative paths for assets
  build: {
    outDir: 'dist', // Ensure that Vite outputs to the correct folder
  },
});
