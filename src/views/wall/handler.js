import request from './request'

const initBoardList = _this => {
  return new Promise((resolve, reject) => {
    request.getBoardListRequest(_this.display.teamId, _this.display.projectId).then(result => {
      let boardName = ''
      const boards = result.map(r => {
        let selected = false
        if (r.boardId == _this.display.boardId) {
          selected = true
          boardName = r.boardName
        }
        return {
          boardId: r.boardId,
          boardName: r.boardName,
          selected: selected
        }
      })

      _this.$set(_this.display, 'boardName', boardName)
      _this.$set(_this.list, 'boards', boards)

      resolve()
    }).catch(error => {
      console.log(error)
      reject()
    })
  })
}

const initPanelTask = _this => {
  return new Promise((resolve, reject) => {
    request.getPanelTaskListRequest(_this.display.teamId, _this.display.projectId, _this.display.boardId).then(result => {
      const panels = result.map(r => {
        return {
          ...r,
          showCreateWindow: false
        }
      })

      _this.$set(_this.list, 'panels', panels)
    })
    resolve()
  }).catch(error => {
    console.log(error)
    reject()
  })
}

const initTask = _this => {
  return new Promise((resolve, reject) => {
    request.getTaskRequest(_this.display.teamId, _this.display.projectId, _this.display.boardId, _this.display.taskId).then(result => {
      _this.$set(_this.display, 'task', result)
    })
    resolve()
  }).catch(error => {
    console.log(error)
    reject()
  })
}

const initDisplay = _this => {
  if (_this.display.taskId == null) {
    _this.mode.task.selected = false
  } else {
    _this.mode.task.selected = true
  }
  _this.mode.edit = false
}

const handleCreated = _this => {

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

  initBoardList(_this).then(() => {
    if (boardId != null) {
      initPanelTask(_this).then(() => {
        if (taskId != null) {
          initTask(_this).then(() => {
            initDisplay(_this)
          })
        } else {
          initDisplay(_this)
        }
      })
    } else {
      initDisplay(_this)
    }
  })
}

const handleRouteChange = (_this, to, from) => {

  const newParams = to.params
  const oldParams = from.params

  _this.display.teamId = newParams.teamId
  _this.display.projectId = newParams.projectId
  _this.display.boardId = newParams.boardId
  _this.display.taskId = newParams.taskId

  if (newParams.teamId != oldParams.teamId || newParams.projectId != oldParams.projectId) {
    console.log('all change')
    initBoardList(_this).then(() => { initPanelTask(_this).then(() => { initTask(_this).then(() => { initDisplay(_this) }) }) })
    return
  }
  else if (newParams.boardId != oldParams.boardId) {
    console.log('board change')
    initPanelTask(_this).then(() => { initTask(_this).then(() => { initDisplay(_this) }) })
    return
  }
  else if (newParams.taskId != oldParams.taskId) {
    console.log('task change')
    initTask(_this).then(() => { initDisplay(_this) })
    return
  }
  
  initDisplay(_this)
}

export default {
  handleCreated,
  handleRouteChange
}