import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from './../components/Layout'

const routes = [
  {
    path: '/',
    redirect: '/articles/list',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/categories/create',
        component: () => import(/* webpackChunkName: "category" */ './../pages/Category/CategoryCreate.vue')
      },
      {
        path: '/categories/list',
        component: () => import(/* webpackChunkName: "category" */ './../pages/Category/CategoryList.vue')
      },
      {
        path: '/categories/edit/:id',
        component: () => import(/* webpackChunkName: "category" */ './../pages/Category/CategoryCreate.vue'),
        props: true
      },
      {
        path: 'articles/create',
        component: () => import(/* webpackChunkName: "article" */ './../pages/Article/ArticleCreate.vue')
      },
      {
        path: 'articles/list',
        component: () => import(/* webpackChunkName: "article" */ './../pages/Article/ArticleList.vue')
      },
      {
        path: 'articles/edit/:id',
        component: () => import(/* webpackChunkName: "article" */ './../pages/Article/ArticleCreate.vue'),
        props: true
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: { isPublic: true},
    component: () => import(/* webpackChunkName: "login" */ './../pages/Login')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//导航守卫，如果当前路由不是login页并且本地没有token就跳转到login页
router.beforeEach((to, from, next) => {
  if(!to.meta.isPublic && !localStorage.personalBlogToken) {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})

export default router
