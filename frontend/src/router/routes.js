
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '',
        component: () => import('pages/IndexPage.vue'),
        name: 'home'      
      }
    ],
  },
  {
    path: '/sellers',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '',
        component: () => import('src/pages/sellers/sellers_index.vue'),
        name: 'sellers_index' 
      }
    ]
  },
  {
    path: '/budgets',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '',
        component: () => import('src/pages/budgets/budgets_index.vue'),
        name: 'budgets_index'
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
    name: '404'
  }
]

export default routes
