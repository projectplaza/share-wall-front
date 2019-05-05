<template>
  <div>
    <div v-if="$store.state.common.auth.loggedIn" class="top-content">
      <Header :menus="menus" />
      <div class="content">
        <router-view/>
      </div>
      <div class="shortcut-content" :style="$store.state.common.shortcutContent.style">
        <h1>簡易機能</h1>
      </div>
    </div>
    <div v-if="!$store.state.common.auth.loggedIn">
      <Login />
    </div>
  </div>
</template>

<script>
import Login from './views/Login'
import Menu from './components/globals/Menu/Menu'
import Header from './components/globals/Header/Header'
import { mapMutations } from 'vuex'

export default {
  name: "App",
  components: {
    Login,
    Header
  },
  data() {
    return {
      menus: [
        { code: "0003", title: "ウォール", name: "wall-home", icon: "board_filled_ffffff", isPjMenu: true },
        { code: "0004", title: "document", name: "design-document-home", icon: "document_ffffff", isPjMenu: true },
      ]
    };
  }
};
</script>

<style lang="scss">
body {
  background-color: #efefef;
}

* {
  outline: none;
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", Hiragino Kaku Gothic ProN, "ヒラギノ角ゴ ProN W3", Arial, "メイリオ", Meiryo, sans-serif !important;
}
img {
  user-select: none;
}
.content {
  overflow: auto;
  transition: 0.3s;
  min-height: calc(100% - 40px);
}
.shortcut-content {
  position: fixed;
  width: 300px;
  height: calc(100% - 38px);
  top: 38px;
  background-color: #fafafa;
  overflow: auto;
  transition: 0.3s;
}
</style>