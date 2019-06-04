//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
      planData:[]
  },
  onShow:function(){
    let that = this;
    let userId = wx.getStorageSync('token');
    wx.request({
      url: app.globalData.api + '/planList',
      data: {
        userId:userId
      },
      success(res) {
          wx.hideLoading()
          if (res.data) {
             console.log(res.data)
             that.setData({
              planData:res.data
             })
          } else {
              wx.showToast({
                  title: "获取计划失败",
                  icon: 'none',
                  duration: 3000
              })
          }
      }
    })
  },
  onLoad: function () {
   
  },
  updatePlan(id,state){
    let that = this;
    wx.request({
      url: app.globalData.api + '/updatePlan',
      data: {
        id:id,
        state:state
      },
      success(res) {
        that.onShow();
      }
    })
  },
  stopPlan(e){
    let that = this;
    let id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定要停止该计划吗?',
      success(res) {
        if (res.confirm) {
          that.updatePlan(id,"1")
        }
      }
    })
  },
  startPlan(e){
    let that = this;
    let id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定要启动该计划吗?',
      success(res) {
        if (res.confirm) {
          that.updatePlan(id,"0")
        }
      }
    })
  },
  delPlan(e){
    let that = this;
    let id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定要删除该计划吗?',
      success(res) {
        if (res.confirm) {
          that.updatePlan(id,"3")
        }
      }
    })
  },
  addPlan(e){
    wx.navigateTo({
      url: '/pages/addPlan/addPlan'
    })
  }
})
