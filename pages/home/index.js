const app = getApp();

Page({
    data: {
        username: '',
        password: ''
    },
    onLoad() {
        
    },
    onShow() {
        
  
    },
    onChangeUser(event) {
        // console.log(event.detail);
        this.setData({
            username: event.detail.value
        })
    },
    onChangePwd(event) {
        // console.log(event.detail);
        this.setData({
            password: event.detail.value
        })
    },
    login() {
        console.log("123123'")
       /* wx.reLaunch({
            url: '/pages/index/index'
        });
        return*/
        if (!this.data.username) {
            wx.showToast({
                title: '请输入用户名',
                icon: 'none',
                duration: 3000
            })
            return
        }
        if (!this.data.password) {
            wx.showToast({
                title: '请输入登录密码',
                icon: 'none',
                duration: 3000
            })
            return
        }
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        wx.request({
            url: app.globalData.api + '/login',
            data: {
                userName: this.data.username,
                passWord: this.data.password,
            },
            success(res) {
                wx.hideLoading()
                if (res.data.state === 'success') {
                    wx.setStorageSync('token', res.data.desc)
                    wx.reLaunch({
                      url: '/pages/detections/detections'
                    })
                } else {
                    wx.showToast({
                        title: res.data.desc,
                        icon: 'none',
                        duration: 3000
                    })
                }
            }
        })
    },
    regist() {
        if (!this.data.username) {
            wx.showToast({
                title: '请输入用户名',
                icon: 'none',
                duration: 3000
            })
            return
        }
        if (!this.data.password) {
            wx.showToast({
                title: '请输入登录密码',
                icon: 'none',
                duration: 3000
            })
            return
        }
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        wx.request({
            url: app.globalData.api + '/register',
            data: {
                userName: this.data.username,
                passWord: this.data.password,
            },
            success(res) {
                wx.hideLoading()
                if (res.data.state === 'success') {
                    wx.showToast({
                        title: "注册成功，请登录",
                        icon: 'none',
                        duration: 1500
                    })
                } else {
                    wx.showToast({
                        title: res.data.desc,
                        icon: 'none',
                        duration: 1500
                    })
                }
            }
        })
    }
})
