Page({
  data: {
    userInfo: {
      nickName: '',
      avatarUrl: '',
      gender: 2, // 0:女, 1:男, 2:保密
      birthday: '',
      location: '',
      signature: '',
      bio: '',
      hobbies: []
    },
    hobbies: ['旅行', '摄影', '美食', '阅读', '运动', '音乐', '电影', '艺术', '科技', '时尚']
  },

  onLoad: function() {
    // 从本地存储获取用户信息
    const userInfo = wx.getStorageSync('userInfo') || {};
    this.setData({
      userInfo: {
        nickName: userInfo.nickName || '',
        avatarUrl: userInfo.avatarUrl || 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
        gender: userInfo.gender !== undefined ? userInfo.gender : 2,
        birthday: userInfo.birthday || '',
        location: userInfo.location || '',
        signature: userInfo.signature || '',
        bio: userInfo.bio || '',
        hobbies: userInfo.hobbies || []
      }
    });
  },

  // 选择头像
  chooseAvatar: function() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath;
        this.setData({
          'userInfo.avatarUrl': tempFilePath
        });
      }
    });
  },

  // 昵称改变
  onNickNameChange: function(e) {
    this.setData({
      'userInfo.nickName': e.detail.value
    });
  },

  // 性别改变
  onGenderChange: function(e) {
    const gender = parseInt(e.currentTarget.dataset.gender);
    this.setData({
      'userInfo.gender': gender
    });
  },

  // 显示日期选择器
  showDatePicker: function() {
    wx.showDatePicker({
      startDate: '1900-01-01',
      endDate: '2026-12-31',
      currentDate: this.data.userInfo.birthday || '2000-01-01',
      success: (res) => {
        this.setData({
          'userInfo.birthday': res.dateString
        });
      }
    });
  },

  // 显示位置选择器
  showLocationPicker: function() {
    // 模拟位置选择
    const locations = ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安'];
    
    wx.showActionSheet({
      itemList: locations,
      success: (res) => {
        if (!res.cancel) {
          this.setData({
            'userInfo.location': locations[res.tapIndex]
          });
        }
      }
    });
  },

  // 个性签名改变
  onSignatureChange: function(e) {
    this.setData({
      'userInfo.signature': e.detail.value
    });
  },

  // 个人简介改变
  onBioChange: function(e) {
    this.setData({
      'userInfo.bio': e.detail.value
    });
  },

  // 切换兴趣爱好
  toggleHobby: function(e) {
    const hobby = e.currentTarget.dataset.hobby;
    const hobbies = [...this.data.userInfo.hobbies];
    
    const index = hobbies.indexOf(hobby);
    if (index > -1) {
      hobbies.splice(index, 1);
    } else {
      hobbies.push(hobby);
    }
    
    this.setData({
      'userInfo.hobbies': hobbies
    });
  },

  // 保存个人资料
  saveProfile: function() {
    const { userInfo } = this.data;
    
    // 验证必填项
    if (!userInfo.nickName.trim()) {
      wx.showToast({
        title: '请输入昵称',
        icon: 'none'
      });
      return;
    }
    
    // 保存到本地存储
    wx.setStorageSync('userInfo', userInfo);
    
    // 显示成功提示
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 2000,
      success: () => {
        // 返回上一页
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      }
    });
  }
});