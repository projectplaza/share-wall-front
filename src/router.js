import Vue from 'vue'
import Router from 'vue-router'

import { BASE_URL } from './constants/constant'

Vue.use(Router)

export const ROUTE_NAME = {
  TEAM_CREATE: 'team-create',
  TEAM_DASHBOARD: 'team-dashboard',
  PROJECT_CREATE: 'project-create',
  PROJECT_DASHBOARD: 'project-dashboard',
  BOARD_SELECT: 'board-select',
  BOARD: 'board',
  BOARD_TASK: 'board-task',
  DOCUMENT: 'document',
  DOCUMENT_FILE: 'document-file',
  WALL_HOME: 'wall-home',
  WALL_BOARD: 'wall-board',
  WALL_TASK: 'wall-task',
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
      path: BASE_URL + 't/:teamId/p/:projectId/boardSelect',
      name: ROUTE_NAME.BOARD_SELECT,
      component: () => import('./views/BoardSelect.vue')
    },
    {
      path: BASE_URL + 't/:teamId/p/:projectId/board/:boardId',
      name: ROUTE_NAME.BOARD,
      component: () => import('./views/Board.vue')
    },
    {
      path: BASE_URL + 't/:teamId/p/:projectId/board/:boardId/:taskId',
      name: ROUTE_NAME.BOARD_TASK,
      component: () => import('./views/Board.vue')
    },
    {
      path: BASE_URL + 't/:teamId/p/:projectId/doc',
      name: ROUTE_NAME.DOCUMENT,
      component: () => import('./views/Document.vue')
    },
    {
      path: BASE_URL + 't/:teamId/p/:projectId/doc/:documentId',
      name: ROUTE_NAME.DOCUMENT_FILE,
      component: () => import('./views/Document.vue')
    },
    
    {
      path: BASE_URL + 't/:teamId/p/:projectId/wall',
      name: ROUTE_NAME.WALL_HOME,
      component: () => import('./views/Wall.vue')
    },
    {
      path: BASE_URL + 't/:teamId/p/:projectId/wall/:boardId',
      name: ROUTE_NAME.WALL_BOARD,
      component: () => import('./views/Wall.vue')
    },
    {
      path: BASE_URL + 't/:teamId/p/:projectId/wall/:boardId/:taskId',
      name: ROUTE_NAME.WALL_TASK,
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