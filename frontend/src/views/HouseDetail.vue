<template>
  <div class="house-detail">
    <!-- 返回导航 -->
    <div class="back-nav">
      <el-button text @click="$router.back()">
        <el-icon><ArrowLeft /></el-icon>
        返回列表
      </el-button>
    </div>

    <el-container class="detail-container">
      <el-main class="detail-main">
        <!-- 图片轮播 -->
        <div class="gallery-section">
          <el-carousel :interval="5000" arrow="always" height="500px" class="detail-carousel">
            <el-carousel-item v-for="img in images" :key="img.id">
              <div class="carousel-image-wrapper">
                <img :src="img.url" class="carousel-image" />
              </div>
            </el-carousel-item>
          </el-carousel>
          <div class="image-counter">
            <el-icon><Picture /></el-icon>
            <span>{{ images.length }} 张图片</span>
          </div>
        </div>

        <!-- 基本信息 -->
        <div class="info-section glass-card">
          <div class="info-header">
            <div class="title-section">
              <h1 class="house-title">{{ house.title }}</h1>
              <div class="house-tags">
                <el-tag type="danger" effect="light" size="large">新上</el-tag>
                <el-tag type="warning" effect="light" size="large">随时看房</el-tag>
                <el-tag type="success" effect="light" size="large">满五唯一</el-tag>
              </div>
            </div>
            <div class="price-section">
              <div class="main-price">
                <span class="price-num">{{ house.price }}</span>
                <span class="price-unit">万</span>
              </div>
              <div class="sub-price">
                <span class="unit-price">{{ (house.price * 10000 / house.area).toFixed(0) }}元/㎡</span>
                <span class="price-trend">
                  <el-icon><TrendCharts /></el-icon>
                  价格可谈
                </span>
              </div>
            </div>
          </div>

          <el-divider />

          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">
                <el-icon><HomeFilled /></el-icon>
                户型
              </div>
              <div class="info-value">{{ house.rooms }}室{{ house.halls }}厅{{ house.bathrooms }}卫</div>
            </div>
            <div class="info-item">
              <div class="info-label">
                <el-icon><FullScreen /></el-icon>
                面积
              </div>
              <div class="info-value">{{ house.area }}㎡</div>
            </div>
            <div class="info-item">
              <div class="info-label">
                <el-icon><Compass /></el-icon>
                朝向
              </div>
              <div class="info-value">{{ house.direction }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">
                <el-icon><OfficeBuilding /></el-icon>
                楼层
              </div>
              <div class="info-value">{{ house.floor }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">
                <el-icon><Location /></el-icon>
                区域
              </div>
              <div class="info-value">{{ house.location }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">
                <el-icon><Calendar /></el-icon>
                年代
              </div>
              <div class="info-value">{{ house.year }}</div>
            </div>
          </div>

          <el-divider />

          <div class="description-section">
            <h3 class="section-title">
              <el-icon><Document /></el-icon>
              房源描述
            </h3>
            <p class="description-text">{{ house.description }}</p>
          </div>
        </div>

        <!-- 户型图 -->
        <div class="floorplan-section glass-card">
          <h3 class="section-title">
            <el-icon><MapLocation /></el-icon>
            户型图
          </h3>
          <el-row :gutter="20">
            <el-col :span="8" v-for="plan in floorPlans" :key="plan.id">
              <div class="floorplan-wrapper">
                <el-image :src="plan.url" fit="cover" class="floorplan-image" :preview-src-list="[plan.url]" />
                <div class="floorplan-label">户型图 {{ plan.id }}</div>
              </div>
            </el-col>
          </el-row>
        </div>

        <!-- 联系销售 -->
        <div class="agent-section glass-card">
          <h3 class="section-title">
            <el-icon><UserFilled /></el-icon>
            联系销售顾问
          </h3>
          <div class="agent-info-card">
            <div class="agent-profile">
              <el-avatar :src="agent.avatar" :size="100" class="agent-avatar" />
              <div class="agent-badge">
                <el-icon><Medal /></el-icon>
                金牌顾问
              </div>
            </div>
            <div class="agent-detail">
              <h4 class="agent-name">{{ agent.name }}</h4>
              <p class="agent-stats">
                <span class="stat-item">
                  <el-icon><StarFilled /></el-icon>
                  5.0 分
                </span>
                <span class="stat-item">
                  <el-icon><User /></el-icon>
                  服务 200+ 客户
                </span>
                <span class="stat-item">
                  <el-icon><Timer /></el-icon>
                  从业 5 年
                </span>
              </p>
              <div class="contact-actions">
                <el-button type="primary" size="large" class="contact-btn phone" @click="handleCall">
                  <el-icon><Phone /></el-icon>
                  拨打电话
                </el-button>
                <el-button size="large" class="contact-btn wechat" @click="showWechat = true">
                  <el-icon><ChatDotRound /></el-icon>
                  微信咨询
                </el-button>
                <el-button type="success" size="large" class="contact-btn message" @click="dialogVisible = true">
                  <el-icon><Message /></el-icon>
                  在线咨询
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </el-main>

      <!-- 右侧固定栏 -->
      <el-aside width="340px" class="detail-sidebar">
        <div class="sidebar-card glass-card">
          <h3 class="sidebar-title">
            <el-icon><ChatLineRound /></el-icon>
            快速咨询
          </h3>
          <p class="sidebar-subtitle">留下您的联系方式，我们将尽快与您联系</p>
          <el-form :model="consultForm" class="consult-form">
            <el-form-item>
              <el-input v-model="consultForm.name" placeholder="您的姓名" size="large" :prefix-icon="User" />
            </el-form-item>
            <el-form-item>
              <el-input v-model="consultForm.phone" placeholder="您的电话" size="large" :prefix-icon="Phone" />
            </el-form-item>
            <el-form-item>
              <el-input v-model="consultForm.message" type="textarea" :rows="4" placeholder="请输入您想咨询的内容..." />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="large" class="submit-btn" @click="handleSubmit">
                <el-icon><Position /></el-icon>
                提交咨询
              </el-button>
            </el-form-item>
          </el-form>
          <div class="contact-tips">
            <el-icon><InfoFilled /></el-icon>
            <span>提交后顾问将在 30 分钟内联系您</span>
          </div>
        </div>
      </el-aside>
    </el-container>

    <!-- 微信二维码弹窗 -->
    <el-dialog v-model="showWechat" title="微信咨询" width="360px" class="wechat-dialog" align-center>
      <div class="wechat-content">
        <div class="wechat-qr-wrapper">
          <img :src="agent.wechatQr || 'https://via.placeholder.com/240x240?text=WeChat+QR'" class="wechat-qr" />
        </div>
        <p class="wechat-tip">扫描二维码添加微信</p>
        <p class="wechat-name">{{ agent.name }}</p>
      </div>
    </el-dialog>

    <!-- 在线咨询弹窗 -->
    <el-dialog v-model="dialogVisible" title="在线咨询" width="520px" class="consult-dialog" align-center>
      <el-form :model="consultForm" class="dialog-form">
        <el-form-item label="您的姓名">
          <el-input v-model="consultForm.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="consultForm.phone" placeholder="请输入电话" />
        </el-form-item>
        <el-form-item label="咨询内容">
          <el-input v-model="consultForm.message" type="textarea" :rows="5" placeholder="请输入您想咨询的内容..." />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false" size="large">取消</el-button>
        <el-button type="primary" @click="handleSubmit" size="large">
          <el-icon><Position /></el-icon>
          提交咨询
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { 
  Phone, ChatDotRound, Message, ArrowLeft, Picture, TrendCharts,
  HomeFilled, FullScreen, Compass, OfficeBuilding, Location, Calendar,
  Document, MapLocation, UserFilled, Medal, StarFilled, User, Timer,
  ChatLineRound, Position, InfoFilled
} from '@element-plus/icons-vue'
import { houseCovers, floorPlans, agents } from '@/config/images'

const route = useRoute()

// 房源数据 (临时模拟)
const house = ref({
  id: route.params.id,
  title: '阳光花园三期 3 室 2 厅 2 卫',
  price: 280,
  area: 120,
  rooms: 3,
  halls: 2,
  bathrooms: 2,
  direction: '南北',
  floor: '中层/18 层',
  location: '朝阳区',
  year: '2018 年',
  description: '此房位于朝阳区核心地段，交通便利，周边配套完善。房屋采光好，南北通透，户型方正。小区环境优美，物业管理完善。适合自住或投资。',
  cover: houseCovers[0].url
})

// 图片列表
const images = computed(() => [
  { id: 1, url: house.value.cover },
  ...houseCovers.slice(1, 6).map((img, i) => ({ id: i + 2, url: img.url }))
])

// 销售顾问
const agent = ref(agents[0])

// 咨询表单
const consultForm = ref({
  name: '',
  phone: '',
  message: ''
})

// 弹窗控制
const dialogVisible = ref(false)
const showWechat = ref(false)

// 拨打电话
const handleCall = () => {
  window.location.href = `tel:${agent.value.phone}`
}

// 提交咨询
const handleSubmit = () => {
  console.log('提交咨询:', consultForm.value)
  // TODO: 调用后端 API
  dialogVisible.value = false
  alert('咨询提交成功，销售顾问会尽快联系您！')
}
</script>

<style scoped>
.house-detail {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7ed 100%);
  padding-bottom: 60px;
}

/* 返回导航 */
.back-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 16px 40px;
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.back-nav .el-button {
  font-size: 15px;
  color: #606266;
}

.back-nav .el-button:hover {
  color: #409EFF;
}

/* 容器 */
.detail-container {
  max-width: 1400px;
  margin: 0 auto;
}

.detail-main {
  padding: 30px;
}

.detail-sidebar {
  padding: 30px 30px 30px 0;
}

/* 玻璃卡片 */
.glass-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 28px;
  margin-bottom: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.5);
}

/* 图片轮播 */
.gallery-section {
  position: relative;
  margin-bottom: 24px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.detail-carousel {
  border-radius: 20px;
}

.carousel-image-wrapper {
  width: 100%;
  height: 100%;
  background: #f5f7fa;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-counter {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  backdrop-filter: blur(10px);
}

/* 信息区域 */
.info-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.title-section {
  flex: 1;
}

.house-title {
  font-size: 28px;
  font-weight: 700;
  color: #303133;
  margin-bottom: 16px;
  line-height: 1.3;
}

.house-tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.house-tags .el-tag {
  border-radius: 8px;
  font-weight: 500;
}

.price-section {
  text-align: right;
  padding-left: 40px;
}

.main-price {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-bottom: 8px;
}

.price-num {
  font-size: 42px;
  font-weight: 700;
  background: linear-gradient(135deg, #f56c6c 0%, #ff8585 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.price-unit {
  font-size: 20px;
  color: #f56c6c;
  font-weight: 600;
}

.sub-price {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
}

.unit-price {
  font-size: 15px;
  color: #909399;
}

.price-trend {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #67c23a;
  background: rgba(103, 194, 58, 0.1);
  padding: 4px 12px;
  border-radius: 20px;
}

/* 信息网格 */
.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  padding: 8px 0;
}

.info-item {
  text-align: center;
  padding: 16px;
  background: #f5f7fa;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.info-item:hover {
  background: #ecf5ff;
  transform: translateY(-2px);
}

.info-label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  color: #909399;
  margin-bottom: 10px;
}

.info-label .el-icon {
  font-size: 18px;
  color: #409EFF;
}

.info-value {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

/* 描述区域 */
.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 20px;
}

.section-title .el-icon {
  font-size: 24px;
  color: #409EFF;
}

.description-text {
  font-size: 15px;
  line-height: 2;
  color: #606266;
  text-align: justify;
}

/* 户型图 */
.floorplan-wrapper {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
}

.floorplan-wrapper:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

.floorplan-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  cursor: pointer;
}

.floorplan-label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  color: white;
  padding: 16px 12px 12px;
  font-size: 14px;
  font-weight: 500;
}

/* 顾问区域 */
.agent-section {
  margin-bottom: 0;
}

.agent-info-card {
  display: flex;
  gap: 28px;
  align-items: center;
}

.agent-profile {
  position: relative;
  flex-shrink: 0;
}

.agent-avatar {
  border: 4px solid #ecf5ff;
  box-shadow: 0 4px 16px rgba(64, 158, 255, 0.2);
}

.agent-badge {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #e6a23c 0%, #f0c78a 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: 0 2px 8px rgba(230, 162, 60, 0.3);
}

.agent-detail {
  flex: 1;
}

.agent-name {
  font-size: 22px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 12px;
}

.agent-stats {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #606266;
}

.stat-item .el-icon {
  color: #e6a23c;
}

.contact-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.contact-btn {
  border-radius: 12px;
  padding: 0 24px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.contact-btn:hover {
  transform: translateY(-2px);
}

.contact-btn.phone {
  background: linear-gradient(135deg, #409EFF 0%, #66b1ff 100%);
  border: none;
}

.contact-btn.wechat {
  background: linear-gradient(135deg, #67c23a 0%, #85ce61 100%);
  border: none;
  color: white;
}

.contact-btn.wechat:hover {
  background: linear-gradient(135deg, #85ce61 0%, #67c23a 100%);
}

.contact-btn.message {
  background: linear-gradient(135deg, #909399 0%, #a6a9ad 100%);
  border: none;
  color: white;
}

.contact-btn.message:hover {
  background: linear-gradient(135deg, #a6a9ad 0%, #909399 100%);
}

/* 侧边栏 */
.sidebar-card {
  position: sticky;
  top: 90px;
}

.sidebar-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 8px;
}

.sidebar-title .el-icon {
  font-size: 24px;
  color: #409EFF;
}

.sidebar-subtitle {
  font-size: 14px;
  color: #909399;
  margin-bottom: 24px;
}

.consult-form .el-input__wrapper {
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.submit-btn {
  width: 100%;
  background: linear-gradient(135deg, #409EFF 0%, #66b1ff 100%);
  border: none;
  border-radius: 12px;
  font-weight: 500;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(64, 158, 255, 0.4);
}

.contact-tips {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  padding: 12px;
  background: #f5f7fa;
  border-radius: 10px;
  font-size: 13px;
  color: #909399;
}

.contact-tips .el-icon {
  color: #409EFF;
  font-size: 16px;
}

/* 弹窗 */
.wechat-dialog :deep(.el-dialog__header) {
  text-align: center;
  padding-bottom: 10px;
}

.wechat-content {
  text-align: center;
  padding: 20px;
}

.wechat-qr-wrapper {
  background: #f5f7fa;
  padding: 20px;
  border-radius: 16px;
  margin-bottom: 20px;
}

.wechat-qr {
  width: 200px;
  height: 200px;
  border-radius: 12px;
}

.wechat-tip {
  font-size: 14px;
  color: #909399;
  margin-bottom: 8px;
}

.wechat-name {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.consult-dialog :deep(.el-dialog__body) {
  padding: 30px;
}

.dialog-form .el-form-item {
  margin-bottom: 20px;
}

/* 响应式 */
@media (max-width: 1200px) {
  .detail-sidebar {
    display: none;
  }
  
  .info-header {
    flex-direction: column;
    gap: 20px;
  }
  
  .price-section {
    text-align: left;
    padding-left: 0;
  }
  
  .sub-price {
    align-items: flex-start;
  }
}

@media (max-width: 768px) {
  .back-nav {
    padding: 12px 20px;
  }
  
  .detail-main {
    padding: 20px;
  }
  
  .info-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  .agent-info-card {
    flex-direction: column;
    text-align: center;
  }
  
  .contact-actions {
    justify-content: center;
  }
  
  .house-title {
    font-size: 22px;
  }
  
  .price-num {
    font-size: 32px;
  }
}
</style>
