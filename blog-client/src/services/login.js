import http from '@/utils/request'

/**
 * 获取验证码
 */
export const getValidCode = () => {
  return http.post('/user/getValidCode')
}

/**
 * 获取版本信息
 */
export const getVersion = () => {
  return http.post('/download/getVersion')
}

/**
 * 登录
 * @param { Object } params 用户名、密码、验证码、验证码编号
 */
export const loginByAccount = (params) => {
  return http.post('/user/login', params)
}