const state = {
  // 認証関連
  auth: {
    loggedIn: false,
    token: ''
  },
  // ヘッダー関連
  header: {
    // チーム
    team: {
      current: null, // code
      list: []
    },
    // プロジェクト
    project: {
      current: null,
      list: []
    },
    progressBar: {
      visible: false
    }
  },
  // コンテンツ関連
  content: {
    style: {
      width: 'calc(100% - 50px)'
    }
  },
  // ショートカットコンテンツ関連
  shortcutContent: {
    style: {
      right: '-300px',
      borderLeft: '0px'
    },
    current: '', // code
    visible: false
  }
}

const getters = {
  // 選択中のチーム
  currentTeam: state => {
    return state.header.team.list.find(team => state.header.team.current === team.code)
  },
  // 選択中のプロジェクト
  currentProject: state => {
    return state.header.project.list.find(pj => state.header.project.current === pj.code)
  }
}

const mutations = {
  // ログイン
  setLoginState: (state, flag) => {
    state.auth = {
      ...state.auth,
      loggedIn: flag
    }
  },
  // トークンを設定
  setNewToken: (state, { token }) => {
    state.auth = {
      ...state.auth,
      token: token
    }
  },
  // 現在のチームを変更
  changeCurrentTeam: (state, code) => {
    state.header.team = {
      ...state.header.team,
      current: code
    }
  },
  // チームリストを更新
  setTeamList: (state, teamList) => {
    state.header.team = {
      ...state.header.team,
      list: teamList
    }
  },
  // チームリストを更新
  setProjectList: (state, projectList) => {
    state.header.project = {
      ...state.header.project,
      list: projectList
    }
  },
  // 現在のプロジェクトを変更
  changeCurrentProject: (state, code) => {
    state.header.project = {
      ...state.header.project,
      current: code
    }
  },
  // 現在のチームリストを更新
  changeProjectList: (state, projectList) => {
    state.header.project = {
      ...state.header.project,
      list: projectList
    }
  },
  // プログレスバーを表示
  showProgressBar: state => {
    state.header.progressBar = {
      visible: true
    }
  },
  // プログレスバーを非表示
  hideProgressBar: state => {
    state.header.progressBar = {
      visible: false
    }
  },
  // ショートカットコンテンツの表示を切り替え
  switchShortcutContent: (state, code) => {
    if (!state.shortcutContent.visible === '' || state.shortcutContent.current !== code) {
      // 表示
      state.content.style = {
        width: 'calc(100% - 350px)'
      }
      state.shortcutContent = {
        style: {
          right: '0px',
          borderLeft: '1px solid #dddddd'
        },
        current: code,
        visible: true
      }
    } else {
      // 非表示
      state.content.style = {
        width: 'calc(100% - 50px)'
      }
      state.shortcutContent = {
        style: {
          right: '-300px',
          borderLeft: '0px'
        },
        current: '',
        visible: false
      }
    }
  }
}

const actions = {
  // ログイン処理
  login({ commit }, { id, password }) {
    return new Promise((resolve, reject) => {
      window.setTimtout(() => {
        const token = 'abcdefg'
        commit('setNewToken', { token: token })
        resolve(token)
      }, 2000)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
