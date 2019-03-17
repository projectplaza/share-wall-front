import request from './request'
import $ from 'jquery'
import { ROUTE_NAME } from '../../router'


/**
 * ボード追加ボタンのクリックイベントハンドラ
 * @param {object} _this 
 */
const handleBoardAddClick = _this => {
  _this.$set(_this.dialog.boardCreate, 'visible', true)
  window.setTimeout(() => {
    $('#board-create-name').focus()
  }, 500)
}

/**
 * ボード作成ボタンクリックイベントハンドラ
 * @param {object} _this 
 */
const handleBoardCreateClick = _this => {
  _this.showProgressBar()

  request.postBoardRequest(_this.display.teamId, _this.display.projectId, _this.dialog.boardCreate.boardName).then(result => {
    const boards = _this.list.boards.map(board => {
      return {
        ...board,
        selected: false
      }
    })
    boards.push({ boardId: result.boardId, boardName: _this.dialog.boardCreate.boardName, selected: true })
    _this.$set(_this.list, 'boards', boards)

    _this.$router.push({
      name: ROUTE_NAME.WALL_BOARD,
      params: {
        teamId: _this.display.teamId,
        projectId: _this.display.projectId,
        boardId: result.boardId
      }
    })

    _this.$set(_this.dialog.boardCreate, 'visible', false)
    _this.$set(_this.dialog.boardCreate, 'boardName', null)

    _this.hideProgressBar()
  })
}

/**
 * コンポーネント作成後のイベントハンドラ
 * @param {object} _this 
 */
const handleCreated = _this => {

  _this.showProgressBar()

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
            _this.hideProgressBar()
          })
        } else {
          initDisplay(_this)
          _this.hideProgressBar()
        }
      })
    } else {
      initDisplay(_this)
      _this.hideProgressBar()
    }
  })
}

/**
 * VueRouterのRouteが変化した際のイベントハンドラ
 * @param {object} _this 
 * @param {object} to 遷移後のrouteオブジェクト
 * @param {object} from 遷移前のrouteオブジェクト
 */
const handleRouteChange = (_this, to, from) => {

  _this.showProgressBar()

  const newParams = to.params
  const oldParams = from.params

  _this.display.teamId = newParams.teamId
  _this.display.projectId = newParams.projectId
  _this.display.boardId = newParams.boardId
  _this.display.taskId = newParams.taskId

  if (newParams.teamId != oldParams.teamId || newParams.projectId != oldParams.projectId) {
    initBoardList(_this).then(() => { initPanelTask(_this).then(() => { initTask(_this).then(() => { initDisplay(_this); _this.hideProgressBar() }) }) })
    return
  }
  else if (newParams.boardId != oldParams.boardId) {
    initPanelTask(_this).then(() => { initTask(_this).then(() => { initDisplay(_this); _this.hideProgressBar() }) })
    return
  }
  else if (newParams.taskId != oldParams.taskId) {
    initTask(_this).then(() => { initDisplay(_this); _this.hideProgressBar() })
    return
  }

  initDisplay(_this)
  _this.hideProgressBar()
}

/**
 * ボード一覧を初期化する
 * @param {object} _this 
 */
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

/**
 * パネルとタスクの一覧を初期化する
 * @param {object} _this 
 */
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

/**
 * タスクを初期化する
 * @param {object} _this 
 */
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

/**
 * 画面表示用のオブジェクトを初期化する
 * @param {object} _this 
 */
const initDisplay = _this => {
  if (_this.display.taskId == null) {
    _this.mode.task.selected = false
  } else {
    _this.mode.task.selected = true
  }
  _this.mode.edit = false
}

export default {
  handleBoardAddClick,
  handleBoardCreateClick,
  handleCreated,
  handleRouteChange
}