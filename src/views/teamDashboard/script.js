import { mapMutations } from 'vuex'
import { ROUTE_NAME } from '../../router' 

/**
 * Vueオブジェクト
 */
const app = {

  name: "TeamDashboard",

  data: () => ({
    ROUTE_NAME: ROUTE_NAME
  }),

  created: function () {
    this.changeCurrentTeam(this.$route.params.teamId)
    this.changeCurrentProject(null)
  },

  watch: {
    '$route': function () {
      this.changeCurrentTeam(this.$route.params.teamId)
      this.changeCurrentProject(null)
    }
  },

  methods: {
    ...mapMutations('common', ['changeCurrentTeam', 'changeCurrentProject'])
  }
}

export default app