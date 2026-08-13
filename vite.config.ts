import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import { DevTools } from '@vitejs/devtools' 

export default defineConfig({
	base: './',
  plugins: [
    DevTools(),
    Inspect()
  ],
})