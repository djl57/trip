
Page({
  data: {

  },
  
  gotoHome() {
    wx.redirectTo({
      url: '../home/home'
    })
  },

  gotoOn() {
    wx.redirectTo({
      url: '../on/on'
    })
  },

  gotoHistory() {
    wx.redirectTo({
      url: '../done/done'
    })
  }
})