// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [react()],
  server: {
    host: true,
    // ngrok tunnels — leading dot = all subdomains
    allowedHosts: ['.ngrok-free.app', '.ngrok-free.dev', '.ngrok.io'],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
