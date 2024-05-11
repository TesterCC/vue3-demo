# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## quick start

### install and create a project

npm create vite@latest --registry=https://registry.npm.taobao.org

### launch project

cd vue3-demo
npm install --registry=https://registry.npm.taobao.org
npm run dev

### install element-plus

npm install element-plus --save --registry=https://registry.npm.taobao.org

### install axios

#### 什么是 axios？

Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。

npm install axios --save --registry=https://registry.npm.taobao.org

official doc：
http://axios-js.com/zh-cn/docs/

### build

```
setting vite.config.js base: './',
npm run build

then use WebStorm open dist/index.html
```

### Todo

```
CORS in front-end
https://www.bilibili.com/video/BV17G411h7c9

App.vue -> CRUD.vue

CORS in Go

https://element-plus.gitee.io/zh-CN/component/pagination.html


前端 ref 改 $ref 的设置
https://www.bilibili.com/video/BV1od4y1S7qW
```

### Project

front-end：Vue3.2 + Vite + Element-Plus

back-end：GO + Gin + GORM + MySql

### Course

- [Vue3.2 + Vite + Element-Plus 实现最基础的 CRUD](https://www.bilibili.com/video/BV1yV4y177jC) -- front-end, still have some issue
- [GO + Gin + GORM + MySql 实现最基础的 CRUD](https://www.bilibili.com/video/BV1VV4y1E7Ks/) -- back-end, finish
- [Vue3.2 + Go + Axios 数据联调](https://www.bilibili.com/video/BV17G411h7c9) -- todo, some coentent repeat
