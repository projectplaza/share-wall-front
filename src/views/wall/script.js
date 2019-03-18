import { mapMutations } from "vuex"
import draggable from "vuedraggable"
import { ROUTE_NAME } from '../../router'
import handler from './handler'

const panels = [
  // {
  //   panelId: "1",
  //   panelName: "新規",
  //   task: [
  //     { taskId: "01", title: "開発" },
  //     { taskId: "02", title: "トーク" },
  //     { taskId: "03", title: "メッセージ" }
  //   ],
  //   showCreateWindow: false
  // },
  // {
  //   panelId: "2",
  //   panelName: "進行中",
  //   task: [
  //     { taskId: "04", title: "ウォール" },
  //     { taskId: "05", title: "デザインドキュメント" }
  //   ],
  //   showCreateWindow: false
  // }
]

const boards = [
  // { boardId: "0000001", boardName: "開発", selected: false },
  // { boardId: "0000002", boardName: "企画", selected: true },
  // { boardId: "0000003", boardName: "営業", selected: false }
]

const wallApp = {
  name: "wall",
  data: () => ({
    display: {
      teamId: null,
      projectId: null,
      boardId: null,
      boardName: null,
      taskId: null,
      task: {
        title: 'タイトル',
        content: '内容',
        priority: '優先度',
        assignUser: '担当者ID',
        startDate: '2019-03-01',
        deadline: '2019-03-30',
      },
      taskComments: [{
        userName: 'yumochi21',
        postDatetime: '2019-03-16 10:11:12',
        message: '頑張りましょー！'
      }],
      taskCommentForm: {
        visible: false,
        message: '頑張りましょー'
      },
      taskEdit: {
        title: 'タイトル',
        content: '内容',
        priority: '2',
        assignUser: 'yumochi21',
        startDate: '2019-03-01',
        deadline: '2019-03-30',
      },
      projectUsers: [
        { userId: 'ishigami', userName: '石上' },
        { userId: 'yumochi21', userName: '望月' }
      ]
    },
    list: {
      boards: boards,
      panels: panels
    },
    mode: {
      task: {
        selected: false,
        edit: false
      }
    },
    dialog: {
      boardCreate: {
        visible: false,
        boardName: null,
      },
      boardEdit: {
        visible: false,
        boardName: null,
      },
      boardDelete: {
        visible: false,
        boardId: null,
      },
      panelCreate: {
        visible: false,
        panelName: null,
      },
      panelDelete: {
        visible: false,
      },
      panelSetting: {
        visible: false
      },
      taskDelete: {
        visible: false
      }
    }
  }),

  methods: {

    // ボード追加ボタンのクリックイベントハンドラ
    handleBoardAddClick: function() { handler.handleBoardAddClick(this) },
    // ボード作成ボタンのクリックイベントハンドラ
    handleBoardCreateClick: function() { handler.handleBoardCreateClick(this) },
    // ボード作成キャンセルボタンのクリックイベントハンドラ
    handleBoardCreateCancelClick: function() { handler.handleBoardCreateCancelClick(this) },

    // パネル追加ボタンのクリックイベントハンドラ
    handlePanelAddClick: function() { handler.handlePanelAddClick(this) },
    // パネル作成ボタンのクリックイベントハンドラ
    handlePanelCreateClick: function() { handler.handlePanelCreateClick(this) },
    // パネル作成キャンセルボタンのクリックイベントハンドラ
    handlePanelCreateCancelClick: function() { handler.handlePanelCreateCancelClick(this) },

    // パネル設定ボタンのクリックイベントハンドラ
    handlePanelSettingClick: function() { handler.handlePanelSettingClick(this) },
    // パネル設定完了ボタンのクリックイベントハンドラ
    handlePanelSettingCompleteClick: function() { handler.handlePanelSettingCompleteClick(this) },

    // パネル削除ボタンクリックイベントハンドラ
    handlePanelDeleteClick: function(panelId) { handler.handlePanelDeleteClick(this, panelId) },
    // パネル削除確定ボタンクリックイベントハンドラ
    handlePanelDeleteConfirmClick: function() { handler.handlePanelDeleteConfirmClick(this) },
    // パネル削除キャンセルボタンクリックイベントハンドラ
    handlePanelDeleteCancelClick: function() { handler.handlePanelDeleteCancelClick(this) },

    // Vuex mutations
    ...mapMutations("common", ["showProgressBar", "hideProgressBar", 'changeCurrentTeam', 'changeCurrentProject'])
  },

  created: function() {
    handler.handleCreated(this)
  },

  computed: {
    options: () => ({
      animation: 70,
      group: 'description',
      dragClass: 'dragging'
    }),
    panelOptions: () => ({
      animation: 70,
    }),
    boardWidth: function() {
      if (this.mode.task.selected) {
        return {
          width: 'calc(100% - 300px)'
        }
      }

      return {
        width: '100%'
      }
    }
  },

  watch: {
    '$route': function(to, from) { handler.handleRouteChange(this, to, from) },
    'list.panels': function(to, from) {
      if (to.length == from.length) {
        for (let i = 0; i < to.length; i++) {
          if (to[i].panelId != from[i].panelId) {
            handler.handlePanelsChange(this)
            return
          }
        }
      } else {
        handler.handlePanelsChange(this)
      }
    },
    'dialog.panelSetting.visible': function(to, from) { if (!to) handler.handlePanelsChange(this) }
  },

  components: {
    draggable
  }
}

export default wallApp