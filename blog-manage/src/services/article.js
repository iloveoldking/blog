import request from '../utils/request'

export const findAll = params => request.post('/article/findAll', params);

export const findById = params => request.post('/article/findById', params);

export const deleteArticles = params => request.post('/article/delete', params);
