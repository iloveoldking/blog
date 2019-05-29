export default [{
    path: '/login',
    component: '../layouts/Blank',
    routes: [{
      path: '/login',
      component: './Login'
    }]
  },
  {
    path: '/',
    component: '../layouts/Basic',
    Routes: ['src/pages/Authorized'],
    routes: [{
      path: '/',
      redirect: '/user'
    }, {
      path: '/user',
      name: 'user',
      component: './User'
    }, {
      path: '/article',
      name: 'article',
      component: './Article'
    }]
  }
]
