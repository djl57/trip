const app = getApp()
Page({
  data: {
    src: '../../assets/images/trip03.jpg'
  },

  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    app.globalData.userInfo.openId = app.globalData.openId
    app.api.postUserInfo(app.globalData.userInfo).then(res => {console.log(res)})
    wx.navigateTo({
      url: '../nav/nav'
    })
  },

  start() {
    wx.navigateTo({
      url: '../nav/nav'
    })
  }
})
