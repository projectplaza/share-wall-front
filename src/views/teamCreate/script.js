import { mapMutations } from "vuex";
import { PATH_PROF, PATH_PROF_FRIEND } from "../../constants/apiConstant";
import { getRequest } from "../../utils/apiUtil";
import { isSingleByte } from "../../utils/validUtil";

/**
 * チーム名のバリデーションを行う
 * @param {string} teamName チーム名
 * @returns {boolean} 判定結果
 */
const validTeamName = teamName => {
  if (teamName.length > 30) {
    return false;
  }
  return true;
};

/**
 * チームコードのバリデーションを行う
 * @param {string} teamCode チームコード
 * @returns {boolean} 判定結果
 */
const validTeamCode = teamCode => {
  if (teamCode.length > 20) {
    return false;
  }
  for (var i = 0; i < teamCode.length; i++) {
    if (!isSingleByte(teamCode.charAt(i))) {
      return false;
    }
  }
  return true;
};

/**
 * チーム説明のバリデーションを行う
 * @param {string} teamAbstract チーム説明
 * @returns {boolean} 判定結果
 */
const validTeamAbstract = teamAbstract => {
  if (teamAbstract.length > 1000) {
    return false;
  }
  return true;
};

/**
 * Vueオブジェクト
 */
const app = {

  name: "TeamCreate",

  data: () => ({
    team: {
      name: "",
      abstract: "",
      code: ""
    },
    button: {
      diabled: false
    },
    showDialog: false,
    search: null,
    member: {
      users: []
    }
  }),

  methods: {

    // 作成ボタンクリックイベントハンドラ
    handleCreateButtonClick: function () {
      this.$set(this.button, "diabled", true);
      this.showProgressBar();
    },

    // 友達リストのクリックイベントハンドラ
    handleFriendClick: function(userId) {

      const members = this.member.users.slice()
      for (let i = 0; i < members.length; i++) {
        if (members[i].userId === userId) {
          members[i].isMember = true
          break
        }
      }

      if (this.friends.length === 0) {
        this.showDialog = false
      }

      this.$set(this.team, 'members', members)
    },

    // 削除ボタンのクリックイベントハンドラ
    handleRemoveClick: function(userId) {

      const members = this.member.users.slice()
      
      let index = 0
      for (let i = 0; i < members.length; i++) {
        if (members[i].userId === userId) {
          members[i].isMember = false
          break
        }
      }

      this.$set(this.team, 'members', members)
    },

    // Vuex mutations
    ...mapMutations("common", ["showProgressBar", "hideProgressBar"])
  },

  created: function () {

    // プロフィールを取得
    getRequest(PATH_PROF).then((prof) => {

      const owner = {
        userId: prof.userId,
        userName: prof.userName,
        isMember: true,
        auth: ['1', '2'],
        isAuthor: true
      }

      // フレンド一覧を取得
      getRequest(PATH_PROF_FRIEND).then((data) => {
      
        if (data !== null) {

          const users = new Array()

          // プロフィール情報をリストに追加
          users.push(owner)

          // フレンドをリストに追加
          data.map(d => {
            if (d.userId !== prof.userId) {
              users.push({
                userId: d.userId,
                userName: d.userName,
                isMember: false,
                auth: ['1'],
                isAuthor: false
              })
            }
          })

          // メンバー候補の一覧に設定
          this.$set(this.member, 'users', users)
        }
      }).catch((error) => {
        // 空を設定
        this.$set(this.member, 'users', [])
      })
    })
    
  },

  computed: {

    // チーム名（テキストボックス）のクラスバインダ
    teamNameClass() {
      return {
        "md-invalid": !validTeamName(this.team.name)
      };
    },

    // チームコード（テキストボックス）のクラスバインダ
    teamCodeClass() {
      return {
        "md-invalid": !validTeamCode(this.team.code)
      };
    },

    // チーム説明（テキストエリア）のクラスバインダ
    teamAbstractClass() {
      return {
        "md-invalid": !validTeamAbstract(this.team.abstract)
      };
    },

    // チームメンバーリスト
    members() {
      return this.member.users.filter(user => user.isMember === true)
    },

    // 友達リスト
    friends() {
      return this.member.users.filter(user => user.isMember === false)
    }
  }

};

export default app;