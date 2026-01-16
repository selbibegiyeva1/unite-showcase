import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'html-transform',
        transformIndexHtml(html) {
          const yandexMetrikaId = env.VITE_YANDEX_METRIKA_ID;
          return html.replace(/YANDEX_METRIKA_ID_PLACEHOLDER/g, yandexMetrikaId);
        },
      },
    ],
    server: {
      host: '0.0.0.0', // Allow access from outside Docker container
      port: 5173,
    },
  };
})
