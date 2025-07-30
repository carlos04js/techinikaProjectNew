// frontend/vite.config.js
import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';  // Usando o plugin SWC (mais rápido)
import path, { dirname } from "path"; // Para resolver aliases
import { fileURLToPath } from "url"; // Para resolver __dirname em ESM
// Importe os plugins PostCSS para o Tailwind
import tailwindcss from "tailwindcss"; // Importa o Tailwind CSS (biblioteca)
import autoprefixer from "autoprefixer"; // Importa o Autoprefixer

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  server: {
    host: "127.0.0.1", // Usar IPv4 para evitar problemas de localhost
    port: 5173, // Manter sua porta original
    open: true,
  },
  plugins: [
    react(),
    // mode === 'development' && componentTagger(), // REMOVIDO: plugin da Lovable AI
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Configura o alias '@' para apontar para a pasta 'src'
    },
  },
  css: { // <-- ADICIONADO: Configuração PostCSS para Tailwind
    postcss: {
      plugins: [
        tailwindcss(), // Usa a função da biblioteca tailwindcss
        autoprefixer(), // Usa a função da biblioteca autoprefixer
      ],
    },
  },
});