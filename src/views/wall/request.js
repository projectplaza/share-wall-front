import { getRequest, postRequest, putRequest, deleteRequest } from "../../utils/apiUtil"
import { PATH_BOARD_LIST, PATH_BOARD, PATH_PANEL_TASK_LIST, PATH_PANEL_LIST, PATH_TASK_LIST, PATH_TASK } from "../../constants/apiConstant"
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
    resolve([
      {
        "teamId": "project-plaza",
        "projectId": "share-wall",
        "boardId": "1",
        "boardName": "開発"
      },
      {
        "teamId": "project-plaza",
        "projectId": "share-wall",
        "boardId": "2",
        "boardName": "企画"
      }
    ])
    // getRequest(PATH_BOARD_LIST, {
    //   teamId,
    //   projectId
    // }).then(result => {
    //   resolve(result)
    // }).catch(error => {
    //   reject(error)
    // })
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
    deleteRequest(PATH_BOARD, {
      teamId,
      projectId,
      boardId,
      functionName: FUNCTION_CODE_WALL
    }).then(result => {
      resolve(result)
    }).catch(error => {
      reject(error)
    })
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
    resolve([
      {
        "boardId": "1",
        "panelId": "1",
        "panelName": "新規",
        "task": [
          {
            "taskId": "1",
            "title": "タイトル",
            "priority": "優先度",
            "assignUser": "担当者",
            "startDate": "開始日",
            "deadline": "期限日",
          },
          {
            "taskId": "2",
            "title": "タイトル",
            "priority": "優先度",
            "assignUser": "担当者",
            "startDate": "開始日",
            "deadline": "期限日",
          }
        ]
      },
      {
        "boardId": "1",
        "panelId": "2",
        "panelName": "進行中",
        "task": [
          {
            "taskId": "3",
            "title": "タイトル",
            "priority": "優先度",
            "assignUser": "担当者",
            "startDate": "開始日",
            "deadline": "期限日",
          },
          {
            "taskId": "4",
            "title": "タイトル",
            "priority": "優先度",
            "assignUser": "担当者",
            "startDate": "開始日",
            "deadline": "期限日",
          }
        ]
      }
    ])
    // getRequest(PATH_PANEL_TASK_LIST, {
    //   teamId,
    //   projectId,
    //   boardId
    // }).then(result => {
    //   resolve(result)
    // }).catch(error => {
    //   reject(error)
    // })
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
    putRequest(PATH_PANEL, {
      teamId,
      projectId,
      boardId,
      panels,
      functionName: FUNCTION_CODE_WALL
    }).then(result => {
      resolve(result)
    }).catch(error => {
      reject(error)
    })
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
    deleteRequest(PATH_PANEL, {
      teamId,
      projectId,
      boardId,
      panelId
    }).then(result => {
      resolve(result)
    }).catch(error => {
      reject(error)
    })
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
    resolve({
      "teamId": "project-plaza",
      "projectId": "share-wall",
      "boardId": "1",
      "panelId": "1",
      "taskId": "1",
      "title": "タイトル",
      "priority": "1",
      "assignUser": "yumochi21",
      "startDate": "2019-03-01",
      "deadline": "2019-03-31",
    })
    // getRequest(PATH_TASK, {
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
      task
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
    putRequest(PATH_TASK, {
      teamId,
      projectId,
      boardId,
      tasks
    }).then(result => {
      resolve(result)
    }).catch(error => {
      reject(error)
    })
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
    deleteRequest(PATH_TASK, {
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