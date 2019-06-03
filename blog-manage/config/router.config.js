export default [{
    path: '/login',
    component: '../layouts/Blank',
    title: '博客管理后台',
    routes: [{
      path: '/login',
      name: 'login',
      title: '登录',
      component: './Login'
    }]
  },
  {
    path: '/',
    component: '../layouts/Basic',
    Routes: ['src/pages/Authorized'],
    title: '博客管理后台',
    routes: [{
      path: '/',
      redirect: '/user'
    }, {
      path: '/user',
      name: 'user',
      title: '用户管理',
      component: './User'
    }, {
      path: '/article',
      name: 'article',
      title: '文章管理',
      component: './Article'
    }]
  }
]
