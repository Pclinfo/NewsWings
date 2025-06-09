import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    react(),
   tailwindcss(),

  ],
  server: {
    watch: {
      usePolling: true,
      interval: 1000, // Set a polling interval in ms
    },
  },
})
