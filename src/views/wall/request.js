import { getRequest, postRequest, putRequest, deleteRequest } from "../../utils/apiUtil"
import { PATH_BOARD_LIST, PATH_BOARD, PATH_PANEL_TASK_LIST, PATH_PANEL_LIST, PATH_TASK_LIST, PATH_PANEL, PATH_TASK } from "../../constants/apiConstant"
import { FUNCTION_CODE_WALL } from "../../constants/functionCodeConstant"

/**
 * ボード一覧を取得する
 * @param {string} teamId チームID
 * @param {string} projectId プロジェクトID
 * @returns {object} Promiseオブジェクト
 * @resolve {object} 結果
 * @reject {object} エラー情報
 */
const getBoardListRequest = (teamId, projectId) => {
  return new Promise((resolve, reject) => {
    getRequest(PATH_BOARD_LIST, {
      teamId,
      projectId
    }).then(result => {
      resolve(result)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * ボードを登録する
 * @param {string} teamId チームID
 * @param {string} projectId プロジェクトID
 * @param {string} boardName ボード名
 * @returns {object} Promiseオブジェクト
 * @resolve {object} 結果 
 * @reject {object} エラー情報
 */
const postBoardRequest = (teamId, projectId, boardName) => {
  return new Promise((resolve, reject) => {
    postRequest(PATH_BOARD, {
      teamId,
      projectId,
      boardName,
      functionName: FUNCTION_CODE_WALL
    }).then(result => {
      resolve(result)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * ボードを更新する
 * @param {string} teamId チームID
 * @param {string} projectId プロジェクトID
 * @param {array} boards ボード一覧
 * @returns {object} Promiseオブジェクト
 * @resolve {object} 結果
 * @reject {object} エラー情報
 */
const putBoardRequest = (teamId, projectId, boards) => {
  return new Promise((resolve, reject) => {
    if (boards == null || boards.length == 0) {
      resolve()
      return
    }
    putRequest(PATH_BOARD, {
      teamId,
      projectId,
      boards,
      functionName: FUNCTION_CODE_WALL
    }).then(result => {
      resolve(result)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * ボードを削除する
 * @param {string} teamId チームID
 * @param {string} projectId プロジェクトID
 * @param {string} boardId ボードID
 * @returns {object} Promiseオブジェクト
 * @resolve {object} 結果
 * @reject {object} エラー情報
 */
const deleteBoardRequest = (teamId, projectId, boardId) => {
  return new Promise((resolve, reject) => {
    console.log(boardId)
    resolve()
    // deleteRequest(PATH_BOARD, {
    //   teamId,
    //   projectId,
    //   boardId,
    //   functionName: FUNCTION_CODE_WALL
    // }).then(result => {
    //   resolve(result)
    // }).catch(error => {
    //   reject(error)
    // })
  })
}

/**
 * パネルとタスクの一覧を取得する
 * @param {string} teamId チームID
 * @param {string} projectId プロジェクトID
 * @param {string} boardId ボードID
 * @returns {object} Promiseオブジェクト
 * @resolve {object} 結果
 * @reject {object} エラー情報
 */
const getPanelTaskListRequest = (teamId, projectId, boardId) => {
  return new Promise((resolve, reject) => {
    getRequest(PATH_PANEL_TASK_LIST, {
      teamId,
      projectId,
      boardId
    }).then(result => {
      resolve(result)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * パネル一覧を取得する
 * @param {string} teamId チームID
 * @param {string} projectId プロジェクトID
 * @param {string} boardId ボードID
 * @returns {object} Promiseオブジェクト
 * @resolve {object} 結果
 * @reject {object} エラー情報
 */
const getPanelListRequest = (teamId, projectId, boardId) => {
  return new Promise((resolve, reject) => {
    getRequest(PATH_PANEL_LIST, {
      teamId,
      projectId,
      boardId
    }).then(result => {
      resolve(result)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * パネルを登録する
 * @param {string} teamId チームID
 * @param {string} projectId プロジェクトID
 * @param {string} boardId ボードID
 * @param {string} panelName パネル名
 * @returns {object} Promiseオブジェクト
 * @resolve {object} 結果
 * @reject {object} エラー情報
 */
const postPanelRequest = (teamId, projectId, boardId, panelName) => {
  return new Promise((resolve, reject) => {
    postRequest(PATH_PANEL, {
      teamId,
      projectId,
      boardId,
      panelName,
      functionName: FUNCTION_CODE_WALL
    }).then(result => {
      resolve(result)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * パネルを更新する
 * @param {string} teamId チームID
 * @param {string} projectId プロジェクトID
 * @param {string} boardId ボードID
 * @param {array} panels パネル一覧
 * @returns {object} Promiseオブジェクト
 * @resolve {object} 結果
 * @reject {object} エラー情報
 */
const putPanelRequest = (teamId, projectId, boardId, panels) => {
  return new Promise((resolve, reject) => {
    console.log('panel update complete')
    console.log(panels)
    resolve()
    // putRequest(PATH_PANEL, {
    //   teamId,
    //   projectId,
    //   boardId,
    //   panels,
    //   functionName: FUNCTION_CODE_WALL
    // }).then(result => {
    //   resolve(result)
    // }).catch(error => {
    //   reject(error)
    // })
  })
}

/**
 * パネルを削除する
 * @param {string} teamId チームID
 * @param {string} projectId プロジェクトID
 * @param {string} boardId ボードID
 * @param {string} panelId パネルID
 * @returns {object} Promiseオブジェクト
 * @resolve {object} 結果
 * @reject {object} エラー情報
 */
const deletePanelRequest = (teamId, projectId, boardId, panelId) => {
  return new Promise((resolve, reject) => {
    console.log(panelId)
    resolve()
    // deleteRequest(PATH_PANEL, {
    //   teamId,
    //   projectId,
    //   boardId,
    //   panelId
    // }).then(result => {
    //   resolve(result)
    // }).catch(error => {
    //   reject(error)
    // })
  })
}

/**
 * タスクの詳細を取得する
 * @param {string} teamId チームID
 * @param {string} projectId プロジェクトID
 * @param {string} boardId ボードID
 * @param {string} taskId タスクID
 * @returns {object} Promiseオブジェクト
 * @resolve {object} 結果
 * @reject {object} エラー情報
 */
const getTaskRequest = (teamId, projectId, boardId, taskId) => {
  return new Promise((resolve, reject) => {
    getRequest(PATH_TASK, {
      teamId,
      projectId,
      boardId,
      taskId
    }).then(result => {
      resolve(result)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * タスクを登録する
 * @param {string} teamId チームID
 * @param {string} projectId プロジェクトID
 * @param {string} boardId ボードID
 * @param {object} task タスク情報
 * @returns {object} Promiseオブジェクト
 * @resolve {object} 結果
 * @reject {object} エラー情報
 */
const postTaskRequest = (teamId, projectId, boardId, task) => {
  return new Promise((resolve, reject) => {
    postRequest(PATH_TASK, {
      teamId,
      projectId,
      boardId,
      panelId: task.panelId,
      title: task.title,
      content: task.content,
      priority: task.priority,
      assignUser: task.assignUser,
      startDate: task.startDate,
      deadline: task.deadline,
      functionName: FUNCTION_CODE_WALL
    }).then(result => {
      resolve(result)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * タスクを更新する
 * @param {string} teamId チームID
 * @param {string} projectId プロジェクトID
 * @param {string} boardId ボードID
 * @param {string} tasks タスク一覧
 * @returns {object} Promiseオブジェクト
 * @resolve {object} 結果
 * @reject {object} エラー情報
 */
const putTaskRequest = (teamId, projectId, boardId, tasks) => {
  return new Promise((resolve, reject) => {
    console.log('update task')
    console.log(tasks)
    resolve()
    // putRequest(PATH_TASK, {
    //   teamId,
    //   projectId,
    //   boardId,
    //   tasks
    // }).then(result => {
    //   resolve(result)
    // }).catch(error => {
    //   reject(error)
    // })
  })
}

/**
 * タスクを削除する
 * @param {string} teamId チームID
 * @param {string} projectId プロジェクトID
 * @param {string} boardId ボードID
 * @param {string} taskId タスクID
 * @returns {object} Promiseオブジェクト
 * @resolve {object} 結果
 * @reject {object} エラー情報
 */
const deleteTaskRequest = (teamId, projectId, boardId, taskId) => {
  return new Promise((resolve, reject) => {
    console.log(taskId)
    resolve()
    // deleteRequest(PATH_TASK, {
    //   teamId,
    //   projectId,
    //   boardId,
    //   taskId
    // }).then(result => {
    //   resolve(result)
    // }).catch(error => {
    //   reject(error)
    // })
  })
}


export default {
  getBoardListRequest,
  postBoardRequest,
  putBoardRequest,
  deleteBoardRequest,
  getPanelTaskListRequest,
  getPanelListRequest,
  postPanelRequest,
  putPanelRequest,
  deletePanelRequest,
  getTaskRequest,
  postTaskRequest,
  putTaskRequest,
  deleteTaskRequest
}