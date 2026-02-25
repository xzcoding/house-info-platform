/**
 * 图片资源配置
 * 临时使用占位图，后期替换为真实图片
 */

// 占位图服务
const PLACEHOLDER = {
  house: 'https://picsum.photos/1200/800',
  floorplan: 'https://via.placeholder.com/800x600?text=Floor+Plan',
  living: 'https://picsum.photos/1200/800',
  bedroom: 'https://picsum.photos/1200/800',
  kitchen: 'https://picsum.photos/1200/800',
  bathroom: 'https://picsum.photos/1200/800',
  agent: 'https://i.pravatar.cc/400',
  banner: 'https://picsum.photos/1920/600'
}

// 房源封面图 (15 张)
export const houseCovers = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  url: `${PLACEHOLDER.house}?random=${i + 1}`,
  title: `房源${i + 1}`
}))

// 户型图 (8 张)
export const floorPlans = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  url: `${PLACEHOLDER.floorplan}&text=Floor+Plan+${i + 1}`
}))

// 客厅图 (10 张)
export const livingRooms = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  url: `${PLACEHOLDER.living}?random=${i + 20}`
}))

// 卧室图 (5 张)
export const bedrooms = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  url: `${PLACEHOLDER.bedroom}?random=${i + 30}`
}))

// 厨房图 (5 张)
export const kitchens = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  url: `${PLACEHOLDER.kitchen}?random=${i + 40}`
}))

// 卫生间图 (5 张)
export const bathrooms = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  url: `${PLACEHOLDER.bathroom}?random=${i + 50}`
}))

// 销售头像 (6 张)
export const agents = [
  { id: 1, name: '张顾问', phone: '138****0001', avatar: `${PLACEHOLDER.agent}?1`, gender: 'male' },
  { id: 2, name: '李顾问', phone: '138****0002', avatar: `${PLACEHOLDER.agent}?2`, gender: 'male' },
  { id: 3, name: '王顾问', phone: '138****0003', avatar: `${PLACEHOLDER.agent}?3`, gender: 'male' },
  { id: 4, name: '陈顾问', phone: '138****0004', avatar: `${PLACEHOLDER.agent}?4`, gender: 'female' },
  { id: 5, name: '刘顾问', phone: '138****0005', avatar: `${PLACEHOLDER.agent}?5`, gender: 'female' },
  { id: 6, name: '赵顾问', phone: '138****0006', avatar: `${PLACEHOLDER.agent}?6`, gender: 'female' }
]

// Banner 图 (3 张)
export const banners = Array.from({ length: 3 }, (_, i) => ({
  id: i + 1,
  url: `${PLACEHOLDER.banner}?random=${i + 60}`,
  title: `Banner${i + 1}`
}))

// 默认导出
export default {
  houseCovers,
  floorPlans,
  livingRooms,
  bedrooms,
  kitchens,
  bathrooms,
  agents,
  banners
}
