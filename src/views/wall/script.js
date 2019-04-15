import { mapMutations } from "vuex"
import draggable from "vuedraggable"
import { ROUTE_NAME } from '../../router'
import handler from './handler'
import util from '../../utils'
import { nfapply } from "q";

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
  // }
]

const boards = [
  // { boardId: "0000001", boardName: "開発", selected: false }
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
        title: null,
        content: null,
        priority: null,
        assignUser: null,
        startDate: null,
        deadline: null,
      },
      taskComments: [{
        userName: 'yumochi21',
        postDatetime: '2019-03-16 10:11:12',
        message: '頑張りましょー！http://localhost:8080/'
      }],
      taskCommentForm: {
        visible: false,
        message: ''
      },
      taskEdit: {
        taskId: null,
        panelId: null,
        title: null,
        content: null,
        priority: null,
        assignUser: null,
        startDate: null,
        deadline: null,
      },
      taskAdd: {
        title: null
      },
      projectUsers: [],
      priolities: [
        { code: '', value: '---' },
        { code: '1', value: '高' },
        { code: '2', value: '中' },
        { code: '3', value: '低' },
        { code: '4', value: '保留' }
      ]
    },
    list: {
      boards: [],
      panels: []
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
        visible: false,
        taskId: null
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
    
    // ボード編集ボタンクリックイベントハンドラ
    handleBoardEditClick: function() { handler.handleBoardEditClick(this) },
    // ボード編集保存ボタンクリックイベントハンドラ
    handleBoardEditSaveClick: function() { handler.handleBoardEditSaveClick(this) },
    // ボード編集キャンセルボタンクリックイベントハンドラ
    handleBoardEditCancelClick: function() { handler.handleBoardEditCancelClick(this) },

    // ボード削除ボタンクリックイベントハンドラ
    handleBoardDeleteClick: function() { handler.handleBoardDeleteClick(this) },
    // ボード削除確定ボタンクリックイベントハンドラ
    handleBoardDeleteConfirmClick: function() { handler.handleBoardDeleteConfirmClick(this) },
    // ボード削除キャンセルボタンクリックイベントハンドラ
    handleBoardDeleteCancelClick: function() { handler.handleBoardDeleteCancelClick(this) },

    // タスク追加ボタンクリックイベントハンドラ
    handleTaskAddClick: function(panelId) { handler.handleTaskAddClick(this, panelId) },
    // タスク追加保存ボタンクリックイベントハンドラ
    handleTaskAddSaveClick: function(panelId, isCloseForm) { handler.handleTaskAddSaveClick(this, panelId, isCloseForm) },
    // タスク追加キャンセルボタンのクリックイベントハンドラ
    handleTaskAddCancelClick: function() { handler.handleTaskAddCancelClick(this) },

    // タスク編集ボタンクリックイベントハンドラ
    handleTaskEditClick: function() { handler.handleTaskEditClick(this) },
    // タスク編集保存ボタンクリックイベントハンドラ
    handleTaskEditSaveClick: function() { handler.handleTaskEditSaveClick(this) },
    // タスク編集キャンセルボタンクリックイベントハンドラ
    handleTaskEditCancelClick: function() { handler.handleTaskEditCancelClick(this) },

    // タスク削除ボタンクリックイベントハンドラ
    handleTaskDeleteClick: function() { handler.handleTaskDeleteClick(this) },
    // タスク削除ボタン確定クリックイベントハンドラ
    handleTaskDeleteConfirmClick: function() { handler.handleTaskDeleteConfirmClick(this) },
    // タスク削除キャンセルボタンクリックイベントハンドラ
    handleTaskDeleteCancelClick: function() { handler.handleTaskDeleteCancelClick(this) },

    // タスク閉じるクリックイベントハンドラ
    handleTaskCloseClick: function() { handler.handleTaskCloseClick(this) },

    // コメント投稿ボタンクリックイベントハンドラ
    handleCommentPostClick: function() { handler.handleCommentPostClick(this) },
    // コメント投稿確定ボタンクリックイベントハンドラ
    handleCommentPostConfirmClick: function() { handler.handleCommentPostConfirmClick(this) },
    // コメント投稿キャンセルボタンクリックイベントハンドラ
    handleCommentPostCancelClick: function() { handler.handleCommentPostCancelClick(this) },

    // アンカー自動生成
    anchorify: function(text) { return util.setAnchor(text) },

    // ユーザー名を取得
    getUserName: function(userId) {
      const user = this.display.projectUsers.find(user => user.userId == userId)
      return (user != null) ? user.userName : null
    },

    // Vuex mutations
    ...mapMutations("common", ["showProgressBar", "hideProgressBar", 'changeCurrentTeam', 'changeCurrentProject'])
  },

  created: function() {
    handler.handleCreated(this)
  },

  computed: {
    options: () => ({
      animation: 100,
      group: 'description',
      dragClass: 'dragging',
      fallbackClass: "chosen"
    }),
    panelOptions: () => ({
      animation: 70,
      handle: '.switch-icon'
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
    'list.boards': {
      handler: function(to, from) { handler.handleBoardChange(this, to, from) },
      deep: false
    },
    'list.panels': {
      handler: function(to, from) { handler.handlePanelsChange(this, to, from) },
      deep: true
    },
    'dialog.panelSetting.visible': function(to, from) { if (!to) handler.handlePanelsChange(this) }
  },

  components: {
    draggable
  }
}

export default wallApp