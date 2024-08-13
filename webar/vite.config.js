import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [basicSsl()],
  root: 'face-tracking',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server:
    {
        host: true, // Open to local network and display URL
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env), // Open if it's not a CodeSandbox
        https: {
            key: fs.readFileSync(path.resolve(__dirname, './ssl/key.pem')),
            cert: fs.readFileSync(path.resolve(__dirname, './ssl/cert.pem')),
        },
    },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});