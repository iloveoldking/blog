'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 用户相关路由配置
  router.post('/user/create',controller.users.create)
  router.post('/user/find', controller.users.find);
};
