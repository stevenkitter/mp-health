// pages/detections/detections.js

const Http = require('../../utils/http.js')
const Uris = require('../../utils/urls.js')



Page({

  /**
   * 页面的初始数据
   */
  data: {
    detections: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData();
  },

  loadData() {
    const that = this;
    Http.GET({}, Uris.MyDetections).then(function(res){
      that.setData({
        detections: res.data.data
      });
      console.log(res);
    })

  },
  plans(res){
    
    const id = res.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '/pages/recommendPlans/recommendPlans?detectionId=' + id,
    })
  },
  add(){
    wx.navigateTo({
      url: '/pages/index/index',
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