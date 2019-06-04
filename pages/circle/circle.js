// pages/circle/circle.js

const Http = require('../../utils/http.js')
const Uris = require('../../utils/urls.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cards: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData();
  },
  loadData(){
    const that = this;
    Http.GET({}, Uris.MyCardUrl).then(function (res) {
      that.setData({
        cards: res.data.data
      });
      console.log(res);
    })

  },
  add(){
    wx.navigateTo({
      url: '/pages/postCircle/postCircle',
    })
  },
  imageBig(res){
    const index = res.currentTarget.dataset.index;
    const card = this.data.cards[index];
    wx.previewImage({
      urls: [card.file.fileName]
    })
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
    this.loadData();
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

  }
})