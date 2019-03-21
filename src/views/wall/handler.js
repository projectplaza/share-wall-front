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
 * ボード作成キャンセルボタンクリックイベントハンドラ
 * @param {object} _this 
 */
const handleBoardCreateCancelClick = _this => {
  _this.$set(_this.dialog.boardCreate, 'visible', false)
  _this.$set(_this.dialog.boardCreate, 'boardName', null)
}

/**
 * パネル追加ボタンのクリックイベントハンドラ
 * @param {object} _this 
 */
const handlePanelAddClick = _this => {
  _this.$set(_this.dialog.panelCreate, 'visible', true)
  window.setTimeout(() => {
    $('#panel-create-name').focus()
  }, 500)
}

/**
 * パネル作成ボタンクリックイベントハンドラ
 * @param {object} _this 
 */
const handlePanelCreateClick = _this => {
  _this.showProgressBar()

  request.postPanelRequest(_this.display.teamId, _this.display.projectId, _this.display.boardId, _this.dialog.panelCreate.panelName).then(result => {

    const panels = _this.list.panels
    panels.push({
      boardId: result.boardId,
      panelId: result.panelId,
      panelName: result.panelName,
      order: result.order,
      task: [],
      showCreateWindow: false
    })

    _this.$set(_this.list, 'panels', panels)

    _this.$set(_this.dialog.panelCreate, 'visible', false)
    _this.$set(_this.dialog.panelCreate, 'panelName', null)

    let order = 0
    const updatePanels = panels.map(panel => {
      order++
      return {
        panelId: panel.panelId,
        panelName: panel.panelName,
        order: order
      }
    })

    request.putPanelRequest(_this.display.teamId, _this.display.projectId, _this.display.boardId, updatePanels).then(result => {
      _this.$set(_this.dialog.panelSetting, 'visible', false)
      _this.hideProgressBar()
    })
  })
}

/**
 * パネル作成キャンセルボタンクリックイベントハンドラ
 * @param {object} _this 
 */
const handlePanelCreateCancelClick = _this => {
  _this.$set(_this.dialog.panelCreate, 'visible', false)
  _this.$set(_this.dialog.panelCreate, 'panelName', null)
}

/**
 * パネル設定ボタンのクリックイベントハンドラ
 * @param {object} _this 
 */
const handlePanelSettingClick = _this => {
  _this.$set(_this.dialog.panelSetting, 'visible', true)
}

/**
 * パネル設定完了ボタンクリックイベントハンドラ
 * @param {object} _this 
 */
const handlePanelSettingCompleteClick = _this => {
  _this.hideProgressBar()
  _this.$set(_this.dialog.panelSetting, 'visible', false)
}

/**
 * パネル削除ボタンクリックイベントハンドラ
 * @param {object} _this 
 * @param {string} panelId
 */
const handlePanelDeleteClick = (_this, panelId) => {
  _this.$set(_this.dialog.panelDelete, 'visible', true)
  _this.$set(_this.dialog.panelDelete, 'panelId', panelId)
}

/**
 * パネル削除確定ボタンクリックイベントハンドラ
 * @param {object} _this 
 */
const handlePanelDeleteConfirmClick = _this => {
  _this.showProgressBar()

  const panelId = _this.dialog.panelDelete.panelId

  request.deletePanelRequest(_this.display.teamId, _this.display.projectId, _this.display.boardId, panelId).then(result => {
    _this.hideProgressBar()
    _this.$set(_this.dialog.panelDelete, 'visible', false)
    _this.$set(_this.dialog.panelDelete, 'panelId', null)

    const panels = _this.list.panels
    panels.some((panel, index) => {
      if (panel.panelId == panelId) panels.splice(index, 1)
    })

    _this.$set(_this.list, 'panels', panels)
  })
}

/**
 * パネル削除キャンセルボタンクリックイベントハンドラ
 * @param {object} _this
 */
const handlePanelDeleteCancelClick = _this => {
  _this.$set(_this.dialog.panelDelete, 'visible', false)
  _this.$set(_this.dialog.panelDelete, 'panelId', null)
}

/**
 * ボード編集ボタンクリックイベントハンドラ
 * @param {object} _this 
 */
const handleBoardEditClick = _this => {
  _this.$set(_this.dialog.boardEdit, 'boardName', _this.display.boardName)
  _this.$set(_this.dialog.boardEdit, 'visible', true)
  window.setTimeout(() => {
    $('#board-edit-name').focus()
  }, 500)
}

/**
 * ボード編集保存ボタンクリックイベントハンドラ
 * @param {object} _this 
 */
const handleBoardEditSaveClick = _this => {
  _this.showProgressBar()

  const boards = [{
    boardId: _this.display.boardId,
    boardName: _this.dialog.boardEdit.boardName
  }]

  request.putBoardRequest(_this.display.teamId, _this.display.projectId, boards).then(result => {
    const updateBoards = _this.list.boards.map(board => {
      if (board.boardId == _this.display.boardId) {
        return {
          ...board,
          boardName: _this.dialog.boardEdit.boardName
        }
      }
      return board
    })

    _this.$set(_this.display, 'boardName', _this.dialog.boardEdit.boardName)
    _this.$set(_this.list, 'boards', updateBoards)
    _this.$set(_this.dialog.boardEdit, 'boardName', null)
    _this.$set(_this.dialog.boardEdit, 'visible', false)

    _this.hideProgressBar()
  })
}

/**
 * ボード編集キャンセルボタンクリックイベントハンドラ
 * @param {object} _this 
 */
const handleBoardEditCancelClick = _this => {
  _this.$set(_this.dialog.boardEdit, 'boardName', null)
  _this.$set(_this.dialog.boardEdit, 'visible', false)
}

/**
 * ボード削除ボタンクリックイベントハンドラ
 * @param {object} _this 
 */
const handleBoardDeleteClick = _this => {
  _this.$set(_this.dialog.boardDelete, 'visible', true)
  _this.$set(_this.dialog.boardDelete, 'boardId', _this.display.boardId)
}

/**
 * ボード削除確定ボタンクリックイベントハンドラ
 * @param {object} _this 
 */
const handleBoardDeleteConfirmClick = _this => {
  _this.showProgressBar()

  const boardId = _this.dialog.boardDelete.boardId

  request.deleteBoardRequest(_this.display.teamId, _this.display.projectId, boardId).then(result => {
    _this.hideProgressBar()
    _this.$set(_this.dialog.boardDelete, 'visible', false)
    _this.$set(_this.dialog.boardDelete, 'boardId', null)

    _this.$router.push({
      name: ROUTE_NAME.WALL_HOME,
      params: {
        teamId: _this.display.teamId,
        projectId: _this.display.projectId
      }
    })

    const boards = _this.list.boards
    boards.some((board, index) => {
      if (board.boardId == boardId) boards.splice(index, 1)
    })

    _this.$set(_this.list, 'boards', boards)
  })
}

/**
 * ボード削除キャンセルボタンクリックイベントハンドラ
 * @param {object} _this
 */
const handleBoardDeleteCancelClick = _this => {
  _this.$set(_this.dialog.boardDelete, 'visible', false)
  _this.$set(_this.dialog.boardDelete, 'boardId', null)
}

/**
 * タスク閉じるクリックイベントハンドラ
 * @param {object} _this 
 */
const handleTaskCloseClick = _this => {
  _this.$router.push({
    name: ROUTE_NAME.WALL_BOARD,
    params: {
      teamId: _this.display.teamId,
      projectId: _this.display.projectId,
      boardId: _this.display.boardId
    }
  })
}

/**
 * パネル一覧変更イベントハンドラ
 * @param {object} _this 
 * @param {array} to 新しいパネル一覧
 * @param {array} from 古いパネル一覧
 */
const handlePanelsChange = (_this, to, from) => {

  if (to == null || from == null) {
    updatePanel(_this)
    return
  }

  let isPanelUpdated = false

  if (to.length != from.length) {
    isPanelUpdated = true
  } else {
    for (let i = 0; i < to.length; i++) {
      if (to[i].panelId != from[i].panelId) {
        isPanelUpdated = true
        break
      }
    }
  }

  if (isPanelUpdated) {
    updatePanel(_this)
  } else {
    updateTaskOrder(_this)
  }
}

/**
 * タスク追加ボタンのクリックイベントハンドラ
 * @param {object} _this 
 * @param {string} panelId パネルID
 */
const handleTaskAddClick = (_this, panelId) => {
  const panels = _this.list.panels.map(panel => {
    return {
      ...panel,
      showCreateWindow: (panel.panelId == panelId) ? true : false
    }
  })

  _this.$set(_this.list, 'panels', panels)

  window.setTimeout(() => {
    $('#task-add-title').focus()
  }, 200)
}

/**
 * タスク追加保存ボタンのクリックイベントハンドラ
 * @param {object} _this 
 * @param {string} panelId パネルID
 */
const handleTaskAddSaveClick = (_this, panelId, isCloseForm) => {
  const task = {
    panelId: panelId,
    title: _this.display.taskAdd.title,
  }

  request.postTaskRequest(_this.display.teamId, _this.display.projectId, _this.display.boardId, task).then(result => {
    
    const newTask = {
      panelId: result.panelId,
      taskId: result.taskId,
      title: result.title
    }

    const panels = _this.list.panels.map(panel => {
      if (panel.panelId == result.panelId) {
        panel.task.unshift(newTask)
      }
      return {
        ...panel,
        showCreateWindow: (panel.panelId == newTask.panelId && !isCloseForm) ? true : false
      }
    })
  
    _this.$set(_this.list, 'panels', panels)
    _this.$set(_this.display.taskAdd, 'title', null)
  })
}

/**
 * タスク追加キャンセルボタンのクリックイベントハンドラ
 * @param {object} _this 
 */
const handleTaskAddCancelClick = _this => {
  const panels = _this.list.panels.map(panel => {
    return {
      ...panel,
      showCreateWindow: false
    }
  })

  _this.$set(_this.list, 'panels', panels)
}

/**
 * パネル情報を更新する
 * @param {object} _this 
 */
const updatePanel = _this => {
  let order = 0
  const panels = _this.list.panels.map(panel => {
    order++
    return {
      panelId: panel.panelId,
      panelName: panel.panelName,
      order: order
    }
  })

  request.putPanelRequest(_this.display.teamId, _this.display.projectId, _this.display.boardId, panels).then(result => {
    // nothing to do
  })
}

/**
 * タスクの順序を更新する
 * @param {object} _this 
 */
const updateTaskOrder = _this => {
  let tasks = []

  _this.list.panels.forEach(panel => {
    const panelId = panel.panelId
    let order = 0
    const taskList = panel.task.map(task => {
      order++
      return {
        taskId: task.taskId,
        panelId: panelId,
        order: order
      }
    })
    tasks = tasks.concat(taskList)
  })

  request.putTaskRequest(_this.display.teamId, _this.display.projectId, _this.display.boardId, tasks).then(result => {
    // nothing to do
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
      if (_this.list.boards.length != 0) {
        _this.$router.push({
          name: ROUTE_NAME.WALL_BOARD,
          params: {
            teamId: _this.display.teamId,
            projectId: _this.display.projectId,
            boardId: _this.list.boards[0].boardId
          }
        })
        return
      }
      
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
    console.log('wall-home')
    initBoardList(_this).then(() => { initPanelTask(_this).then(() => { initTask(_this).then(() => { initDisplay(_this); _this.hideProgressBar() }) }) })
    return
  }
  else if (newParams.boardId != null && newParams.boardId != oldParams.boardId) {
    console.log('wall-board')
    initBoardSelected(_this)
    initPanelTask(_this).then(() => { initTask(_this).then(() => { initDisplay(_this); _this.hideProgressBar() }) })
    return
  }
  else if (newParams.taskId != null && newParams.taskId != oldParams.taskId) {
    console.log('wall-task')
    initTask(_this).then(() => { initDisplay(_this); _this.hideProgressBar() })
    return
  }
  else if (_this.$route.name == ROUTE_NAME.WALL_HOME && _this.list.boards.length != 0) {
    _this.$router.push({
      name: ROUTE_NAME.WALL_BOARD,
      params: {
        teamId: _this.display.teamId,
        projectId: _this.display.projectId,
        boardId: _this.list.boards[0].boardId
      }
    })
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
 * ボードの選択状態を初期化する
 * @param {object} _this 
 */
const initBoardSelected = _this => {
  const boards = _this.list.boards.map(board => {
    return {
      ...board,
      selected: (board.boardId == _this.display.boardId) ? true : false
    }
  })

  _this.$set(_this.list, 'boards', boards)
}

/**
 * パネルとタスクの一覧を初期化する
 * @param {object} _this 
 */
const initPanelTask = _this => {

  const board = _this.list.boards.find(board => board.boardId == _this.display.boardId)
  _this.$set(_this.display, 'boardName', board.boardName)

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

/**
 * 表示用のタスク情報を追加する
 * @param {array} panels パネル一覧
 * @param {string} panelId パネルID
 * @param {object} task タスク情報
 */
const addDisplayTask = (panels, panelId, task) => {
  task = {
    ...task,
    panelId: panelId
  }

  const panel = panels.find(panel => panel.panelId == panelId)
  panel.task.push(task)

  return panels
}

/**
 * 表示用のタスク情報を更新する
 * @param {array} panels パネル一覧
 * @param {object} task タスク情報
 */
const updateDisplayTask = (panels, task) => {
  for (let panelIndex = 0; panelIndex < panels.length; panelIndex++) {
    for (let taskIndex = 0; taskIndex < panels[panelIndex].task.length; taskIndex++) {
      if (panels[panelIndex].task[taskIndex].taskId == task.taskId) {
        panels[panelIndex].task[taskIndex] = {
          taskId: task.taskId,
          panelId: panels[panelIndex].panelId,
          title: task.title,
          content: task.content,
          priority: task.priority,
          assignUser: task.assignUser,
          startDate: task.startDate,
          deadline: task.deadline
        }

        return panels
      }
    }
  }
}

export default {
  handleBoardAddClick,
  handleBoardCreateClick,
  handleBoardCreateCancelClick,
  handlePanelAddClick,
  handlePanelCreateClick,
  handlePanelCreateCancelClick,
  handlePanelSettingClick,
  handlePanelSettingCompleteClick,
  handlePanelDeleteClick,
  handlePanelDeleteConfirmClick,
  handlePanelDeleteCancelClick,
  handleBoardEditClick,
  handleBoardEditSaveClick,
  handleBoardEditCancelClick,
  handleBoardDeleteClick,
  handleBoardDeleteConfirmClick,
  handleBoardDeleteCancelClick,
  handleTaskCloseClick,
  handlePanelsChange,
  handleTaskAddClick,
  handleTaskAddSaveClick,
  handleTaskAddCancelClick,
  handleCreated,
  handleRouteChange
}