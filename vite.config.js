import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      Components: '/src/components',
      Contexts: '/src/contexts',
      Firebase: '/src/firebase',
      Hooks: '/src/hooks',
      Shared: '/src/shared',
    },
  },
})
