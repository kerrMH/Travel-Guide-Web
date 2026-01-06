// message.js
const app = getApp()

Page({
  data: {
    messageList: [],
    filteredMessages: [],
    activeTab: 'all',
    unreadCount: 0
  },

  onLoad: function() {
    // 检查登录状态
    if (!app.globalData.isLoggedIn) {
      wx.redirectTo({
        url: '/pages/login/login'
      })
      return
    }
    
    // 加载消息列表
    this.loadMessages()
  },

  // 加载消息列表
  loadMessages: function() {
    // 从全局数据获取消息列表
    const messageList = app.globalData.messageList
    
    // 计算未读消息数量
    const unreadCount = messageList.filter(item => !item.isRead).length
    
    this.setData({
      messageList,
      filteredMessages: messageList,
      unreadCount
    })
    
    // 根据当前选中的标签过滤消息
    this.filterMessagesByTab(this.data.activeTab)
  },

  // 切换标签
  switchTab: function(e) {
    const tab = e.currentTarget.dataset.tab
    
    this.setData({
      activeTab: tab
    })
    
    // 根据标签过滤消息
    this.filterMessagesByTab(tab)
  },

  // 根据标签过滤消息
  filterMessagesByTab: function(tab) {
    let filteredMessages = []
    
    if (tab === 'all') {
      filteredMessages = this.data.messageList
    } else {
      filteredMessages = this.data.messageList.filter(item => item.type === tab)
    }
    
    this.setData({
      filteredMessages
    })
  },

  // 查看消息详情
  viewMessageDetail: function(e) {
    const { id, type, relatedId } = e.currentTarget.dataset
    
    // 标记消息为已读
    this.markAsRead(id)
    
    // 根据消息类型跳转到相应页面
    if (type === 'comment' || type === 'like') {
      // 跳转到内容详情页
      wx.navigateTo({
        url: `/pages/detail/detail?id=${relatedId}`
      })
    } else if (type === 'system') {
      // 显示系统消息详情
      wx.showModal({
        title: '系统通知',
        content: this.getMessageById(id).content,
        showCancel: false
      })
    }
  },

  // 根据ID获取消息
  getMessageById: function(id) {
    return this.data.messageList.find(item => item.id === id)
  },

  // 标记消息为已读
  markAsRead: function(id) {
    const { messageList } = this.data
    
    // 更新消息状态
    const updatedList = messageList.map(item => {
      if (item.id === id && !item.isRead) {
        return {
          ...item,
          isRead: true
        }
      }
      return item
    })
    
    // 重新计算未读消息数量
    const unreadCount = updatedList.filter(item => !item.isRead).length
    
    this.setData({
      messageList: updatedList,
      filteredMessages: this.data.activeTab === 'all' ? 
        updatedList : 
        updatedList.filter(item => item.type === this.data.activeTab),
      unreadCount
    })
    
    // 模拟保存到全局数据
    app.globalData.messageList = updatedList
  },

  // 标记所有消息为已读
  markAllAsRead: function() {
    const { messageList } = this.data
    
    // 更新所有消息状态
    const updatedList = messageList.map(item => {
      if (!item.isRead) {
        return {
          ...item,
          isRead: true
        }
      }
      return item
    })
    
    this.setData({
      messageList: updatedList,
      filteredMessages: this.data.activeTab === 'all' ? 
        updatedList : 
        updatedList.filter(item => item.type === this.data.activeTab),
      unreadCount: 0
    })
    
    // 模拟保存到全局数据
    app.globalData.messageList = updatedList
    
    wx.showToast({
      title: '已全部标记为已读',
      icon: 'none'
    })
  },

  // 页面显示时刷新未读消息数量
  onShow: function() {
    if (this.data.messageList.length > 0) {
      const unreadCount = this.data.messageList.filter(item => !item.isRead).length
      this.setData({
        unreadCount
      })
    }
  }
})