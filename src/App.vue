<template>
  <div>
    <Menu :menus="menus"/>
    <Header :teams="teams" :projects="projects"/>
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
      menus: [
        { code: "0001", title: "home", icon: "home" },
        { code: "0002", title: "notification", icon: "notification" },
        { code: "0008", title: "team", icon: "team" },
        { code: "0009", title: "project", icon: "project" },
        { code: "0006", title: "message", icon: "message" },
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
    };
  }
};
</script>

<style lang="scss">
* {
  outline: none;
}
img {
  user-select: none;
}
</style>