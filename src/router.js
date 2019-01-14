import Vue from 'vue'
import Router from 'vue-router'

import { BASE_URL } from './constants/constant'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: BASE_URL + 'team/setting/owner/create',
      name: 'team-create',
      component: () => import('./views/TeamCreate.vue')
    },
    {
      path: BASE_URL + 'project/setting/owner/create',
      name: 'team-create',
      component: () => import('./views/ProjectCreate.vue')
    },
    {
      path: BASE_URL + 'common/wall',
      name: 'wall',
      component: () => import('./views/Wall.vue')
    }
  ]
})