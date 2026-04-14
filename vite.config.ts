import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [svgr(), react()],

  server: {
    port: 5173,
    proxy: {
      // Unified API backend on port 8000
      '/api/upwork': {
        target: 'http://localhost:8006',
        changeOrigin: true,
      },
      '/api/monitor': {
        target: 'http://localhost:8006',
        changeOrigin: true,
      },
    },
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  build: {
    target: 'esnext',
    minify: false,
    sourcemap: true,
    chunkSizeWarningLimit: 10000,
    rollupOptions: {
      treeshake: false,
      output: {
        inlineDynamicImports: true,
        manualChunks: undefined,
      },
    },
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
})
