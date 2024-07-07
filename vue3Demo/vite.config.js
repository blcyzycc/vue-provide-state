import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const env = loadEnv('development', './')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  base: './', // 基本路径,
  productionSourceMap: false,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src'), // 这里是将src目录配置别名为 @ 方便在项目中导入src目录下的文件
    }
  },

  server: {
    // host: 'localhost',
    host: '0.0.0.0', // 允许外部ip访问
    port: 8080,
    open: false,
    https: false,
    proxy: {
      '/api': {
        target: env.VITE_APP_BASEURL + '/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
})
