const app = getApp();
const Http = require('../../utils/http.js')
const Uris = require('../../utils/urls.js')
Page({
    data: {
        sexPicker: ['男', '女'],
        userInfo: {
            sex: '0',
            height: '',
            weight: '',
            waist: '',
            bust: '',
            blood: '',
        },
        editFlag: {

        }

    },
    onLoad() {

    },
    onShow() {


    },



    /*修改性别*/
    changeSex(e) {
        console.log(e.detail)
        this.setData({
            "userInfo.sex": e.detail.value
        })
    },
    edit(e) {
        console.log(e.currentTarget.dataset.id);
        let id = "editFlag." + e.currentTarget.dataset.id;
        this.setData({
            [id]: true
        })
    },
    editDone(e) {
        console.log(e.detail);
        let id = e.currentTarget.dataset.id;
        let val = e.detail.value;
        let id1 = "userInfo." + id;
        let id2 = "editFlag." + id;
        if (!val == "") {
            this.setData({
                [id1]: val
            })
        }
        this.setData({
            [id2]: false
        })
    },
    toSubmit() {
        wx.showLoading({
            title: '评测中',
            mask: true
        })
        let userid = wx.getStorageSync('token');
        let info = this.data.userInfo;
        if (!info.sex) {
            info.sex='0'
        }
        if (!info.height) {
            wx.showToast({
                title: '请输入身高',
                icon: 'none',
                duration: 2000
            })
            return
        }
        if (!info.weight) {
            wx.showToast({
                title: '请输入体重',
                icon: 'none',
                duration: 2000
            })
            return
        }
        if (!info.waist) {
            wx.showToast({
                title: '请输入腰围',
                icon: 'none',
                duration: 2000
            })
            return
        }
        if (!info.bust) {
            wx.showToast({
                title: '请输入臀围',
                icon: 'none',
                duration: 2000
            })
            return
        }
      if (!info.blood) {
        wx.showToast({
          title: '请输入血糖',
          icon: 'none',
          duration: 2000
        })
        return
      }
        info.userId = userid;
        
        setTimeout(() => {
          Http.POST({ height: info.height, weight: info.weight, waist: info.waist, bust: info.bust, blood: info.blood}, Uris.AddDetectionUrl).then(function(res){
            wx.hideLoading()
            console.log(res);
            if(res.data.code === 200){
              wx.reLaunch({
                url: '/pages/detections/detections'
              })
            }
          })
        }, 2000);

    }
})
