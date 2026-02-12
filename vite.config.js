import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'
// https://vite.dev/config/
export default defineConfig({
  base: '/app/', // ← назва твого репозиторію
  plugins: [
    vue(),
    // vueDevTools(),
    tailwindcss(),
  ],
  server: {
    host: true, // 👈 ВАЖНО: доступ с мобилки
    port: 5173, // можно поменять, если нужно
    strictPort: true,
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
