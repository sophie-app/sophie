import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import mkcert from "vite-plugin-mkcert"

export default defineConfig({
  define: {
    __UPDATED_YEAR__: new Date().getFullYear(),
  },
  server: {
    port: 3000,
    host: true,
  },
  plugins: [
    mkcert(),
    react(),
    TanStackRouterVite({
      routesDirectory: 'src/routes',
      generatedRouteTree: 'src/lib/tanstack-router/routeTree.gen.ts',
      routeFileIgnorePrefix: '.',
      semicolons: false,
      quoteStyle: 'single',
      routeTreeFileHeader: [],
      routeTreeFileFooter: [],
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
    },
  },
})
