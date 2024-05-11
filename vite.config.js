import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [
    /* 是否开启$ref, vue3.2的语法糖 */
    vue(
    {
      refTransform: true,
      reactivityTransform: true
    })
],
  server: {
    // port: 8888, // 指定端口号
    // config proxy info
    proxy: {
      '/user':{
        // target: "http://127.0.0.1:3001",   // local dev debug
        target: "http://192.168.80.129:3001"  // test
      }
    },
  },
  base: './', // 打包相对路径
})
