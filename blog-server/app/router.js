'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 用户相关路由配置
  router.post('/user/create',controller.users.create);
  router.post('/user/delete', controller.users.delete);
  router.post('/user/update', controller.users.update);
  router.post('/user/findAll', controller.users.findAll);
  router.post('/user/findById', controller.users.findById);
  router.post('/user/login', controller.users.login);

  // 文章相关路由
  router.post('/article/create', controller.articles.create);
  router.post('/article/delete', controller.articles.delete);
  router.post('/article/findAll', controller.articles.findAll);
  router.post('/article/findById', controller.articles.findById);
  router.post('/article/collect', controller.articles.collect);
  router.post('/article/like', controller.articles.like);
  router.post('/article/comment', controller.articles.comment);

  // 上传文件
  router.post('/upload',controller.upload.index);
};
