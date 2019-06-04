App({
  onLaunch: function () {
    const token = wx.getStorageSync("token")
    if (token != "" || token != undefined) {
      wx.reLaunch({
        url: 'pages/detections/detections'
      })
    }
  },
  globalData: {
    planName:['减肥','睡觉','降血压','控血糖','跑步'],
    userInfo: null,
    api: 'http://localhost:8080'
  }
})
