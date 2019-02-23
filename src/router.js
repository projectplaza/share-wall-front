import Vue from 'vue'
import Router from 'vue-router'

import { BASE_URL } from './constants/constant'

Vue.use(Router)

export const ROUTE_NAME_TEAM_CREATE = 'team-create'
export const ROUTE_NAME_PROJECT_CREATE = 'project-create'
export const ROUTE_NAME_WALL = 'wall'
export const ROUTE_NAME_DESIGN_DOCUMENT_HOME = 'design-document-home'
export const ROUTE_NAME_DESIGN_DOCUMENT = 'design-document'

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: BASE_URL + 'team/setting/owner/create',
      name: ROUTE_NAME_TEAM_CREATE,
      component: () => import('./views/TeamCreate.vue')
    },
    {
      path: BASE_URL + 'project/setting/owner/create',
      name: ROUTE_NAME_PROJECT_CREATE,
      component: () => import('./views/ProjectCreate.vue')
    },
    {
      path: BASE_URL + 't/:teamCode/p/:projectCode/wall',
      name: ROUTE_NAME_WALL,
      component: () => import('./views/ProjectWall.vue')
    },
    {
      path: BASE_URL + 't/:teamId/p/:projectId/design-document',
      name: ROUTE_NAME_DESIGN_DOCUMENT_HOME,
      component: () => import('./views/DesignDocument.vue')
    },
    {
      path: BASE_URL + 't/:teamId/p/:projectId/design-document/:documentId',
      name: ROUTE_NAME_DESIGN_DOCUMENT,
      component: () => import('./views/DesignDocument.vue')
    }
  ]
})