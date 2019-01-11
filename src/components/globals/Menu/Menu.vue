<template>
  <div class="menu">
    <img src="../../../assets/logo.png" class="logo">
    <div v-for="m in menus" :key="m.code" class="f-icon">
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
export default {
  name: "Menu",
  data: () => ({
    active: ""
  }),
  methods: {},
  components: {},
  props: {
    menus: Array
  }
};
</script>
