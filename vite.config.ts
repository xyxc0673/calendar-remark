import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';
import gzipPlugin from 'rollup-plugin-gzip';
import path from 'path';
import checker from 'vite-plugin-checker';

const pwaOptions: Partial<VitePWAOptions> = {
  mode: 'development',
  registerType: 'prompt',
  devOptions: {
    enabled: true,
  },
  includeAssets: ['favicon.svg'],
  manifest: {
    name: 'Calendar Remark',
    short_name: 'Calendar Remark',
    theme_color: '#ffffff',
    description: 'A small and clean calendar app',
    icons: [
      {
        src: '/pwa-64x64.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon-180x180.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/maskable-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA(pwaOptions),
    gzipPlugin(),
    checker({ typescript: true }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
