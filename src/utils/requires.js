/*
* axios二次封装
* https://www.bilibili.com/video/BV16g41117bv/?p=3   http请求的封装
*
* 全局配置
*
* 请求拦截（略）
*
* 响应拦截
*
* request 请求的方法
* 
* 封装成 对象调用的方式
*
* request.get('/api', {xxx:xxx})
*
*/

// import file
import axios from "axios"

// global config   // todo https://www.bilibili.com/video/BV1Lg41117t7/?p=3  todo 3.http请求的封装
const service = axios.create({
    baseURL: "http://127.0.0.1:3000/"
})