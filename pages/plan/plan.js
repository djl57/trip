const app = getApp()
import { getDayNum } from './../../utils/util.js'
Page({
  data: {
    destination: '0',
    dayNum: '0',
    peoNum: '0',
    budget: '0',
    perCapita: '0',
    curNav: 0, // 当前显示的日期的索引
    navs: [],
    plans: [],
    planTitle: '',
    editIndex: -1, // 0，1……当前编辑的这天的行程索引
    editNavIndex: -1, // 当前编辑的日期的索引
    planId: '',
    isAdd: false,
    done: false
  },

  onLoad: function(options) {
    this.setData({
      done: wx.getStorageSync('done') || false
    })
    const data = {
      planId: wx.getStorageSync('planId'),
      openId: app.globalData.openId
    }
    app.api.getCurPlan(data).then(res => {
      console.log('res', res)
      if (res.code === 0) {
        const {data} = res
        const startDate = data.startDate
        const endDate = data.endDate
        const dayNum = getDayNum(startDate, endDate)
        let navs = this.data.navs
        navs = getDayNum(startDate, endDate, 1)
        console.log(navs)
        this.setData({
          destination: data.destination,
          peoNum: data.peoNum,
          dayNum: dayNum,
          planId: data._id,
          navs
        })

        this.getPlans()
      }
    })
  },

  getPlans() {
    const da = {
      planId: this.data.planId,
    }
    app.api.getPlans(da).then(res => {
      let curNav = this.data.curNav || 0
      const {data} = res
      let plans = this.data.plans
      plans = []
      let budget = 0
      for(let prop of data) {
        if (prop.curNav === curNav) {
          plans.push(prop)
        }
        budget = budget + Number(prop.budget)
      }
      let perCapita = budget/this.data.peoNum
      this.setData({
        plans,
        budget: budget,
        perCapita
      })
    })
  },

  changeNav(event) {
    const index = event.currentTarget.dataset['index'];
    // for(let i = 0; i<this.data.navs.length; i++) {
    //   const active = 'navs[' + i + "].active"
    //   this.setData({
    //     [active]: false
    //   })
    // }
    this.setData({
      curNav: index
    })
    this.getPlans()
  },

  delPlan(event) {
    const id = event.currentTarget.dataset['id'];
    const data = {
      id: id
    }
    app.api.delPlan(data).then(res => {
      console.log(res)
      if(res.code === 0) {
        this.getPlans()
      }
    })
  },

  editPlan(event) {
    if (this.data.editIndex !== -1) {
      this.conformEditPlan()
    }
    const index = event.currentTarget.dataset['index'];
    console.log(index)
    console.log(this.data.curNav)
    this.setData({
      editIndex: index,
      editNavIndex: this.data.curNav
    })
  },

  conformEditPlan() {
    const index = wx.getStorageSync('editPrevIndex');
    console.log(index)
    const plans = wx.getStorageSync('editPlans')
    const data = plans[index]
    console.log(data)
    app.api.editPlan(data).then(res => {
      if(res.code === 0) {
        this.getPlans()
        // 关闭编辑状态
        this.setData({
          editIndex: -1
        })
      }
    })
  },

  addPlan() {
    let plans = this.data.plans
    plans.push({
      title: '',
      startTime: '',
      tripMode: '',
      budget: '0',
      takeTime: '',
      curNav: this.data.curNav
    })
    this.setData({
      plans
    })
    this.setData({
      editIndex: plans.length-1,
      editNavIndex: this.data.curNav,
      isAdd: true
    })
  },

  savePlan(event) {
    const index = event.currentTarget.dataset['index'];
    const data = this.data.plans[index]
    data.curNav = this.data.curNav
    data.num = index
    data.openId = app.globalData.openId
    data.planId = this.data.planId
    console.log(data)
    app.api.postPlan(data).then(res => {
      console.log(res)
      if(res.code === 0) {
        this.setData({
          editIndex: -1,
          isAdd: false
        })
        this.getPlans()
      }
    })
  },

  inputChange(event) {
    const index = event.currentTarget.dataset['index'];
    wx.setStorageSync('editPrevIndex', index)
    const changeItem = 'plans[' + index + "]." + event.currentTarget.id
    this.setData({
      [changeItem]: event.detail.value
    })
    wx.setStorageSync('editPlans', this.data.plans)
  },

  back() {
    wx.redirectTo({
      url: '../nav/nav'
    })
  }
})