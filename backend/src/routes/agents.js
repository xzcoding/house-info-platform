/**
 * 销售顾问 API 路由
 */

const express = require('express');
const router = express.Router();

// 临时模拟数据
const agents = [
  { id: 1, name: '张顾问', phone: '138****0001', wechat: 'zhang_agent', avatar: 'https://i.pravatar.cc/400?1', gender: 'male', experience: 5, status: 'active' },
  { id: 2, name: '李顾问', phone: '138****0002', wechat: 'li_agent', avatar: 'https://i.pravatar.cc/400?2', gender: 'male', experience: 3, status: 'active' },
  { id: 3, name: '王顾问', phone: '138****0003', wechat: 'wang_agent', avatar: 'https://i.pravatar.cc/400?3', gender: 'male', experience: 7, status: 'active' },
  { id: 4, name: '陈顾问', phone: '138****0004', wechat: 'chen_agent', avatar: 'https://i.pravatar.cc/400?4', gender: 'female', experience: 4, status: 'active' },
  { id: 5, name: '刘顾问', phone: '138****0005', wechat: 'liu_agent', avatar: 'https://i.pravatar.cc/400?5', gender: 'female', experience: 6, status: 'active' },
  { id: 6, name: '赵顾问', phone: '138****0006', wechat: 'zhao_agent', avatar: 'https://i.pravatar.cc/400?6', gender: 'female', experience: 2, status: 'active' }
];

/**
 * GET /api/agents
 * 获取销售顾问列表
 */
router.get('/', (req, res) => {
  const { status, gender } = req.query;
  
  let filtered = [...agents];
  
  if (status) {
    filtered = filtered.filter(a => a.status === status);
  }
  if (gender) {
    filtered = filtered.filter(a => a.gender === gender);
  }
  
  res.json({
    code: 200,
    data: filtered
  });
});

/**
 * GET /api/agents/:id
 * 获取销售顾问详情
 */
router.get('/:id', (req, res) => {
  const agent = agents.find(a => a.id === parseInt(req.params.id));
  
  if (!agent) {
    return res.status(404).json({ code: 404, message: '销售顾问不存在' });
  }
  
  res.json({
    code: 200,
    data: agent
  });
});

/**
 * GET /api/agents/:id/houses
 * 获取销售顾问负责的房源
 */
router.get('/:id/houses', (req, res) => {
  // TODO: 从数据库查询
  res.json({
    code: 200,
    data: []
  });
});

module.exports = router;
