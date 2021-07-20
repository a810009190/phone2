import Vue from 'vue'
import Router from 'vue-router'
import PhoneRouter from '../views/phone'
import DetailRouter from '../views/detail'
import SearchRouter from '../views/search'
import ModifyRouter from '../views/modify'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/phone',
      name: 'phone',
      component: PhoneRouter
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: DetailRouter
    },
    {
      path: '/search',
      name: 'search',
      component: SearchRouter
    },
    {
      path: '/modify/:id',
      name: 'modify',
      component: ModifyRouter
    },
  ]
})
