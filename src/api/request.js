/**
 * 封装Axios
 * 处理请求、响应错误信息
 */
 import axios from 'axios' // 引用axios
 const service = axios.create({
   baseURL: 'http://www.heblogs.cn/api', // 正式环境
  //  baseURL: 'http://localhost:3000/', // 本地环境
   timeout: 1800000, // request timeout
 })
 
 // request interceptor  请求拦截器
 service.interceptors.request.use(
   (config) => {
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded' //授权（每次请求把sessionId带给后台）
     return config
   },
   (error) => {
     return Promise.reject(error)
   }
 )
 
 // 添加响应拦截器
 service.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
 
 export default service // 导出封装后的axios
 