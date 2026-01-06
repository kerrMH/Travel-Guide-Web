Page({
  data: {
    notificationEnabled: true,
    commentEnabled: true,
    likeEnabled: true,
    privacyOption: 0, // 0: 所有人可见, 1: 仅关注可见, 2: 私密
    privacyOptionText: '所有人可见',
    locationEnabled: true,
    darkModeEnabled: false,
    cacheSize: '12.3MB'
  },

  onLoad: function() {
    // 从本地存储加载设置
    const settings = wx.getStorageSync('userSettings') || {};
    
    // 隐私选项文本映射
    const privacyTextMap = ['所有人可见', '仅关注可见', '私密'];
    
    this.setData({
      notificationEnabled: settings.notificationEnabled !== undefined ? settings.notificationEnabled : true,
      commentEnabled: settings.commentEnabled !== undefined ? settings.commentEnabled : true,
      likeEnabled: settings.likeEnabled !== undefined ? settings.likeEnabled : true,
      privacyOption: settings.privacyOption !== undefined ? settings.privacyOption : 0,
      privacyOptionText: privacyTextMap[settings.privacyOption !== undefined ? settings.privacyOption : 0],
      locationEnabled: settings.locationEnabled !== undefined ? settings.locationEnabled : true,
      darkModeEnabled: settings.darkModeEnabled !== undefined ? settings.darkModeEnabled : false
    });
    
    // 应用当前深色模式设置
    if (this.data.darkModeEnabled) {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#1a1a1a'
      });
    }
  },

  // 导航到编辑个人资料页面
  navigateToEditProfile: function() {
    wx.navigateTo({
      url: '../edit-profile/edit-profile'
    });
  },

  // 切换通知设置
  toggleNotification: function(e) {
    const enabled = e.detail.value;
    this.setData({ notificationEnabled: enabled });
    this.saveSettings();
  },

  toggleComment: function(e) {
    const enabled = e.detail.value;
    this.setData({ commentEnabled: enabled });
    this.saveSettings();
  },

  toggleLike: function(e) {
    const enabled = e.detail.value;
    this.setData({ likeEnabled: enabled });
    this.saveSettings();
  },

  // 切换位置信息
  toggleLocation: function(e) {
    const enabled = e.detail.value;
    this.setData({ locationEnabled: enabled });
    this.saveSettings();
    
    if (enabled) {
      wx.getLocation({
        type: 'gcj02',
        success: (res) => {
          console.log('位置信息已开启', res);
        },
        fail: () => {
          wx.showToast({
            title: '请授权位置权限',
            icon: 'none'
          });
          this.setData({ locationEnabled: false });
        }
      });
    }
  },

  // 显示隐私设置选项
  showPrivacyOptions: function() {
    const options = ['所有人可见', '仅关注可见', '私密'];
    
    wx.showActionSheet({
      itemList: options,
      success: (res) => {
        if (!res.cancel) {
          const index = res.tapIndex;
          const privacyOptionText = options[index];
          
          this.setData({
            privacyOption: index,
            privacyOptionText: privacyOptionText
          });
          
          this.saveSettings();
          
          wx.showToast({
            title: '设置成功',
            icon: 'success'
          });
        }
      }
    });
  },

  // 切换深色模式
  toggleDarkMode: function(e) {
    const enabled = e.detail.value;
    this.setData({ darkModeEnabled: enabled });
    this.saveSettings();
    
    // 实现深色模式切换
    if (enabled) {
      // 应用深色模式样式
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#1a1a1a'
      });
      
      // 这里可以通过全局变量或事件通知其他页面切换深色模式
      if (getApp().globalData) {
        getApp().globalData.darkModeEnabled = true;
      }
    } else {
      // 恢复浅色模式样式
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#ffffff'
      });
      
      if (getApp().globalData) {
        getApp().globalData.darkModeEnabled = false;
      }
    }
    
    wx.showToast({
      title: enabled ? '深色模式已开启' : '深色模式已关闭',
      icon: 'none'
    });
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
            this.setData({ cacheSize: '0KB' });
            wx.showToast({
              title: '缓存已清除',
              icon: 'success'
            });
          }, 500);
        }
      }
    });
  },

  // 退出登录
  logout: function() {
    wx.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 清除登录状态
          wx.removeStorageSync('userInfo');
          wx.removeStorageSync('isLoggedIn');
          
          // 返回登录页面
          wx.reLaunch({
            url: '../login/login'
          });
        }
      }
    });
  },

  // 保存设置到本地存储
  saveSettings: function() {
    const settings = {
      notificationEnabled: this.data.notificationEnabled,
      commentEnabled: this.data.commentEnabled,
      likeEnabled: this.data.likeEnabled,
      privacyOption: this.data.privacyOption,
      locationEnabled: this.data.locationEnabled,
      darkModeEnabled: this.data.darkModeEnabled
    };
    wx.setStorageSync('userSettings', settings);
  }
});