<template>
  <div class="wall">
    <div class="tray" v-for="tray in trays" :key="tray.code">
      <div class="inner">
        <draggable element="div" :options="options" v-model="tray.list">
          <transition-group class="list-group">
            <div class="item" v-for="item in tray.list" :key="item.code">{{item.name}}</div>
          </transition-group>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

const trays = [
  {
    code: "1",
    name: "new",
    list: [
      { code: "01", name: "task1", status: "1" },
      { code: "02", name: "task2", status: "2" },
      { code: "03", name: "task3", status: "3" }
    ]
  },
  {
    code: "2",
    name: "doing",
    list: [
      { code: "04", name: "task4", status: "1" },
      { code: "05", name: "task5", status: "2" },
      { code: "06", name: "task6", status: "3" }
    ]
  },
  {
    code: "3",
    name: "done",
    list: [
      { code: "07", name: "task7", status: "1" },
      { code: "08", name: "task8", status: "2" },
      { code: "09", name: "task9", status: "3" }
    ]
  }
]

const wallApp = {
  name: "wall",
  data: () => ({
    trays: trays
  }),
  computed: {
    options: () => ({
      animation: 100,
      group: "description"
    })
  },
  watch: {},
  components: {
    draggable
  }
};

export default wallApp;
</script>

<style lang="scss" scoped>
.wall {
  padding: 20px 15px;
  .tray {
    display: inline-block;
    margin-right: 10px;
    padding: 1px 1px;
    background-color: #f0f0f0;
    vertical-align: top;

    .inner {
      width: 200px;
      height: 200px;
      padding: 3px 3px;
      overflow: auto;
    }

    .list-group {
      display: block;
      padding: 10px;
      min-height: 200px;
    }

    .item {
      padding: 20px 10px;
      margin: 3px 0px;
      background-color: #ffffff;
      border: 1px solid #dddddd;
      cursor: move;
    }
  }
}
</style>  