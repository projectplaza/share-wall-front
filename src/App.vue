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
        { code: "0003", title: "board", icon: "board" }
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