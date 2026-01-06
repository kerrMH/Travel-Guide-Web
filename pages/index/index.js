// index.js
const app = getApp()

Page({
  data: {
    contentList: [],
    filteredList: [],
    leftColumn: [],
    rightColumn: [],
    searchText: '',
    loading: false,
    hasMore: true,
    page: 1,
    pageSize: 10
  },

  onLoad: function() {
    // 检查登录状态
    if (!app.globalData.isLoggedIn) {
      wx.redirectTo({
        url: '/pages/login/login'
      })
      return
    }
    
    // 加载内容
    this.loadContent()
  },

  // 加载内容
  loadContent: function() {
    if (this.data.loading) return
    
    this.setData({
      loading: true
    })
    
    // 模拟加载延迟
    setTimeout(() => {
      // 从全局数据获取内容
      const allContent = app.globalData.contentList
      
      // 如果有搜索文本，进行过滤
      let displayList = allContent
      if (this.data.searchText) {
        const searchLower = this.data.searchText.toLowerCase()
        displayList = allContent.filter(item => 
          item.title.toLowerCase().includes(searchLower) || 
          item.description.toLowerCase().includes(searchLower) ||
          item.location.toLowerCase().includes(searchLower)
        )
      }
      
      // 分页处理
      const start = 0
      const end = this.data.page * this.data.pageSize
      const newList = displayList.slice(start, end)
      
      // 更新数据
      this.setData({
        contentList: newList,
        filteredList: displayList,
        hasMore: end < displayList.length,
        loading: false
      })
      
      // 生成瀑布流布局
      this.generateWaterfallLayout()
    }, 500)
  },

  // 生成瀑布流布局
  generateWaterfallLayout: function() {
    const { contentList } = this.data
    const leftColumn = []
    const rightColumn = []
    
    // 简单的瀑布流布局，奇数放左列，偶数放右列
    contentList.forEach((item, index) => {
      if (index % 2 === 0) {
        leftColumn.push(item)
      } else {
        rightColumn.push(item)
      }
    })
    
    this.setData({
      leftColumn,
      rightColumn
    })
  },

  // 搜索输入
  onSearchInput: function(e) {
    this.setData({
      searchText: e.detail.value
    })
  },

  // 清除搜索
  clearSearch: function() {
    this.setData({
      searchText: ''
    })
    this.loadContent()
  },

  // 搜索
  onSearch: function() {
    this.setData({
      page: 1
    })
    this.loadContent()
  },

  // 加载更多
  loadMore: function() {
    if (!this.data.hasMore || this.data.loading) return
    
    this.setData({
      page: this.data.page + 1
    })
    
    this.loadContent()
  },

  // 跳转到详情页
  goToDetail: function(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  },

  // 下拉刷新
  onPullDownRefresh: function() {
    this.setData({
      page: 1
    })
    this.loadContent()
    wx.stopPullDownRefresh()
  }
})