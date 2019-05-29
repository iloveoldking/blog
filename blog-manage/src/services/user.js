import request from '../utils/request'

export const login = params => {
  return request.post('/user/login', params);
}