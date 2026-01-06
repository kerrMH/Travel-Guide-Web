# 旅行分享小程序后端接口文档

## 1. 接口概述

本文档定义了旅行分享小程序的后端API接口规范，包括用户认证、内容管理、社交互动等功能模块的接口设计。

## 2. 基础信息

- **API基础URL**: `https://api.travelshare.com/v1`
- **请求超时**: 10秒
- **数据格式**: JSON
- **认证方式**: JWT Token

## 3. 认证接口

### 3.1 用户登录

**接口路径**: `/auth/login`  
**请求方法**: POST  
**请求参数**:
```json
{
  "username": "string",
  "password": "string"
}
```

**成功响应**:
```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "string",
    "userInfo": {
      "id": "number",
      "nickName": "string",
      "avatarUrl": "string",
      "gender": "number",
      "signature": "string"
    }
  }
}
```

### 3.2 用户注册

**接口路径**: `/auth/register`  
**请求方法**: POST  
**请求参数**:
```json
{
  "username": "string",
  "password": "string",
  "nickName": "string"
}
```

**成功响应**:
```json
{
  "code": 200,
  "message": "注册成功",
  "data": {
    "userId": "number"
  }
}
```

### 3.3 刷新Token

**接口路径**: `/auth/refresh`  
**请求方法**: POST  
**请求头**:
```
Authorization: Bearer {token}
```

**成功响应**:
```json
{
  "code": 200,
  "message": "Token刷新成功",
  "data": {
    "token": "string"
  }
}
```

## 4. 用户接口

### 4.1 获取用户信息

**接口路径**: `/user/info`  
**请求方法**: GET  
**请求头**:
```
Authorization: Bearer {token}
```

**成功响应**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "id": "number",
    "nickName": "string",
    "avatarUrl": "string",
    "gender": "number",
    "birthday": "string",
    "location": "string",
    "signature": "string",
    "bio": "string",
    "hobbies": ["string"],
    "followingCount": "number",
    "followerCount": "number",
    "postCount": "number"
  }
}
```

### 4.2 更新用户信息

**接口路径**: `/user/update`  
**请求方法**: PUT  
**请求头**:
```
Authorization: Bearer {token}
```

**请求参数**:
```json
{
  "nickName": "string",
  "gender": "number",
  "birthday": "string",
  "location": "string",
  "signature": "string",
  "bio": "string",
  "hobbies": ["string"]
}
```

**成功响应**:
```json
{
  "code": 200,
  "message": "更新成功",
  "data": {
    "userInfo": {
      "id": "number",
      "nickName": "string",
      "avatarUrl": "string",
      "gender": "number",
      "birthday": "string",
      "location": "string",
      "signature": "string",
      "bio": "string",
      "hobbies": ["string"]
    }
  }
}
```

### 4.3 上传头像

**接口路径**: `/user/avatar`  
**请求方法**: POST  
**请求头**:
```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**请求参数**:
- `avatar`: 文件 (图片)

**成功响应**:
```json
{
  "code": 200,
  "message": "上传成功",
  "data": {
    "avatarUrl": "string"
  }
}
```

## 5. 内容接口

### 5.1 获取内容列表

**接口路径**: `/content/list`  
**请求方法**: GET  
**请求参数**:
- `page`: 页码 (默认1)
- `pageSize`: 每页数量 (默认10)
- `type`: 内容类型 (可选)
- `location`: 位置 (可选)
- `search`: 搜索关键词 (可选)

**成功响应**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "list": [
      {
        "id": "number",
        "title": "string",
        "description": "string",
        "coverUrl": "string",
        "images": ["string"],
        "location": "string",
        "author": {
          "id": "number",
          "nickName": "string",
          "avatar": "string"
        },
        "likes": "number",
        "comments": "number",
        "collections": "number",
        "createTime": "string"
      }
    ],
    "total": "number",
    "page": "number",
    "pageSize": "number",
    "hasMore": "boolean"
  }
}
```

### 5.2 获取内容详情

**接口路径**: `/content/detail/{id}`  
**请求方法**: GET  

**成功响应**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "id": "number",
    "title": "string",
    "content": "string",
    "images": ["string"],
    "location": "string",
    "author": {
      "id": "number",
      "nickName": "string",
      "avatar": "string"
    },
    "likes": "number",
    "comments": "number",
    "collections": "number",
    "createTime": "string",
    "isLiked": "boolean",
    "isCollected": "boolean",
    "isFollowing": "boolean"
  }
}
```

### 5.3 发布内容

**接口路径**: `/content/publish`  
**请求方法**: POST  
**请求头**:
```
Authorization: Bearer {token}
```

**请求参数**:
```json
{
  "title": "string",
  "content": "string",
  "images": ["string"],
  "location": "string",
  "privacy": "number" // 0: 公开, 1: 私密, 2: 仅关注可见
}
```

**成功响应**:
```json
{
  "code": 200,
  "message": "发布成功",
  "data": {
    "contentId": "number"
  }
}
```

### 5.4 更新内容

**接口路径**: `/content/update/{id}`  
**请求方法**: PUT  
**请求头**:
```
Authorization: Bearer {token}
```

**请求参数**:
```json
{
  "title": "string",
  "content": "string",
  "images": ["string"],
  "location": "string",
  "privacy": "number"
}
```

**成功响应**:
```json
{
  "code": 200,
  "message": "更新成功"
}
```

### 5.5 删除内容

**接口路径**: `/content/delete/{id}`  
**请求方法**: DELETE  
**请求头**:
```
Authorization: Bearer {token}
```

**成功响应**:
```json
{
  "code": 200,
  "message": "删除成功"
}
```

## 6. 评论接口

### 6.1 获取评论列表

**接口路径**: `/comment/list/{contentId}`  
**请求方法**: GET  
**请求参数**:
- `page`: 页码 (默认1)
- `pageSize`: 每页数量 (默认20)

**成功响应**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "list": [
      {
        "id": "number",
        "content": "string",
        "author": {
          "id": "number",
          "nickName": "string",
          "avatar": "string"
        },
        "createTime": "string",
        "likes": "number",
        "isLiked": "boolean"
      }
    ],
    "total": "number",
    "page": "number",
    "pageSize": "number"
  }
}
```

### 6.2 发表评论

**接口路径**: `/comment/publish`  
**请求方法**: POST  
**请求头**:
```
Authorization: Bearer {token}
```

**请求参数**:
```json
{
  "contentId": "number",
  "content": "string"
}
```

**成功响应**:
```json
{
  "code": 200,
  "message": "评论成功",
  "data": {
    "commentId": "number"
  }
}
```

### 6.3 删除评论

**接口路径**: `/comment/delete/{id}`  
**请求方法**: DELETE  
**请求头**:
```
Authorization: Bearer {token}
```

**成功响应**:
```json
{
  "code": 200,
  "message": "删除成功"
}
```

## 7. 互动接口

### 7.1 点赞/取消点赞

**接口路径**: `/interaction/like`  
**请求方法**: POST  
**请求头**:
```
Authorization: Bearer {token}
```

**请求参数**:
```json
{
  "type": "number", // 1: 内容, 2: 评论
  "targetId": "number",
  "action": "number" // 1: 点赞, 0: 取消点赞
}
```

**成功响应**:
```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "isLiked": "boolean",
    "likeCount": "number"
  }
}
```

### 7.2 收藏/取消收藏

**接口路径**: `/interaction/collect`  
**请求方法**: POST  
**请求头**:
```
Authorization: Bearer {token}
```

**请求参数**:
```json
{
  "contentId": "number",
  "action": "number" // 1: 收藏, 0: 取消收藏
}
```

**成功响应**:
```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "isCollected": "boolean",
    "collectCount": "number"
  }
}
```

### 7.3 关注/取消关注

**接口路径**: `/interaction/follow`  
**请求方法**: POST  
**请求头**:
```
Authorization: Bearer {token}
```

**请求参数**:
```json
{
  "userId": "number",
  "action": "number" // 1: 关注, 0: 取消关注
}
```

**成功响应**:
```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "isFollowing": "boolean",
    "followStatus": "number" // 0: 未关注, 1: 已关注, 2: 互相关注
  }
}
```

## 8. 通知接口

### 8.1 获取通知列表

**接口路径**: `/notification/list`  
**请求方法**: GET  
**请求头**:
```
Authorization: Bearer {token}
```

**请求参数**:
- `type`: 通知类型 (1: 评论, 2: 点赞, 3: 关注, 4: 系统)
- `page`: 页码 (默认1)
- `pageSize`: 每页数量 (默认20)

**成功响应**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "list": [
      {
        "id": "number",
        "type": "number",
        "title": "string",
        "content": "string",
        "relatedId": "number",
        "relatedType": "number",
        "createTime": "string",
        "isRead": "boolean"
      }
    ],
    "total": "number",
    "page": "number",
    "pageSize": "number"
  }
}
```

### 8.2 标记已读

**接口路径**: `/notification/read`  
**请求方法**: PUT  
**请求头**:
```
Authorization: Bearer {token}
```

**请求参数**:
```json
{
  "ids": ["number"]
}
```

**成功响应**:
```json
{
  "code": 200,
  "message": "标记成功"
}
```

## 9. 设置接口

### 9.1 获取用户设置

**接口路径**: `/settings/get`  
**请求方法**: GET  
**请求头**:
```
Authorization: Bearer {token}
```

**成功响应**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "notificationEnabled": "boolean",
    "commentEnabled": "boolean",
    "likeEnabled": "boolean",
    "privacyOption": "number",
    "locationEnabled": "boolean",
    "darkModeEnabled": "boolean"
  }
}
```

### 9.2 更新用户设置

**接口路径**: `/settings/update`  
**请求方法**: PUT  
**请求头**:
```
Authorization: Bearer {token}
```

**请求参数**:
```json
{
  "notificationEnabled": "boolean",
  "commentEnabled": "boolean",
  "likeEnabled": "boolean",
  "privacyOption": "number",
  "locationEnabled": "boolean",
  "darkModeEnabled": "boolean"
}
```

**成功响应**:
```json
{
  "code": 200,
  "message": "更新成功"
}
```

## 10. 错误码说明

| 错误码 | 描述 |
|--------|------|
| 400 | 请求参数错误 |
| 401 | 未授权，请重新登录 |
| 403 | 权限不足 |
| 404 | 请求的资源不存在 |
| 500 | 服务器内部错误 |
| 501 | 接口未实现 |

## 11. 接口调用示例

### 11.1 使用Fetch API调用登录接口

```javascript
fetch('https://api.travelshare.com/v1/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'admin',
    password: 'admin'
  })
})
.then(response => response.json())
.then(data => {
  if (data.code === 200) {
    // 登录成功，保存token
    wx.setStorageSync('token', data.data.token);
    wx.setStorageSync('userInfo', data.data.userInfo);
  } else {
    // 登录失败
    wx.showToast({
      title: data.message,
      icon: 'none'
    });
  }
})
.catch(error => {
  console.error('登录失败:', error);
  wx.showToast({
    title: '网络错误',
    icon: 'none'
  });
});
```

### 11.2 使用wx.request调用获取内容列表接口

```javascript
wx.request({
  url: 'https://api.travelshare.com/v1/content/list',
  method: 'GET',
  header: {
    'Authorization': `Bearer ${wx.getStorageSync('token')}`
  },
  data: {
    page: 1,
    pageSize: 10
  },
  success: (res) => {
    if (res.data.code === 200) {
      // 获取成功，更新内容列表
      this.setData({
        contentList: res.data.data.list,
        hasMore: res.data.data.hasMore
      });
    } else {
      wx.showToast({
        title: res.data.message,
        icon: 'none'
      });
    }
  },
  fail: (error) => {
    console.error('获取内容失败:', error);
    wx.showToast({
      title: '网络错误',
      icon: 'none'
    });
  }
});
```