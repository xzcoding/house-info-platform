<template>
  <div class="house-list">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">
          <el-icon><OfficeBuilding /></el-icon>
          房源列表
        </h1>
        <p class="page-subtitle">共找到 {{ pagination.total }} 套优质房源</p>
      </div>
    </div>

    <!-- 筛选栏 -->
    <div class="filter-section">
      <div class="filter-card glass">
        <div class="filter-header">
          <el-icon><Filter /></el-icon>
          <span>筛选条件</span>
        </div>
        <el-form :inline="true" :model="filterForm" class="filter-form">
          <el-form-item>
            <el-select v-model="filterForm.location" placeholder="全部区域" clearable size="large" class="filter-select">
              <el-option label="全部区域" value="" />
              <el-option label="东城区" value="dongcheng" />
              <el-option label="西城区" value="xicheng" />
              <el-option label="朝阳区" value="chaoyang" />
              <el-option label="海淀区" value="haidian" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="filterForm.price" placeholder="全部价格" clearable size="large" class="filter-select">
              <el-option label="不限价格" value="" />
              <el-option label="100 万以下" value="0-100" />
              <el-option label="100-300 万" value="100-300" />
              <el-option label="300-500 万" value="300-500" />
              <el-option label="500 万以上" value="500+" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="filterForm.rooms" placeholder="全部户型" clearable size="large" class="filter-select">
              <el-option label="不限户型" value="" />
              <el-option label="1 室" value="1" />
              <el-option label="2 室" value="2" />
              <el-option label="3 室" value="3" />
              <el-option label="4 室+" value="4+" />
            </el-select>
          </el-form-item>
          <el-form-item class="filter-actions">
            <el-button type="primary" size="large" class="filter-btn" @click="handleFilter">
              <el-icon><Search /></el-icon>
              筛选
            </el-button>
            <el-button size="large" class="reset-btn" @click="resetFilter">
              <el-icon><RefreshRight /></el-icon>
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- 房源列表 -->
    <div class="list-section">
      <el-row :gutter="24" class="house-rows">
        <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="(house, index) in houseList" :key="house.id">
          <div class="house-card-wrapper" :style="{ animationDelay: `${index * 0.05}s` }">
            <el-card class="house-card" :body-style="{ padding: 0 }" @click="goToDetail(house.id)">
              <div class="house-image-wrapper">
                <img :src="house.cover" class="house-cover" />
                <div class="house-overlay">
                  <div class="house-tags-float">
                    <el-tag v-if="house.new" type="danger" effect="dark" size="small" class="float-tag">新上</el-tag>
                    <el-tag v-if="house.price > 500" type="warning" effect="dark" size="small" class="float-tag">豪宅</el-tag>
                  </div>
                  <div class="house-quick-actions">
                    <el-button circle size="small" class="quick-btn" @click.stop>
                      <el-icon><Star /></el-icon>
                    </el-button>
                    <el-button circle size="small" class="quick-btn" @click.stop>
                      <el-icon><Share /></el-icon>
                    </el-button>
                  </div>
                </div>
              </div>
              <div class="house-info">
                <h3 class="house-title">{{ house.title }}</h3>
                <div class="house-location">
                  <el-icon><Location /></el-icon>
                  <span>{{ house.location }}</span>
                </div>
                <div class="house-features">
                  <span class="feature-item">{{ house.rooms }}室{{ house.halls }}厅</span>
                  <span class="feature-divider">|</span>
                  <span class="feature-item">{{ house.area }}㎡</span>
                  <span class="feature-divider">|</span>
                  <span class="feature-item">中层</span>
                </div>
                <div class="house-price-row">
                  <span class="house-price">
                    <span class="price-num">{{ house.price }}</span>
                    <span class="price-unit">万</span>
                  </span>
                  <span class="price-per">{{ (house.price * 10000 / house.area).toFixed(0) }}元/㎡</span>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>

      <!-- 空状态 -->
      <el-empty v-if="houseList.length === 0" description="暂无符合条件的房源" class="empty-state">
        <el-button type="primary" @click="resetFilter">清除筛选</el-button>
      </el-empty>
    </div>

    <!-- 分页 -->
    <div class="pagination-section" v-if="houseList.length > 0">
      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.limit"
        :total="pagination.total"
        :page-sizes="[8, 16, 32]"
        layout="total, sizes, prev, pager, next, jumper"
        @change="handlePageChange"
        class="pagination"
        background
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { houseCovers } from '@/config/images'
import { OfficeBuilding, Filter, Search, RefreshRight, Star, Share, Location } from '@element-plus/icons-vue'

const router = useRouter()

// 筛选表单
const filterForm = reactive({
  location: '',
  price: '',
  rooms: ''
})

// 房源列表
const houseList = ref([])

// 分页
const pagination = reactive({
  page: 1,
  limit: 8,
  total: 0
})

// 加载房源
const loadHouses = async () => {
  // TODO: 调用后端 API
  // 临时使用模拟数据
  houseList.value = Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    title: `房源${i + 1}`,
    price: Math.floor(Math.random() * 500) + 100,
    rooms: Math.floor(Math.random() * 4) + 1,
    halls: 2,
    area: Math.floor(Math.random() * 100) + 80,
    location: ['东城区', '西城区', '朝阳区', '海淀区'][i % 4],
    cover: houseCovers[i % houseCovers.length].url,
    new: i < 3
  }))
  pagination.total = houseList.value.length
}

// 筛选处理
const handleFilter = () => {
  console.log('筛选条件:', filterForm)
  loadHouses()
}

// 重置筛选
const resetFilter = () => {
  filterForm.location = ''
  filterForm.price = ''
  filterForm.rooms = ''
  loadHouses()
}

// 分页变化
const handlePageChange = (page) => {
  pagination.page = page
  loadHouses()
}

// 跳转详情
const goToDetail = (id) => {
  router.push(`/houses/${id}`)
}

onMounted(() => {
  loadHouses()
})
</script>

<style scoped>
.house-list {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7ed 100%);
  padding-bottom: 60px;
}

/* 页面头部 */
.page-header {
  background: linear-gradient(135deg, #409EFF 0%, #66b1ff 100%);
  padding: 100px 40px 80px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.page-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></svg>');
  background-size: 60px 60px;
  opacity: 0.5;
}

.header-content {
  position: relative;
  z-index: 1;
}

.page-title {
  font-size: 42px;
  font-weight: 700;
  color: white;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.page-title .el-icon {
  font-size: 48px;
}

.page-subtitle {
  font-size: 18px;
  color: rgba(255,255,255,0.9);
}

/* 筛选区域 */
.filter-section {
  padding: 0 40px;
  margin-top: -40px;
  position: relative;
  z-index: 10;
}

.filter-card {
  max-width: 1200px;
  margin: 0 auto;
  padding: 28px 36px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.filter-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 20px;
}

.filter-header .el-icon {
  font-size: 22px;
  color: #409EFF;
}

.filter-form {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.filter-select {
  width: 170px;
}

.filter-select :deep(.el-input__wrapper) {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.filter-actions {
  display: flex;
  gap: 12px;
}

.filter-btn {
  background: linear-gradient(135deg, #409EFF 0%, #66b1ff 100%);
  border: none;
  border-radius: 12px;
  padding: 0 24px;
  font-weight: 500;
}

.filter-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(64, 158, 255, 0.4);
}

.reset-btn {
  border-radius: 12px;
  padding: 0 24px;
}

/* 列表区域 */
.list-section {
  max-width: 1300px;
  margin: 0 auto;
  padding: 50px 40px 30px;
}

.house-rows {
  margin: 0 !important;
}

/* 房源卡片 */
.house-card-wrapper {
  animation: fadeInUp 0.5s ease-out forwards;
  opacity: 0;
}

.house-card {
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  margin-bottom: 24px;
}

.house-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 40px rgba(0,0,0,0.12);
}

.house-image-wrapper {
  position: relative;
  overflow: hidden;
}

.house-cover {
  width: 100%;
  height: 220px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.house-card:hover .house-cover {
  transform: scale(1.05);
}

.house-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.3) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
}

.house-card:hover .house-overlay {
  opacity: 1;
}

.house-tags-float {
  display: flex;
  gap: 8px;
}

.float-tag {
  border-radius: 6px;
  font-weight: 500;
}

.house-quick-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.quick-btn {
  background: rgba(255, 255, 255, 0.95);
  border: none;
  transition: all 0.3s ease;
}

.quick-btn:hover {
  background: white;
  transform: scale(1.1);
}

.house-info {
  padding: 20px;
}

.house-title {
  font-size: 17px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.house-location {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #909399;
  font-size: 13px;
  margin-bottom: 12px;
}

.house-location .el-icon {
  font-size: 14px;
}

.house-features {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
  font-size: 13px;
  color: #606266;
}

.feature-divider {
  color: #dcdfe6;
}

.house-price-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.house-price {
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.price-num {
  font-size: 26px;
  font-weight: 700;
  background: linear-gradient(135deg, #f56c6c 0%, #ff8585 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.price-unit {
  font-size: 14px;
  color: #f56c6c;
  font-weight: 500;
}

.price-per {
  font-size: 13px;
  color: #909399;
}

/* 空状态 */
.empty-state {
  padding: 80px 0;
}

/* 分页 */
.pagination-section {
  display: flex;
  justify-content: center;
  padding: 20px 40px;
}

.pagination {
  padding: 12px 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}

/* 响应式 */
@media (max-width: 768px) {
  .page-header {
    padding: 60px 20px 50px;
  }
  
  .page-title {
    font-size: 28px;
  }
  
  .filter-section {
    padding: 0 20px;
  }
  
  .filter-card {
    padding: 20px;
  }
  
  .filter-form {
    flex-direction: column;
  }
  
  .filter-select {
    width: 100%;
  }
  
  .list-section {
    padding: 30px 20px;
  }
}
</style>
