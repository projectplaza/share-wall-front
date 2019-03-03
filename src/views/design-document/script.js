import { mapMutations } from "vuex";
import VueMarkdown from "vue-markdown";
import draggable from "vuedraggable";
import { ROUTE_NAME } from '../../router'

import handler from './handler'

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
    ROUTE_NAME: ROUTE_NAME,
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
    handleFolderClick: function (folderId) { handler.handleFolderClick(this, folderId) },

    // ドキュメント作成イベントハンドラ
    handleDocumentCreateClick: function () { handler.handleDocumentCreateClick(this) },
    // ドキュメント表示イベントハンドラ
    handleDocumentClick: function (documentId) { handler.handleDocumentClick(this, documentId) },
    // ドキュメント編集ボタンクリックイベントハンドラ
    handleDocumentEditClick: function () { handler.handleDocumentEditClick(this) },
    // ドキュメント編集キャンセルボタンクリックイベントハンドラ
    handleDocumentEditCancelClick: function () { handler.handleDocumentEditCancelClick(this) },
    // ドキュメント保存ボタンクリックイベントハンドラ
    handleDocumentSaveClick: function () { handler.handleDocumentSaveClick(this) },

    // フォルダ設定ダイアログ表示ボタンクリックイベントハンドラ
    handleShowFolderSettingDialogButtonClick: function () { handler.handleShowFolderSettingDialogButtonClick(this) },
    // フォルダ削除ボタンクリックイベントハンドラ
    handleDeleteFolderButtonClick: function (folderId) { handler.handleDeleteFolderButtonClick(this, folderId) },
    // フォルダ設定保存ボタンクリックイベントハンドラ
    handleUpdateFolderSettingButtonClick: function () { handler.handleUpdateFolderSettingButtonClick(this) },
    // フォルダ設定キャンセルボタンクリックイベントハンドラ
    handleFolderSettingCancelButtonClick: function () { handler.handleFolderSettingCancelButtonClick(this) },

    // フォルダ作成ダイアログ表示ボタンクリックイベントハンドラ
    handleShowFolderCreateDialogButtonClick: function () { handler.handleShowFolderCreateDialogButtonClick(this) },
    // フォルダ作成ボタンクリックイベントハンドラ
    handleFolderCreateButtonClick: function () { handler.handleFolderCreateButtonClick(this) },
    // フォルダ作成ダイアログのキャンセルボタンクリックイベントハンドラ
    handleFolderCreateCancelButtonClick: function () { handler.handleFolderCreateCancelButtonClick(this) },

    // ドキュメント削除ダイアログ表示イベントハンドラ
    handleShowDeleteDialogClick: function () { handler.handleShowDeleteDialogClick(this) },
    // ドキュメント削除ボタンクリックイベントハンドラ
    handleDocumentDeleteButtonClick: function () { handler.handleDocumentDeleteButtonClick(this) },
    // ドキュメント削除キャンセルボタンクリックイベントハンドラ
    handleDocumentDeleteCancelClick: function () { handler.handleDocumentDeleteCancelClick(this) },

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
    },
    compiledMarkdown: function () { return handler.computedCompiledMarkdown(this) }
  },

  created: function () { handler.init(this) },

  components: {
    VueMarkdown,
    draggable
  }
}

export default designDocumentApp;