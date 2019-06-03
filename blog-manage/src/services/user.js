import request from '../utils/request'

export const login = params => request.post('/user/login', params);

export const findAll = params => request.post('/user/findAll', params);

export const create = params => request.post('/user/create', params);

export const deleteUsers = params => request.post('/user/delete', params);
