import { createRouter, createWebHistory } from 'vue-router'
import Layout from "@/views/Layout/index.vue";
import Login from "@/views/Login/index.vue";
import Category from "@/views/Category/index.vue";
import SubCategory from "@/views/SubCategory/index.vue";
import Home from "@/views/Home/index.vue";
import Detail from "@/views/Detail/index.vue";
import CartList from "@/views/CartList/index.vue"
import Checkout from "@/views/Checkout/index.vue"
import Pay from '@/views/Pay/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children:[
        {
          path: 'category/:id',/* 导航分类页需要用到具体id */
          component: Category
        },
        {
          path: '',
          component: Home
        },
        {
          path: 'category/sub/:id',
          component: SubCategory
        },
        {
          path: 'detail/:id',
          component: Detail
        },
        {
          path: 'cart',
          component:CartList

        },
        {
          path: 'checkout',
          component:Checkout
        }

      ]

    },
    {
      path: '/login',
      component: Login
    },{
      path: '/pay',
      component: Pay
    }
  ],
  //定制路由滚动行为,进入新页面的时候
  scrollBehavior(){
    return{
      top:0
    }
  }
})

export default router
