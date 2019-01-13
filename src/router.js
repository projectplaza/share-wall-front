import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/team/setting/owner/create',
      name: 'team-create',
      component: () => import('./views/TeamCreate.vue')
    },
    {
      path: '/project/setting/owner/create',
      name: 'team-create',
      component: () => import('./views/ProjectCreate.vue')
    }
  ]
})