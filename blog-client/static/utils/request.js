const request = (url, data, callback) => {
  wx.request({
    url: `http://192.168.30.185:7001${url}`,
    data,
    header: {
      "Content-Type": "application/json;charset=utf8;",
      "Accept": "application/json;charset=utf8;",
    },
    method: 'POST',
    dataType: 'json',
    success: function (data, statusCode) {
      if (statusCode === 200) {
        callback && callback(data);
      } else {
        wx.showToast({
          title: `请求失败，状态码${statusCode}`,
          icon: 'none',
          duration: 2000
        })
      }
    },
    fail: function () {
      wx.showToast({
        title: '接口调用失败',
        icon: 'none',
        duration: 2000
      })
    }
  })
}


export default request;