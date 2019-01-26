<template>
  <div>
    <div v-if="$store.state.common.auth.loggedIn">
      <Menu :menus="menus"/>
      <Header :teams="teams" :projects="projects"/>
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
        { code: "0001", title: "home", name: "", icon: "home" },
        { code: "0002", title: "notification", name: "", icon: "notification" },
        { code: "0007", title: "chat", name: "", icon: "chat" },
        { code: "0003", title: "ウォール", name: "wall", icon: "board" },
        { code: "0004", title: "document", name: "", icon: "document" },
        { code: "0005", title: "calendar", name: "", icon: "calendar" },
        { code: "0010", title: "box", name: "", icon: "box" }
      ],
      teams: [
        { code: "00000001", name: "ProjectPlaza" },
        { code: "00000002", name: "Shares" },
        { code: "00000003", name: "UDC" }
      ],
      projects: [
        { code: "00000000", name: "All" },
        { code: "00000001", name: "ShareWall" },
        { code: "00000002", name: "SmartWork" },
        { code: "00000003", name: "UDC2018" },
        { code: "00000004", name: "UDC2017" }
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