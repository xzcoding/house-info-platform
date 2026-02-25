<template>
  <div class="house-detail">
    <el-container>
      <el-main>
        <!-- 图片轮播 -->
        <el-card class="gallery-card">
          <el-carousel :interval="5000" arrow="always">
            <el-carousel-item v-for="img in images" :key="img.id">
              <img :src="img.url" class="carousel-image" />
            </el-carousel-item>
          </el-carousel>
        </el-card>

        <!-- 基本信息 -->
        <el-card class="info-card">
          <h1 class="house-title">{{ house.title }}</h1>
          <div class="price-section">
            <span class="price">¥{{ house.price }}万</span>
            <span class="unit">{{ (house.price * 10000 / house.area).toFixed(0) }}元/㎡</span>
          </div>
          
          <el-descriptions :column="3" border>
            <el-descriptions-item label="户型">{{ house.rooms }}室{{ house.halls }}厅{{ house.bathrooms }}卫</el-descriptions-item>
            <el-descriptions-item label="面积">{{ house.area }}㎡</el-descriptions-item>
            <el-descriptions-item label="朝向">{{ house.direction }}</el-descriptions-item>
            <el-descriptions-item label="楼层">{{ house.floor }}</el-descriptions-item>
            <el-descriptions-item label="区域">{{ house.location }}</el-descriptions-item>
            <el-descriptions-item label="年代">{{ house.year }}</el-descriptions-item>
          </el-descriptions>

          <div class="description">
            <h3>房源描述</h3>
            <p>{{ house.description }}</p>
          </div>
        </el-card>

        <!-- 户型图 -->
        <el-card class="floorplan-card">
          <h3>户型图</h3>
          <el-row :gutter="20">
            <el-col :span="8" v-for="plan in floorPlans" :key="plan.id">
              <el-image :src="plan.url" fit="cover" class="floorplan-image" />
            </el-col>
          </el-row>
        </el-card>

        <!-- 联系销售 -->
        <el-card class="agent-card">
          <h3>联系销售顾问</h3>
          <div class="agent-info">
            <el-avatar :src="agent.avatar" :size="80" />
            <div class="agent-detail">
              <h4>{{ agent.name }}</h4>
              <p>金牌顾问 | 从业 5 年</p>
              <div class="contact-actions">
                <el-button type="primary" @click="handleCall">
                  <el-icon><Phone /></el-icon> 拨打电话
                </el-button>
                <el-button @click="showWechat = true">
                  <el-icon><ChatDotRound /></el-icon> 微信咨询
                </el-button>
                <el-button type="success" @click="dialogVisible = true">
                  <el-icon><Message /></el-icon> 在线咨询
                </el-button>
              </div>
            </div>
          </div>
        </el-card>
      </el-main>

      <!-- 右侧固定栏 -->
      <el-aside width="300px">
        <el-card class="sidebar-card">
          <h3>快速咨询</h3>
          <el-form :model="consultForm" label-width="80px">
            <el-form-item label="姓名">
              <el-input v-model="consultForm.name" />
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="consultForm.phone" />
            </el-form-item>
            <el-form-item label="留言">
              <el-input v-model="consultForm.message" type="textarea" :rows="4" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSubmit" style="width: 100%">提交咨询</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-aside>
    </el-container>

    <!-- 微信二维码弹窗 -->
    <el-dialog v-model="showWechat" title="微信咨询" width="300px">
      <div style="text-align: center">
        <img :src="agent.wechatQr || 'https://via.placeholder.com/200x200?text=WeChat+QR'" style="width: 100%" />
        <p>扫描二维码添加微信</p>
      </div>
    </el-dialog>

    <!-- 在线咨询弹窗 -->
    <el-dialog v-model="dialogVisible" title="在线咨询" width="500px">
      <el-form :model="consultForm" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="consultForm.name" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="consultForm.phone" />
        </el-form-item>
        <el-form-item label="留言">
          <el-input v-model="consultForm.message" type="textarea" :rows="6" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Phone, ChatDotRound, Message } from '@element-plus/icons-vue'
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
  background: #f5f7fa;
}

.el-container {
  max-width: 1400px;
  margin: 0 auto;
}

.el-main {
  padding: 20px;
}

.el-aside {
  padding: 20px;
}

.gallery-card,
.info-card,
.floorplan-card,
.agent-card,
.sidebar-card {
  margin-bottom: 20px;
}

.carousel-image {
  width: 100%;
  height: 500px;
  object-fit: cover;
}

.house-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.price-section {
  margin-bottom: 20px;
}

.price {
  font-size: 32px;
  color: #f56c6c;
  font-weight: bold;
  margin-right: 10px;
}

.unit {
  font-size: 16px;
  color: #999;
}

.description {
  margin-top: 20px;
}

.description h3 {
  margin-bottom: 10px;
  color: #333;
}

.description p {
  line-height: 1.8;
  color: #666;
}

.floorplan-image {
  width: 100%;
  height: 200px;
  margin-bottom: 10px;
}

.agent-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.agent-detail h4 {
  margin-bottom: 5px;
  color: #333;
}

.agent-detail p {
  color: #999;
  margin-bottom: 15px;
}

.contact-actions {
  display: flex;
  gap: 10px;
}
</style>
