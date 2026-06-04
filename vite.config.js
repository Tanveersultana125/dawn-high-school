import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2018',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 900,
  },
  server: {
    port: 5173,
    open: true,
  },
})
