import http from '@/utils/request'

/**
 * 获取组织树
 * @param {*} params 
 */
export const getDepartTree = (params) => {
  return http.post('/depart/getDepartTree', params)
}

/**
 * 获取指定组织下的组织列表
 * @param {*} params 
 */
export const selDepartList = (params) => {
  return http.post('/depart/selDepartList', params)
}