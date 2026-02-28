<template>
  <div class="home">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="nav-brand">
        <el-icon class="brand-icon"><HomeFilled /></el-icon>
        <span class="brand-text">安居找房</span>
      </div>
      <div class="nav-links">
        <router-link to="/" class="nav-link active">首页</router-link>
        <router-link to="/houses" class="nav-link">房源</router-link>
        <router-link to="/user" class="nav-link">我的</router-link>
      </div>
    </nav>

    <!-- Banner -->
    <div class="banner-section">
      <el-carousel :interval="5000" height="500px" class="hero-carousel">
        <el-carousel-item v-for="banner in banners" :key="banner.id">
          <div class="banner-wrapper">
            <img :src="banner.url" :alt="banner.title" class="banner-image" />
            <div class="banner-overlay">
              <h1 class="banner-title">{{ banner.title }}</h1>
              <p class="banner-subtitle">找到您理想的家</p>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 搜索筛选 -->
    <div class="search-section">
      <div class="search-card glass">
        <h3 class="search-title">
          <el-icon><Search /></el-icon>
          智能找房
        </h3>
        <el-form :inline="true" :model="searchForm" class="search-form">
          <el-form-item>
            <el-select v-model="searchForm.location" placeholder="选择区域" size="large" class="search-select">
              <el-option label="全部区域" value="" />
              <el-option label="东城区" value="dongcheng" />
              <el-option label="西城区" value="xicheng" />
              <el-option label="朝阳区" value="chaoyang" />
              <el-option label="海淀区" value="haidian" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchForm.price" placeholder="价格范围" size="large" class="search-select">
              <el-option label="不限价格" value="" />
              <el-option label="100 万以下" value="0-100" />
              <el-option label="100-300 万" value="100-300" />
              <el-option label="300-500 万" value="300-500" />
              <el-option label="500 万以上" value="500+" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchForm.rooms" placeholder="户型" size="large" class="search-select">
              <el-option label="不限户型" value="" />
              <el-option label="1 室" value="1" />
              <el-option label="2 室" value="2" />
              <el-option label="3 室" value="3" />
              <el-option label="4 室+" value="4+" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="large" class="search-btn" @click="handleSearch">
              <el-icon><Search /></el-icon>
              搜索房源
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- 推荐房源 -->
    <div class="houses-section">
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-icon">🏠</span>
          精选好房
        </h2>
        <p class="section-subtitle">为您精心挑选的优质房源</p>
      </div>
      <el-row :gutter="24">
        <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="(house, index) in houses" :key="house.id">
          <div class="house-card-wrapper" :style="{ animationDelay: `${index * 0.1}s` }">
            <el-card class="house-card" :body-style="{ padding: 0 }" @click="goToDetail(house.id)">
              <div class="house-image-wrapper">
                <img :src="house.cover" class="house-cover" />
                <div class="house-badge" v-if="house.price > 500">豪宅</div>
                <div class="house-badge new" v-else-if="index < 3">新上</div>
                <div class="house-actions">
                  <el-button circle class="action-btn" @click.stop>
                    <el-icon><Star /></el-icon>
                  </el-button>
                </div>
              </div>
              <div class="house-info">
                <h3 class="house-title">{{ house.title }}</h3>
                <div class="house-location">
                  <el-icon><Location /></el-icon>
                  <span>{{ house.location }}</span>
                </div>
                <div class="house-tags">
                  <el-tag size="small" effect="plain">{{ house.rooms }}室{{ house.halls }}厅</el-tag>
                  <el-tag size="small" effect="plain" type="info">{{ house.area }}㎡</el-tag>
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
      <div class="view-more">
        <el-button type="primary" plain size="large" round @click="$router.push('/houses')">
          查看更多房源
          <el-icon class="el-icon--right"><ArrowRight /></el-icon>
        </el-button>
      </div>
    </div>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-brand">
          <el-icon class="footer-icon"><HomeFilled /></el-icon>
          <span>安居找房</span>
        </div>
        <p class="footer-text">找到您理想的家，开启美好生活</p>
        <p class="footer-copyright">© 2026 安居找房 All Rights Reserved</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { banners, houseCovers, agents } from '@/config/images'
import { HomeFilled, Search, Star, Location, ArrowRight } from '@element-plus/icons-vue'

const router = useRouter()

// 搜索表单
const searchForm = ref({
  location: '',
  price: '',
  rooms: ''
})

// 房源数据 (临时模拟数据)
const houses = ref([
  { id: 1, title: '阳光花园三期', price: 280, rooms: 3, halls: 2, area: 120, location: '朝阳区', cover: houseCovers[0].url },
  { id: 2, title: '翡翠华府', price: 450, rooms: 4, halls: 2, area: 150, location: '海淀区', cover: houseCovers[1].url },
  { id: 3, title: '金色家园', price: 320, rooms: 3, halls: 2, area: 135, location: '东城区', cover: houseCovers[2].url },
  { id: 4, title: '碧水云天', price: 380, rooms: 3, halls: 2, area: 140, location: '西城区', cover: houseCovers[3].url },
  { id: 5, title: '香山别墅', price: 1200, rooms: 5, halls: 3, area: 300, location: '海淀区', cover: houseCovers[4].url },
  { id: 6, title: '城市之光', price: 260, rooms: 2, halls: 2, area: 95, location: '朝阳区', cover: houseCovers[5].url },
  { id: 7, title: '湖畔嘉园', price: 350, rooms: 3, halls: 2, area: 128, location: '朝阳区', cover: houseCovers[6].url },
  { id: 8, title: '中央公园', price: 520, rooms: 4, halls: 2, area: 165, location: '东城区', cover: houseCovers[7].url }
])

// 搜索处理
const handleSearch = () => {
  console.log('搜索条件:', searchForm.value)
  // TODO: 调用后端 API 搜索
}

// 跳转详情
const goToDetail = (id) => {
  router.push(`/houses/${id}`)
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7ed 100%);
}

/* 导航栏 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 60px;
  z-index: 1000;
  transition: all 0.3s ease;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-icon {
  font-size: 32px;
  color: #409EFF;
}

.brand-text {
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(135deg, #409EFF 0%, #667eea 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-links {
  display: flex;
  gap: 40px;
}

.nav-link {
  text-decoration: none;
  color: #606266;
  font-size: 16px;
  font-weight: 500;
  position: relative;
  transition: color 0.3s ease;
  padding: 8px 0;
}

.nav-link:hover,
.nav-link.active {
  color: #409EFF;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, #409EFF, #66b1ff);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}

/* Banner */
.banner-section {
  margin-top: 70px;
}

.hero-carousel {
  border-radius: 0;
}

.banner-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 60px;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%);
  color: white;
}

.banner-title {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 12px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.banner-subtitle {
  font-size: 20px;
  opacity: 0.9;
}

/* 搜索区域 */
.search-section {
  padding: 0 40px;
  margin-top: -80px;
  position: relative;
  z-index: 10;
}

.search-card {
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 40px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.search-title {
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.search-title .el-icon {
  font-size: 28px;
  color: #409EFF;
}

.search-form {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.search-select {
  width: 180px;
}

.search-select :deep(.el-input__wrapper) {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.search-btn {
  background: linear-gradient(135deg, #409EFF 0%, #66b1ff 100%);
  border: none;
  border-radius: 12px;
  padding: 0 32px;
  height: 44px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.search-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(64, 158, 255, 0.4);
}

/* 房源区域 */
.houses-section {
  max-width: 1300px;
  margin: 0 auto;
  padding: 80px 40px;
}

.section-header {
  text-align: center;
  margin-bottom: 48px;
}

.section-title {
  font-size: 36px;
  font-weight: 700;
  color: #303133;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.title-icon {
  font-size: 40px;
}

.section-subtitle {
  font-size: 16px;
  color: #909399;
}

/* 房源卡片 */
.house-card-wrapper {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

.house-card {
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
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

.house-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: linear-gradient(135deg, #f56c6c 0%, #ff8585 100%);
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(245, 108, 108, 0.3);
}

.house-badge.new {
  background: linear-gradient(135deg, #67c23a 0%, #85ce61 100%);
  box-shadow: 0 2px 8px rgba(103, 194, 58, 0.3);
}

.house-actions {
  position: absolute;
  top: 12px;
  right: 12px;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s ease;
}

.house-card:hover .house-actions {
  opacity: 1;
  transform: translateY(0);
}

.action-btn {
  background: rgba(255, 255, 255, 0.95);
  border: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.action-btn:hover {
  background: #fff;
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

.house-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 14px;
}

.house-tags .el-tag {
  border-radius: 6px;
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

/* 查看更多 */
.view-more {
  text-align: center;
  margin-top: 48px;
}

.view-more .el-button {
  padding: 12px 40px;
  font-size: 16px;
}

/* 页脚 */
.footer {
  background: linear-gradient(135deg, #303133 0%, #1a1a1a 100%);
  padding: 60px 40px 40px;
  margin-top: 40px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.footer-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 16px;
}

.footer-icon {
  font-size: 36px;
  color: #409EFF;
}

.footer-brand span {
  font-size: 28px;
  font-weight: 700;
  color: white;
}

.footer-text {
  color: #909399;
  font-size: 16px;
  margin-bottom: 24px;
}

.footer-copyright {
  color: #606266;
  font-size: 14px;
}

/* 响应式 */
@media (max-width: 768px) {
  .navbar {
    padding: 0 20px;
  }
  
  .nav-links {
    gap: 20px;
  }
  
  .banner-title {
    font-size: 28px;
  }
  
  .search-card {
    padding: 24px;
  }
  
  .search-form {
    flex-direction: column;
  }
  
  .search-select {
    width: 100%;
  }
  
  .section-title {
    font-size: 28px;
  }
}
</style>
