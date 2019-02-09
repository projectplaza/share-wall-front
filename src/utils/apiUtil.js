import $ from 'jquery'
import { URI_BASE } from '../constants/apiConstant'
import { getLoginInfo, getTempLoginInfo } from './storageUtil'

const HTTP_METHOD_GET = 'GET'
const HTTP_METHOD_POST = 'POST'
const HTTP_METHOD_PUT = 'PUT'
const HTTP_METHOD_DELETE = 'DELETE'

const CONTENT_TYPE_APPLICATION_JSON = 'application/json'

const createUri = (path) => {
  return URI_BASE + path
}

const getToken = () => {
  const loginInfo = getLoginInfo() || getTempLoginInfo()
  
  if (loginInfo === null) {
    return null
  }

  return loginInfo.token
}

/**
 * クエリパラメタを作成する
 * @param {object} paramObj パラメタオブジェクト
 */
const createQueryParam = (paramObj) => {

  const query = "?";

  if (paramObj == null) {
    return query;
  }

  for (let key in paramObj) {
    const val = paramObj[key];
    if (query !== "") {
      query += "&";
    }
    query += key + "=" + encodeURIComponent(val);
  }

  return query;
};

// GETリクエストを送信するPromiseオブジェクトを返却する
export const getRequest = (uri, data) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: createUri(uri) + createQueryParam(data),
      type: HTTP_METHOD_GET,
      headers: {
        'x-access-token': getToken()
      }
    }).done((data) => {
      resolve(data)
    }).fail((error) => {
      reject(error)
    })
  })
};

// POSTリクエストを送信するPromiseオブジェクトを返却する
export const postRequest = (uri, data) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: createUri(uri),
      type: HTTP_METHOD_POST,
      headers: {
        'x-access-token': getToken()
      },
      contentType: CONTENT_TYPE_APPLICATION_JSON,
      data: JSON.stringify(data),
    }).done((data) => {
      resolve(data)
    }).fail((error) => {
      reject(error)
    })
  })
};