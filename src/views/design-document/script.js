import { mapMutations } from "vuex";
import $ from 'jquery'
import { ROUTE_NAME } from '../../router'
import VueMarkdown from "vue-markdown";
import draggable from "vuedraggable";
import ddRequest from './request'

const folders = [
  { code: "000001", name: "要件定義書", className: { opened: false } }
]

const files = [
  { code: "000001", name: "DesignDocument機能", className: { selected: false } }
]

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
      documents: null,
    },
    dialog: {
      folder: {
        visible: false,
        folders: []
      },
      folderCreate: {
        folderName: '',
        visible: false
      },
      documentDelete: { visible: false },
    },
    document: {
      folderId: null,
      documentId: null,
      documentName: null,
      content: '',
      backup: ''
    }
  }),

  methods: {

    // フォルダ選択イベントハンドラ
    handleFolderClick: function (folderId) { handleFolderClick(this, folderId) },

    // ドキュメント作成イベントハンドラ
    handleDocumentCreateClick: function () { handleDocumentCreateClick(this) },
    // ドキュメント表示イベントハンドラ
    handleDocumentClick: function(documentId) { handleDocumentClick(this, documentId) },
    // ドキュメント編集ボタンクリックイベントハンドラ
    handleDocumentEditClick: function() { handleDocumentEditClick(this) },
    // ドキュメント編集キャンセルボタンクリックイベントハンドラ
    handleDocumentEditCancelClick: function() { handleDocumentEditCancelClick(this) },
    // ドキュメント保存ボタンクリックイベントハンドラ
    handleDocumentSaveClick: function() { handleDocumentSaveClick(this) },

    // フォルダ設定ダイアログ表示ボタンクリックイベントハンドラ
    handleShowFolderSettingDialogButtonClick: function () { handleShowFolderSettingDialogButtonClick(this) },
    // フォルダ削除ボタンクリックイベントハンドラ
    handleDeleteFolderButtonClick: function (folderId) { handleDeleteFolderButtonClick(this, folderId) },
    // フォルダ設定保存ボタンクリックイベントハンドラ
    handleUpdateFolderSettingButtonClick: function () { handleUpdateFolderSettingButtonClick(this) },
    // フォルダ設定キャンセルボタンクリックイベントハンドラ
    handleFolderSettingCancelButtonClick: function () { handleFolderSettingCancelButtonClick(this) },

    // フォルダ作成ダイアログ表示ボタンクリックイベントハンドラ
    handleShowFolderCreateDialogButtonClick: function () { handleShowFolderCreateDialogButtonClick(this) },
    // フォルダ作成ボタンクリックイベントハンドラ
    handleFolderCreateButtonClick: function () { handleFolderCreateButtonClick(this) },
    // フォルダ作成ダイアログのキャンセルボタンクリックイベントハンドラ
    handleFolderCreateCancelButtonClick: function () { handleFolderCreateCancelButtonClick(this) },

    // ドキュメント削除ダイアログ表示イベントハンドラ
    handleShowDeleteDialogClick: function() { handleShowDeleteDialogClick(this) },
    // ドキュメント削除ボタンクリックイベントハンドラ
    handleDocumentDeleteButtonClick: function() {handleDocumentDeleteButtonClick(this)},
    // ドキュメント削除キャンセルボタンクリックイベントハンドラ
    handleDocumentDeleteCancelClick: function() {handleDocumentDeleteCancelClick(this)},

    // Vuex mutations
    ...mapMutations("common", ["showProgressBar", "hideProgressBar", 'changeCurrentTeam', 'changeCurrentProject'])
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

  created: function () { init(this) },

  components: {
    VueMarkdown,
    draggable
  }
};

/**
 * フォルダ選択イベントハンドラ
 * @param {object} _this 
 * @param {string} folderId フォルダID
 */
const handleFolderClick = (_this, folderId) => {

  _this.showProgressBar()
  
  _this.leftMenu.folders.map(folder => {
    if (folder.folderId == folderId) {
      folder.className.opened = true
      _this.$set(_this.document, 'folderId', folderId)
      _this.$set(_this.document, 'documentId', null)
      _this.$set(_this.document, 'documentName', null)
      _this.$set(_this.document, 'content', '')
    } else {
      folder.className.opened = false
    }
  })

  ddRequest.getDocumentListRequest(_this.common.teamId, _this.common.projectId, folderId).then(documents => {
    _this.$set(_this.leftMenu, 'documents', documents)

    _this.$router.push({
      name: ROUTE_NAME.DESIGN_DOCUMENT_FOLDER,
      params: {
        teamId: _this.common.teamId,
        projectId: _this.common.projectId,
        folderId: folderId
      }
    })

    _this.hideProgressBar()
  })
}

/**
 * ドキュメント作成クリックイベントハンドラ
 * @param {object} _this 
 */
const handleDocumentCreateClick = (_this) => {

  _this.showProgressBar()

  ddRequest.postDocumentRequest(_this.common.teamId, _this.common.projectId, _this.document.folderId, 'New document').then(document => {
    const documents = _this.leftMenu.documents.map(d => {
      return {
        documentId: d.documentId,
        documentName: d.documentName,
        className: {
          selected: false
        }
      }
    })
    documents.unshift({
      documentId: document.documentId,
      documentName: document.documentName,
      className: { selected: true }
    })

    _this.$set(_this.leftMenu, 'documents', documents)
    _this.$set(_this.document, 'folderId', document.folderId)
    _this.$set(_this.document, 'documentId', document.documentId)
    _this.$set(_this.document, 'documentName', document.documentName)
    _this.$set(_this.document, 'content', document.content)
    _this.$set(_this.display, 'mode', 'edit')

    _this.hideProgressBar()

    _this.$router.push({
      name: ROUTE_NAME.DESIGN_DOCUMENT_DOCUMENT_ACTION,
      params: {
        teamId: _this.common.teamId,
        projectId: _this.common.projectId,
        documentId: document.documentId,
        mode: 'edit'
      }
    })

    window.setTimeout(() => {
      $('#document-content').focus()
    }, 500)
  })
}

/**
 * フォルダ設定ダイアログ表示ボタンクリックイベントハンドラ
 * @param {object} _this 
 */
const handleShowFolderSettingDialogButtonClick = (_this) => {

  // 設定用のフォルダオブジェクトを作成
  const folders = _this.leftMenu.folders.map(f => {
    return {
      folderId: f.folderId,
      folderName: f.folderName,
      className: { opened: f.opened },
      deleted: false
    }
  })

  // 設定用のフォルダオブジェクトを設定
  _this.$set(_this.dialog.folder, 'folders', folders)
  // フォルダ設定ダイアログを表示
  _this.$set(_this.dialog.folder, 'visible', true)
}

/**
 * フォルダ削除ボタンクリックイベントハンドラ
 * @param {object} _this 
 * @param {string} folderId フォルダID
 */
const handleDeleteFolderButtonClick = (_this, folderId) => {
  _this.dialog.folder.folders.map(folder => {
    if (folder.folderId === folderId) {
      folder.deleted = true
    }
  })
}

/**
 * フォルダ更新ボタンクリックイベントハンドラ
 * @param {object} _this 
 */
const handleUpdateFolderSettingButtonClick = (_this) => {

  _this.showProgressBar()
  _this.$set(_this.dialog.folder, 'visible', false)

  const folders = _this.dialog.folder.folders
  ddRequest.putFolderListRequest(_this.common.teamId, _this.common.projectId, folders).then(() => {
    const folderList = folders.filter(f => !f.deleted)
    _this.$set(_this.leftMenu, 'folders', folderList)
    _this.hideProgressBar()
  })
}

/**
 * フォルダ設定ダイアログのキャンセルクリックハンドラ
 * @param {object} _this 
 */
const handleFolderSettingCancelButtonClick = (_this) => {
  _this.$set(_this.dialog.folder, 'visible', false)
}

/**
 * フォルダ作成ダイアログ表示ボタンクリックイベントハンドラ
 * @param {object} _this 
 */
const handleShowFolderCreateDialogButtonClick = (_this) => {
  _this.$set(_this.dialog.folderCreate, 'visible', true)
  window.setTimeout(() => {
    $('#input-folder-create').focus()
  }, 500)
}

/**
 * フォルダ作成イベントハンドラ
 * @param {object} _this 
 */
const handleFolderCreateButtonClick = (_this) => {

  _this.$set(_this.dialog.folderCreate, 'visible', false)
  _this.showProgressBar()

  ddRequest.postFolderRequest(_this.common.teamId, _this.common.projectId, _this.dialog.folderCreate.folderName).then((result) => {

    const folders = _this.leftMenu.folders

    folders.unshift({
      folderId: result.folderId,
      folderName: result.folderName,
      className: { opened: false }
    })

    _this.$set(_this.leftMenu, 'folders', folders)
    _this.$set(_this.dialog.folderCreate, 'folderName', '')

    _this.hideProgressBar()
  })
}

/**
 * フォルダ作成ダイアログのキャンセルボタンクリックイベントハンドラ
 * @param {object} _this 
 */
const handleFolderCreateCancelButtonClick = (_this) => {
  _this.$set(_this.dialog.folderCreate, 'visible', false)
  _this.$set(_this.dialog.folderCreate, 'folderName', '')
}

/**
 * ドキュメントを表示する
 * @param {object} _this 
 * @param {string} documentId ドキュメントID
 */
const handleDocumentClick = (_this, documentId) => {
  
  _this.showProgressBar()

  const documents = _this.leftMenu.documents.map(doc => {
    return {
      documentId: doc.documentId,
      documentName: doc.documentName,
      className: {
        selected: (doc.documentId == documentId) ? true : false
      }
    }
  })

  _this.$set(_this.leftMenu, 'documents', documents)

  ddRequest.getDocumentRequest(_this.common.teamId, _this.common.projectId, _this.document.folderId, documentId).then(function (doc) {

    if (doc == null) {
      // TODO NOT FOUNDエラー
      return
    }

    _this.$set(_this.document, 'documentId', doc.documentId)
    _this.$set(_this.document, 'documentName', doc.documentName)
    _this.$set(_this.document, 'content', doc.content)
    _this.$set(_this.display, 'mode', 'view')

    _this.$router.push({
      name: ROUTE_NAME.DESIGN_DOCUMENT_DOCUMENT,
      params: {
        teamId: _this.common.teamId,
        projectId: _this.common.projectId,
        folderId: _this.document.folderId,
        documentId: documentId
      }
    })

    _this.hideProgressBar()
  })
}

/**
 * ドキュメント編集ボタンクリックイベントハンドラ
 * @param {object} _this 
 */
const handleDocumentEditClick = (_this) => {
  _this.$set(_this.display, 'mode', 'edit')
  _this.$set(_this.document, 'backup', _this.document.content)
  _this.$router.push({
    name: ROUTE_NAME.DESIGN_DOCUMENT_DOCUMENT_ACTION,
    params: {
      teamId: _this.common.teamId,
      projectId: _this.common.projectId,
      folderId: _this.document.folderId,
      documentId: _this.document.documentId,
      mode: 'edit'
    }
  })
}

/**
 * ドキュメント編集画面のキャンセルボタンクリックイベントハンドラ
 * @param {object} _this 
 */
const handleDocumentEditCancelClick = (_this) => {
  _this.$set(_this.document, 'content', _this.document.backup)
  _this.$set(_this.document, 'backup', '')
  _this.$set(_this.display, 'mode', 'view')

  _this.$router.push({
    name: ROUTE_NAME.DESIGN_DOCUMENT_DOCUMENT,
    params: {
      teamId: _this.common.teamId,
      projectId: _this.common.projectId,
      folderId: _this.document.folderId,
      documentId: _this.document.documentId
    }
  })
}

/**
 * ドキュメント保存ボタンのクリックイベントハンドラ
 * @param {object} _this 
 */
const handleDocumentSaveClick = (_this) => {
  
  _this.showProgressBar()

  ddRequest.putDocumentRequest(_this.common.teamId, _this.common.projectId, _this.document).then(document => {
    _this.leftMenu.documents.map(doc => {
      if (doc.documentId == _this.document.documentId) {
        doc.documentName = _this.document.documentName
      }
    })
    _this.$set(_this.display, 'mode', 'view')

    _this.$router.push({
      name: ROUTE_NAME.DESIGN_DOCUMENT_DOCUMENT,
      params: {
        teamId: _this.common.teamId,
        projectId: _this.common.projectId,
        folderId: _this.document.folderId,
        documentId: _this.document.documentId
      }
    })

    _this.hideProgressBar()
  })
}

/**
 * ドキュメント削除ダイアログ表示イベントハンドラ
 * @param {object} _this 
 */
const handleShowDeleteDialogClick = (_this) => {
  _this.$set(_this.dialog.documentDelete, 'visible', true)
}

/**
 * ドキュメント削除ボタンクリックイベントハンドラ
 * @param {object} _this 
 */
const handleDocumentDeleteButtonClick = (_this) => {
  
  _this.showProgressBar()

  ddRequest.deleteDocumentRequest(_this.common.teamId, _this.common.projectId, _this.document.folderId, _this.document.documentId).then(result => {

    const documents = _this.leftMenu.documents
    let index = null

    for (let i = 0; i < documents.length; i++) {
      if (documents[i].documentId == _this.document.documentId) {
        index = i
        break
      }
    }

    if (index != null) {
      documents.splice(index, 1)
    }

    _this.$set(_this.leftMenu, 'documents', documents)

    _this.$set(_this.document, 'documentId', null)
    _this.$set(_this.document, 'documentName', null)
    _this.$set(_this.document, 'content', '')

    _this.$set(_this.dialog.documentDelete, 'visible', false)

    _this.$router.push({
      name: ROUTE_NAME.DESIGN_DOCUMENT_FOLDER,
      params: {
        teamId: _this.common.teamId,
        projectId: _this.common.projectId,
        folderId: _this.document.folderId
      }
    })

    _this.hideProgressBar()
  })
}

/**
 * ドキュメント削除のキャンセルボタンクリックハンドラ
 * @param {object} _this 
 */
const handleDocumentDeleteCancelClick = (_this) => {
  _this.$set(_this.dialog.documentDelete, 'visible', false)
}

/**
 * 画面を初期化する
 * @param {object} _this 
 */
const init = (_this) => {

  _this.showProgressBar()

  // URIパラメタを取得
  const teamId = _this.$route.params.teamId
  const projectId = _this.$route.params.projectId
  const folderId = _this.$route.params.folderId
  const documentId = _this.$route.params.documentId
  const mode = _this.$route.params.mode

  _this.changeCurrentTeam(teamId)
  _this.changeCurrentProject(projectId)

  // 取得したパラメタをVueデータに設定
  _this.common.teamId = teamId
  _this.common.projectId = projectId
  _this.document.folderId = folderId
  _this.document.documentId = documentId
  if (mode != null && mode == 'edit') {
    _this.display.mode = 'edit'
  }

  initFolderList(_this)
}

/**
 * フォルダ一覧を設定する
 * @param {object} _this 
 */
const initFolderList = (_this) => {

  ddRequest.getFolderListRequest(_this.common.teamId, _this.common.projectId).then(function (folderList) {

    if (folderList == null || folderList.length === 0) {
      _this.$set(_this.leftMenu, 'folders', [])
      _this.hideProgressBar()
      return
    }

    const folderListView = folderList.map(folder => {
      return {
        folderId: folder.folderId,
        folderName: folder.folderName,
        className: {
          opened: (folder.folderId == _this.document.folderId) ? true : false
        }
      }
    })

    _this.$set(_this.leftMenu, 'folders', folderListView)

    if (_this.document.folderId) {
      initDocumentList(_this)
    } else {
      _this.hideProgressBar()
    }
  })
}

/**
 * ドキュメント一覧を初期化する
 * @param {object} _this 
 */
const initDocumentList = (_this) => {

  ddRequest.getDocumentListRequest(_this.common.teamId, _this.common.projectId, _this.document.folderId).then(documentList => {

    if (documentList == null || documentList.length === 0) {
      _this.$set(_this.leftMenu, 'documents', [])
      _this.hideProgressBar()
      return
    }

    const documentListView = documentList.map(document => {
      return {
        documentId: document.documentId,
        documentName: document.documentName,
        className: {
          selected: (document.documentId == _this.document.documentId) ? true : false
        }
      }
    })

    _this.$set(_this.leftMenu, 'documents', documentListView)

    if (_this.document.documentId) {
      initDocument(_this)
    } else {
      _this.hideProgressBar()
    }
  })
}

/**
 * ドキュメントを初期化する
 * @param {object} _this
 */
const initDocument = (_this) => {

  ddRequest.getDocumentRequest(_this.common.teamId, _this.common.projectId, _this.document.folderId, _this.document.documentId).then(function (doc) {

    if (doc == null) {
      // TODO NOT FOUNDエラー
      _this.hideProgressBar()
      return
    }

    _this.$set(_this.document, 'documentName', doc.documentName)
    _this.$set(_this.document, 'content', doc.content)

    if (_this.display.mode == 'edit') {
      _this.$set(_this.document, 'backup', doc.content)
    }

    _this.hideProgressBar()
  })
}

export default designDocumentApp;