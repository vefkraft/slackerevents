import { defineConfig } from 'vite';
import fullReload from 'vite-plugin-full-reload'
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(), 
    fullReload('path/to/files/to/watch/**')

  ],
});
