import anchorify from 'anchorify'

/**
 * テキストにアンカーを設定する
 * @param {string} text 対象文字列
 * @returns {string} 変換後文字列
 */
const setAnchor = text => {
  if (text == null) {
    return null
  }
  return anchorify(encodeLineSeparator(escapeHtml(text)), { target: '_blank' } )
}

/**
 * 改行をbrタグに変換する
 * @param {string} text 対象文字列
 * @returns {string} 変換後文字列
 */
const encodeLineSeparator = text => {
  if (text == null) {
    return text
  }

  return text.replace(/\n/g, '<br>')
}

/**
 * HTMLエスケープ処理を行う
 * @param {string} text 対象文字列
 * @returns {string} エスケープ後文字列
 */
const escapeHtml = text => {
  if (text == null) {
    return text
  } else if(typeof text !== 'string') {
    return text;
  }

  return text.replace(/[&'`"<>]/g, match => {
    return {
      '&': '&amp;',
      "'": '&#x27;',
      '`': '&#x60;',
      '"': '&quot;',
      '<': '&lt;',
      '>': '&gt;',
    }[match]
  })
}

export default {
  setAnchor,
  encodeLineSeparator,
  escapeHtml
}