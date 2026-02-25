/**
 * 用户 API 路由
 */

const express = require('express');
const router = express.Router();

// 临时模拟数据
const users = [];

/**
 * GET /api/users/profile
 * 获取当前用户信息
 */
router.get('/profile', (req, res) => {
  // TODO: 从 Token 解析用户 ID
  res.json({
    code: 200,
    data: {
      id: 1,
      phone: '138****0000',
      name: '测试用户',
      email: '',
      avatar: ''
    }
  });
});

/**
 * PUT /api/users/profile
 * 更新用户信息
 */
router.put('/profile', (req, res) => {
  const { name, email } = req.body;
  
  // TODO: 更新数据库
  res.json({
    code: 200,
    message: '更新成功',
    data: {
      id: 1,
      phone: '138****0000',
      name: name || '测试用户',
      email: email || ''
    }
  });
});

/**
 * PUT /api/users/password
 * 修改密码
 */
router.put('/password', (req, res) => {
  const { oldPassword, newPassword } = req.body;
  
  // TODO: 验证旧密码，更新新密码
  res.json({
    code: 200,
    message: '密码修改成功'
  });
});

/**
 * GET /api/users/consultations
 * 获取用户咨询记录
 */
router.get('/consultations', (req, res) => {
  // TODO: 从数据库查询
  res.json({
    code: 200,
    data: []
  });
});

/**
 * GET /api/users/favorites
 * 获取用户收藏
 */
router.get('/favorites', (req, res) => {
  // TODO: 从数据库查询
  res.json({
    code: 200,
    data: []
  });
});

/**
 * POST /api/users/favorites/:houseId
 * 添加收藏
 */
router.post('/favorites/:houseId', (req, res) => {
  // TODO: 添加到数据库
  res.json({
    code: 200,
    message: '收藏成功'
  });
});

/**
 * DELETE /api/users/favorites/:houseId
 * 取消收藏
 */
router.delete('/favorites/:houseId', (req, res) => {
  // TODO: 从数据库删除
  res.json({
    code: 200,
    message: '取消收藏成功'
  });
});

module.exports = router;
