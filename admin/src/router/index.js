import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from './../components/Layout'

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/categories/create',
        component: () => import(/* webpackChunkName: "about" */ './../pages/Category/CategoryCreate.vue')
      },
      {
        path: '/categories/list',
        component: () => import(/* webpackChunkName: "about" */ './../pages/Category/CategoryList.vue')
      },
      {
        path: '/categories/edit/:id',
        component: () => import(/* webpackChunkName: "about" */ './../pages/Category/CategoryCreate.vue'),
        props: true
      }
    ]
  }
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
