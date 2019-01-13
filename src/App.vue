<template>
  <div>
    <Menu :menus="menus"/>
    <Header :teams="teams" :projects="projects"/>
    <div class="content" :style="contentStyle">
      <router-view/>
    </div>
    <div class="shortcut-content" :style="shortcutContentStyle"></div>
  </div>
</template>

<script>
import Menu from "./components/globals/Menu/Menu";
import Header from "./components/globals/Header/Header";

export default {
  name: "App",
  components: {
    Header,
    Menu
  },
  data() {
    return {
      contentStyle: {
        // width: "calc(100% - 350px)",
        width: 'calc(100% - 50px)',
      },
      shortcutContentStyle: {
        width: '0px',
        // width: '300px',
        borderLeft: '0px',
        // borderLeft: '1px solid #dddddd'
      },
      menus: [
        { code: "0001", title: "home", icon: "home" },
        { code: "0002", title: "notification", icon: "notification" },
        { code: "0008", title: "team", icon: "team" },
        { code: "0009", title: "project", icon: "project" },
        { code: "0007", title: "chat", icon: "chat" },
        { code: "0003", title: "board", icon: "board" },
        { code: "0004", title: "document", icon: "document" },
        { code: "0005", title: "calendar", icon: "calendar" },
        { code: "0010", title: "box", icon: "box" }
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
    }
  },
  methods: {
    showShortcutContent: function() {
      this.$set(this.contentStyle, 'width', 'calc(100% - 450px)')
      this.$set(this.shortcutContentStyle, 'width', '400px')
      this.$set(this.shortcutContentStyle, 'borderLeft', '1px solid #dddddd')
    },
    hideShortcutContent: function() {
      this.$set(this.contentStyle, 'width', 'calc(100% - 50px)')
      this.$set(this.shortcutContentStyle, 'width', '0px')
      this.$set(this.shortcutContentStyle, 'borderLeft', '0px')
    }
  }
}
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
  min-width: 650px;
  height: calc(100% - 38px);
  top: 38px;
  left: 50px;
  overflow: auto;
}
.shortcut-content {
  position: fixed;
  height: calc(100% - 38px);
  top: 38px;
  right: 0px;
  overflow: auto;
}
</style>