<template>
  <div class="user-center">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-bg"></div>
      <div class="header-content">
        <div class="user-profile">
          <div class="avatar-wrapper">
            <el-avatar :size="100" :src="user.avatar" class="user-avatar">{{ user.name[0] }}</el-avatar>
            <div class="avatar-badge">
              <el-icon><Edit /></el-icon>
            </div>
          </div>
          <div class="user-meta">
            <h1 class="user-name">{{ user.name }}</h1>
            <p class="user-phone">
              <el-icon><Iphone /></el-icon>
              {{ user.phone }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="center-container">
      <el-row :gutter="24">
        <!-- 左侧菜单 -->
        <el-col :xs="24" :sm="8" :md="6" :lg="5">
          <div class="sidebar-wrapper">
            <el-card class="menu-card" :body-style="{ padding: 0 }">
              <div class="menu-header">
                <span>个人中心</span>
              </div>
              <el-menu :default-active="activeMenu" class="user-menu">
                <el-menu-item index="profile" @click="activeMenu = 'profile'">
                  <el-icon><User /></el-icon>
                  <span>个人信息</span>
                </el-menu-item>
                <el-menu-item index="consultations" @click="activeMenu = 'consultations'">
                  <el-icon><Document /></el-icon>
                  <span>咨询记录</span>
                  <el-tag v-if="consultations.length > 0" type="danger" size="small" class="menu-badge">
                    {{ consultations.length }}
                  </el-tag>
                </el-menu-item>
                <el-menu-item index="favorites" @click="activeMenu = 'favorites'">
                  <el-icon><Star /></el-icon>
                  <span>我的收藏</span>
                </el-menu-item>
                <el-menu-item index="settings" @click="activeMenu = 'settings'">
                  <el-icon><Setting /></el-icon>
                  <span>账号设置</span>
                </el-menu-item>
              </el-menu>
              <div class="menu-footer">
                <el-button @click="handleLogout" class="logout-btn" type="danger" plain>
                  <el-icon><SwitchButton /></el-icon>
                  退出登录
                </el-button>
              </div>
            </el-card>

            <!-- 快捷统计 -->
            <el-card class="stats-card">
              <div class="stats-grid">
                <div class="stat-item">
                  <div class="stat-value">{{ consultations.length }}</div>
                  <div class="stat-label">咨询</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">{{ favorites.length }}</div>
                  <div class="stat-label">收藏</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">0</div>
                  <div class="stat-label">看房</div>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>

        <!-- 右侧内容 -->
        <el-col :xs="24" :sm="16" :md="18" :lg="19">
          <transition name="fade-slide" mode="out-in">
            <!-- 个人信息 -->
            <div v-show="activeMenu === 'profile'" class="content-panel" key="profile">
              <el-card class="content-card">
                <template #header>
                  <div class="card-header">
                    <span class="header-title">
                      <el-icon><UserFilled /></el-icon>
                      个人信息
                    </span>
                  </div>
                </template>
                <el-form :model="profileForm" label-position="top" class="profile-form">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="昵称">
                        <el-input v-model="profileForm.name" size="large" :prefix-icon="User" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="手机号">
                        <el-input v-model="profileForm.phone" size="large" :prefix-icon="Iphone" disabled />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item label="邮箱">
                    <el-input v-model="profileForm.email" size="large" :prefix-icon="Message" placeholder="请输入邮箱" />
                  </el-form-item>
                  <el-form-item label="个人简介">
                    <el-input 
                      v-model="profileForm.bio" 
                      type="textarea" 
                      :rows="4" 
                      placeholder="介绍一下自己..."
                    />
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" size="large" class="save-btn" @click="handleSaveProfile">
                      <el-icon><Check /></el-icon>
                      保存修改
                    </el-button>
                  </el-form-item>
                </el-form>
              </el-card>
            </div>

            <!-- 咨询记录 -->
            <div v-show="activeMenu === 'consultations'" class="content-panel" key="consultations">
              <el-card class="content-card">
                <template #header>
                  <div class="card-header">
                    <span class="header-title">
                      <el-icon><DocumentChecked /></el-icon>
                      咨询记录
                    </span>
                  </div>
                </template>
                <div v-if="consultations.length === 0" class="empty-state">
                  <el-empty description="暂无咨询记录">
                    <el-button type="primary" @click="$router.push('/houses')">去浏览房源</el-button>
                  </el-empty>
                </div>
                <div v-else class="consult-list">
                  <div v-for="item in consultations" :key="item.id" class="consult-item">
                    <div class="consult-header">
                      <div class="consult-house">
                        <el-icon><HomeFilled /></el-icon>
                        <span>{{ item.houseTitle }}</span>
                      </div>
                      <el-tag :type="getStatusType(item.status)" effect="light" size="small">
                        {{ getStatusText(item.status) }}
                      </el-tag>
                    </div>
                    <div class="consult-body">
                      <p class="consult-message">{{ item.message }}</p>
                      <div class="consult-meta">
                        <span class="consult-agent">
                          <el-icon><User /></el-icon>
                          {{ item.agentName }}
                        </span>
                        <span class="consult-time">
                          <el-icon><Clock /></el-icon>
                          {{ item.createdAt }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </el-card>
            </div>

            <!-- 我的收藏 -->
            <div v-show="activeMenu === 'favorites'" class="content-panel" key="favorites">
              <el-card class="content-card">
                <template #header>
                  <div class="card-header">
                    <span class="header-title">
                      <el-icon><StarFilled /></el-icon>
                      我的收藏
                    </span>
                  </div>
                </template>
                <div v-if="favorites.length === 0" class="empty-state">
                  <el-empty description="暂无收藏房源">
                    <el-button type="primary" @click="$router.push('/houses')">去发现好房</el-button>
                  </el-empty>
                </div>
                <el-row v-else :gutter="20" class="favorites-grid">
                  <el-col :xs="24" :sm="12" :md="8" v-for="house in favorites" :key="house.id">
                    <el-card class="favorite-card" :body-style="{ padding: 0 }">
                      <div class="favorite-image">
                        <img :src="house.cover" />
                        <div class="favorite-overlay">
                          <el-button circle type="danger" size="small" @click.stop>
                            <el-icon><Delete /></el-icon>
                          </el-button>
                        </div>
                      </div>
                      <div class="favorite-info">
                        <h4>{{ house.title }}</h4>
                        <div class="favorite-meta">
                          <span>{{ house.location }}</span>
                          <span>{{ house.area }}㎡</span>
                        </div>
                        <p class="favorite-price">
                          <span class="price-num">{{ house.price }}</span>
                          <span class="price-unit">万</span>
                        </p>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
              </el-card>
            </div>

            <!-- 账号设置 -->
            <div v-show="activeMenu === 'settings'" class="content-panel" key="settings">
              <el-card class="content-card">
                <template #header>
                  <div class="card-header">
                    <span class="header-title">
                      <el-icon><Lock /></el-icon>
                      修改密码
                    </span>
                  </div>
                </template>
                <el-form :model="settingsForm" label-position="top" class="settings-form">
                  <el-form-item label="当前密码">
                    <el-input 
                      v-model="settingsForm.oldPassword" 
                      type="password" 
                      size="large"
                      :prefix-icon="Lock"
                      show-password
                      placeholder="请输入当前密码"
                    />
                  </el-form-item>
                  <el-form-item label="新密码">
                    <el-input 
                      v-model="settingsForm.newPassword" 
                      type="password" 
                      size="large"
                      :prefix-icon="Key"
                      show-password
                      placeholder="请输入新密码"
                    />
                  </el-form-item>
                  <el-form-item label="确认密码">
                    <el-input 
                      v-model="settingsForm.confirmPassword" 
                      type="password" 
                      size="large"
                      :prefix-icon="CircleCheck"
                      show-password
                      placeholder="请再次输入新密码"
                    />
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" size="large" class="save-btn" @click="handleChangePassword">
                      <el-icon><Refresh /></el-icon>
                      修改密码
                    </el-button>
                  </el-form-item>
                </el-form>
              </el-card>
            </div>
          </transition>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { 
  User, Document, Star, Setting, Edit, Iphone, UserFilled, 
  DocumentChecked, HomeFilled, Clock, StarFilled, Delete,
  Lock, Key, CircleCheck, Refresh, Check, Message, SwitchButton
} from '@element-plus/icons-vue'

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
  const map = { new: 'danger', contacted: 'warning', completed: 'success', cancelled: 'info' }
  return map[status] || ''
}

// 获取状态文本
const getStatusText = (status) => {
  const map = { new: '新咨询', contacted: '已联系', completed: '已完成', cancelled: '已取消' }
  return map[status] || status
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
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7ed 100%);
  padding-bottom: 60px;
}

/* 页面头部 */
.page-header {
  position: relative;
  padding: 40px 40px 80px;
  overflow: hidden;
}

.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #409EFF 0%, #66b1ff 100%);
}

.header-bg::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></svg>');
  background-size: 50px 50px;
}

.header-content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 24px;
}

.avatar-wrapper {
  position: relative;
}

.user-avatar {
  border: 4px solid rgba(255,255,255,0.3);
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  font-size: 40px;
  font-weight: 600;
}

.avatar-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  transition: all 0.3s ease;
}

.avatar-badge:hover {
  transform: scale(1.1);
  background: #ecf5ff;
}

.avatar-badge .el-icon {
  font-size: 16px;
  color: #409EFF;
}

.user-meta {
  color: white;
}

.user-name {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.user-phone {
  font-size: 15px;
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 容器 */
.center-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  margin-top: -40px;
  position: relative;
  z-index: 10;
}

/* 侧边栏 */
.sidebar-wrapper {
  position: sticky;
  top: 20px;
}

.menu-card {
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  border: none;
  margin-bottom: 20px;
  overflow: hidden;
}

.menu-header {
  padding: 20px;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  border-bottom: 1px solid #f0f0f0;
}

.user-menu {
  border-right: none;
}

.user-menu :deep(.el-menu-item) {
  height: 52px;
  line-height: 52px;
  font-size: 15px;
  border-radius: 0;
  margin: 4px 0;
}

.user-menu :deep(.el-menu-item:hover) {
  background: #f5f7fa;
}

.user-menu :deep(.el-menu-item.is-active) {
  background: #ecf5ff;
  color: #409EFF;
  font-weight: 500;
}

.user-menu :deep(.el-icon) {
  font-size: 18px;
}

.menu-badge {
  margin-left: auto;
  border-radius: 10px;
}

.menu-footer {
  padding: 16px 20px;
  border-top: 1px solid #f0f0f0;
}

.logout-btn {
  width: 100%;
  border-radius: 10px;
}

/* 统计卡片 */
.stats-card {
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  border: none;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  text-align: center;
}

.stat-item {
  padding: 12px 0;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #409EFF;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 13px;
  color: #909399;
}

/* 内容面板 */
.content-panel {
  animation: fadeSlide 0.3s ease-out;
}

@keyframes fadeSlide {
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.content-card {
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  border: none;
  min-height: 500px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.header-title .el-icon {
  font-size: 22px;
  color: #409EFF;
}

/* 表单 */
.profile-form,
.settings-form {
  max-width: 600px;
  padding: 20px 0;
}

.profile-form :deep(.el-form-item__label),
.settings-form :deep(.el-form-item__label) {
  font-weight: 500;
  color: #606266;
  padding-bottom: 8px;
}

.profile-form :deep(.el-input__wrapper),
.settings-form :deep(.el-input__wrapper) {
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.save-btn {
  background: linear-gradient(135deg, #409EFF 0%, #66b1ff 100%);
  border: none;
  border-radius: 10px;
  padding: 0 32px;
}

.save-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(64, 158, 255, 0.4);
}

/* 空状态 */
.empty-state {
  padding: 80px 0;
}

/* 咨询列表 */
.consult-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.consult-item {
  background: #f5f7fa;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
}

.consult-item:hover {
  background: #ecf5ff;
  transform: translateX(4px);
}

.consult-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.consult-house {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #303133;
}

.consult-house .el-icon {
  color: #409EFF;
}

.consult-body {
  padding-left: 24px;
}

.consult-message {
  color: #606266;
  margin-bottom: 12px;
  line-height: 1.6;
}

.consult-meta {
  display: flex;
  gap: 20px;
  font-size: 13px;
  color: #909399;
}

.consult-meta span {
  display: flex;
  align-items: center;
  gap: 6px;
}

/* 收藏列表 */
.favorites-grid {
  margin: 0 !important;
}

.favorite-card {
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  margin-bottom: 20px;
}

.favorite-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}

.favorite-image {
  position: relative;
  overflow: hidden;
}

.favorite-image img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.favorite-card:hover .favorite-image img {
  transform: scale(1.05);
}

.favorite-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.favorite-card:hover .favorite-overlay {
  opacity: 1;
}

.favorite-info {
  padding: 16px;
}

.favorite-info h4 {
  font-size: 15px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.favorite-meta {
  display: flex;
  gap: 12px;
  font-size: 13px;
  color: #909399;
  margin-bottom: 10px;
}

.favorite-price {
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.favorite-price .price-num {
  font-size: 20px;
  font-weight: 700;
  color: #f56c6c;
}

.favorite-price .price-unit {
  font-size: 13px;
  color: #f56c6c;
}

/* 响应式 */
@media (max-width: 768px) {
  .page-header {
    padding: 30px 20px 60px;
  }
  
  .user-profile {
    flex-direction: column;
    text-align: center;
  }
  
  .center-container {
    padding: 0 20px;
  }
  
  .sidebar-wrapper {
    position: static;
    margin-bottom: 20px;
  }
  
  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
