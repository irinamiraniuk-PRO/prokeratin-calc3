import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/prokeratin-calc3/',
  build: {
    outDir: '../../dist'
  }
})
