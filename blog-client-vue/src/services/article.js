import request from '../utils/request'

export const getArticleList = params => {
  return request.post('/article/findAll', params);
}

export const submitArticle = params => {
  return request.post('/article/create', params);
}