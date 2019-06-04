const URIS = require("./urls.js")

const Code2Session = function(code){
  return new Promise(function (resolve, reject) {
    wx.request({
      url: URIS.Code2SessionUri,
      data: {
        code: code
      },
      success: function (res) {
        resolve(res)
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
} 

const POST = function(data, url) {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: url,
      data: data,
      header: {
        token: wx.getStorageSync("token")
      },
      method: "POST",
      success: function (res) {
        resolve(res)
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}

const GET = function (data, url) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      header: {
        token: wx.getStorageSync("token")
      },
      method: "GET",
      success: function (res) {
        resolve(res)
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}

const DELETE = function(data, url) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      header: {
        token: wx.getStorageSync("token")
      },
      method: "DELETE",
      success: function (res) {
        resolve(res)
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}

module.exports = {
  Code2Session: Code2Session,
  POST: POST,
  GET: GET,
  DELETE: DELETE
}