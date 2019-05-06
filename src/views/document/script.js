import $ from 'jquery'
import { mapMutations } from "vuex"
import draggable from "vuedraggable"
import { ROUTE_NAME } from '../../router'
import vuexUtil from '../../utils/vuexUtil'
import handler from './handler'

const list = [
  {
    folderId: '00001',
    folderName: '全体',
    opened: false,
    files: [
      {
        fileId: '1',
        fileName: 'コンセプト',
      },
      {
        fileId: '2',
        fileName: 'ルール',
      }
    ]
  },
  {
    folderId: '00002',
    folderName: '画面設計書',
    opened: true,
    files: [
      {
        fileId: 'a',
        fileName: 'ウォール',
      },
      {
        fileId: 'b',
        fileName: 'ドキュメント',
      }
    ]
  }
]

const documentApp = {
  name: "document",
  data: () => ({
    display: {
      editable: true,
      opened: true,
      view: {
        optionMenu: {
          visible: false
        }
      }
    },
    list: {
      folders: list
    },
    dialog: {
      setting: {
        visible: false
      },
      folderCreate: {
        visible: false
      },
      folderSetting: {
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