<template>
  <div class="house-list">
    <!-- 筛选栏 -->
    <el-card class="filter-card">
      <el-form :inline="true" :model="filterForm" class="filter-form">
        <el-form-item label="区域">
          <el-select v-model="filterForm.location" placeholder="全部区域" clearable>
            <el-option label="东城区" value="dongcheng" />
            <el-option label="西城区" value="xicheng" />
            <el-option label="朝阳区" value="chaoyang" />
            <el-option label="海淀区" value="haidian" />
          </el-select>
        </el-form-item>
        <el-form-item label="价格">
          <el-select v-model="filterForm.price" placeholder="全部价格" clearable>
            <el-option label="100 万以下" value="0-100" />
            <el-option label="100-300 万" value="100-300" />
            <el-option label="300-500 万" value="300-500" />
            <el-option label="500 万以上" value="500+" />
          </el-select>
        </el-form-item>
        <el-form-item label="户型">
          <el-select v-model="filterForm.rooms" placeholder="全部户型" clearable>
            <el-option label="1 室" value="1" />
            <el-option label="2 室" value="2" />
            <el-option label="3 室" value="3" />
            <el-option label="4 室+" value="4+" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleFilter">筛选</el-button>
          <el-button @click="resetFilter">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 房源列表 -->
    <el-row :gutter="20" class="house-rows">
      <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="house in houseList" :key="house.id">
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
            <el-tag v-if="house.new" type="danger" size="small">新上</el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 分页 -->
    <el-pagination
      v-model:current-page="pagination.page"
      v-model:page-size="pagination.limit"
      :total="pagination.total"
      :page-sizes="[10, 20, 50]"
      layout="total, sizes, prev, pager, next"
      @change="handlePageChange"
      class="pagination"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { houseCovers } from '@/config/images'

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
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.filter-card {
  margin-bottom: 20px;
}

.filter-form {
  justify-content: center;
}

.house-rows {
  margin-bottom: 20px;
}

.house-card {
  margin-bottom: 20px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
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
  position: relative;
}

.house-title {
  font-size: 16px;
  margin-bottom: 10px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  margin-bottom: 10px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
