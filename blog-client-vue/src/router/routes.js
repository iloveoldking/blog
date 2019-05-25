import layout from '../layout/index'


export default [{
    path: '/',
    redirect: '/articleList'
  },
  {
    path: '/articleList',
    component: layout,
    children: [{
        path: '',
        name: 'articleList',
        component: () => import('@/views/articleList')
      },
      {
        path: '/articleItem',
        name: 'articleItem',
        component: () => import('@/views/articleItem')
      }
    ]
  },

]