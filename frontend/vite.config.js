import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,         // 👈 gives access to 'expect', 'test', etc. globally
    environment: 'jsdom',  // 👈 for simulating the DOM
    setupFiles: './setupTests.js' // optional setup file
  },
})
