<template>
  <div class="home">
    <!-- Banner -->
    <el-carousel :interval="5000" height="400px">
      <el-carousel-item v-for="banner in banners" :key="banner.id">
        <img :src="banner.url" :alt="banner.title" class="banner-image" />
      </el-carousel-item>
    </el-carousel>

    <!-- 搜索筛选 -->
    <div class="search-section">
      <el-card class="search-card">
        <el-form :inline="true" :model="searchForm" class="search-form">
          <el-form-item label="区域">
            <el-select v-model="searchForm.location" placeholder="选择区域">
              <el-option label="东城区" value="dongcheng" />
              <el-option label="西城区" value="xicheng" />
              <el-option label="朝阳区" value="chaoyang" />
              <el-option label="海淀区" value="haidian" />
            </el-select>
          </el-form-item>
          <el-form-item label="价格">
            <el-select v-model="searchForm.price" placeholder="价格范围">
              <el-option label="100 万以下" value="0-100" />
              <el-option label="100-300 万" value="100-300" />
              <el-option label="300-500 万" value="300-500" />
              <el-option label="500 万以上" value="500+" />
            </el-select>
          </el-form-item>
          <el-form-item label="户型">
            <el-select v-model="searchForm.rooms" placeholder="户型">
              <el-option label="1 室" value="1" />
              <el-option label="2 室" value="2" />
              <el-option label="3 室" value="3" />
              <el-option label="4 室+" value="4+" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <!-- 推荐房源 -->
    <div class="houses-section">
      <h2 class="section-title">推荐房源</h2>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="house in houses" :key="house.id">
          <el-card class="house-card" :body-style="{ padding: 0 }" @click="goToDetail(house.id)">
            <img :src="house.cover" class="house-cover" />
            <div class="house-info">
              <h3 class="house-title">{{ house.title }}</h3>
              <p class="house-price">¥{{ house.price }}万</p>
              <div class="house-meta">
                <span>{{ house.rooms }}室{{ house.halls }}厅</span>
                <span>{{ house.area }}㎡</span>
                <span>{{ house.location }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { banners, houseCovers, agents } from '@/config/images'

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
  background: #f5f7fa;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.search-section {
  padding: 20px;
  margin-top: -60px;
  position: relative;
  z-index: 10;
}

.search-card {
  max-width: 1200px;
  margin: 0 auto;
}

.search-form {
  justify-content: center;
}

.houses-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.section-title {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.house-card {
  margin-bottom: 20px;
  cursor: pointer;
  transition: transform 0.3s;
}

.house-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.house-cover {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.house-info {
  padding: 15px;
}

.house-title {
  font-size: 16px;
  margin-bottom: 10px;
  color: #333;
}

.house-price {
  font-size: 20px;
  color: #f56c6c;
  font-weight: bold;
  margin-bottom: 10px;
}

.house-meta {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #999;
}
</style>
