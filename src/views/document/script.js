import { mapMutations } from "vuex"
import draggable from "vuedraggable"
import marked from 'marked'
import hljs from 'highlightjs'
import { ROUTE_NAME } from '../../router'
import vuexUtil from '../../utils/vuexUtil'
import {
  folderListMenuHandler,
  folderListHandler,
  documentViewHandler,
  documentEditorHandler,
  settingDialogHandler,
  folderCreateDialogHandler,
  folderSettingDialogHandler,
  fileDeleteConfirmDialogHandler,
  lifeCycleHandler,
  routeHandler
} from './handler'

const content = `
画面設計書
========
## UI設計書
### aaaあいう
#### aaaaあいう
##### aaaaaaあいう
###### aaaaaaaaaaあいう

普通の文章！

https://google.com/

* aaaa
  * aaaa
* aaaa
  * aaaa

<html></html>

---

![Minion](https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/2016-06-14_Orange_and_white_tabby_cat_born_in_2016_%E8%8C%B6%E3%83%88%E3%83%A9%E7%99%BD%E3%81%AD%E3%81%93_DSCF6526%E2%98%86%E5%BD%A1.jpg/200px-2016-06-14_Orange_and_white_tabby_cat_born_in_2016_%E8%8C%B6%E3%83%88%E3%83%A9%E7%99%BD%E3%81%AD%E3%81%93_DSCF6526%E2%98%86%E5%BD%A1.jpg)

> aa
> aa
> aa
>> aaa
>> aaa

\`\`\` json
{
  "aaa": "aaaaa"
}
\`\`\`

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |
`

let list = [
  {
    folderId: '00001',
    folderName: '全体',
    opened: false,
    files: [
      {
        fileId: '1',
        fileName: 'コンセプト',
      },
      {
        fileId: '2',
        fileName: 'ルール',
      }
    ]
  },
  {
    folderId: '00002',
    folderName: '画面設計書',
    opened: false,
    files: [
      {
        fileId: 'a',
        fileName: 'ウォール',
      },
      {
        fileId: 'b',
        fileName: 'ドキュメント',
      }
    ]
  }
]

/**
 * ドキュメントVue
 */
const documentApp = {
  name: "document",
  data: () => ({
    ROUTE_NAME: ROUTE_NAME,
    common: {
      teamId: '',
      projectId: ''
    },
    display: {
      editable: false,
      view: {
        documentId: '',
        documentName: 'ドキュメント機能',
        content: content,
        optionMenu: {
          visible: false
        }
      },
      edit: {
        documentId: 'aa',
        documentName: 'aa',
        content: 'aaaa',
        isSpread: false
      }
    },
    list: {
      folders: list,
      toc: []
    },
    dialog: {
      setting: {
        visible: false,
        folders: []
      },
      folderCreate: {
        visible: false,
        folderName: '',
        errorMessage: ''
      },
      folderSetting: {
        visible: false,
        folderId: '',
        folderName: '',
        files: [],
        deleteConfirm: {
          visible: false
        },
        errorMessage: ''
      },
      fileDeleteConfirm: {
        visible: false
      }
    },
    renderer: null,
    anchor: [0, 0, 0]
  }),

  computed: {
    folders: function () {
      return this.list.folders.map(folder => {
        return {
          ...folder,
          files: folder.files.map(file => {
            return {
              ...file,
              selected: (file.fileId === this.$route.params.fileId) ? true : false
            }
          })
        }
      })
    },
    compiledMarkdown: function () {
      this.$set(this.list, 'toc', [])
      if (this.display.view.content === null) {
        return ''
      }
      return marked(this.display.view.content, { renderer: this.renderer })
    },
    compiledEditorMarkdown: function() {
      if (this.display.edit.content === null) {
        return ''
      }
      return marked(this.display.edit.content)
    }
  },

  created: function () {
    vuexUtil.setTeamProject(this)
    lifeCycleHandler.handleCreate(this)

    // Marked.jsのオプションを設定
    marked.setOptions({
      // langPrefix: '',
      mangle: false,
      sanitize: true,
      breaks: true,
      highlight: function (code, lang) {
        if (lang == null || lang == '') {
          return hljs.highlightAuto(code).value
        }
        return hljs.highlightAuto(code, [lang]).value
      }
    })

    // Marked.jsの目次を作成
    this.renderer = new marked.Renderer()
    let _this = this
    this.renderer.heading = function (text, level) {
      let escapedText = text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')
      if (level < 4) {  // h4以降は無視
        let anchor = escapedText.toLowerCase()
        _this.list.toc.push({ level, anchor, escapedText })  // 目次オブジェクトに追加
        return '<h' + level + ' id="' + anchor + '">' + text + '</h' + level + '>'
      } else {
        return '<h' + level + '>' + text + '</h' + level + '>'
      }
    }
  },

  watch: {
    '$route': function (to) {
      routeHandler.handleRouteChange(this, to)
    },
    'display.editable': function(to) {
      documentEditorHandler.handleDisplayEditableChange(this, to)
    },
    'dialog.setting.visible': function (to) {
      settingDialogHandler.handleSettingVisibleChange(this, to)
    },
    'dialog.folderCreate.visible': function (to) {
      folderCreateDialogHandler.handleFolderCreateDialogVisibleChange(this, to)
    },
    'dialog.folderSetting.visible': function (to) {
      folderSettingDialogHandler.handleFolderSettingVisibleChange(this, to)
    },
    'compiledMarkdown': function () {
      documentViewHandler.handleCompiledMarkdownChange()
    },
    'compiledEditorMarkdown': function() {
      documentEditorHandler.handleEditorCompiledMarkdownChange()
    }
  },

  components: {
    draggable
  },

  methods: {

    handleOpenAllClick: function () { folderListMenuHandler.handleOpenAllClick(this) },
    handleCloseAllClick: function () { folderListMenuHandler.handleCloseAllClick(this) },
    handleFolderCreateClick: function () { folderListMenuHandler.handleFolderCreateClick(this) },
    handleSettingClick: function () { folderListMenuHandler.handleSettingClick(this) },

    handleFolderNameClick: function (folderId) { folderListHandler.handleFolderNameClick(this, folderId) },
    handleFolderSettingClick: function (folderId) { folderListHandler.handleFolderSettingClick(this, folderId) },

    handleDocumentEditClick: function() { documentViewHandler.handleDocumentEditClick(this) },
    handleDocumentDeleteClick: function() { documentViewHandler.handleDocumentDeleteClick(this) },

    handleEditorUpdateClick: function() { documentEditorHandler.handleEditorUpdateClick(this) },
    handleEditorCancelClick: function() { documentEditorHandler.handleEditorCancelClick(this) },
    handlePreviewOpenClick: function() { documentEditorHandler.handlePreviewOpenClick(this) },
    handlePreviewCloseClick: function() { documentEditorHandler.handlePreviewCloseClick(this) },

    handleSettingCloseClick: function () { settingDialogHandler.handleSettingCloseClick(this) },
    handleSettingSaveClick: function () { settingDialogHandler.handleSettingSaveClick(this) },
    handleSettingCancelClick: function () { settingDialogHandler.handleSettingCancelClick(this) },

    handleFolderCreateCloseClick: function () { folderCreateDialogHandler.handleFolderCreateCloseClick(this) },
    handleFolderCreateSaveClick: function () { folderCreateDialogHandler.handleFolderCreateSaveClick(this) },
    handleFolderCreateCancelClick: function () { folderCreateDialogHandler.handleFolderCreateCancelClick(this) },

    handleFolderSettingCloseClick: function () { folderSettingDialogHandler.handleFolderSettingCloseClick(this) },
    handleFolderSettingSaveClick: function () { folderSettingDialogHandler.handleFolderSettingSaveClick(this) },
    handleFolderSettingCancelClick: function () { folderSettingDialogHandler.handleFolderSettingCancelClick(this) },
    handleFolderSettingDeleteClick: function() { folderSettingDialogHandler.handleFolderSettingDeleteClick(this) },
    handleFolderSettingDeleteSubmitClick: function() { folderSettingDialogHandler.handleFolderSettingDeleteSubmitClick(this) },
    handleFolderSettingDeleteCancelClick: function() { folderSettingDialogHandler.handleFolderSettingDeleteCancelClick(this) },

    handleFileDeleteComfirmCloseClick: function() { fileDeleteConfirmDialogHandler.handleFileDeleteComfirmCloseClick(this) },
    handleFileDeleteComfirmSubmitClick: function() { fileDeleteConfirmDialogHandler.handleFileDeleteComfirmSubmitClick(this) },
    handleFileDeleteComfirmCancelClick: function() { fileDeleteConfirmDialogHandler.handleFileDeleteComfirmCancelClick(this) },

    // Vuex mutations
    ...mapMutations("common", ["showProgressBar", "hideProgressBar", 'changeCurrentTeam', 'changeCurrentProject'])
  },
}

export default documentApp