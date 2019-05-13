const app = getApp()
Page({
  data: {
    lists: [
      // { destination: '1', startDate: '2', endDate: '3', peoNum: '4'},
      // { destination: '1', startDate: '2', endDate: '3', peoNum: '4' },
      // { destination: '1', startDate: '2', endDate: '3', peoNum: '4' },
      // { destination: '1', startDate: '2', endDate: '3', peoNum: '4' },
      // { destination: '1', startDate: '2', endDate: '3', peoNum: '4' },
    ]
  },

  onLoad() {
    this.getOnCovers()
  },

  getOnCovers() {
    const data = {
      openId: app.globalData.openId,
      status: 0
    }
    app.api.getOnCovers(data).then(res => {
      console.log(res)
      const {data} = res
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
    wx.setStorageSync('done', false)
    wx.navigateTo({
      url: '../plan/plan'
    })
  },

  finish(e) {
    const id = e.currentTarget.dataset['id']
    app.api.coverFinish({id: id}).then(res => {
      console.log(res)
      if (res.code === 0) {
        this.getOnCovers()
      }
    })
  }
})