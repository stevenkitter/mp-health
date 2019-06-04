// pages/planDetail/planDetail.js
const Http = require('../../utils/http.js')
const Uris = require('../../utils/urls.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    plan: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const planStr = options.plan;
    const plan = JSON.parse(planStr);
    this.setData({
      plan: plan
    })
  },
  choose(){
    const that = this;
    wx.showModal({
      title: '确定选择？',
      content: '会取消之前的计划',
      success: function(res){
        if(res.confirm) {
          that.chooseAction()
        }
      }
    })
  },
  chooseAction(){
    Http.POST({ planId: this.data.plan.id }, Uris.ChoosePlanUrl).then(function (res) {
        if(res.data.code == 200) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000,
            success: function(res){
              wx.reLaunch({
                url: '/pages/planList/planList'
              })
            }
          })
        }
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