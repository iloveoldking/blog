import axios from 'axios'
import {
  notification
} from 'ant-design-vue'
import userConfig from '@/config'

let instance = axios.create({
  baseURL: userConfig.baseURL,
  timeout: 1000 * 10,
  headers: {
    'Accept': "application/json; charset=utf-8",
    'Content-Type': 'application/json; charset=utf-8'
  },
  responseType: 'json'
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  // 对请求错误做些什么
  notification.error({
    message: '前端错误',
    description: '发送请求之前，前端出现错误' + error
  });
});

// 添加响应拦截器
instance.interceptors.response.use(function (res) {
  // 对响应数据做点什么
  if (res.status === 200) {
    return res.data;
  }
  notification.error({
    message: '响应错误',
    description: '响应错误，浏览器返回状态码异常' + res.status
  });
}, function (error) {
  // 对响应错误做点什么
  notification.error({
    message: '响应错误',
    description: '发送请求之后，响应出现错误' + error
  });
});

export default instance;