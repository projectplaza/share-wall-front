<template>
  <div class="header">
    <div class="team move" @click="handleTeamClick">
      <div class="icon">
        <img src="../../../assets/talent.png">
      </div>
      <div class="name">ProjectPlaza</div>
      <img class="dropdown-icon" src="../../../assets/dropdown-gray.png">
      <div class="select" v-if="teamSelect.visible">
        <div class="select-item" v-for="t in teams" :key="t.code">-&ensp;{{t.name}}</div>
        <div class="select-item">＋&emsp;Add</div>
      </div>
    </div>
    <div class="team move" @click="handleProjectClick">
      <div class="icon">
        <img src="../../../assets/project.png">
      </div>
      <div class="name">ShareWall</div>
      <img class="dropdown-icon" src="../../../assets/dropdown-gray.png">
      <div class="select" v-if="projectSelect.visible">
        <div class="select-item" v-for="p in projects" :key="p.code">-&ensp;{{p.name}}</div>
        <div class="select-item">＋&emsp;Add</div>
      </div>
    </div>
    <div class="short-menu">
      <div class="block block-s">
        <div class="search">
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div class="block">
        <div class="icon">
          <img src="../../../assets/message-gray.png">
        </div>
      </div>
      <div class="block">
        <div class="icon">
          <img src="../../../assets/list-gray.png">
        </div>
      </div>
      <div class="block">
        <div class="icon">
          <img src="../../../assets/memo-gray.png">
        </div>
      </div>
      <div class="block" @click="handleProfileClick">
        <div class="icon">
          <img src="../../../assets/user-gray.png">
        </div>
        <div class="list" v-if="profile.visible">
          <div class="list-item">Profile</div>
          <div class="list-item">Logout</div>
        </div>
      </div>
      <div class="block">
        <div class="icon">
          <img src="../../../assets/setting-gray.png">
        </div>
      </div>
    </div>
    <md-progress-bar md-mode="indeterminate" v-if="showProgressBar"></md-progress-bar>
  </div>
</template>

<script>
export default {
  name: "Header",
  data: () => ({
    teamSelect: {
      visible: false
    },
    projectSelect: {
      visible: false
    },
    profile: {
      visible: false
    },
    showProgressBar: false
  }),
  methods: {
    handleTeamClick: function() {
      this.$set(this.teamSelect, "visible", !this.teamSelect.visible)
      this.$set(this.projectSelect, "visible", false)
    },
    handleProjectClick: function() {
      this.$set(this.projectSelect, "visible", !this.projectSelect.visible)
      this.$set(this.teamSelect, "visible", false)
    },
    handleProfileClick: function() {
      this.$set(this.profile, "visible", !this.profile.visible)
    }
  },
  props: {
    teams: Array,
    projects: Array
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0px;
  left: 50px;
  width: calc(100% - 50px);
  min-width: 950px;
  background-color: #ffffff;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
  user-select: none;
  z-index: 4;

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
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
      transition: 0.2s;

      .select-item {
        min-width: 299px;
        padding: 10px 15px;
        background-color: #ffffff;
        &:hover {
          background-color: #f9f9f9;
        }
      }
    }
  }

  .short-menu {
    float: right;
    .block {
      display: inline-block;
      position: relative;
      padding: 6px 10px 6px 10px;
      color: #666666;
      cursor: pointer;
      transition: 0.2s;
      &:hover {
        background-color: #f5f5f5;
      }
    }
    .block-f {
      &:hover {
        background-color: #f3f9ff;
      }
    }
    .block-s {
      cursor: default;
      &:hover {
        background-color: #ffffff;
      }
      input[type="text"] {
        width: 100px;
        padding: 3px 10px;
        color: #888888;
        border: 1px solid #eeeeee;
        border-radius: 10px;
        transition: 0.3s;
        &:focus {
          width: 130px;
          border: 1px solid #3498db;
          color: #444444;
        }
        &:placeholder-shown,
        &::-webkit-input-placeholder {
          color: #888888;
        }
      }
    }
    .icon {
      display: inline-block;
      padding: 3px;
      border-radius: 50%;
      vertical-align: middle;
      img {
        display: block;
        width: 19px;
      }
    }
    .list {
      position: absolute;
      top: 38px;
      right: 0px;
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
      transition: 0.2s;

      .list-item {
        min-width: 100px;
        padding: 10px 15px;
        background-color: #ffffff;
        &:hover {
          background-color: #f9f9f9;
        }
      }
    }
  }
}
</style>

