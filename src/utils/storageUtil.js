// KEY:トークン
const KEY_TOKEN = 'com.share-wall.auth.token'

// ローカルストレージにトークンを格納する
export const setLoginInfo = (loginObj) => {
  setLocalStorage(KEY_TOKEN, loginObj)
}
// ローカルストレージからトークンを取得する
export const getLoginInfo = () => {
  return getLocalStorage(KEY_TOKEN)
}

// セッションストレージにトークンを格納する
export const setTempLoginInfo = (loginObj) => {
  setSessionStorage(KEY_TOKEN, loginObj)
}
// セッションストレージからトークンを取得する
export const getTempLoginInfo = () => {
  return getSessionStorage(KEY_TOKEN)
}

// ローカルストレージに値を格納する
// ** 必ずオブジェクトで格納すること

/**
 * ローカルストレージに値を設定する
 * @param {string} key キー
 * @param {object} value 値
 */
const setLocalStorage = (key, value) => {

  if (key === null || key === '') {
    return
  }

  if (value !== null) {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}

/**
 * ローカルストレージから値を取得する
 * @param {string} key キー
 * @returns {object}
 */
const getLocalStorage = (key) => {

  if (key === null) {
    return null
  }

  let value = localStorage.getItem(key)
  if (value !== null) {
    value = JSON.parse(value)
  }

  return value
}

/**
 * セッションストレージに値を設定する
 * @param {string} key キー
 * @param {object} value 値
 */
const setSessionStorage = (key, value) => {

  if (key === null || key === '') {
    return
  }

  if (value !== null) {
    value = JSON.stringify(value)
  }
  sessionStorage.setItem(key, value)
}

/**
 * セッションストレージから値を取得する
 * @param {string} key キー
 * @returns {object}
 */
const getSessionStorage = (key) => {

  if (key === null) {
    return null
  }

  let value = sessionStorage.getItem(key)
  if (value !== null) {
    value = JSON.parse(value)
  }

  return value
}