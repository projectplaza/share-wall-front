import { mapMutations } from "vuex"
import handler from './handler'
import validator from './validator'

/**
 * Vueオブジェクト
 */
const app = {

  name: "ProjectCreate",

  data: () => ({
    project: {
      name: '',
      code: '',
      content: ''
    },
    button: {
      disabled: false
    },
    showDialog: false,
    member: {
      users: []
    }
  }),

  methods: {
    // プロジェクトメンバー削除イベントハンドラ
    handleProjectMemberRemoveClick(userId) { handler.handleProjectMemberRemoveClick(this, userId) },
    // プロジェクトメンバー追加イベントハンドラ
    handleProjectMemberAddClick(userId) { handler.handleProjectMemberAddClick(this, userId) },
    // 作成ボタンクリックイベントハンドラ
    handleCreateButtonClick() { handler.handleCreateButtonClick(this) },
    // キャンセルボタンクリックイベントハンドラ
    handleCancelClick() { handler.handleCancelClick(this) },
    // 作成イベント
    create() { handler.handleCreateButtonClick(this) },
    // Mutations
    ...mapMutations("common", ['changeCurrentTeam', 'changeCurrentProject', 'showProgressBar', 'hideProgressBar'])
  },

  created: function() { handler.handleCreated(this) },

  computed: {
    // プロジェクト名（テキストボックス）のクラスバインダ
    pjNameClass() {
      return {
        "md-invalid": !validator.validPjName(this.project.name)
      }
    },
    // プロジェクトコード（テキストボックス）のクラスバインダ
    pjCodeClass() {
      return {
        "md-invalid": !validator.validPjCode(this.project.code)
      }
    },
    // プロジェクト説明（テキストエリア）のクラスバインダ
    pjAbstractClass() {
      return {
        "md-invalid": !validator.validPjAbstract(this.project.content)
      }
    },
    // プロジェクトメンバーリスト
    members() {
      return this.member.users.filter(user => user.isMember === true)
    },
    // チームメンバーリスト
    teamMembers() {
      return this.member.users.filter(user => user.isMember === false)
    }
  }
};

export default app