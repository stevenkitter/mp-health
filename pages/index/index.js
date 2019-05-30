const app = getApp();

Page({
    data: {
        sexPicker: ['男', '女'],
        userInfo: {
            sex: '0',
            height: '166',
            weight: '56',
            yaowei: '66',
            tunwei: '77',
            eamil: '77',
        },
        editFlag: {

        }

    },
    onLoad() {

    },
    onShow() {
        let userId = wx.getStorageSync('jzgj_token');
        let that = this;
        wx.request({
            url: app.globalData.api + '/userInfo',
            data: {userId:userId},
            success(res) {
                wx.hideLoading()
                if (res.data) {
                    that.setData({
                        userInfo:res.data
                    })
                } else {
                    wx.showToast({
                        title: '初始化失败',
                        icon: 'none',
                        duration: 2000
                    })
                }
            }
        })

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
        let userid = wx.getStorageSync('jzgj_token');
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
        if (!info.yaowei) {
            wx.showToast({
                title: '请输入腰围',
                icon: 'none',
                duration: 2000
            })
            return
        }
        if (!info.tunwei) {
            wx.showToast({
                title: '请输入臀围',
                icon: 'none',
                duration: 2000
            })
            return
        }
        info.userId = userid;
        setTimeout(() => {
            wx.request({
                url: app.globalData.api + '/healthyInfo',
                data: info,
                success(res) {
                    wx.hideLoading()
                    if (res.data) {
                        wx.showModal({
                            title: "评测结果",
                            content: "bmi评分：" + res.data.bmi + "\r\n" + "信息：" + res.data.desc+ "\r\n" +res.data.yao+"\r\n"+ res.data.tun+"\r\n"+res.data.xuetang,
                            showCancel: false,
                        })
                    } else {
                        wx.showToast({
                            title: '评测失败,请重试',
                            icon: 'none',
                            duration: 2000
                        })
                    }
                }
            })
        }, 2000);

    }
})
