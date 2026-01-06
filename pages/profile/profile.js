// profile.js
const app = getApp()

Page({
  data: {
    userInfo: null,
    myPostsCount: 0,
    myCollectionsCount: 0,
    myLikesCount: 0,
    cacheSize: '0.0MB'
  },

  onLoad: function() {
    // 检查登录状态
    if (!app.globalData.isLoggedIn) {
      wx.redirectTo({
        url: '/pages/login/login'
      })
      return
    }
    
    // 加载用户信息
    this.loadUserInfo()
    
    // 计算统计数据
    this.calculateStats()
    
    // 计算缓存大小
    this.calculateCacheSize()
  },

  // 加载用户信息
  loadUserInfo: function() {
    const userInfo = app.globalData.userInfo
    
    this.setData({
      userInfo
    })
  },

  // 计算统计数据
  calculateStats: function() {
    // 模拟数据
    const myPostsCount = 5
    const myCollectionsCount = wx.getStorageSync('collectedContents') ? wx.getStorageSync('collectedContents').length : 0
    const myLikesCount = wx.getStorageSync('likedContents') ? wx.getStorageSync('likedContents').length : 0
    
    this.setData({
      myPostsCount,
      myCollectionsCount,
      myLikesCount
    })
  },

  // 计算缓存大小
  calculateCacheSize: function() {
    // 模拟缓存大小
    this.setData({
      cacheSize: '23.5MB'
    })
  },

  // 编辑资料
  editProfile: function() {
    wx.showToast({
      title: '编辑资料功能开发中',
      icon: 'none'
    })
  },

  // 查看我的发布
  viewMyPosts: function() {
    wx.showToast({
      title: '我的发布功能开发中',
      icon: 'none'
    })
  },

  // 查看我的收藏
  viewMyCollections: function() {
    const collectedContents = wx.getStorageSync('collectedContents') || []
    
    if (collectedContents.length === 0) {
      wx.showToast({
        title: '暂无收藏内容',
        icon: 'none'
      })
      return
    }
    
    // 这里可以跳转到收藏列表页
    wx.showToast({
      title: `您收藏了 ${collectedContents.length} 个内容`,
      icon: 'none'
    })
  },

  // 查看我的点赞
  viewMyLikes: function() {
    const likedContents = wx.getStorageSync('likedContents') || []
    
    if (likedContents.length === 0) {
      wx.showToast({
        title: '暂无点赞内容',
        icon: 'none'
      })
      return
    }
    
    // 这里可以跳转到点赞列表页
    wx.showToast({
      title: `您点赞了 ${likedContents.length} 个内容`,
      icon: 'none'
    })
  },

  // 打开旅行攻略
  openTravelGuide: function() {
    wx.showToast({
      title: '旅行攻略功能开发中',
      icon: 'none'
    })
  },

  // 打开目的地
  openDestination: function() {
    wx.showToast({
      title: '目的地功能开发中',
      icon: 'none'
    })
  },

  // 打开天气预报
  openWeather: function() {
    wx.showToast({
      title: '天气预报功能开发中',
      icon: 'none'
    })
  },

  // 打开地图
  openMap: function() {
    wx.showToast({
      title: '地图功能开发中',
      icon: 'none'
    })
  },

  // 打开设置
  openSettings: function() {
    wx.showToast({
      title: '设置功能开发中',
      icon: 'none'
    })
  },

  // 关于我们
  aboutUs: function() {
    wx.showModal({
      title: '关于我们',
      content: '旅行分享 v1.0.0\n\n发现世界的美好，分享旅行的快乐。',
      showCancel: false
    })
  },

  // 意见反馈
  feedback: function() {
    wx.showToast({
      title: '意见反馈功能开发中',
      icon: 'none'
    })
  },

  // 清除缓存
  clearCache: function() {
    wx.showModal({
      title: '清除缓存',
      content: '确定要清除所有缓存吗？',
      success: (res) => {
        if (res.confirm) {
          // 模拟清除缓存
          setTimeout(() => {
            this.setData({
              cacheSize: '0.0MB'
            })
            wx.showToast({
              title: '缓存已清除',
              icon: 'success'
            })
          }, 500)
        }
      }
    })
  },

  // 退出登录
  logout: function() {
    wx.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 调用退出登录方法
          app.logout()
          
          // 跳转到登录页
          wx.redirectTo({
            url: '/pages/login/login'
          })
        }
      }
    })
  }
})