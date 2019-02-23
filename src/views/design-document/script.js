import { mapMutations } from "vuex";
import { ROUTE_NAME_DESIGN_DOCUMENT } from '../../router'
import VueMarkdown from "vue-markdown";
import draggable from "vuedraggable";
import { PATH_DESIGN_DOCUMENT_FOLDER_LIST, PATH_DESIGN_DOCUMENT_FOLDER, PATH_DESIGN_DOCUMENT_DOCUMENT_LIST, PATH_DESIGN_DOCUMENT_DOCUMENT } from "../../constants/apiConstant"
import { FUNCTION_CODE_DESIGN_DOCUMENT } from "../../constants/functionCodeConstant"
import { getRequest, postRequest, putRequest, deleteRequest } from "../../utils/apiUtil"

const folders = [
  { code: "000001", name: "要件定義書", className: { opened: false } }
]

const files = [
  { code: "000001", name: "DesignDocument機能", className: { selected: false } }
]

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
      promiseArray.push(createFolderOrderPromise(teamId, projectId, folderList[i], i))
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
 * @returns {object} Promiseオブジェクト
 * @resolve {object} ドキュメント一覧
 * @reject {object} エラー情報
 */
const getDocumentListRequest = (teamId, projectId) => {
  return new Promise((resolve, reject) => {
    getRequest(PATH_DESIGN_DOCUMENT_DOCUMENT_LIST, {
      teamId: teamId,
      projectId: projectId
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
 * @param {string} documentId ドキュメントID
 * @returns {object} Promiseオブジェクト
 * @resolve {object} ドキュメント情報 
 * @reject {object} エラー情報
 */
const getDocumentRequest = (teamId, projectId, documentId) => {
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
 * @param {string} documentName ドキュメント名
 * @returns {object} Promiseオブジェクト
 * @resolve {object} 実行結果
 * @reject {object} エラー情報
 */
const postDocumentRequest = (teamId, projectId, documentName) => {
  return new Promise((resolve, reject) => {
    postRequest(PATH_DESIGN_DOCUMENT_DOCUMENT, {
      teamId: teamId,
      projectId: projectId,
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
      documentId: documentInfo.documentId,
      documentName: documentInfo.documentName,
      content: documentInfo.source,
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
 * @param {string} documentId ドキュメントID
 * @returns {object} Promiseオブジェクト
 * @resolve {object} 実行結果
 * @reject {object} エラー情報
 */
const deleteDocumentRequest = (teamId, projectId, documentId) => {
  return new Promise((resolve, reject) => {
    deleteRequest(PATH_DESIGN_DOCUMENT_DOCUMENT, {
      teamId: teamId,
      projectId: projectId,
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
      promiseArray.push(createDocumentOrderPromise(teamId, projectId, documentList[i], i))
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

/**
 * Vueオブジェクト
 */
const designDocumentApp = {
  name: "design-document",

  data: () => ({
    display: {
      ready: false,
      mode: 'view'
    },
    common: {
      teamId: null,
      projectId: null
    },
    leftMenu: {
      folders: null,
      document: null,
    },
    dialog: {
      folder: false,
      folderCreate: false,
      documentDelete: false
    },
    document: {
      documentId: null,
      source: ''
    }
  }),

  methods: {
    // Vuex mutations
    ...mapMutations("common", ["showProgressBar", "hideProgressBar"])
  },

  computed: {
    options: () => ({
      animation: 70,
      group: 'description',
      dragClass: 'dragging'
    }),
    boxStyle: function () {
      return (this.display.mode === 'edit') ? { width: '50%', display: 'inline-block' } : { width: '100%' }
    }
  },

  created: function () {

    // URIパラメタを取得
    const teamId = this.$route.params.teamId
    const projectId = this.$route.params.projectId
    const documentId = this.$route.params.documentId

    // 取得したパラメタをVueデータに設定
    this.common.teamId = teamId
    this.common.projectId = projectId
    this.document.documentId = documentId

    // フォルダ一覧を取得
    getFolderListRequest(teamId, projectId).then(function (folderList) {

      if (folderList === null || folderList.length === 0) {
        // Vueデータに空のリストを設定
        this.$set(this.leftMenu, 'folders', [])
        return
      }

      // 画面用オブジェクトを作成
      const folderListView = folderList.map(folder => {
        return {
          folderId: folder.folderId,
          folderName: folder.folderName,
          className: { opened: false }
        }
      })

      if (documentId === null) {
        // 最初のフォルダを開いた状態に変更
        folderListView[0].className.opened = true
      }

      // フォルダ情報をVueデータに設定
      this.$set(this.leftMenu, 'folders', folderListView)

      getDocumentListRequest(teamId, projectId, folderList[0].folderId).then(function (documentList) {

        if (documentList === null || documentList.length === 0) {
          // Vueデータに空のリストを設定
          this.$set(this.leftMenu, 'documents', [])
        }

        const documentListView = documentList.map(document => {
          return {
            folderId: document.folderId,
            documentId: document.documentId,
            documentName: document.documentName,
            className: { selected: false }
          }
        })

        if (documentId === null) {
          // 最初のドキュメントを開いた状態に変更
          documentListView[0].className.selected = true
        }

        // ドキュメント情報をVueデータに設定
        this.$set(this.leftMenu, 'documents', documentListView)

        // RouterへURLをPush
        this.$router.push({
          name: ROUTE_NAME_DESIGN_DOCUMENT,
          params: {
            teamId: teamId,
            projectId: projectId,
            documentId: documentId
          }
        })
      })
    })
  },

  watch: {

    // ドキュメントID
    'document.documentId': function(documentId) {
      
      // ドキュメントを取得
      getDocumentRequest(teamId, projectId, documentId).then(function(documentInfo) {
        
        // ドキュメント本文を設定
        this.$set(this.document, 'source', documentInfo.content)

        const folders = this.leftMenu.folders
        const documents = this.leftMenu.documents

        const folder = folders.filter(folder => folder.folderId === documentInfo.folderId)
        folder.opened = true

        const document = documents.filter(document => document.documentId === documentInfo.documentId)
        document.selected = true
      })
    }
  },

  components: {
    VueMarkdown,
    draggable
  }
};

export default designDocumentApp;