import { mapMutations } from "vuex";
import { ROUTE_NAME_DESIGN_DOCUMENT } from '../../router'
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
      content: ''
    }
  }),

  methods: {

    // フォルダ設定ダイアログ表示ボタンクリックイベントハンドラ
    handleShowFolderSettingDialogButtonClick: function() { handleShowFolderSettingDialogButtonClick(this) },

    // フォルダ作成ダイアログ表示ボタンクリックイベントハンドラ
    handleShowFolderCreateDialogButtonClick: function () { handleShowFolderCreateDialogButtonClick(this) },
    // フォルダ作成ボタンクリックイベントハンドラ
    handleFolderCreateButtonClick: function () { handleFolderCreateButtonClick(this) },

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

  created: function () { handleCreated(this) },

  watch: {
    // ドキュメントID
    '$route': function (route) { handleWatchRoute(route, this) }
  },

  components: {
    VueMarkdown,
    draggable
  }
};

/**
 * フォルダ設定ダイアログ表示ボタンクリックイベントハンドラ
 * @param {object} _this 
 */
const handleShowFolderSettingDialogButtonClick = (_this) => {

  // 設定用のフォルダオブジェクトを作成
  const folders = _this.leftMenu.folders.map(f => {
    console.log(f)
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
 * フォルダ作成ダイアログ表示ボタンクリックイベントハンドラ
 * @param {object} _this 
 */
const handleShowFolderCreateDialogButtonClick = (_this) => {
  // フォルダ作成ダイアログを表示
  _this.$set(_this.dialog.folderCreate, 'visible', true)
}

/**
 * フォルダ作成イベントハンドラ
 * @param {object} _this 
 */
const handleFolderCreateButtonClick = (_this) => {
  // フォルダ作成リクエストを送信
  ddRequest.postFolderRequest(_this.common.teamId, _this.common.projectId, _this.dialog.folderCreate.folderName).then((result) => {

    // 現在のフォルダ一覧を取得
    const folders = _this.leftMenu.folders

    // 先頭に新しいフォルダを追加
    folders.unshift({
      folderId: result.folderId,
      folderName: result.folderName,
      className: { opened: false }
    })

    // 新しいフォルダ一覧をVueデータに設定
    _this.$set(_this.leftMenu, 'folders', folders)

    // ダイアログを非表示
    _this.$set(_this.dialog.folderCreate, 'visible', false)
    // ダイアログの入力項目を初期化
    _this.$set(_this.dialog.folderCreate, 'folderName', '')
  })
}

/**
 * Routerの監視イベントハンドラ
 * ドキュメントの表示切り替え処理を行う
 * @param {object} route 
 * @param {object} _this 
 */
const handleWatchRoute = (route, _this) => {

  const documentId = route.params.documentId

  if (documentId == null) {
    // TODO NOT FOUNDエラー
    return
  }

  // ドキュメントを取得
  ddRequest.getDocumentRequest(_this.common.teamId, _this.common.projectId, documentId).then(function (doc) {

    if (folderList === null || folderList.length === 0) {
      // Vueデータに空のリストを設定
      _this.$set(_this.leftMenu, 'folders', [])
      return
    }

    // ドキュメント情報をVueデータに設定
    _this.$set(_this.document, 'folderId', doc.folderId)
    _this.$set(_this.document, 'documentId', doc.documentId)
    _this.$set(_this.document, 'documentName', doc.documentName)
    _this.$set(_this.document, 'content', doc.content)

    // 画面オブジェクト用にドキュメント情報を整形
    const docmentsView = _this.leftMenu.documents.map(d => {
      return {
        documentId: d.documentId,
        documentName: d.documentName,
        className: { selected: (d.documentId === doc.documentId) ? true : false }
      }
    })

    // Vueデータにドキュメント一覧を設定
    _this.$set(_this.leftMenu, 'documents', docmentsView)
  })
}

/**
 * 画面作成イベントハンドラ
 * @param {*} _this 
 */
const handleCreated = (_this) => {

  // URIパラメタを取得
  const teamId = _this.$route.params.teamId
  const projectId = _this.$route.params.projectId
  const documentId = _this.$route.params.documentId

  // 取得したパラメタをVueデータに設定
  _this.common.teamId = teamId
  _this.common.projectId = projectId
  _this.document.documentId = documentId

  // design-document-homeのURLにアクセスした場合
  if (documentId == null) {
    setFolderList(_this)
  }
  // design-documentのURLにアクセスした場合
  else {
    initDocument(_this)
  }
}

/**
 * design-document-homeのURLにアクセスした場合の初期化処理
 * @param {object} _this 
 */
const setFolderList = (_this) => {

  ddRequest.getFolderListRequest(_this.common.teamId, _this.common.projectId).then(function (folderList) {

    if (folderList === null || folderList.length === 0) {
      // Vueデータに空のリストを設定
      _this.$set(_this.leftMenu, 'folders', [])
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

    // フォルダ情報をVueデータに設定
    _this.$set(_this.leftMenu, 'folders', folderListView)
  })
}

/**
 * design-documentのURLにアクセスした場合の初期化処理
 * @param {object} _this
 */
const initDocument = (_this) => {

  // ドキュメントIDを元にドキュメントを検索
  ddRequest.getDocumentRequest(_this.common.teamId, _this.common.projectId, _this.document.documentId).then(function (doc) {

    if (doc == null) {
      // TODO NOT FOUNDエラー
      return
    }

    // ドキュメント情報をVueデータに設定
    _this.$set(_this.document, 'folderId', doc.folderId)
    _this.$set(_this.document, 'documentId', doc.documentId)
    _this.$set(_this.document, 'documentName', doc.documentName)
    _this.$set(_this.document, 'content', doc.content)

    // フォルダ一覧を取得
    ddRequest.getFolderListRequest(_this.common.teamId, _this.common.projectId).then(function (folderList) {

      if (folderList == null || folderList.length === 0) {
        // Vueデータに空のリストを設定
        _this.$set(_this.leftMenu, 'folders', [])
        return
      }

      // 画面用オブジェクトを作成
      const folderListView = folderList.map(folder => {
        return {
          folderId: folder.folderId,
          folderName: folder.folderName,
          className: { opened: (folder.folderId === doc.folderId) ? true : false }
        }
      })

      // フォルダ情報をVueデータに設定
      _this.$set(_this.leftMenu, 'folders', folderListView)
    })

    // ドキュメント一覧を取得
    ddRequest.getDocumentListRequest(_this.common.teamId, _this.common.projectId, document.folderId).then(function (documentList) {

      if (documentList == null || documentList.length === 0) {
        // Vueデータに空のリストを設定
        _this.$set(_this.leftMenu, 'documents', [])
        return
      }

      // 画面用オブジェクトを作成
      const documentListView = documentList.map(d => {
        return {
          documentId: d.documentId,
          documentName: d.documentName,
          className: { selected: (d.documentId === doc.documentId) ? true : false }
        }
      })

      // ドキュメント情報をVueデータに設定
      _this.$set(_this.leftMenu, 'documents', documentListView)
    })
  })
}

export default designDocumentApp;