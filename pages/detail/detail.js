// detail.js
const app = getApp()

Page({
  data: {
    content: null,
    commentList: [],
    commentText: '',
    isLiked: false,
    isCollected: false,
    isFollowing: false
  },

  onLoad: function(options) {
    const { id } = options
    this.loadContent(id)
    this.loadComments(id)
    
    // 检查互动状态
    this.checkInteractionStatus(id)
  },

  // 加载内容详情
  loadContent: function(id) {
    const contentList = app.globalData.contentList
    const content = contentList.find(item => item.id === parseInt(id))
    
    if (content) {
      this.setData({
        content
      })
      
      // 设置页面标题
      wx.setNavigationBarTitle({
        title: content.title
      })
    } else {
      wx.showToast({
        title: '内容不存在',
        icon: 'none',
        success: () => {
          setTimeout(() => {
            wx.navigateBack()
          }, 1500)
        }
      })
    }
  },

  // 加载评论列表
  loadComments: function(contentId) {
    const allComments = app.globalData.commentList
    const comments = allComments[contentId] || []
    
    // 为评论添加是否点赞状态
    const commentsWithStatus = comments.map(comment => {
      return {
        ...comment,
        isLiked: false
      }
    })
    
    this.setData({
      commentList: commentsWithStatus
    })
  },

  // 检查互动状态
  checkInteractionStatus: function(contentId) {
    // 模拟从本地存储检查互动状态
    const likedContents = wx.getStorageSync('likedContents') || []
    const collectedContents = wx.getStorageSync('collectedContents') || []
    const followingAuthors = wx.getStorageSync('followingAuthors') || []
    
    this.setData({
      isLiked: likedContents.includes(contentId),
      isCollected: collectedContents.includes(contentId),
      isFollowing: this.data.content ? followingAuthors.includes(this.data.content.author.id) : false
    })
  },

  // 点赞/取消点赞
  toggleLike: function() {
    let { isLiked, content } = this.data
    const likedContents = wx.getStorageSync('likedContents') || []
    
    if (isLiked) {
      // 取消点赞
      content.likes--
      const index = likedContents.indexOf(content.id)
      if (index > -1) {
        likedContents.splice(index, 1)
      }
    } else {
      // 点赞
      content.likes++
      likedContents.push(content.id)
    }
    
    wx.setStorageSync('likedContents', likedContents)
    
    this.setData({
      isLiked: !isLiked,
      content
    })
    
    // 显示提示
    wx.showToast({
      title: isLiked ? '已取消点赞' : '点赞成功',
      icon: 'none',
      duration: 1000
    })
  },

  // 收藏/取消收藏
  toggleCollect: function() {
    let { isCollected, content } = this.data
    const collectedContents = wx.getStorageSync('collectedContents') || []
    
    if (isCollected) {
      // 取消收藏
      content.collections--
      const index = collectedContents.indexOf(content.id)
      if (index > -1) {
        collectedContents.splice(index, 1)
      }
    } else {
      // 收藏
      content.collections++
      collectedContents.push(content.id)
    }
    
    wx.setStorageSync('collectedContents', collectedContents)
    
    this.setData({
      isCollected: !isCollected,
      content
    })
    
    // 显示提示
    wx.showToast({
      title: isCollected ? '已取消收藏' : '收藏成功',
      icon: 'none',
      duration: 1000
    })
  },

  // 关注/取消关注作者
  followAuthor: function() {
    const followingAuthors = wx.getStorageSync('followingAuthors') || []
    followingAuthors.push(this.data.content.author.id)
    wx.setStorageSync('followingAuthors', followingAuthors)
    
    this.setData({
      isFollowing: true
    })
    
    wx.showToast({
      title: '关注成功',
      icon: 'none',
      duration: 1000
    })
  },

  unfollowAuthor: function() {
    const followingAuthors = wx.getStorageSync('followingAuthors') || []
    const index = followingAuthors.indexOf(this.data.content.author.id)
    if (index > -1) {
      followingAuthors.splice(index, 1)
    }
    wx.setStorageSync('followingAuthors', followingAuthors)
    
    this.setData({
      isFollowing: false
    })
    
    wx.showToast({
      title: '已取消关注',
      icon: 'none',
      duration: 1000
    })
  },

  // 分享内容
  shareContent: function() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  // 评论输入
  onCommentInput: function(e) {
    this.setData({
      commentText: e.detail.value
    })
  },

  // 发送评论
  sendComment: function() {
    const { commentText, content } = this.data
    
    if (!commentText.trim()) {
      wx.showToast({
        title: '请输入评论内容',
        icon: 'none'
      })
      return
    }
    
    // 创建新评论
    const newComment = {
      id: Date.now(),
      content: commentText,
      author: app.globalData.userInfo,
      createTime: new Date().toLocaleString('zh-CN', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit', 
        minute: '2-digit'
      }),
      likes: 0,
      isLiked: false
    }
    
    // 更新评论列表
    const commentList = [newComment, ...this.data.commentList]
    
    // 更新内容评论数
    content.comments++
    
    this.setData({
      commentList,
      commentText: '',
      content
    })
    
    // 模拟保存到全局数据
    if (!app.globalData.commentList[content.id]) {
      app.globalData.commentList[content.id] = []
    }
    app.globalData.commentList[content.id].unshift(newComment)
    
    wx.showToast({
      title: '评论成功',
      icon: 'success',
      duration: 1000
    })
  },

  // 点赞评论
  likeComment: function(e) {
    const { id } = e.currentTarget.dataset
    const { commentList } = this.data
    
    const updatedComments = commentList.map(comment => {
      if (comment.id === id) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked
        }
      }
      return comment
    })
    
    this.setData({
      commentList: updatedComments
    })
  },

  // 回复评论
  replyComment: function(e) {
    const { id, author } = e.currentTarget.dataset
    this.setData({
      commentText: `@${author} `
    })
    
    // 聚焦输入框
    this.focusCommentInput()
  },

  // 聚焦评论输入框
  focusCommentInput: function() {
    // 这里可以通过自定义组件或其他方式实现聚焦
    wx.showToast({
      title: '请输入回复内容',
      icon: 'none'
    })
  },

  // 分享配置
  onShareAppMessage: function() {
    const { content } = this.data
    return {
      title: content.title,
      path: `/pages/detail/detail?id=${content.id}`,
      imageUrl: content.coverUrl
    }
  }
})