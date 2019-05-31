import {
  baseUrl
} from '../defaultSettings'

/**
 * @description 格式化地址，拼接完整路径
 * @param {String} str 待拼接的字符串
 */
export const completeAddress = str => {
  return baseUrl + str;
}

/**
 * @param {Object} 请求返回的JSON数据
 * @description 判断请求返回的状态码是否是正确码
 */
export const isCorrect = (res) => {
  if (res && (res.status === 200)) {
    return true;
  } else {
    return false;
  }
}

/**
 * @param {File} img 图片文件
 *  @param {Function} callback 回调事件
 * @description 获取图片base数据
 */
export const getBase64 = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}