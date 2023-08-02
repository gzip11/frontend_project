import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/welcome/'
    },
    {
      path:'/home',
      name: 'home',
      component: () => import('@/views/index/Index.vue')
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: () => import('@/views/welcome/Index.vue'),
      children: [
        {
          path: '',
          name: 'welcome-login,',
          component: () => import('@/components/login/LoginFrame.vue')
        },
        {
          path: '/register',
          name: 'welcome-register',
          component: () => import('@/components/register/RegisterFrame.vue')
        }
      ]
    }
  ]
})

export default router
