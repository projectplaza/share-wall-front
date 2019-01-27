<template>
  <div class="menu">
    <img src="../../../assets/logo.png" class="logo">
    <div v-for="m in menus" :key="m.code" class="f-icon" @click="() => {moveToFunction(m.name)}">
      <img :src="require('../../../assets/' + m.icon + '.png')">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100%;
  background-color: #34495e;
  text-align: center;

  .logo {
    display: block;
    width: 20px;
    margin: 20px auto 10px auto;
  }

  .f-icon {
    margin-bottom: 3px;
    padding: 15px;
    text-align: center;
    cursor: pointer;
    &:hover {
      background-color: #2c3e50;
    }
    img {
      display: block;
      width: 20px;
    }
  }
}
</style>

<script>
import FUNCTION_NAMES from "../../../constants/menuConstant";

export default {
  name: "Menu",
  data: () => ({
    active: ""
  }),
  methods: {
    moveToFunction: function(name) {
      const teamCode = this.$store.state.common.header.team.current;
      const projectCode = this.$store.state.common.header.project.current;
      switch (name) {
        case FUNCTION_NAMES.WALL:
          this.$router.push({
            name: name,
            params: {
              teamCode: teamCode,
              projectCode: projectCode
            }
          });
        case FUNCTION_NAMES.DESIGN_DOCUMENT_HOME:
          this.$router.push({
            name: name,
            params: {
              teamCode: teamCode,
              projectCode: projectCode
            }
          });
        default:
          this.$router.push({ name: name });
      }
    }
  },
  components: {},
  props: {
    menus: Array
  }
};
</script>
