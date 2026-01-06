// contact.js
const app = getApp()

Page({
  data: {
    contactList: [],
    filteredList: [],
    searchText: '',
    showDialog: false,
    newContact: {
      id: '',
      nickname: ''
    }
  },

  onLoad: function() {
    // 检查登录状态
    if (!app.globalData.isLoggedIn) {
      wx.redirectTo({
        url: '/pages/login/login'
      })
      return
    }
    
    // 加载联系人列表
    this.loadContacts()
  },

  // 加载联系人列表
  loadContacts: function() {
    // 从全局数据获取联系人列表
    const contactList = app.globalData.contactList
    
    this.setData({
      contactList,
      filteredList: contactList
    })
  },

  // 搜索输入
  onSearchInput: function(e) {
    const searchText = e.detail.value
    this.setData({
      searchText
    })
    
    // 根据搜索文本过滤联系人
    if (searchText) {
      const filteredList = this.data.contactList.filter(item => 
        item.nickname.toLowerCase().includes(searchText.toLowerCase()) ||
        item.username.toLowerCase().includes(searchText.toLowerCase())
      )
      this.setData({
        filteredList
      })
    } else {
      this.setData({
        filteredList: this.data.contactList
      })
    }
  },

  // 清除搜索
  clearSearch: function() {
    this.setData({
      searchText: '',
      filteredList: this.data.contactList
    })
  },

  // 显示添加联系人对话框
  showAddContactDialog: function() {
    this.setData({
      showDialog: true,
      newContact: {
        id: '',
        nickname: ''
      }
    })
  },

  // 隐藏添加联系人对话框
  hideAddContactDialog: function() {
    this.setData({
      showDialog: false
    })
  },

  // 新联系人ID输入
  onNewContactIdInput: function(e) {
    this.setData({
      'newContact.id': e.detail.value
    })
  },

  // 新联系人昵称输入
  onNewContactNicknameInput: function(e) {
    this.setData({
      'newContact.nickname': e.detail.value
    })
  },

  // 添加联系人
  addContact: function() {
    const { id, nickname } = this.data.newContact
    
    if (!id || !nickname) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
      return
    }
    
    // 检查联系人是否已存在
    const exists = this.data.contactList.some(item => item.id === parseInt(id))
    if (exists) {
      wx.showToast({
        title: '联系人已存在',
        icon: 'none'
      })
      return
    }
    
    // 创建新联系人
    const newContact = {
      id: parseInt(id),
      username: nickname,
      avatar: 'https://p3-doubao-search-sign.byteimg.com/labis/a9b0ec27e751f6cc2d0286acdb1e8e82~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1783219465&x-signature=vF6cS%2BsT31z5a8STDQE%2Btu6g4%2FM%3D',
      nickname: nickname,
      signature: '这个人很懒，什么都没留下',
      followStatus: 0
    }
    
    // 更新联系人列表
    const updatedList = [newContact, ...this.data.contactList]
    
    this.setData({
      contactList: updatedList,
      filteredList: updatedList,
      showDialog: false
    })
    
    // 模拟保存到全局数据
    app.globalData.contactList = updatedList
    
    wx.showToast({
      title: '添加成功',
      icon: 'success'
    })
  },

  // 关注联系人
  followContact: function(e) {
    const { id } = e.currentTarget.dataset
    const { contactList } = this.data
    
    // 更新关注状态
    const updatedList = contactList.map(item => {
      if (item.id === id) {
        return {
          ...item,
          followStatus: 1
        }
      }
      return item
    })
    
    this.setData({
      contactList: updatedList,
      filteredList: updatedList
    })
    
    // 模拟保存到全局数据
    app.globalData.contactList = updatedList
    
    wx.showToast({
      title: '关注成功',
      icon: 'none'
    })
  },

  // 查看联系人详情
  viewContactDetail: function(e) {
    const { id } = e.currentTarget.dataset
    
    // 这里可以跳转到联系人详情页
    wx.showToast({
      title: `查看联系人ID: ${id}`,
      icon: 'none'
    })
  }
})