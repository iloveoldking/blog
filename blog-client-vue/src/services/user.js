import request from '../utils/request';

export const login = params => {
  return request.post('/user/login', params);
}

export const register = params => {
  return request.post('/user/create', params);
}

export const findById = params => {
  return request.post('/user/findById', params);
}