import { fileURLToPath, URL } from 'node:url'
import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const buildId =
  process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 8) ||
  process.env.GITHUB_SHA?.slice(0, 8) ||
  Date.now().toString()

export default defineConfig({
  base: '/app/',
  define: {
    __APP_BUILD_ID__: JSON.stringify(buildId),
  },
  plugins: [
    vue(),
    tailwindcss(),
    {
      name: 'emit-version-json',
      generateBundle() {
        this.emitFile({
          type: 'asset',
          fileName: 'version.json',
          source: JSON.stringify(
            {
              buildId,
              builtAt: new Date().toISOString(),
            },
            null,
            2
          ),
        })
      },
      // SPA-фолбэк для GitHub Pages: 404.html = копия index.html,
      // чтобы прямые ссылки/перезагрузка на /map, /tasks не давали 404.
      writeBundle(options) {
        const outDir = options.dir || resolve(fileURLToPath(new URL('./dist', import.meta.url)))
        const indexFile = resolve(outDir, 'index.html')
        if (existsSync(indexFile)) {
          copyFileSync(indexFile, resolve(outDir, '404.html'))
        }
      },
    },
  ],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
