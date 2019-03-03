import { mapMutations } from 'vuex'
import { ROUTE_NAME } from '../../router' 

/**
 * Vueオブジェクト
 */
const app = {

  name: "ProjectDashboard",

  data: () => ({
    ROUTE_NAME: ROUTE_NAME
  }),

  created: function () {
    this.changeCurrentTeam(this.$route.params.teamId)
    this.changeCurrentProject(this.$route.params.projectId)
  },

  watch: {
    '$route': function () {
      this.changeCurrentTeam(this.$route.params.teamId)
      this.changeCurrentProject(this.$route.params.projectId)
    }
  },

  methods: {
    ...mapMutations('common', ['changeCurrentTeam', 'changeCurrentProject'])
  }
}

export default app