import Vue from 'vue'
import Router from 'vue-router'
import {
  getSessionStorage,
} from '../utils/tools'
import userConfig from '../config'
import basicRoutes from './routes.basic'
import menuRoutes from './routes.menu'

const routes = [...basicRoutes, ...menuRoutes]

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

/**
 * 路由拦截器，路由跳转之前
 * @param to 跳转之后的路由
 * @param from 跳转之前的路由
 * @param next 执行跳转
 */
router.beforeEach((to, from, next) => {
  // 跳转之前检测sessionStorage是否正常
  const userInfo = getSessionStorage(userConfig.userInfoKey);
  if (userInfo || to.name === 'login') {
    next()
  } else {
    next({
      name: 'login'
    })
  }
})

/**
 * 路由拦截器，路由跳转之后
 * @param to 跳转之后的路由
 */
router.afterEach(to => {
  window.document.title = to.meta.title || '';
  window.scrollTo(0, 0)
})

export default router