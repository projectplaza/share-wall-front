import { ROUTE_NAME } from '../../router'
import request from './request'

/**
 * プロジェクト登録ボタンクリックイベントハンドラ
 * @param {object} _this 
 */
const handleCreateButtonClick = _this => {
  
  _this.showProgressBar()
  
  request.postProjectRequest(_this.$route.params.teamId, _this.project.code, _this.project.name, _this.project.content).then(result => {
    
    const users = _this.members.map(member => {
      return {
        userId: member.userId,
        administratorAuthority: (member.auth.indexOf('1') >= 0) ? true : false,
        userAuthority: (member.auth.indexOf('2') >= 0) ? true : false
      }
    })

    request.postProjectUserRequest(_this.$route.params.teamId, _this.project.code, users).then(result => {
      _this.hideProgressBar()

      _this.$router.push({
        name: ROUTE_NAME.PROJECT_DASHBOARD,
        params: {
          teamId: _this.$route.params.teamId,
          projectId: _this.project.code
        }
      })
    })
  })
}

/**
 * キャンセルボタンクリックイベントハンドラ
 * @param {object} _this 
 */
const handleCancelClick = _this => {
  _this.$router.push({
    name: ROUTE_NAME.TEAM_DASHBOARD,
    params: {
      teamId: _this.$route.params.teamId
    }
  })
}

/**
 * プロジェクトメンバー削除クリックイベントハンドラ
 * @param {object} _this 
 * @param {string} userId ユーザーID
 */
const handleProjectMemberRemoveClick = (_this, userId) => {
  _this.member.users.map(user => {
    if (user.userId == userId) user.isMember = false
  })
}

/**
 * プロジェクトメンバー追加クリックイベントハンドラ
 * @param {object} _this 
 * @param {string} userId ユーザーID
 */
const handleProjectMemberAddClick = (_this, userId) => {
  _this.member.users.map(user => {
    if (user.userId == userId) user.isMember = true
  })

  if (_this.teamMembers.length == 0) {
    _this.showDialog = false
  }
}

/**
 * コンポーネント作成時のイベントハンドラ
 * @param {object} _this 
 */
const handleCreated = _this => {
  
  const teamId = _this.$route.params.teamId
  _this.changeCurrentTeam(teamId)
  _this.changeCurrentProject(null)

  request.getProfileRequest().then(result => {
    const myUserId = result.userId

    request.getTeamMemberRequest(teamId).then(list => {
      const users = list.map(l => {
        return {
          userId: l.userId,
          userName: l.userName,
          auth: (l.userId == myUserId) ? ['1', '2'] : ['1'],
          isMember: (l.userId == myUserId) ? true : false,
          isAuthor: (l.userId == myUserId) ? true : false
        }
      })
  
      _this.$set(_this.member, 'users', users)
    })
  })  
}

export default {
  handleCreateButtonClick,
  handleProjectMemberRemoveClick,
  handleProjectMemberAddClick,
  handleCancelClick,
  handleCreated
}