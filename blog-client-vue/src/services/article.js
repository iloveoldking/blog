import request from '../utils/request'

export const getArticleList = params => {
  return request.post('/article/findAll', params);
}

export const submitArticle = params => {
  return request.post('/article/create', params);
}

export const findArticleById = params => {
  return request.post('/article/findById', params);
}

export const collectArticle = params => {
  return request.post('/article/collect', params);
}

export const likeArticle = params => {
  return request.post('/article/like', params);
}

export const commentArticle = params => {
  return request.post('/article/comment', params);
}