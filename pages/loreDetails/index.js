//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    id:""

  },
  onLoad: function (opt) {
    this.setData({
      id:opt.id
    })
    let that = this;
    wx.request({
      url: app.globalData.api + '/getContent',
      data:{id:opt.id},
      success(res) {
          console.log(res.data)
          if (res.data) {
             that.setData({
              title:res.data.title,
              content:res.data.content
             })
          } else {
              wx.showToast({
                  title: "获取文章失败",
                  icon: 'none',
                  duration: 3000
              })
          }
      }
    })
  },
 
})
