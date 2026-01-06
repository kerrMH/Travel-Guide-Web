// app.js
App({
  onLaunch: function () {
    // 检查登录状态
    const token = wx.getStorageSync('token');
    if (token) {
      this.globalData.isLoggedIn = true;
      this.globalData.userInfo = wx.getStorageSync('userInfo');
    }
  },

  // 登录方法
  login(username, password, callback) {
    // 模拟登录验证
    if (username === 'admin' && password === 'admin') {
      const userInfo = {
        id: 1,
        username: 'admin',
        avatar: 'https://p3-doubao-search-sign.byteimg.com/labis/a9b0ec27e751f6cc2d0286acdb1e8e82~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1783219465&x-signature=vF6cS%2BsT31z5a8STDQE%2Btu6g4%2FM%3D',
        nickname: '旅行达人'
      };
      
      // 保存登录状态
      wx.setStorageSync('token', 'mock_token_123456');
      wx.setStorageSync('userInfo', userInfo);
      
      this.globalData.isLoggedIn = true;
      this.globalData.userInfo = userInfo;
      
      callback && callback(true, userInfo);
    } else {
      callback && callback(false, '用户名或密码错误');
    }
  },

  // 登出方法
  logout() {
    wx.removeStorageSync('token');
    wx.removeStorageSync('userInfo');
    this.globalData.isLoggedIn = false;
    this.globalData.userInfo = null;
  },

  globalData: {
    isLoggedIn: false,
    userInfo: null,
    // 模拟内容数据
    contentList: [
      {
        id: 1,
        type: 'image',
        title: '青山绿水间的宁静',
        description: '远离城市的喧嚣，在这片青山绿水间找回内心的宁静。清澈的溪流，茂密的森林，一切都是那么的自然和谐。',
        coverUrl: 'https://p9-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/4fb154620caf430c9643636a3a9ded30~tplv-a9rns2rl98-image.image?rcl=20260106104335C4E475CC0E0D2D762F1C&rk3s=8e244e95&rrcfp=f06b921b&x-expires=1770259451&x-signature=sL1bA4MuGqtq76lvft6XYer3s%2BQ%3D',
        contentUrl: 'https://p9-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/4fb154620caf430c9643636a3a9ded30~tplv-a9rns2rl98-image.image?rcl=20260106104335C4E475CC0E0D2D762F1C&rk3s=8e244e95&rrcfp=f06b921b&x-expires=1770259451&x-signature=sL1bA4MuGqtq76lvft6XYer3s%2BQ%3D',
        author: {
          id: 2,
          username: '山水客',
          avatar: 'https://p3-doubao-search-sign.byteimg.com/labis/image/befa412e11548eb94567fbe317985884~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1783219465&x-signature=EogvWaPdgp%2Fr6bf7hc8t7maHSu0%3D'
        },
        likes: 128,
        comments: 32,
        collections: 45,
        location: '浙江杭州',
        createTime: '2023-06-15'
      },
      {
        id: 2,
        type: 'image',
        title: '海滩日落的浪漫',
        description: '金色的夕阳洒在海面上，海浪轻轻拍打着沙滩，远处的浪花在夕阳下闪烁着光芒。这是大自然最美丽的画卷。',
        coverUrl: 'https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/25fc30b24deb437f9e1d02120da02d89~tplv-a9rns2rl98-image.image?rcl=20260106104335C4E475CC0E0D2D762F1C&rk3s=8e244e95&rrcfp=f06b921b&x-expires=1770259453&x-signature=A5I9v5lEoGeu0%2FTDe5%2FFGJfmCFQ%3D',
        contentUrl: 'https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/25fc30b24deb437f9e1d02120da02d89~tplv-a9rns2rl98-image.image?rcl=20260106104335C4E475CC0E0D2D762F1C&rk3s=8e244e95&rrcfp=f06b921b&x-expires=1770259453&x-signature=A5I9v5lEoGeu0%2FTDe5%2FFGJfmCFQ%3D',
        author: {
          id: 3,
          username: '海的女儿',
          avatar: 'https://p26-doubao-search-sign.byteimg.com/labis/image/1b4bab003e6081b2c75c027857c21905~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1783219465&x-signature=0Zf%2FENrZoB%2BRHdbh0SvZuLX8nQk%3D'
        },
        likes: 256,
        comments: 64,
        collections: 89,
        location: '海南三亚',
        createTime: '2023-07-20'
      },
      {
        id: 3,
        type: 'image',
        title: '城市建筑的现代美',
        description: '高楼大厦鳞次栉比，玻璃幕墙反射着阳光，展现出现代都市的繁华与活力。这是人类智慧与创造力的结晶。',
        coverUrl: 'https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/58dff90a220445eaa13573cb51ec9698~tplv-a9rns2rl98-image.image?rcl=20260106104335C4E475CC0E0D2D762F1C&rk3s=8e244e95&rrcfp=f06b921b&x-expires=1770259451&x-signature=OFYOKrub%2FIoUwO9u4Lps%2BNLUOo4%3D',
        contentUrl: 'https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/58dff90a220445eaa13573cb51ec9698~tplv-a9rns2rl98-image.image?rcl=20260106104335C4E475CC0E0D2D762F1C&rk3s=8e244e95&rrcfp=f06b921b&x-expires=1770259451&x-signature=OFYOKrub%2FIoUwO9u4Lps%2BNLUOo4%3D',
        author: {
          id: 4,
          username: '城市探索者',
          avatar: 'https://p3-doubao-search-sign.byteimg.com/labis/cfb7c58e658eca15bf5de16a2673ef52~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1783219465&x-signature=wf3yFcrFRMdxr7OU9VO%2Fa7V76VI%3D'
        },
        likes: 189,
        comments: 45,
        collections: 67,
        location: '上海',
        createTime: '2023-08-05'
      },
      {
        id: 4,
        type: 'image',
        title: '森林徒步的乐趣',
        description: '阳光透过树叶的缝隙洒在小路上，形成斑驳的光影。清新的空气，鸟儿的歌唱，这是与大自然最亲密的接触。',
        coverUrl: 'https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/c3f3c128ed204985916f34dd49b42edf~tplv-a9rns2rl98-image.image?rcl=20260106104335C4E475CC0E0D2D762F1C&rk3s=8e244e95&rrcfp=f06b921b&x-expires=1770259451&x-signature=Gv9uNxDvK6lZM2f9ViPaLkV0kC4%3D',
        contentUrl: 'https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/c3f3c128ed204985916f34dd49b42edf~tplv-a9rns2rl98-image.image?rcl=20260106104335C4E475CC0E0D2D762F1C&rk3s=8e244e95&rrcfp=f06b921b&x-expires=1770259451&x-signature=Gv9uNxDvK6lZM2f9ViPaLkV0kC4%3D',
        author: {
          id: 5,
          username: '绿野仙踪',
          avatar: 'https://p3-doubao-search-sign.byteimg.com/labis/image/befa412e11548eb94567fbe317985884~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1783219465&x-signature=EogvWaPdgp%2Fr6bf7hc8t7maHSu0%3D'
        },
        likes: 234,
        comments: 56,
        collections: 78,
        location: '云南西双版纳',
        createTime: '2023-09-12'
      }
    ],
    
    // 模拟评论数据
    commentList: {
      1: [
        {
          id: 101,
          content: '太美了！这个地方在哪里啊？',
          author: {
            id: 3,
            username: '海的女儿',
            avatar: 'https://p26-doubao-search-sign.byteimg.com/labis/image/1b4bab003e6081b2c75c027857c21905~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1783219465&x-signature=0Zf%2FENrZoB%2BRHdbh0SvZuLX8nQk%3D'
          },
          createTime: '2023-06-16 10:30',
          likes: 12
        },
        {
          id: 102,
          content: '风景如画，令人向往！',
          author: {
            id: 4,
            username: '城市探索者',
            avatar: 'https://p3-doubao-search-sign.byteimg.com/labis/cfb7c58e658eca15bf5de16a2673ef52~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1783219465&x-signature=wf3yFcrFRMdxr7OU9VO%2Fa7V76VI%3D'
          },
          createTime: '2023-06-16 14:25',
          likes: 8
        }
      ],
      2: [
        {
          id: 201,
          content: '夕阳西下，美不胜收！',
          author: {
            id: 2,
            username: '山水客',
            avatar: 'https://p3-doubao-search-sign.byteimg.com/labis/image/befa412e11548eb94567fbe317985884~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1783219465&x-signature=EogvWaPdgp%2Fr6bf7hc8t7maHSu0%3D'
          },
          createTime: '2023-07-21 09:15',
          likes: 15
        }
      ]
    },
    
    // 模拟联系人数据
    contactList: [
      {
        id: 2,
        username: '山水客',
        avatar: 'https://p3-doubao-search-sign.byteimg.com/labis/image/befa412e11548eb94567fbe317985884~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1783219465&x-signature=EogvWaPdgp%2Fr6bf7hc8t7maHSu0%3D',
        nickname: '山水客',
        signature: '寄情山水，心随自然',
        followStatus: 1 // 1: 已关注, 0: 未关注, 2: 互相关注
      },
      {
        id: 3,
        username: '海的女儿',
        avatar: 'https://p26-doubao-search-sign.byteimg.com/labis/image/1b4bab003e6081b2c75c027857c21905~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1783219465&x-signature=0Zf%2FENrZoB%2BRHdbh0SvZuLX8nQk%3D',
        nickname: '海的女儿',
        signature: '面朝大海，春暖花开',
        followStatus: 2
      },
      {
        id: 4,
        username: '城市探索者',
        avatar: 'https://p3-doubao-search-sign.byteimg.com/labis/cfb7c58e658eca15bf5de16a2673ef52~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1783219465&x-signature=wf3yFcrFRMdxr7OU9VO%2Fa7V76VI%3D',
        nickname: '城市探索者',
        signature: '发现城市之美',
        followStatus: 1
      }
    ],
    
    // 模拟消息数据
    messageList: [
      {
        id: 1,
        type: 'comment', // comment, like, system
        title: '评论通知',
        content: '海的女儿 评论了你的作品《青山绿水间的宁静》',
        avatar: 'https://p26-doubao-search-sign.byteimg.com/labis/image/1b4bab003e6081b2c75c027857c21905~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1783219465&x-signature=0Zf%2FENrZoB%2BRHdbh0SvZuLX8nQk%3D',
        createTime: '2023-06-16 10:30',
        isRead: false,
        relatedId: 1
      },
      {
        id: 2,
        type: 'like',
        title: '点赞通知',
        content: '城市探索者 点赞了你的作品《海滩日落的浪漫》',
        avatar: 'https://p3-doubao-search-sign.byteimg.com/labis/cfb7c58e658eca15bf5de16a2673ef52~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1783219465&x-signature=wf3yFcrFRMdxr7OU9VO%2Fa7V76VI%3D',
        createTime: '2023-07-22 15:45',
        isRead: false,
        relatedId: 2
      },
      {
        id: 3,
        type: 'system',
        title: '系统通知',
        content: '欢迎使用旅行分享小程序，快来发现精彩内容吧！',
        avatar: 'https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/8bf14f5b98484354ae38443fab09f348~tplv-a9rns2rl98-image.image?rcl=20260106104335C4E475CC0E0D2D762F1C&rk3s=8e244e95&rrcfp=f06b921b&x-expires=1770259451&x-signature=6%2Fysk27g%2FN%2BbqB%2FOne63QQoYLHI%3D',
        createTime: '2023-06-10 08:00',
        isRead: true,
        relatedId: null
      }
    ]
  }
})