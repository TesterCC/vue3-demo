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
import {ElMessage} from "element-plus"  // https://element-plus.gitee.io/zh-CN/component/message.html#%E5%9F%BA%E7%A1%80%E7%94%A8%E6%B3%95

// global config
const service = axios.create({
    // baseURL: "http://127.0.0.1:3001",  // 根路径, back-end server api
    baseURL: "/user",  // 根路径, back-end server api
    timeout: 7000  // 请求超时时间
})

// 响应拦截
service.interceptors.response.use(res => {
    // console.log(res)
    const {code, data, msg} = res.data

    if (code === 200) {
        // request success
        ElMessage.success(msg)
        return data
    } else if (code === 400) {
        // request failed
        ElMessage.error(msg)
    }
})

// request method
function request(options){
    options.method = options.method || 'get'

    if(options.method.toLowerCase() === 'get') options.params = options.data

    return service(options)
}

// request.get('/api',{xx:yy})
['get', 'post', 'put', 'delete'].forEach(item=>{
    request[item] = (url,data) => {
        return request({
            url,
            data,
            method: item
        })
    }
})


// 需要导出，这样才能用
export default request