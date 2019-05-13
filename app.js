const api = require('./api/api.js')
App({
  onLaunch: function () {
  //   // 展示本地存储能力
  //   var logs = wx.getStorageSync('logs') || []
  //   logs.unshift(Date.now())
  //   wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        api.getOpenId({code: res.code}).then((res) => {
          const { data } = res
          this.globalData.openId = data.openid
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    openId: null,
  },
  api: api
})