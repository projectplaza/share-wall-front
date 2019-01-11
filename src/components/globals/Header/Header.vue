<template>
  <div class="header">
    <div class="team move" @click="handleTeamClick">
      <div class="icon">
        <img src="../../../assets/talent.png">
      </div>
      <div class="name">ProjectPlaza</div>
      <img class="dropdown-icon" src="../../../assets/dropdown-gray.png">
      <div class="select" v-if="teamSelect.visible">
        <div class="select-item" v-for="t in teams" :key="t.code">▶︎&ensp;{{t.name}}</div>
      </div>
    </div>
    <div class="team move" @click="handleProjectClick">
      <div class="icon">
        <img src="../../../assets/project.png">
      </div>
      <div class="name">ShareWall</div>
      <img class="dropdown-icon" src="../../../assets/dropdown-gray.png">
      <div class="select" v-if="projectSelect.visible">
        <div class="select-item" v-for="p in projects" :key="p.code">▶︎&ensp;{{p.name}}</div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0px;
  left: 50px;
  width: calc(100% - 50px);
  background-color: #ffffff;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
  user-select: none;

  .move {
    display: inline-block;
    position: relative;
    width: 300px;
    border-right: 1px solid #eeeeee;
    padding: 6px 30px 6px 10px;
    color: #666666;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      background-color: #f5f5f5;
    }

    .icon {
      display: inline-block;
      margin-right: 8px;
      padding: 5px;
      background-color: #bbbbbb;
      border-radius: 50%;
      vertical-align: middle;
      img {
        display: block;
        width: 15px;
      }
    }

    .name {
      display: inline-block;
      vertical-align: middle;
    }

    .dropdown-icon {
      position: absolute;
      top: 13px;
      right: 10px;
      width: 10px;
    }

    .select {
      position: absolute;
      top: 38px;
      left: 0px;
      // border: 1px solid #dddddd;
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
      transition: 0.2s;

      .select-item {
        min-width: 299px;
        padding: 10px;
        background-color: #ffffff;
        &:hover {
          background-color: #f9f9f9;
        }
      }
    }
  }
}
</style>

<script>
export default {
  name: "Header",
  data: () => ({
    teamSelect: {
      visible: false
    },
    projectSelect: {
      visible: false
    }
  }),
  methods: {
    handleTeamClick: function() {
      this.$set(this.teamSelect, 'visible', !this.teamSelect.visible)
      this.$set(this.projectSelect, 'visible', false)
    },
    handleProjectClick: function() {
      this.$set(this.projectSelect, 'visible', !this.projectSelect.visible)
      this.$set(this.teamSelect, 'visible', false)
    }
  },
  props: {
    teams: Array,
    projects: Array
  }
};
</script>