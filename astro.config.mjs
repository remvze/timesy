import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import AstroPWA from '@vite-pwa/astro';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    AstroPWA({
      manifest: {
        background_color: '#09090b',
        description: 'Distraction-free online timer',
        display: 'standalone',
        icons: [
          ...[72, 128, 144, 152, 192, 256, 512].map(size => ({
            sizes: `${size}x${size}`,
            src: `/assets/pwa/${size}.png`,
            type: 'image/png',
          })),
        ],
        name: 'Timesy',
        orientation: 'any',
        scope: '/',
        short_name: 'Timesy',
        start_url: '/',
        theme_color: '#09090b',
      },
      registerType: 'prompt',
      workbox: {
        globPatterns: ['**/*'],
        navigateFallback: '/',
      },
    }),
  ],
});
