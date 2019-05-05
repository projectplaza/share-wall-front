import $ from 'jquery'
import { mapMutations } from "vuex"
import draggable from "vuedraggable"
import { ROUTE_NAME } from '../../router'
import vuexUtil from '../../utils/vuexUtil'
import handler from './handler'

const documentApp = {
  name: "document",
  data: () => ({
    display: {
      editable: false,
      opened: true,
      view: {
        optionMenu: {
          visible: false
        }
      }
    },
    list: {
    },
    dialog: {
      setting: {
        visible: false
      }
    }
  }),

  methods: {
    // Vuex mutations
    ...mapMutations("common", ["showProgressBar", "hideProgressBar", 'changeCurrentTeam', 'changeCurrentProject'])
  },

  created: function () {
    vuexUtil.setTeamProject(this)
  },

  watch: {
  },

  components: {
    draggable
  }
}

export default documentApp