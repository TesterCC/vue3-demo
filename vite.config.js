import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  /* 是否开启$ref, vue3.2的语法糖 */
  plugins: [vue(
    // {
    //   refTransform: true,
    //   reactivityTransform: true
    // }
  )],
  // server: {
  //   port: 8080 // 指定端口号
  // },
  base: './', // 打包相对路径
})
