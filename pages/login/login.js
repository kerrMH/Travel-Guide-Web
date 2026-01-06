// login.js
const app = getApp()

Page({
  data: {
    username: 'admin',
    password: 'admin'
  },

  onLoad: function() {
    // 检查是否已登录
    if (app.globalData.isLoggedIn) {
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
  },

  // 用户名输入
  onUsernameInput: function(e) {
    this.setData({
      username: e.detail.value
    })
  },

  // 密码输入
  onPasswordInput: function(e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 登录按钮点击
  onLogin: function() {
    const { username, password } = this.data
    
    if (!username || !password) {
      wx.showToast({
        title: '请输入用户名和密码',
        icon: 'none'
      })
      return
    }

    // 显示加载提示
    wx.showLoading({
      title: '登录中...',
    })

    // 调用登录方法
    app.login(username, password, (success, data) => {
      // 隐藏加载提示
      wx.hideLoading()
      
      if (success) {
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 1500,
          success: () => {
            // 登录成功后跳转到首页
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/index/index'
              })
            }, 1500)
          }
        })
      } else {
        wx.showToast({
          title: data || '登录失败',
          icon: 'none'
        })
      }
    })
  }
})