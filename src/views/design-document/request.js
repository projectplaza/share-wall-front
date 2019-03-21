import { getRequest, postRequest, putRequest, deleteRequest } from "../../utils/apiUtil"
import { PATH_DESIGN_DOCUMENT_FOLDER_LIST, PATH_DESIGN_DOCUMENT_FOLDER, PATH_DESIGN_DOCUMENT_DOCUMENT_LIST, PATH_DESIGN_DOCUMENT_DOCUMENT } from "../../constants/apiConstant"
import { FUNCTION_CODE_DESIGN_DOCUMENT } from "../../constants/functionCodeConstant"

/**
 * フォルダ一覧を取得する
 * @param {string} teamId チームID
 * @param {string} projectId プロジェクトID
 * @returns {object} Promiseオブジェクト
 * @resolve {object} フォルダ一覧 
 * @reject {object} エラー情報
 */
const getFolderListRequest = (teamId, projectId) => {
  return new Promise((resolve, reject) => {
    getRequest(PATH_DESIGN_DOCUMENT_FOLDER_LIST, {
      teamId: teamId,
      projectId: projectId
    }).then((folderList) => {
      resolve(folderList)
    }).catch((error) => {
      reject(error)
    })
  })
}

/**
 * フォルダを登録する
 * @param {string} teamId チームID
 * @param {string} projectId プロジェクトID
 * @param {string} folderName フォルダ名
 * @returns {object} Promiseオブジェクト
 * @resolve {object} 実行結果
 * @reject {object} エラー情報
 */
const postFolderRequest = (teamId, projectId, folderName) => {
  return new Promise((resolve, reject) => {
    postRequest(PATH_DESIGN_DOCUMENT_FOLDER, {
      teamId: teamId,
      projectId: projectId,
      folderName: folderName,
      functionName: FUNCTION_CODE_DESIGN_DOCUMENT
    }).then((result) => {
      resolve(result)
    }).catch((error) => {
      reject(error)
    })
  })
}

/**
 * フォルダ名を一括更新する
 * @param {string} teamId チームID
 * @param {string} projectId プロジェクトID
 * @param {array} folderList フォルダ情報リスト
 * @returns {object} Promiseオブジェクト
 * @resolve {object} 実行結果
 * @reject {object} エラー情報
 */
const putFolderListRequest = (teamId, projectId, folderList) => {
  return new Promise((resolve, reject) => {
    let promiseArray = []

    for (let i = 0; i < folderList.length; i++) {
      const folderObj = folderList[i]

      if (folderObj.deleted) {
        promiseArray.push(createFolderDeletePromise(teamId, projectId, folderObj.folderId))
      } else {
        promiseArray.push(createFolderUpdatePromise(teamId, projectId, folderObj))
      }
    }

    Promise.all(promiseArray).then((resultList) => {
      resolve(resultList)
    }).catch((errorList) => {
      reject(errorList)
    })
  })
}

/**
 * フォルダ名を更新するPromiseオブジェクトを作成する
 * @param {string} teamId チームID
 * @param {string} projectId プロジェクトID
 * @param {object} folderObj フォルダ情報
 * @returns {object} Promiseオブジェクト
 * @resolve {object} 実行結果
 * @reject {object} エラー情報
 */
const createFolderUpdatePromise = (teamId, projectId, folderObj) => {
  return new Promise((resolve, reject) => {
    putRequest(PATH_DESIGN_DOCUMENT_FOLDER, {
      teamId: teamId,
      projectId: projectId,
      folderId: folderObj.folderId,
      folderName: folderObj.folderName,
      functionName: FUNCTION_CODE_DESIGN_DOCUMENT
    }).then((documentList) => {
      resolve(documentList)
    }).catch((error) => {
      reject(error)
    })
  })
}

/**
 * フォルダを削除するPromiseオブジェクトを作成する
 * @param {string} teamId チームID
 * @param {string} projectId プロジェクトID
 * @param {object} folderId フォルダID
 * @returns {object} Promiseオブジェクト
 * @resolve {object} 実行結果
 * @reject {object} エラー情報
 */
const createFolderDeletePromise = (teamId, projectId, folderId) => {
  return new Promise((resolve, reject) => {
    deleteRequest(PATH_DESIGN_DOCUMENT_FOLDER, {
      teamId: teamId,
      projectId: projectId,
      folderId: folderId,
      functionName: FUNCTION_CODE_DESIGN_DOCUMENT
    }).then((result) => {
      resolve(result)
    }).catch((error) => {
      reject(error)
    })
  })
}

/**
 * フォルダの順序を並び替える
 * @param {string} teamId チームID
 * @param {string} projectId プロジェクトID
 * @param {array} folderList フォルダ情報リスト
 * @returns {object} Promiseオブジェクト
 * @resolve {object} 実行結果
 * @reject {object} エラー情報
 */
const reorderFolderRequest = (teamId, projectId, folderList) => {
  return new Promise((resolve, reject) => {
    let promiseArray = []

    for (let i = 0; i < folderList.length; i++) {
      promiseArray.push(createFolderOrderPromise(teamId, projectId, folderList[i], i + 1))
    }

    Promise.all(promiseArray).then((resultList) => {
      resolve(resultList)
    }).catch((errorList) => {
      reject(errorList)
    })
  })
}

/**
 * フォルダの順序を更新するPromiseオブジェクトを作成する
 * @param {string} teamId チームID
 * @param {string} projectId プロジェクトID
 * @param {object} folderObj ドキュメント情報
 * @param {number} order 順序番号 
 * @returns {object} Promiseオブジェクト
 * @resolve {object} 実行結果
 * @reject {object} エラー情報
 */
const createFolderOrderPromise = (teamId, projectId, folderObj, order) => {
  return new Promise((resolve, reject) => {
    putRequest(PATH_DESIGN_DOCUMENT_FOLDER, {
      teamId: teamId,
      projectId: projectId,
      folderId: folderObj.folderId,
      order: order,
      functionName: FUNCTION_CODE_DESIGN_DOCUMENT
    }).then((result) => {
      resolve(result)
    }).catch((error) => {
      reject(error)
    })
  })
}

/**
 * ドキュメント一覧を取得する
 * @param {string} teamId チームID
 * @param {string} projectId プロジェクトID
 * @param {string} folderId フォルダID
 * @returns {object} Promiseオブジェクト
 * @resolve {object} ドキュメント一覧
 * @reject {object} エラー情報
 */
const getDocumentListRequest = (teamId, projectId, folderId) => {
  return new Promise((resolve, reject) => {
    getRequest(PATH_DESIGN_DOCUMENT_DOCUMENT_LIST, {
      teamId: teamId,
      projectId: projectId,
      folderId: folderId
    }).then((documentList) => {
      resolve(documentList)
    }).catch((error) => {
      reject(error)
    })
  })
}

/**
 * ドキュメント本文を取得する
 * @param {string} teamId チームID
 * @param {string} projectId プロジェクトID
 * @param {string} folderId フォルダID
 * @param {string} documentId ドキュメントID
 * @returns {object} Promiseオブジェクト
 * @resolve {object} ドキュメント情報 
 * @reject {object} エラー情報
 */
const getDocumentRequest = (teamId, projectId, folderId, documentId) => {
  return new Promise((resolve, reject) => {
    getRequest(PATH_DESIGN_DOCUMENT_DOCUMENT, {
      teamId: teamId,
      projectId: projectId,
      documentId: documentId
    }).then((documentInfo) => {
      resolve(documentInfo)
    }).catch((error) => {
      reject(error)
    })
  })
}

/**
 * ドキュメントを登録する
 * @param {string} teamId チームID
 * @param {string} projectId プロジェクトID
 * @param {string} folderId フォルダID
 * @param {string} documentName ドキュメント名
 * @returns {object} Promiseオブジェクト
 * @resolve {object} 実行結果
 * @reject {object} エラー情報
 */
const postDocumentRequest = (teamId, projectId, folderId, documentName) => {
  return new Promise((resolve, reject) => {
    postRequest(PATH_DESIGN_DOCUMENT_DOCUMENT, {
      teamId: teamId,
      projectId: projectId,
      folderId: folderId,
      documentName: documentName,
      functionName: FUNCTION_CODE_DESIGN_DOCUMENT
    }).then((result) => {
      resolve(result)
    }).catch((error) => {
      reject(error)
    })
  })
}

/**
 * ドキュメントを更新する
 * @param {string} teamId チームID
 * @param {string} projectId プロジェクトID
 * @param {object} documentInfo ドキュメント情報
 * @returns {object} Promiseオブジェクト
 * @resolve {object} 実行結果
 * @reject {object} エラー情報
 */
const putDocumentRequest = (teamId, projectId, documentInfo) => {
  return new Promise((resolve, reject) => {
    putRequest(PATH_DESIGN_DOCUMENT_DOCUMENT, {
      teamId: teamId,
      projectId: projectId,
      folderId: documentInfo.folderId,
      documentId: documentInfo.documentId,
      documentName: documentInfo.documentName,
      content: documentInfo.content,
      functionName: FUNCTION_CODE_DESIGN_DOCUMENT
    }).then((result) => {
      resolve(result)
    }).catch((error) => {
      reject(error)
    })
  })
}

/**
 * ドキュメントを削除する
 * @param {string} teamId チームID
 * @param {string} projectId プロジェクトID
 * @param {string} folderId フォルダID
 * @param {string} documentId ドキュメントID
 * @returns {object} Promiseオブジェクト
 * @resolve {object} 実行結果
 * @reject {object} エラー情報
 */
const deleteDocumentRequest = (teamId, projectId, folderId, documentId) => {
  return new Promise((resolve, reject) => {
    deleteRequest(PATH_DESIGN_DOCUMENT_DOCUMENT, {
      teamId: teamId,
      projectId: projectId,
      folderId: folderId,
      documentId: documentId,
      functionName: FUNCTION_CODE_DESIGN_DOCUMENT
    }).then((result) => {
      resolve(result)
    }).catch((error) => {
      reject(error)
    })
  })
}

/**
 * ドキュメントの順序を並び替える
 * @param {string} teamId チームID
 * @param {string} projectId プロジェクトID
 * @param {array} documentList ドキュメント情報リスト
 * @returns {object} Promiseオブジェクト
 * @resolve {object} 実行結果
 * @reject {object} エラー情報
 */
const reorderDocumentRequest = (teamId, projectId, documentList) => {
  return new Promise((resolve, reject) => {
    let promiseArray = []

    for (let i = 0; i < documentList.length; i++) {
      promiseArray.push(createDocumentOrderPromise(teamId, projectId, documentList[i], i + 1))
    }

    Promise.all(promiseArray).then((resultList) => {
      resolve(resultList)
    }).catch((errorList) => {
      reject(errorList)
    })
  })
}

/**
 * ドキュメントの順序を更新するPromiseオブジェクトを作成する
 * @param {string} teamId チームID
 * @param {string} projectId プロジェクトID
 * @param {object} documentObj ドキュメント情報
 * @param {number} order 順序番号
 * @returns {object} Promiseオブジェクト
 * @resolve {object} 実行結果
 * @reject {object} エラー情報
 */
const createDocumentOrderPromise = (teamId, projectId, documentObj, order) => {
  return new Promise((resolve, reject) => {
    putRequest(PATH_DESIGN_DOCUMENT_DOCUMENT, {
      teamId: teamId,
      projectId: projectId,
      documentId: documentObj.documentId,
      order: order,
      functionName: FUNCTION_CODE_DESIGN_DOCUMENT
    }).then((result) => {
      resolve(result)
    }).catch((error) => {
      reject(error)
    })
  })
}

export default {
  getFolderListRequest,
  postFolderRequest,
  putFolderListRequest,
  reorderFolderRequest,
  getDocumentListRequest,
  getDocumentRequest,
  postDocumentRequest,
  putDocumentRequest,
  deleteDocumentRequest,
  reorderDocumentRequest
}