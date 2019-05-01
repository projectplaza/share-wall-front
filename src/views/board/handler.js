import $ from 'jquery'

const handleResizeWindow = () => {
  const windowHeight = $(window).height()
  console.log('RESIZE:' + windowHeight)
  $('.board-content').css('height', (windowHeight - 80) + 'px')
}

const handleMenuClick = _this => {
  _this.display.menu.visible = !_this.display.menu.visible
}

const handleInfoClick = _this => {
  _this.display.description.visible = !_this.display.description.visible
}

const handleHeaderSettingClick = _this => {
  _this.dialog.setting.visible = true
}

const handleBoardSettingCloseClick = _this => {
  _this.dialog.setting.visible = false
}

const handlePanelSettingCloseClick = _this => {
  _this.dialog.panelSetting.visible = false
}

const handleTaskClick = _this => {
  _this.dialog.taskSetting.visible = true
}

const handleDetailTabClick = _this => {
  _this.dialog.taskSetting.view.detail = true
  _this.dialog.taskSetting.view.comment = false
}

const handleCommentTabClick = _this => {
  _this.dialog.taskSetting.view.detail = false
  _this.dialog.taskSetting.view.comment = true
}

/**
 * TODO 削除
 */
const showPanelSetting = _this => {
  _this.dialog.panelSetting.visible = true
}

export default {
  handleResizeWindow,
  handleMenuClick,
  handleInfoClick,
  handleHeaderSettingClick,
  handleBoardSettingCloseClick,
  handlePanelSettingCloseClick,
  handleTaskClick,
  handleDetailTabClick,
  handleCommentTabClick,
  showPanelSetting
}