import { defineConfig,splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),splitVendorChunkPlugin()],
  server:{
    proxy:{
      "/api": {
        target: 'http://localhost:XXXXX/',
        changeOrigin: true,
        secure:false,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  }
})

