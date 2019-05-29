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
    routes: [{
      path: '/user',
      component: './User'
    }]
  }
]
