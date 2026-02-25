/**
 * 用户认证 API 路由
 */

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// 临时模拟用户数据
const users = [];

/**
 * POST /api/auth/register
 * 用户注册
 */
router.post('/register', async (req, res) => {
  const { phone, password, name } = req.body;
  
  // 检查用户是否存在
  const existingUser = users.find(u => u.phone === phone);
  if (existingUser) {
    return res.status(400).json({ code: 400, message: '手机号已注册' });
  }
  
  // 密码加密
  const passwordHash = await bcrypt.hash(password, 10);
  
  // 创建用户
  const user = {
    id: users.length + 1,
    phone,
    password: passwordHash,
    name: name || `用户${phone.slice(-4)}`,
    createdAt: new Date()
  };
  
  users.push(user);
  
  // 生成 Token
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
  
  res.json({
    code: 200,
    message: '注册成功',
    data: { token, user: { id: user.id, phone: user.phone, name: user.name } }
  });
});

/**
 * POST /api/auth/login
 * 用户登录
 */
router.post('/login', async (req, res) => {
  const { phone, password } = req.body;
  
  // 查找用户
  const user = users.find(u => u.phone === phone);
  if (!user) {
    return res.status(400).json({ code: 400, message: '用户不存在' });
  }
  
  // 验证密码
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(400).json({ code: 400, message: '密码错误' });
  }
  
  // 生成 Token
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
  
  res.json({
    code: 200,
    message: '登录成功',
    data: { token, user: { id: user.id, phone: user.phone, name: user.name } }
  });
});

/**
 * GET /api/auth/profile
 * 获取用户信息
 */
router.get('/profile', (req, res) => {
  // TODO: 从 Token 解析用户 ID
  res.json({
    code: 200,
    data: { id: 1, phone: '138****0000', name: '测试用户' }
  });
});

module.exports = router;
