export default [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  },
  {
    path: '*',
    name: 'notFound',
    component: () => import('../views/404')
  }
]