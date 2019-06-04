// pages/postCircle/postCircle.js

const Http = require('../../utils/http.js')
const Uris = require('../../utils/urls.js')

Page({

  /**
    * 页面的初始数据
    */
  data: {
    uploaded: false,
    imageUrl: "",
    title: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindTitleInput: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  bindContentInput: function (e) {
    this.setData({
      price: e.detail.value
    })
  },
  chooseVideo: function () {
    const that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        that.setData({
          imageUrl: res.tempFilePaths[0],
          uploaded: true
        })
      }
    })
  },
  sure: function () {
    if (!this.data.uploaded) {
      wx.showToast({
        title: '选择logo',
        icon: "none"
      })
      return
    }
    if (this.data.title.length === 0) {
      wx.showToast({
        title: '说点什么吧',
        icon: "none"
      })
      return
    }
 

    const that = this
    wx.uploadFile({
      url: Uris.UploadFileUri,
      filePath: this.data.imageUrl,
      name: 'file',
      header: {
        token: wx.getStorageSync("token")
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode === 200) {
          const data = JSON.parse(res.data)
          if (data.code === 200) {
            console.log(data.data.fileId)
            that.saveVideoRecord(data.data.fileId)
          }
        }
      }
    })
  },
  saveVideoRecord: function (fileId) {
    const that = this;
    Http.POST({
      fileId: fileId,
      content: that.data.title,
    }, Uris.AddCardUrl).then(function (res) {
      console.log(res);
      wx.showModal({
        title: '提示',
        content: res.data.msg,
        showCancel: false,
        success: function () {
          wx.navigateBack({
          })
        }
      })
    }).catch(function (err) { })
  }
})