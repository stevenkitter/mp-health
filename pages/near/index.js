//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    showMap:false,
    mapData: {
      scale: 17,
      longitude: 0,
      latitude: 0,
      markers:[]
      /*
      longitude: 108.943176,
      latitude: 34.300337,*/
    }
  },
  onLoad: function () {
    var _this = this
    wx.getLocation({
      type: "gcj02",
      success(res) {
        _this.setData({
          "mapData.longitude":res.longitude,
          "mapData.latitude":res.latitude
        })
        wx.request({
          url: app.globalData.api + '/near',
          data: {
            longitude: res.longitude,
            latitude: res.latitude,
          },
          success(res) {
              console.log(res.data.yd)
              let yd = res.data.yd.map((item)=>{
                return {
                  id: item.id,
                  latitude:item.location.lat,
                  longitude:item.location.lng,
                  iconPath:"/img/药店.png",
                  width:"20px",
                  height:"20px",
                  callout:{
                    color:"#ffffff",
                    bgColor:"#FF0000",
                    padding:10,
                    borderRadius:5,
                    content:item.title
                  },
                }
              });
              let yy = res.data.yy.map((item)=>{
                return {
                  id: item.id,
                  latitude:item.location.lat,
                  longitude:item.location.lng,
                  iconPath:"/img/医院.png",
                  width:"20px",
                  height:"20px",
                  callout:{
                    color:"#ffffff",
                    bgColor:"#FF0000",
                    padding:10,
                    borderRadius:5,
                    content:item.title
                  },
                }
              });
              let jsf = res.data.jsf.map((item)=>{
                return {
                  id: item.id,
                  latitude:item.location.lat,
                  longitude:item.location.lng,
                  iconPath:"/img/健身.png",
                  width:"20px",
                  height:"20px",
                  callout:{
                    color:"#ffffff",
                    bgColor:"#FF0000",
                    padding:10,
                    borderRadius:5,
                    content:item.title
                  },
                }
              });
            let markers = yd.concat(yy).concat(jsf);
            _this.setData({
              "mapData.markers":markers,
              showMap:true
            })
          }
      })
      }
    });
  },
  bindmarkertap(res){
    
    for (var i = 0; i < this.data.mapData.markers.length; i++) {
      let item = this.data.mapData.markers[i];
      if (res.markerId === item.id) {
        wx.openLocation({
          latitude: item.latitude,
          longitude: item.longitude,
        })
      }
    }
  }
})
