<template>
  <div>
    <div v-if="$store.state.common.auth.loggedIn">
      <Menu :menus="menus"/>
      <Header />
      <div class="content" :style="$store.state.common.content.style">
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
    Header,
    Menu
  },
  data() {
    return {
      menus: [
        // { code: "0001", title: "home", name: "", icon: "home", isPjMenu: false },
        // { code: "0002", title: "notification", name: "", icon: "notification", isPjMenu: false },
        // { code: "0007", title: "chat", name: "", icon: "chat", isPjMenu: true },
        { code: "0003", title: "ウォール", name: "wall", icon: "board", isPjMenu: true },
        { code: "0004", title: "document", name: "design-document-home", icon: "document", isPjMenu: true },
        // { code: "0005", title: "calendar", name: "", icon: "calendar", isPjMenu: true },
        // { code: "0010", title: "box", name: "", icon: "box", isPjMenu: true }
      ]
    };
  }
};
</script>

<style lang="scss">
body {
  min-height: calc(100% - 38px) !important;
}
* {
  outline: none;
}
img {
  user-select: none;
}
.content {
  position: fixed;
  height: calc(100% - 38px);
  top: 38px;
  left: 50px;
  overflow: auto;
  transition: 0.3s;
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