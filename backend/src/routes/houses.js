/**
 * 房源 API 路由
 */

const express = require('express');
const router = express.Router();

// 临时模拟数据
const houses = [
  { id: 1, title: '阳光花园三期', price: 280, rooms: 3, halls: 2, area: 120, location: '朝阳区', cover: 'https://picsum.photos/1200/800?random=1' },
  { id: 2, title: '翡翠华府', price: 450, rooms: 4, halls: 2, area: 150, location: '海淀区', cover: 'https://picsum.photos/1200/800?random=2' },
  { id: 3, title: '金色家园', price: 320, rooms: 3, halls: 2, area: 135, location: '东城区', cover: 'https://picsum.photos/1200/800?random=3' },
  { id: 4, title: '碧水云天', price: 380, rooms: 3, halls: 2, area: 140, location: '西城区', cover: 'https://picsum.photos/1200/800?random=4' },
  { id: 5, title: '香山别墅', price: 1200, rooms: 5, halls: 3, area: 300, location: '海淀区', cover: 'https://picsum.photos/1200/800?random=5' },
  { id: 6, title: '城市之光', price: 260, rooms: 2, halls: 2, area: 95, location: '朝阳区', cover: 'https://picsum.photos/1200/800?random=6' },
  { id: 7, title: '湖畔嘉园', price: 350, rooms: 3, halls: 2, area: 128, location: '朝阳区', cover: 'https://picsum.photos/1200/800?random=7' },
  { id: 8, title: '中央公园', price: 520, rooms: 4, halls: 2, area: 165, location: '东城区', cover: 'https://picsum.photos/1200/800?random=8' }
];

/**
 * GET /api/houses
 * 获取房源列表
 */
router.get('/', (req, res) => {
  const { location, price, rooms, page = 1, limit = 10 } = req.query;
  
  let filtered = [...houses];
  
  // 筛选
  if (location) {
    filtered = filtered.filter(h => h.location === location);
  }
  if (rooms) {
    filtered = filtered.filter(h => h.rooms.toString() === rooms);
  }
  if (price) {
    const [min, max] = price.split('-');
    if (max) {
      filtered = filtered.filter(h => h.price >= min && h.price <= max);
    } else {
      filtered = filtered.filter(h => h.price >= min);
    }
  }
  
  // 分页
  const start = (page - 1) * limit;
  const end = start + limit;
  
  res.json({
    code: 200,
    data: {
      list: filtered.slice(start, end),
      total: filtered.length,
      page: parseInt(page),
      limit: parseInt(limit)
    }
  });
});

/**
 * GET /api/houses/:id
 * 获取房源详情
 */
router.get('/:id', (req, res) => {
  const house = houses.find(h => h.id === parseInt(req.params.id));
  
  if (!house) {
    return res.status(404).json({ code: 404, message: '房源不存在' });
  }
  
  res.json({
    code: 200,
    data: {
      ...house,
      bathrooms: 2,
      direction: '南北',
      floor: '中层/18 层',
      year: '2018 年',
      description: '此房位于核心地段，交通便利，周边配套完善。房屋采光好，南北通透，户型方正。小区环境优美，物业管理完善。'
    }
  });
});

module.exports = router;
