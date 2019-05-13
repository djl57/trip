import { formatDate } from '../../utils/util.js'
const app = getApp()
Page({
  data: {
    startDate: formatDate(new Date()),
    endDate: formatDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000)),
    destination: '',
    peoNum: '1',
    placeholder: '例如：北京',
    placeholderStyle: ''
  },

  bindStartDateChange(e) {
    this.setData({
      startDate: this.format(e.detail.value)
    })
  },

  bindEndDateChange(e) {
    this.setData({
      endDate: this.format(e.detail.value)
    })
  },

  bindPeoNumChage(e) {
    this.setData({
      peoNum: e.detail.value
    })
  },

  format(date) {
    const param = date.split('-')
    const year = param[0]
    const month = param[1]
    const day = param[2]
    return year + '年' + month + '月' + day + '日'
  },

  gotoPlan() {
    if (this.data.destination === '') {
      this.setData({
        placeholderStyle: 'color: #F76260',
        placeholder: '请填写目的地'
      })
    } else {
      const data = {
        openId: app.globalData.openId,
        destination: this.data.destination,
        startDate: this.data.startDate,
        endDate: this.data.endDate,
        peoNum: this.data.peoNum
      }
      console.log(data)
      app.api.postCover(data).then((res) => {
        console.log(res)
        if(res.code === 0) {
          wx.setStorageSync('planId', '-1')
          wx.setStorageSync('done', false)
          wx.redirectTo({
            url: '../plan/plan'
          })
        } else {
          wx.showToast({
            title: '发生错误',
            icon: none
          })
        }
      })
    }
  },

  bindDestinationChage(e) {
    this.setData({
      destination: e.detail.value
    })
  }
})