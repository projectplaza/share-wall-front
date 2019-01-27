import $ from 'jquery'
import { URI_BASE } from '../constants/apiConstant'

const HTTP_METHOD_GET = 'GET'
const HTTP_METHOD_POST = 'POST'
const HTTP_METHOD_PUT = 'PUT'
const HTTP_METHOD_DELETE = 'DELETE'

const CONTENT_TYPE_APPLICATION_JSON = 'application/json'

const createUri = (path) => {
  return URI_BASE + path
}

// POSTリクエストを送信するPromiseオブジェクトを返却する
export const postRequest = (uri, data) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: createUri(uri),
      type: HTTP_METHOD_POST,
      contentType: CONTENT_TYPE_APPLICATION_JSON,
      data: JSON.stringify(data),
    }).done((data) => {
      resolve(data)
    }).fail((error) => {
      reject(error)
    })
  })
}