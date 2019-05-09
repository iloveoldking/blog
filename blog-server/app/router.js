'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 用户相关路由配置
  router.post('/user/create',controller.users.create)
  router.post('/user/find', controller.users.find);


  // 文章相关路由
  router.post('/article/create', controller.articles.create);
  router.post('/article/delete', controller.articles.delete);
  router.post('/article/findAll', controller.articles.findAll);
  router.post('/article/findById', controller.articles.findById);
};
