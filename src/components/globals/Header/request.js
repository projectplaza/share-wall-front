import { getRequest } from '../../../utils/apiUtil'
import { PATH_TEAM_LIST, PATH_PROJECT_LIST } from '../../../constants/apiConstant'

/**
 * チーム一覧を検索する
 */
export const getTeamListRequest = () => {
  return new Promise((resolve, reject) => {
    getRequest(PATH_TEAM_LIST).then(result => {
      resolve(result)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * プロジェクト一覧を検索する
 */
export const getProjectListRequest = (teamCode) => {
  return new Promise((resolve, reject) => {
    getRequest(PATH_PROJECT_LIST, {teamId: teamCode}).then(result => {
      resolve(result)
    }).catch(error => {
      reject(error)
    })
  })
}