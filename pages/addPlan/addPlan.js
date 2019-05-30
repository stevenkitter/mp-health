const app = getApp();

Page({
  data: {
    planName: [],
    planData: {}
  },
  onLoad() {

  },
  onShow() {
    this.setData({
      planName: app.globalData.planName
    })

  },


  /*修改开始日期*/
  changstartTime(e) {
    let end = this.data.planData.endTime;
    let val = e.detail.value;
    if (end && (new Date(val)) > (new Date(end))) {
      wx.showToast({
        title: '不能大于结束时间',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    this.setData({
      "planData.startTime": val
    })
  },
  /*修改结束日期*/
  changendTime(e) {
    let sta = this.data.planData.startTime;
    let val = e.detail.value;
    if (sta && (new Date(val)) < (new Date(sta))) {
      wx.showToast({
        title: '不能小于开始时间',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    this.setData({
      "planData.endTime": val
    })
  },
  /*修改开始日期*/
  editDone(e) {
    this.setData({
      "planData.desc": e.detail.value
    })
  },
  /*修改计划名称*/
  changPlanName(e) {
    console.log(e.detail)
    let planNames = this.data.planName;
    this.setData({
      "planData.planName": planNames[e.detail.value]
    })
  },
  submitPlan(e) {
    if (!this.data.planData.planName) {
      wx.showToast({
        title: '请选择计划名',
        icon: 'none',
        duration: 3000
      })
      return
    }
    if (!this.data.planData.startTime) {
      wx.showToast({
        title: '请选择开始时间',
        icon: 'none',
        duration: 3000
      })
      return
    }
    if (!this.data.planData.endTime) {
      wx.showToast({
        title: '请选择结束时间',
        icon: 'none',
        duration: 3000
      })
      return
    }
    let userId = wx.getStorageSync('jzgj_token');
    let planData = this.data.planData;
    planData.userId = userId;
    wx.request({
      url: app.globalData.api + '/insertPlan',
      data: planData,
      success(res) {
        wx.hideLoading()
        if (res.data) {
          wx.showToast({
            title: '保存成功',
            icon: 'none',
            duration: 2000,
          })
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/plan/index'
            })
          }, 2000);
        } else {
          wx.showToast({
            title: '保存失败,请重试',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  }

})
