import draggable from "vuedraggable";

const trays = [
  {
    code: "1",
    name: "新規",
    list: [
      { code: "01", name: "開発", status: "2" },
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
    categories: categorys,
    mode: {
      task: {
        edit: true
      }
    },
    dialog: {
      traySetting: {
        visible: false
      }
    }
  }),
  computed: {
    options: () => ({
      animation: 70,
      group: 'description',
      dragClass: 'dragging'
    }),
    trayOptions: () => ({
      animation: 70,
    })
  },
  watch: {},
  components: {
    draggable
  }
};

export default wallApp