import { mapGetters, mapMutations } from "vuex";
import { BASE_URL } from "../../../constants/constant.js";
import { setLoginInfo, getLoginInfo, setTempLoginInfo, getTempLoginInfo } from "../../../utils/storageUtil";

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
    handleTeamClick: function() {
      this.$set(this.teamSelect, "visible", !this.teamSelect.visible);
      this.hideProjectSelect();
    },
    // プロジェクトメニューのクリックハンドラ
    handleProjectClick: function() {
      this.$set(this.projectSelect, "visible", !this.projectSelect.visible);
      this.hideTeamSelect();
    },
    // チーム一覧を隠す
    hideTeamSelect: function() {
      this.$set(this.teamSelect, "visible", false);
    },
    // プロジェクト一覧を隠す
    hideProjectSelect: function() {
      this.$set(this.projectSelect, "visible", false);
    },
    // ユーザーボタンのクリックハンドラ
    handleProfileClick: function() {
      this.$set(this.profile, "visible", !this.profile.visible);
    },
    handleLogoutClick: function() {
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
      "switchShortcutContent",
      "setLoginState"
    ])
  },
  props: {
    teams: Array,
    projects: Array
  }
};