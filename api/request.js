const http = (url, data, method) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      header: {
        "content-type": "application/json;charset=UTF-8"
      },
      data: data || '',
      method: method || 'GET',
      success: function(res) {
        resolve(res.data);
      },
      fail: function(err) {
        reject(err);
      },
    })
  })
}

module.exports = http
