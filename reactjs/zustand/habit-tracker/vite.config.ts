import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,            // Allows using 'describe', 'it', 'expect' without explicit imports
    environment: 'jsdom',     // Simulates a browser environment in Node.js
    setupFiles: './src/test/setup.ts', // Paths to setup code run before each test file
  },
})
