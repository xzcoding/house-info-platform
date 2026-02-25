/**
 * 咨询 API 路由
 */

const express = require('express');
const router = express.Router();

// 临时模拟咨询数据
const consultations = [];

/**
 * POST /api/consultations
 * 提交咨询
 */
router.post('/', (req, res) => {
  const { houseId, agentId, name, phone, message } = req.body;
  
  const consultation = {
    id: consultations.length + 1,
    houseId,
    agentId,
    name,
    phone,
    message,
    status: 'new',
    createdAt: new Date()
  };
  
  consultations.push(consultation);
  
  console.log('新咨询:', consultation);
  
  res.json({
    code: 200,
    message: '咨询提交成功',
    data: consultation
  });
});

/**
 * GET /api/consultations
 * 获取咨询列表 (管理员/销售)
 */
router.get('/', (req, res) => {
  res.json({
    code: 200,
    data: consultations
  });
});

/**
 * PUT /api/consultations/:id/status
 * 更新咨询状态
 */
router.put('/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const consultation = consultations.find(c => c.id === parseInt(id));
  if (!consultation) {
    return res.status(404).json({ code: 404, message: '咨询不存在' });
  }
  
  consultation.status = status;
  
  res.json({
    code: 200,
    message: '状态更新成功',
    data: consultation
  });
});

module.exports = router;
