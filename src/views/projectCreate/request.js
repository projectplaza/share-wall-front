import { PATH_PROJECT, PATH_PROJECT_USER, PATH_TEAM, PATH_PROF } from "../../constants/apiConstant"
import { getRequest, postRequest } from '../../utils/apiUtil'
import { FUNCTION_CODE_PROJECT_CREATE } from '../../constants/functionCodeConstant'

/**
 * チームメンバーを検索する
 * @param {string} teamId チームID
 */
export const getTeamMemberRequest = teamId => {
  return new Promise((resolve, reject) => {
    getRequest(PATH_TEAM, { teamId }).then(result => {
      resolve(result.members)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * ログインユーザーのログイン情報を検索する
 */
export const getProfileRequest = () => {
  return new Promise((resolve, reject) => {
    getRequest(PATH_PROF).then(result => {
      resolve(result)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * プロジェクトを登録する
 * @param {string} teamId チームID
 * @param {string} projectId プロジェクトID
 * @param {string} projectName プロジェクト名
 * @param {string} content 説明
 */
export const postProjectRequest = (teamId, projectId, projectName, content) => {
  return new Promise((resolve, reject) => {
    postRequest(PATH_PROJECT, {
      teamId,
      projectId,
      projectName,
      content,
      functionName: FUNCTION_CODE_PROJECT_CREATE
    }).then(result => {
      resolve(result)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * プロジェクトユーザーを登録する「
 * @param {string} teamId チームID
 * @param {string} projectId プロジェクトID
 * @param {array} users ユーザー
 */
export const postProjectUserRequest = (teamId, projectId, users) => {
  return new Promise((resolve, reject) => {
    postRequest(PATH_PROJECT_USER, {
      teamId,
      projectId,
      users,
      functionName: FUNCTION_CODE_PROJECT_CREATE
    }).then(result => {
      resolve(result)
    }).catch(error => {
      reject(error)
    })
  })
}

export default {
  getTeamMemberRequest,
  getProfileRequest,
  postProjectRequest,
  postProjectUserRequest
}