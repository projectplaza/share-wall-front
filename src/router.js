import Vue from 'vue'
import Router from 'vue-router'

import { BASE_URL } from './constants/constant'

Vue.use(Router)

export const ROUTE_NAME = {
  TEAM_CREATE: 'team-create',
  TEAM_DASHBOARD: 'team-dashboard',
  PROJECT_CREATE: 'project-create',
  PROJECT_DASHBOARD: 'project-dashboard',
  WALL: 'wall',
  DESIGN_DOCUMENT_HOME: 'design-document-home',
  DESIGN_DOCUMENT_FOLDER: 'design-document-folder',
  DESIGN_DOCUMENT_DOCUMENT: 'design-document-document',
  DESIGN_DOCUMENT_DOCUMENT_ACTION: 'design-document-document-action'
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: BASE_URL + 't/setting/owner/create',
      name: ROUTE_NAME.TEAM_CREATE,
      component: () => import('./views/TeamCreate.vue')
    },
    {
      path: BASE_URL + 't/:teamId/dashboard',
      name: ROUTE_NAME.TEAM_DASHBOARD,
      component: () => import('./views/TeamDashboard.vue')
    },
    {
      path: BASE_URL + 't/:teamId/p/setting/owner/create',
      name: ROUTE_NAME.PROJECT_CREATE,
      component: () => import('./views/ProjectCreate.vue')
    },
    {
      path: BASE_URL + 't/:teamId/p/:projectId/dashboard',
      name: ROUTE_NAME.PROJECT_DASHBOARD,
      component: () => import('./views/ProjectDashboard.vue')
    },
    {
      path: BASE_URL + 't/:teamId/p/:projectId/wall',
      name: ROUTE_NAME.WALL,
      component: () => import('./views/Wall.vue')
    },
    {
      path: BASE_URL + 't/:teamId/p/:projectId/design-document',
      name: ROUTE_NAME.DESIGN_DOCUMENT_HOME,
      component: () => import('./views/DesignDocument.vue')
    },
    {
      path: BASE_URL + 't/:teamId/p/:projectId/design-document/:folderId',
      name: ROUTE_NAME.DESIGN_DOCUMENT_FOLDER,
      component: () => import('./views/DesignDocument.vue')
    },
    {
      path: BASE_URL + 't/:teamId/p/:projectId/design-document/:folderId/:documentId',
      name: ROUTE_NAME.DESIGN_DOCUMENT_DOCUMENT,
      component: () => import('./views/DesignDocument.vue')
    },
    {
      path: BASE_URL + 't/:teamId/p/:projectId/design-document/:folderId/:documentId/:mode',
      name: ROUTE_NAME.DESIGN_DOCUMENT_DOCUMENT_ACTION,
      component: () => import('./views/DesignDocument.vue')
    }
  ]
})