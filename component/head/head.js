Component({
  properties: {
    url: {
      type: String,
      value: '../nav/nav'
    }
  },

  data: {

  },

  methods: {
    back() {
      wx.redirectTo({
        url: this.data.url
      })
    }
  }
})