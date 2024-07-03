import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import blogRoutes from './blogRoutes';
import RegisterPage from "@/views/RegisterPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/login',
      name:'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component:()=>import('../views/Login.vue')
    },
    {
      path:'/edit',
      name:'edit',
      component:()=>import('../views/Test/EditMarkDown.vue')
    },
    {
      path:'/blog',
      name:'blog',
      component:()=>import('../views/Blog.vue')
    },
    {
      path:'/about',
      name:'about',
      component:()=>import('../views/AboutMe.vue')
    },
    {
      path:'/questionField',
      name:'questionField',
      component:()=>import('../views/QuestionField.vue')
    },
    {
      path:'/markdown',
      name:'markdown',
      component:()=>import('../views/Test/MarkDown.vue')
    },
    {
      path:'/photopage',
      name:'photopage',
      component:()=>import('../views/PhotoPage.vue')
    },
    {
      path:'/test',
      name:'test',
      component:()=>import('../views/Test/Test.vue')
    },
    {
      path:'/register',
      name:'register',
      component: RegisterPage
    },
  ].concat(blogRoutes)
})

export default router
