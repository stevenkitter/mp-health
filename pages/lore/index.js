//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    loreShow: new Array(),
    loreData: [
      
    ]
  },
  onShow:function(){
    let that = this;
    let userId = wx.getStorageSync('jzgj_token');
    wx.request({
      url: app.globalData.api + '/allArticle',
      success(res) {
          console.log(res.data)
          if (res.data) {
             that.setData({
              loreData:res.data,
              loreShow:new Array(res.data.length)
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
  onLoad: function (opt) {
    
  },
  searchLore(e) {
    let val = e.detail.value;
    let loreData = this.data.loreData;
    let loreShow = this.data.loreShow;
    if (val == "") {
      loreShow = new Array(loreData.length);
    } else {
      for (let i in loreData) {
        loreShow[i] = !(loreData[i].title.indexOf(val) > -1);
      }
    }
    this.setData({
      loreShow:loreShow
    })
  },
  details(e){
    let that = this;
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/loreDetails/index?id='+id
    })
  }
})
