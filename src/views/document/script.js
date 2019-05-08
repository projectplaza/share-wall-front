import $ from 'jquery'
import { mapMutations } from "vuex"
import draggable from "vuedraggable"
import { ROUTE_NAME } from '../../router'
import vuexUtil from '../../utils/vuexUtil'
import {
  folderListMenuHandler,
  folderListHandler,
  settingDialogHandler,
  folderCreateDialogHandler,
  folderSettingDialogHandler,
  lifeCycleHandler,
  routeHandler
} from './handler'

const list = [
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
    display: {
      editable: false,
      opened: true,
      view: {
        optionMenu: {
          visible: false
        }
      }
    },
    list: {
      folders: list
    },
    dialog: {
      setting: {
        visible: false,
        folders: []
      },
      folderCreate: {
        visible: false,
        folderName: ''
      },
      folderSetting: {
        visible: false,
        folderId: '',
        folderName: '',
        files: []
      }
    }
  }),

  computed: {
    folders: function() {
      return this.list.folders.map(folder => {
        return {
          ...folder,
          files: folder.files.map(file => {
            return {
              ...file,
              selected: (file.fileId === this.$route.params.documentId) ? true : false
            }
          })
        }
      })
    }
  },

  created: function () {
    vuexUtil.setTeamProject(this)
    lifeCycleHandler.handleCreate(this)
  },

  watch: {
    '$route': function(to) {
      routeHandler.handleRouteChange(this, to)
    },
    'dialog.setting.visible': function(to) {
      settingDialogHandler.handleSettingVisibleChange(this, to)
    },
    'dialog.folderCreate.visible': function(to) {
      folderCreateDialogHandler.handleFolderCreateDialogVisibleChange(this, to)
    },
    'dialog.folderSetting.visible': function(to) {
      folderSettingDialogHandler.handleFolderSettingVisibleChange(this, to)
    }
  },

  components: {
    draggable
  },

  methods: {
    
    handleOpenAllClick: function() { folderListMenuHandler.handleOpenAllClick(this) },
    handleCloseAllClick: function() { folderListMenuHandler.handleCloseAllClick(this) },
    handleFolderCreateClick: function() { folderListMenuHandler.handleFolderCreateClick(this) },
    handleSettingClick: function() { folderListMenuHandler.handleSettingClick(this) },

    handleFolderNameClick: function(folderId) { folderListHandler.handleFolderNameClick(this, folderId) },
    handleFolderSettingClick: function(folderId) { folderListHandler.handleFolderSettingClick(this, folderId) },

    handleSettingCloseClick: function() { settingDialogHandler.handleSettingCloseClick(this) },
    handleSettingSaveClick: function() { settingDialogHandler.handleSettingSaveClick(this) },
    handleSettingCancelClick: function() { settingDialogHandler.handleSettingCancelClick(this) },

    handleFolderCreateCloseClick: function() { folderCreateDialogHandler.handleFolderCreateCloseClick(this) },
    handleFolderCreateSaveClick: function() { folderCreateDialogHandler.handleFolderCreateSaveClick(this) },
    handleFolderCreateCancelClick: function() { folderCreateDialogHandler.handleFolderCreateCancelClick(this) },

    handleFolderSettingCloseClick: function() { folderSettingDialogHandler.handleFolderSettingCloseClick(this) },
    handleFolderSettingSaveClick: function() { folderSettingDialogHandler.handleFolderSettingSaveClick(this) },
    handleFolderSettingCancelClick: function() { folderSettingDialogHandler.handleFolderSettingCancelClick(this) },
    
    // Vuex mutations
    ...mapMutations("common", ["showProgressBar", "hideProgressBar", 'changeCurrentTeam', 'changeCurrentProject'])
  },
}

export default documentApp