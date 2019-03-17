import request from './request'

const handleCreated = (_this) => {

  // _this.showProgressBar()

  // URIパラメタを取得
  const teamId = _this.$route.params.teamId
  const projectId = _this.$route.params.projectId
  const boardId = _this.$route.params.boardId
  const taskId = _this.$route.params.taskId

  _this.changeCurrentTeam(teamId)
  _this.changeCurrentProject(projectId)

  // 取得したパラメタをVueデータに設定
  _this.display.teamId = teamId
  _this.display.projectId = projectId
  _this.display.boardId = boardId
  _this.display.taskId = taskId

  
}

export default {
  handleCreated
}