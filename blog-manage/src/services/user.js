import request from '../utils/request'

export const login = params => {
  return request.post('/user/login', params);
}

export const findAll = params => {
  return request.post('/user/findAll', params);
}

export const create = params => {
  return request.post('/user/create', params);
}

export const deleteUsers = params => {
  return request.post('/user/delete', params);
}
