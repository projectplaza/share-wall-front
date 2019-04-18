import { mapMutations } from "vuex"
import { ROUTE_NAME } from '../../router'
import vuexUtil from '../../utils/vuexUtil'

const boardSelectApp = {
  name: "board-select",
  data: () => ({
    display: {
    },
    list: {
    }
  }),

  methods: {
    // Vuex mutations
    ...mapMutations("common", ["showProgressBar", "hideProgressBar", 'changeCurrentTeam', 'changeCurrentProject'])
  },

  created: function () {
    vuexUtil.setTeamProject(this)
  }
}

export default boardSelectApp