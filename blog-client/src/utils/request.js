import axios from 'axios'
import {
  notification
} from 'ant-design-vue'
import userConfig from '@/config'
import {
  logout,
  getSessionStorage,
} from './tools'

let instance = axios.create({
  baseURL: userConfig.baseURL,
  timeout: 1000 * 10,
  headers: {
    'Accept': "application/json; charset=utf-8",
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
  },
  responseType: 'json',
  transformRequest: [function (data) {
    if (data) {
      if (Object.prototype.toString.call(data) !== '[object Object]') {
        notification.error({
          message: '前端错误',
          description: '请求参数错误，请传递json格式对象'
        });
        return false;
      }
      // 对 data 进行任意转换处理，目前需要转换为formData格式
      let formDataString = '';
      let key;
      for (key in data) {
        formDataString += '&' + key + '=' + data[key];
      }
      formDataString = formDataString.slice(1);
      return formDataString;
    }
  }]
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 对于请求统一增加token选项
  const userInfo = getSessionStorage(userConfig.userInfoKey) || {};
  config.headers.token = userInfo.token;
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
    // 判断token是否过期，如果过期则执行登出功能
    if (res.data.statusCode === userConfig.loginErrorStatusCode) {
      logout();
    }
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