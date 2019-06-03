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
    message: '发送请求之前，请求错误',
    description: error.message
  });
});

// 添加响应拦截器
instance.interceptors.response.use(function (res) {
  // 对响应数据做点什么
  return res.data;
}, function (error) {
  // 对响应错误做点什么
  notification.error({
    message: '发送请求之后，响应错误',
    description: error.message
  });
});

export default instance;