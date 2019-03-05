import { mapGetters, mapMutations } from "vuex"
import jQuery from 'jquery'
import { BASE_URL } from "../../../constants/constant.js"
import { setLoginInfo, getLoginInfo, setTempLoginInfo, getTempLoginInfo } from "../../../utils/storageUtil"
import handler from './handle'

export default {
  name: "Header",
  data: () => ({
    baseURL: BASE_URL,
    teamSelect: {
      visible: false
    },
    projectSelect: {
      visible: false
    },
    profile: {
      visible: false
    }
  }),
  computed: {
    ...mapGetters("common", ["currentTeam", "currentProject"])
  },
  methods: {
    // チームメニューのクリックハンドラ
    handleTeamClick: function (e) {
      this.$set(this.teamSelect, "visible", !this.teamSelect.visible);
      const _this = this
      jQuery(document).on('click.team', function(event) {
        if(!jQuery(event.target).closest('.team-pulldown').length) {
          _this.$set(_this.teamSelect, 'visible', false)
          jQuery(document).off('click.team')
        }
      })
    },
    // プロジェクトメニューのクリックハンドラ
    handleProjectClick: function (e) {
      this.$set(this.projectSelect, "visible", !this.projectSelect.visible);
      const _this = this
      jQuery(document).on('click.project', function(event) {
        if(!jQuery(event.target).closest('.project-pulldown').length) {
          _this.$set(_this.projectSelect, 'visible', false)
          jQuery(document).off('click.project')
        }
      })
    },
    // ユーザーボタンのクリックハンドラ
    handleProfileClick: function () {
      this.$set(this.profile, "visible", !this.profile.visible);
      const _this = this
      jQuery(document).on('click.profile', function(event) {
        if(!jQuery(event.target).closest('.user-pulldown').length) {
          _this.$set(_this.profile, 'visible', false)
          jQuery(document).off('click.profile')
        }
      })
    },
    handleLogoutClick: function () {
      // 自動ログイン情報を取得
      const loginInfo = getLoginInfo();
      if (loginInfo !== null) {
        // 自動ログイン情報をクリア
        loginInfo.token = null
        setLoginInfo(loginInfo)
      }

      // セッション情報をクリア
      setTempLoginInfo(null)

      this.setLoginState(false);
    },
    ...mapMutations("common", [
      "changeCurrentTeam",
      "changeCurrentProject",
      "setTeamList",
      "setProjectList",
      "switchShortcutContent",
      "setLoginState"
    ])
  },

  watch: {
    'currentTeam': function() { handler.handleChangeCurrentTeam(this) }
  },
  created: function () { handler.handleCreated(this) },
};