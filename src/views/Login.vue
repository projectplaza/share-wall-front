<template>
  <div class="login">
    <div class="box">
      <div class="title">ShareWall</div>
      <div class="error-message">{{ message.error }}</div>
      <div>
        <input class="input-text" type="text" v-model="login.userId" placeholder="ID">
      </div>
      <div>
        <input class="input-text" type="password" v-model="login.password" placeholder="PS">
      </div>
      <!-- <div>
        <md-switch v-model="login.autoLogin" value="1" class="auto-check">Auto Login</md-switch>
      </div> -->
      <div>
        <md-button class="md-dense md-raised md-primary" @click="handleLoginClick">Login</md-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { PATH_LOGIN } from "../constants/apiConstant";
import { postRequest } from "../utils/apiUtil";
import {
  setLoginInfo,
  getLoginInfo,
  setTempLoginInfo,
  getTempLoginInfo
} from "../utils/storageUtil";

const MESSAGE_LOGIN_FAILED = "IDまたはパスワードが違います。";

const loginApp = {
  name: "Login",
  data: () => ({
    login: {
      userId: "",
      password: "",
      autoLogin: ['1']
    },
    message: {
      error: ""
    }
  }),
  methods: {
    handleLoginClick: function() {
      // ログインAPIにリクエストを送信
      callLoginApi(PATH_LOGIN, {
        userId: this.login.userId,
        password: this.login.password
      })
        .then(data => {
          // エラーメッセージを初期化
          this.$set(this.message, "error", "");
          // ストアにトークンを設定
          this.setNewToken(data.token);

          if (this.login.autoLogin.length !== 0) {
            // ローカルストレージにログイン情報を格納
            setLoginInfo({
              token: data.token,
              autoLogin: this.login.autoLogin[0] === "1" ? true : false
            });
          } else {
            setLoginInfo(null);
            // セッションストレージにログイン情報を格納
            setTempLoginInfo({
              token: data.token
            });
          }

          // ログイン状態をTRUEにする
          this.setLoginState(true);
        })
        .catch(error => {
          this.$set(this.message, "error", MESSAGE_LOGIN_FAILED);
        });
    },
    ...mapMutations("common", ["setLoginState", "setNewToken"])
  },
  created() {
    // 自動ログインチェック
    const loginInfo = getLoginInfo();
    const tempLoginInfo = getTempLoginInfo();
    if (
      loginInfo !== null &&
      loginInfo.autoLogin &&
      loginInfo.token !== null &&
      loginInfo.token !== ""
    ) {
      // TODO トークン確認API
      this.setNewToken(loginInfo.token);
      this.setLoginState(true);
      return;
    } else if (
      tempLoginInfo !== null &&
      tempLoginInfo.token !== null &&
      tempLoginInfo.token !== ""
    ) {
      // TODO トークン確認API
      this.setNewToken(tempLoginInfo.token);
      this.setLoginState(true);
    } else if (loginInfo !== null && loginInfo.autoLogin) {
      this.$set(this.login, "autoLogin", ["1"]);
    }
  }
};

// ログインAPIにリクエストを送信する
const callLoginApi = (path, loginInfo) => {
  return new Promise((resolve, reject) => {
    // ログインAPIにリクエストを送信
    postRequest(path, loginInfo)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default loginApp;
</script>

<style lang="scss" scoped>
html,
body {
  background-color: #2980b9;
  height: 100%;
}
.login {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  padding: 100px;
  background-color: #2980b9;

  .error-message {
    color: #c0392b;
    font-weight: 700;
    font-size: 12px;
  }

  .box {
    width: 400px;
    margin: auto;
    padding: 30px 15px;
    text-align: center;
    border: 1px solid #eeeeee;
    background-color: #f0f0f0;
    border-radius: 4px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);

    .title {
      margin-bottom: 15px;
      font-size: 21px;
      font-weight: 700;
      color: #666666;
    }

    .input-text {
      width: 300px;
      margin: 10px 0px;
      padding: 10px 15px;
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
      border: 0px solid #dddddd;
      border-radius: 16px;
      background-color: #ffffff;
      font-size: 14px;
      color: #444444;
    }
    .input-text:focus {
      box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3);
    }

    .auto-check {
      color: #777777;
      font-weight: 700;
    }
  }
}
</style>
