import { getTeamListRequest, getProjectListRequest } from './request'

/**
 * 画面作成時のイベントハンドラ
 * @param {object} _this 
 */
export const handleCreated = (_this) => {
  
  getTeamListRequest().then(list => {
    const teamList = list.map(l => {
      return {
        code: l.team_id,
        name: l.team_name
      }
    })

    _this.setTeamList(teamList)
  })
}

export const handleChangeCurrentTeam = (_this) => {

  if (_this.currentTeam == null) {
    _this.setProjectList([])
    return
  }

  getProjectListRequest(_this.currentTeam.code).then(list => {
    const projectList = list.map(l => {
      return {
        code: l.project_id,
        name: l.project_name
      }
    })

    _this.setProjectList(projectList)
  })
}

export default {
  handleCreated,
  handleChangeCurrentTeam
}