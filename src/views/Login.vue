<template>
  <div class="login">
    <div class="box">
      <div class="title">ShareWall</div>
      <div>
        <input class="input-text" type="text" v-model="login.userId" placeholder="ID" />
      </div>
      <div>
        <input class="input-text" type="password" v-model="login.password" placeholder="PS" />
      </div>
      <div>
        <md-switch v-model="login.autoLogin" value="1" class="auto-check">Auto Login</md-switch>
      </div>
      <div>
        <md-button class="md-dense md-raised md-primary" @click="handleLoginClick">Login</md-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

const loginApp = {
  name: 'Login',
  data: () => ({
    login: {
      userId: '',
      password: '',
      autoLogin: []
    }
  }),
  methods: {
    handleLoginClick: function() {
      this.setLoginState(true)
    },
    ...mapMutations('common', [
      'setLoginState'
    ])
  }
}

export default loginApp
</script>

<style lang="scss" scoped>
html, body {
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

  .box {
    width: 400px;
    margin: auto;
    padding: 30px 15px;
    text-align: center;
    border: 1px solid #eeeeee;
    background-color: #f0f0f0;
    border-radius: 4px;
    box-shadow: 1px 1px 5px rgba(0,0,0,0.5);
    
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
      box-shadow: 1px 1px 2px rgba(0,0,0,0.3);
      border: 0px solid #dddddd;
      border-radius: 16px;
      background-color: #ffffff;
      font-size: 14px;
      color: #444444;
    }
    .input-text:focus {
      box-shadow: 1px 1px 8px rgba(0,0,0,0.3);
    }

    .auto-check {
      color: #777777;
      font-weight: 700;
    }
  }
}
</style>
