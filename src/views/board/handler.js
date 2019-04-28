import $ from 'jquery'

const handleResizeWindow = () => {
  const windowHeight = $(window).height()
  console.log('RESIZE:' + windowHeight)
  $('.board-content').css('height', (windowHeight - 80) + 'px')
}

export default {
  handleResizeWindow
}