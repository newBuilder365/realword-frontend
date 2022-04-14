import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '@/views/home.vue'
import AppLayout from '@/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '/',
        name: 'home',
        component: HomePage
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/loginAndRegister.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('@/views/loginAndRegister.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile.vue')
      },
      {
        path: '/setting',
        name: 'setting',
        component: () => import('@/views/setting.vue')
      },
      {
        path: '/editArticle',
        name: 'editArticle',
        component: () => import('@/views/createEditArticle.vue')
      },
      {
        path: '/article',
        name: 'article',
        component: () => import('@/views/articles.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
