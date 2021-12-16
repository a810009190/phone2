import Vue from 'vue'
import Router from 'vue-router'
import PhoneRouter from '../views/phone'
import DetailRouter from '../views/detail'
import SendMessengeRouter from '../views/sendMessenge'
import ModifyRouter from '../views/modify'
import ReportRouter from '../views/report'
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
      path: '/report',
      name: 'report',
      component: ReportRouter
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: DetailRouter
    },
    // {
    //   path: '/search',
    //   name: 'search',
    //   component: SearchRouter
    // },
    {
      path: '/sendMessenge',
      name: 'sendMessenge',
      component: SendMessengeRouter
    },
    {
      path: '/modify/:id',
      name: 'modify',
      component: ModifyRouter
    },
  ]
})
