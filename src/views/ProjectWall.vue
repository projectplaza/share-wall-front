<template>
  <div class="wall">
    <div class="category">
      <div
        class="item"
        v-for="c in categories"
        :class="{selected: c.selected}"
        :key="c.code"
      >{{c.name}}</div>
      <div class="item">＋&emsp;Add</div>
    </div>
    <div class="board">
      <div class="header">
        <div class="title">ボード開発グループ</div>
      </div>
      <div class="body">
        <div class="tray" v-for="tray in trays" :key="tray.code">
          <div class="title">{{tray.name}}</div>
          <div class="inner">
            <draggable element="div" :options="options" v-model="tray.list">
              <transition-group class="list-group">
                <div class="item" v-for="item in tray.list" :key="item.code">{{item.name}}</div>
              </transition-group>
            </draggable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

const trays = [
  {
    code: "1",
    name: "新規",
    list: [
      { code: "01", name: "task1", status: "2" },
      { code: "02", name: "task2", status: "2" },
      { code: "03", name: "task3", status: "2" }
    ]
  },
  {
    code: "2",
    name: "進行中",
    list: [
      { code: "04", name: "task4", status: "2" },
      { code: "05", name: "task5", status: "2" },
      { code: "06", name: "task6", status: "2" }
    ]
  },
  {
    code: "3",
    name: "完了",
    list: [
      { code: "07", name: "task7", status: "2" },
      { code: "08", name: "task8", status: "2" },
      { code: "09", name: "task9", status: "2" }
    ]
  },
  {
    code: "4",
    name: "プレ案件",
    list: [
      { code: "10", name: "task10", status: "2" },
      { code: "11", name: "task11", status: "2" },
      { code: "12", name: "task12", status: "2" }
    ]
  }
];

const categorys = [
  { code: "0000001", name: "ウォール開発グループ", selected: false },
  { code: "0000002", name: "ボード開発グループ", selected: true },
  { code: "0000003", name: "ボード開発部隊", selected: false }
];

const wallApp = {
  name: "wall",
  data: () => ({
    trays: trays,
    categories: categorys
  }),
  computed: {
    options: () => ({
      animation: 70,
      group: 'description',
      dragClass: 'dragging'
    })
  },
  watch: {},
  components: {
    draggable
  }
};

export default wallApp
</script>

<style lang="scss" scoped>
.wall {
  height: 100%;

  .category {
    display: inline-block;
    width: 180px;
    height: 100%;
    border-right: 1px solid #dddddd;
    background-color: #fbfbfb;
    vertical-align: top;
    user-select: none;

    .item {
      position: relative;
      padding: 14px 14px;
      font-size: 12px;
      border-bottom: 1px solid #e5e5e5;
      cursor: pointer;

      img {
        top: 17px;
        right: 8px;
        width: 10px;
        vertical-align: middle;
      }
    }
    .selected {
      border-right: 2px solid #3498db;
    }
  }

  .board {
    display: inline-block;
    width: calc(100% - 180px);
    height: 100%;
    vertical-align: top;

    .header {
      .title {
        padding: 6px 12px 3px 12px;
        line-height: 36px;
        font-weight: 700;
        color: #666666;
      }
    }

    .body {
      height: calc(100% - 45px);
      padding: 5px 12px;
      overflow-x: auto;
      white-space: nowrap;
      -webkit-overflow-scrolling: touch;
      .tray {
        display: inline-block;
        height: calc(100% - 20px);
        margin-right: 10px;
        background-color: #fdfdfd;
        border: 1px solid #dddddd;
        border-top: 2px solid #f1c40f;
        vertical-align: top;

        .title {
          padding: 10px 8px 8px 8px;
          font-size: 14px;
          line-height: 16px;
          color: #666666;
          font-weight: 700;
          border-bottom: 1px solid #e9e9e9;
          background-color: #fbfbfb;
        }

        .inner {
          width: 300px;
          height: calc(100% - 10px);

          & > div {
            height: calc(100% - 25px);
            padding: 10px;
            overflow-y: auto;
            white-space: nowrap;
            -webkit-overflow-scrolling: touch;
          }
        }

        .list-group {
          display: block;
          min-height: 300px;
        }

        .item {
          height: 70px;
          padding: 7px 12px;
          margin-bottom: 7px;
          border: 1px solid #dddddd;
          border-radius: 3px;
          background-color: #f9f9f9;
          color: #444444;
          user-select: none;
          cursor: pointer;
        }
      }
    }
  }
}
.sortable-ghost {
  cursor:pointer;
  // background-color: #e8f5e9 !important;
  border: 1px solid #f1c40f !important;
}
</style>  