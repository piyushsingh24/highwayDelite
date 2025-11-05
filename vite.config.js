import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  tailwindcss(),
  ],
  server: {
    proxy: {
      '/experiences': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/bookings': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/promo': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
