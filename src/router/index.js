import { createRouter, createWebHistory } from 'vue-router'
import { userStore } from "@/stores";
import jwtDecode from "jwt-decode";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/welcome'
    },
    {
      path:'/home',
      name: 'home',
      redirect: '/home/dashboard',
      component: () => import('@/views/index/Index.vue'),
      children: [
        {
          path: 'profile',
          name: 'profile',
          component: () => import('@/views/profile/Index.vue')
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/views/dashboard/Index.vue')
        },
        {
          path: 'simulation_equipment',
          name: 'simulation_equipment',
          component: () => import('@/layout/lab/simulation_equipment/Index.vue')
        }
      ]
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

//添加路由守卫
router.beforeEach((to,from,next) => {
  const store = userStore();
  const isLogin = localStorage.getItem('token');
  if (store.auth.user != null && to.name.startsWith("welcome-")){
    next('/home');
  }else if (isLogin === null && to.fullPath.startsWith("/home")){
    next('/');
  }else if (to.matched.length === 0){
    next('/');
  }else {
    next();
  }
})

export default router
