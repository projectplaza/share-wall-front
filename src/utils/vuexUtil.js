/**
 * チームIDとプロジェクトIDを設定する
 * @param {object} _this 
 */
const setTeamProject = _this => {
  const teamId = _this.$route.params.teamId
  const projectId = _this.$route.params.projectId
  _this.changeCurrentTeam(teamId)
  _this.changeCurrentProject(projectId)
}

export default {
  setTeamProject
}