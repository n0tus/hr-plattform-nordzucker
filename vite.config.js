import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/hr-plattform-nordzucker/', 
  plugins: [react()],
})