<template>
  <div class="user-center">
    <el-row :gutter="20">
      <!-- 左侧菜单 -->
      <el-col :span="6">
        <el-card class="menu-card">
          <div class="user-info">
            <el-avatar :size="80" :src="user.avatar">{{ user.name[0] }}</el-avatar>
            <h3>{{ user.name }}</h3>
            <p>{{ user.phone }}</p>
          </div>
          <el-menu :default-active="activeMenu" class="user-menu">
            <el-menu-item index="profile" @click="activeMenu = 'profile'">
              <el-icon><User /></el-icon> 个人信息
            </el-menu-item>
            <el-menu-item index="consultations" @click="activeMenu = 'consultations'">
              <el-icon><Document /></el-icon> 咨询记录
            </el-menu-item>
            <el-menu-item index="favorites" @click="activeMenu = 'favorites'">
              <el-icon><Star /></el-icon> 我的收藏
            </el-menu-item>
            <el-menu-item index="settings" @click="activeMenu = 'settings'">
              <el-icon><Setting /></el-icon> 账号设置
            </el-menu-item>
          </el-menu>
          <el-button @click="handleLogout" class="logout-btn" type="danger">退出登录</el-button>
        </el-card>
      </el-col>

      <!-- 右侧内容 -->
      <el-col :span="18">
        <!-- 个人信息 -->
        <el-card v-show="activeMenu === 'profile'" class="content-card">
          <template #header>
            <h3>个人信息</h3>
          </template>
          <el-form :model="profileForm" label-width="100px">
            <el-form-item label="昵称">
              <el-input v-model="profileForm.name" />
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="profileForm.phone" disabled />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="profileForm.email" placeholder="请输入邮箱" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSaveProfile">保存</el-button>
            </el-form-item>
          </el-form>
        </el-card>

        <!-- 咨询记录 -->
        <el-card v-show="activeMenu === 'consultations'" class="content-card">
          <template #header>
            <h3>咨询记录</h3>
          </template>
          <el-table :data="consultations" style="width: 100%">
            <el-table-column prop="houseTitle" label="房源" />
            <el-table-column prop="agentName" label="销售顾问" />
            <el-table-column prop="message" label="咨询内容" show-overflow-tooltip />
            <el-table-column prop="status" label="状态">
              <template #default="{ row }">
                <el-tag :type="getStatusType(row.status)">{{ row.status }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="createdAt" label="时间" />
          </el-table>
        </el-card>

        <!-- 我的收藏 -->
        <el-card v-show="activeMenu === 'favorites'" class="content-card">
          <template #header>
            <h3>我的收藏</h3>
          </template>
          <el-empty v-if="favorites.length === 0" description="暂无收藏" />
          <el-row v-else :gutter="20">
            <el-col :span="8" v-for="house in favorites" :key="house.id">
              <el-card class="favorite-card">
                <img :src="house.cover" class="house-cover" />
                <div class="house-info">
                  <h4>{{ house.title }}</h4>
                  <p class="price">¥{{ house.price }}万</p>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>

        <!-- 账号设置 -->
        <el-card v-show="activeMenu === 'settings'" class="content-card">
          <template #header>
            <h3>账号设置</h3>
          </template>
          <el-form :model="settingsForm" label-width="120px">
            <el-form-item label="当前密码">
              <el-input v-model="settingsForm.oldPassword" type="password" />
            </el-form-item>
            <el-form-item label="新密码">
              <el-input v-model="settingsForm.newPassword" type="password" />
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input v-model="settingsForm.confirmPassword" type="password" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleChangePassword">修改密码</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { User, Document, Star, Setting } from '@element-plus/icons-vue'

const router = useRouter()
const activeMenu = ref('profile')

// 用户信息
const user = reactive({
  name: '测试用户',
  phone: '138****0000',
  avatar: ''
})

// 个人信息表单
const profileForm = reactive({
  name: '测试用户',
  phone: '138****0000',
  email: ''
})

// 咨询记录
const consultations = ref([
  { id: 1, houseTitle: '阳光花园三期', agentName: '张顾问', message: '想了解详细情况', status: 'new', createdAt: '2026-02-25' },
  { id: 2, houseTitle: '翡翠华府', agentName: '李顾问', message: '什么时候可以看房', status: 'contacted', createdAt: '2026-02-24' }
])

// 收藏列表
const favorites = ref([])

// 账号设置表单
const settingsForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 获取状态类型
const getStatusType = (status) => {
  const map = { new: '', contacted: 'warning', completed: 'success', cancelled: 'danger' }
  return map[status] || ''
}

// 保存个人信息
const handleSaveProfile = () => {
  console.log('保存个人信息:', profileForm)
  alert('保存成功')
}

// 修改密码
const handleChangePassword = () => {
  if (settingsForm.newPassword !== settingsForm.confirmPassword) {
    alert('两次密码输入不一致')
    return
  }
  console.log('修改密码:', settingsForm)
  alert('密码修改成功')
}

// 退出登录
const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/')
}
</script>

<style scoped>
.user-center {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.menu-card {
  text-align: center;
}

.user-info {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}

.user-info h3 {
  margin: 10px 0 5px;
  color: #333;
}

.user-info p {
  color: #999;
  font-size: 14px;
}

.user-menu {
  border-right: none;
}

.logout-btn {
  width: 100%;
  margin-top: 20px;
}

.content-card {
  min-height: 500px;
}

.house-cover {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.house-info {
  padding: 10px;
}

.house-info h4 {
  margin: 0 0 10px;
  font-size: 14px;
  color: #333;
}

.house-info .price {
  color: #f56c6c;
  font-weight: bold;
  margin: 0;
}
</style>
