const app = getApp()
Page({
  data: {
    lists: []
  },

  onLoad() {
    this.getOnCovers()
  },

  getOnCovers() {
    const data = {
      openId: app.globalData.openId,
      status: 1
    }
    app.api.getOnCovers(data).then(res => {
      console.log(res)
      const { data } = res
      let lists = this.data.lists
      lists = data
      this.setData({
        lists
      })
    })
  },

  gotoPlan(e) {
    const id = e.currentTarget.dataset['id']
    console.log(id)
    wx.setStorageSync('planId', id)
    wx.setStorageSync('done', true)
    wx.navigateTo({
      url: '../plan/plan'
    })
  }
})