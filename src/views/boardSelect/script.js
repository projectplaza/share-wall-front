import { mapMutations } from "vuex"
import { ROUTE_NAME } from '../../router'
import vuexUtil from '../../utils/vuexUtil'

const themeColor = {
  blue: {
    border: '1px solid #2980b9',
    backgroundColor: '#3498db'
  },
  green: {
    border: '1px solid #16a085',
    backgroundColor: '#1abc9c'
  },
  purple: {
    border: '1px solid #8e44ad',
    backgroundColor: '#9b59b6'
  },
  darkBlue: {
    border: '1px solid #2c3e50',
    backgroundColor: '#34495e'
  },
  yellow: {
    border: '1px solid #f39c12',
    backgroundColor: '#f1c40f'
  },
  orange: {
    border: '1px solid #d35400',
    backgroundColor: '#e67e22'
  },
  red: {
    border: '1px solid #c0392b',
    backgroundColor: '#e74c3c'
  },
  grey: {
    border: '1px solid #7f8c8d',
    backgroundColor: '#95a5a6'
  }
}

const boardSelectApp = {
  name: "board-select",
  data: () => ({
    display: {
    },
    list: {
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
    handleBoardClick: function() {
      this.dialog.setting.visible = true
    },
    // Vuex mutations
    ...mapMutations("common", ["showProgressBar", "hideProgressBar", 'changeCurrentTeam', 'changeCurrentProject'])
  },

  created: function () {
    vuexUtil.setTeamProject(this)
  }
}

export default boardSelectApp