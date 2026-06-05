import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Force a single copy of React so hooks never run against a second instance
  // (prevents "Invalid hook call" / "Cannot read properties of null (reading 'useRef')").
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  build: {
    target: 'es2018',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 900,
  },
  server: {
    port: 5180,
    open: true,
  },
})
