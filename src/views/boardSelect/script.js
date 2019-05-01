import { mapMutations } from "vuex"
import draggable from "vuedraggable"
import { ROUTE_NAME } from '../../router'
import vuexUtil from '../../utils/vuexUtil'

const themeColor = {
  blue: {
    border: '1px solid #2980b9',
    backgroundColor: '#3498db',
    icon: {
      backgroundColor: '#2980b9'
    }
  },
  green: {
    border: '1px solid #16a085',
    backgroundColor: '#1abc9c',
    icon: {
      backgroundColor: '#16a085'
    }
  },
  purple: {
    border: '1px solid #8e44ad',
    backgroundColor: '#9b59b6',
    icon: {
      backgroundColor: '#8e44ad'
    }
  },
  darkBlue: {
    border: '1px solid #2c3e50',
    backgroundColor: '#34495e',
    icon: {
      backgroundColor: '#2c3e50'
    }
  },
  yellow: {
    border: '1px solid #f39c12',
    backgroundColor: '#f1c40f',
    icon: {
      backgroundColor: '#f39c12'
    }
  },
  orange: {
    border: '1px solid #d35400',
    backgroundColor: '#e67e22',
    icon: {
      backgroundColor: '#d35400'
    }
  },
  red: {
    border: '1px solid #c0392b',
    backgroundColor: '#e74c3c',
    icon: {
      backgroundColor: '#c0392b'
    }
  },
  grey: {
    border: '1px solid #7f8c8d',
    backgroundColor: '#95a5a6',
    icon: {
      backgroundColor: '#7f8c8d'
    }
  }
}

const boardSelectApp = {
  name: "board-select",
  data: () => ({
    display: {
    },
    list: {
      yourBoard: [
        {
          themeColor: 'blue',
          title: '開発バックログ',
          description: 'ここに説明を記載する',
          private: false
        },
        {
          themeColor: 'green',
          title: '開発バックログ',
          description: 'ここに説明を記載する',
          private: true
        },
        {
          themeColor: 'purple',
          title: '開発バックログ',
          description: 'ここに説明を記載する',
          private: false
        },
        {
          themeColor: 'darkBlue',
          title: '開発バックログ',
          description: 'ここに説明を記載する',
          private: false
        },
        {
          themeColor: 'yellow',
          title: '開発バックログ',
          description: 'ここに説明を記載する',
          private: false
        },
        {
          themeColor: 'orange',
          title: '開発バックログ',
          description: 'ここに説明を記載する',
          private: false
        },
        {
          themeColor: 'red',
          title: '開発バックログ',
          description: 'ここに説明を記載する',
          private: false
        },
        {
          themeColor: 'grey',
          title: '開発バックログ',
          description: 'ここに説明を記載する',
          private: false
        },
        {
          themeColor: 'blue',
          title: '開発バックログ',
          description: 'ここに説明を記載する',
          private: false
        }
      ],
      otherBoard: [
        {
          themeColor: 'blue',
          title: '開発バックログ',
          description: 'ここに説明を記載する'
        },
        {
          themeColor: 'green',
          title: '開発バックログ',
          description: 'ここに説明を記載する'
        },
        {
          themeColor: 'purple',
          title: '開発バックログ',
          description: 'ここに説明を記載する'
        },
        {
          themeColor: 'darkBlue',
          title: '開発バックログ',
          description: 'ここに説明を記載する'
        },
        {
          themeColor: 'yellow',
          title: '開発バックログ',
          description: 'ここに説明を記載する'
        },
        {
          themeColor: 'orange',
          title: '開発バックログ',
          description: 'ここに説明を記載する'
        },
        {
          themeColor: 'red',
          title: '開発バックログ',
          description: 'ここに説明を記載する'
        },
        {
          themeColor: 'grey',
          title: '開発バックログ',
          description: 'ここに説明を記載する'
        },
        {
          themeColor: 'blue',
          title: '開発バックログ',
          description: 'ここに説明を記載する'
        }
      ]
    },
    dialog: {
      setting: {
        visible: false,
        isCreate: true,
        themeColor: 'blue',
        isOpenDelete: false
      }
    },
    themeColor
  }),

  methods: {
    handleBoardClick: function () {
      this.dialog.setting.visible = true
    },
    // Vuex mutations
    ...mapMutations("common", ["showProgressBar", "hideProgressBar", 'changeCurrentTeam', 'changeCurrentProject'])
  },

  created: function () {
    vuexUtil.setTeamProject(this)
  },

  components: {
    draggable
  }
}

export default boardSelectApp