Page({
  data: {
    formData: {
      title: '',
      description: '',
      mediaList: [],
      privacy: 'public' // public, friends, private
    },
    showMediaPicker: false,
    uploading: false,
    uploadProgress: 0,
    canPublish: false
  },

  onLoad() {
    // 初始化页面
    this.validateForm();
  },

  // 标题输入
  onTitleInput(e) {
    this.setData({
      'formData.title': e.detail.value
    });
    this.validateForm();
  },

  // 描述输入
  onDescInput(e) {
    this.setData({
      'formData.description': e.detail.value
    });
    this.validateForm();
  },

  // 设置隐私
  setPrivacy(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      'formData.privacy': type
    });
  },

  // 显示媒体选择器
  showMediaPicker() {
    this.setData({
      showMediaPicker: true
    });
  },

  // 隐藏媒体选择器
  hideMediaPicker() {
    this.setData({
      showMediaPicker: false
    });
  },

  // 从相册选择图片
  chooseImage() {
    const maxCount = 9 - this.data.formData.mediaList.length;
    if (maxCount <= 0) {
      wx.showToast({
        title: '最多只能上传9个文件',
        icon: 'none'
      });
      return;
    }

    wx.chooseMedia({
      count: maxCount,
      mediaType: ['image'],
      sourceType: ['album'],
      success: (res) => {
        this.handleMediaFiles(res.tempFiles, 'image');
      },
      fail: (err) => {
        console.error('选择图片失败:', err);
      }
    });
    this.hideMediaPicker();
  },

  // 拍照
  takePhoto() {
    if (this.data.formData.mediaList.length >= 9) {
      wx.showToast({
        title: '最多只能上传9个文件',
        icon: 'none'
      });
      return;
    }

    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['camera'],
      success: (res) => {
        this.handleMediaFiles(res.tempFiles, 'image');
      },
      fail: (err) => {
        console.error('拍照失败:', err);
      }
    });
    this.hideMediaPicker();
  },

  // 录制视频
  chooseVideo() {
    if (this.data.formData.mediaList.length >= 9) {
      wx.showToast({
        title: '最多只能上传9个文件',
        icon: 'none'
      });
      return;
    }

    wx.chooseMedia({
      count: 1,
      mediaType: ['video'],
      sourceType: ['camera'],
      maxDuration: 60,
      camera: 'back',
      success: (res) => {
        this.handleMediaFiles(res.tempFiles, 'video');
      },
      fail: (err) => {
        console.error('录制视频失败:', err);
      }
    });
    this.hideMediaPicker();
  },

  // 处理媒体文件
  handleMediaFiles(files, type) {
    const mediaList = [...this.data.formData.mediaList];
    
    files.forEach(file => {
      const mediaItem = {
        type: type,
        url: file.tempFilePath,
        size: file.size,
        duration: file.duration || 0,
        coverUrl: file.thumbTempFilePath || file.tempFilePath
      };
      
      if (mediaList.length < 9) {
        mediaList.push(mediaItem);
      }
    });

    this.setData({
      'formData.mediaList': mediaList
    });
    this.validateForm();
  },

  // 删除媒体文件
  deleteMedia(e) {
    const index = e.currentTarget.dataset.index;
    const mediaList = [...this.data.formData.mediaList];
    mediaList.splice(index, 1);
    
    this.setData({
      'formData.mediaList': mediaList
    });
    this.validateForm();
  },

  // 预览媒体文件
  previewMedia(e) {
    const index = e.currentTarget.dataset.index;
    const media = this.data.formData.mediaList[index];
    
    if (media.type === 'image') {
      const imageList = this.data.formData.mediaList
        .filter(item => item.type === 'image')
        .map(item => item.url);
      
      wx.previewImage({
        urls: imageList,
        current: media.url
      });
    } else if (media.type === 'video') {
      wx.previewMedia({
        sources: [{
          url: media.url,
          type: 'video'
        }],
        current: 0
      });
    }
  },

  // 验证表单
  validateForm() {
    const { title, description, mediaList } = this.data.formData;
    const canPublish = title.trim() !== '' && mediaList.length > 0;
    
    this.setData({
      canPublish: canPublish
    });
  },

  // 模拟上传文件
  uploadFile(filePath) {
    return new Promise((resolve, reject) => {
      // 模拟上传进度
      let progress = 0;
      const timer = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
          progress = 100;
          clearInterval(timer);
          
          // 模拟返回上传后的URL
          const uploadedUrl = filePath; // 实际应该返回服务器上的URL
          resolve(uploadedUrl);
        }
        
        this.setData({
          uploadProgress: Math.floor(progress)
        });
      }, 200);
    });
  },

  // 提交发布
  async submitPublish() {
    if (!this.data.canPublish) return;

    try {
      this.setData({
        uploading: true,
        uploadProgress: 0
      });

      // 上传媒体文件
      const uploadedMediaList = [];
      for (let i = 0; i < this.data.formData.mediaList.length; i++) {
        const media = this.data.formData.mediaList[i];
        const uploadedUrl = await this.uploadFile(media.url);
        
        uploadedMediaList.push({
          ...media,
          url: uploadedUrl
        });
      }

      // 构建发布数据
      const publishData = {
        ...this.data.formData,
        mediaList: uploadedMediaList,
        createTime: new Date().getTime(),
        author: {
          id: 'user123',
          username: '旅行者',
          avatar: 'https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/25fc30b24deb437f9e1d02120da02d89~tplv-a9rns2rl98-image.image?rcl=20260106104335C4E475CC0E0D2D762F1C&rk3s=8e244e95&rrcfp=f06b921b&x-expires=1770259453&x-signature=A5I9v5lEoGeu0%2FTDe5%2FFGJfmCFQ%3D'
        },
        likes: 0,
        comments: 0,
        id: 'post_' + Date.now()
      };

      // 模拟发布请求
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 发布成功
      wx.showToast({
        title: '发布成功',
        icon: 'success'
      });

      // 重置表单
      this.setData({
        formData: {
          title: '',
          description: '',
          mediaList: [],
          privacy: 'public'
        },
        uploading: false,
        canPublish: false
      });

      // 延迟返回首页
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/index/index'
        });
      }, 1500);

    } catch (error) {
      console.error('发布失败:', error);
      wx.showToast({
        title: '发布失败，请重试',
        icon: 'none'
      });
      
      this.setData({
        uploading: false
      });
    }
  },

  // 取消发布
  cancelPublish() {
    if (this.data.formData.title || this.data.formData.description || this.data.formData.mediaList.length > 0) {
      wx.showModal({
        title: '确认取消',
        content: '确定要取消发布吗？已编辑的内容将不会保存。',
        success: (res) => {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/index/index'
            });
          }
        }
      });
    } else {
      wx.switchTab({
        url: '/pages/index/index'
      });
    }
  }
});