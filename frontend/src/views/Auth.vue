<template>
  <div class="auth-page">
    <!-- 装饰背景 -->
    <div class="auth-bg">
      <div class="bg-circle circle-1"></div>
      <div class="bg-circle circle-2"></div>
      <div class="bg-circle circle-3"></div>
    </div>

    <!-- 品牌区域 -->
    <div class="brand-section">
      <div class="brand-logo">
        <el-icon class="logo-icon"><HomeFilled /></el-icon>
      </div>
      <h1 class="brand-name">安居找房</h1>
      <p class="brand-slogan">找到您理想的家</p>
    </div>

    <!-- 卡片区域 -->
    <div class="auth-card-wrapper">
      <el-card class="auth-card" :body-style="{ padding: 0 }">
        <div class="card-header">
          <div class="tab-switcher">
            <button 
              class="tab-btn" 
              :class="{ active: isLogin }"
              @click="isLogin = true"
            >
              <el-icon><User /></el-icon>
              登录
            </button>
            <button 
              class="tab-btn" 
              :class="{ active: !isLogin }"
              @click="isLogin = false"
            >
              <el-icon><UserPlus /></el-icon>
              注册
            </button>
          </div>
        </div>

        <div class="card-body">
          <!-- 登录表单 -->
          <transition name="form-fade" mode="out-in">
            <el-form v-if="isLogin" :model="loginForm" class="auth-form" key="login">
              <div class="form-title">
                <h2>欢迎回来</h2>
                <p>请登录您的账号</p>
              </div>
              
              <el-form-item>
                <el-input 
                  v-model="loginForm.phone" 
                  placeholder="请输入手机号"
                  size="large"
                  :prefix-icon="Iphone"
                  class="auth-input"
                />
              </el-form-item>
              
              <el-form-item>
                <el-input 
                  v-model="loginForm.password" 
                  type="password" 
                  placeholder="请输入密码"
                  size="large"
                  :prefix-icon="Lock"
                  class="auth-input"
                  show-password
                />
              </el-form-item>

              <div class="form-options">
                <el-checkbox v-model="rememberMe">记住我</el-checkbox>
                <el-link type="primary" :underline="false">忘记密码？</el-link>
              </div>
              
              <el-form-item>
                <el-button 
                  type="primary" 
                  size="large" 
                  class="submit-btn"
                  @click="handleLogin"
                >
                  <el-icon><Right /></el-icon>
                  立即登录
                </el-button>
              </el-form-item>

              <div class="divider">
                <span>其他登录方式</span>
              </div>

              <div class="social-login">
                <el-button circle class="social-btn wechat">
                  <el-icon><ChatDotRound /></el-icon>
                </el-button>
                <el-button circle class="social-btn qq">
                  <el-icon><ChatLineRound /></el-icon>
                </el-button>
              </div>
            </el-form>

            <!-- 注册表单 -->
            <el-form v-else :model="registerForm" class="auth-form" key="register">
              <div class="form-title">
                <h2>创建账号</h2>
                <p>开始您的找房之旅</p>
              </div>
              
              <el-form-item>
                <el-input 
                  v-model="registerForm.phone" 
                  placeholder="请输入手机号"
                  size="large"
                  :prefix-icon="Iphone"
                  class="auth-input"
                />
              </el-form-item>
              
              <el-form-item>
                <el-input 
                  v-model="registerForm.password" 
                  type="password" 
                  placeholder="请设置密码"
                  size="large"
                  :prefix-icon="Lock"
                  class="auth-input"
                  show-password
                />
              </el-form-item>
              
              <el-form-item>
                <el-input 
                  v-model="registerForm.confirmPassword" 
                  type="password" 
                  placeholder="请确认密码"
                  size="large"
                  :prefix-icon="Lock"
                  class="auth-input"
                  show-password
                />
              </el-form-item>
              
              <el-form-item>
                <el-input 
                  v-model="registerForm.name" 
                  placeholder="请输入昵称（可选）"
                  size="large"
                  :prefix-icon="User"
                  class="auth-input"
                />
              </el-form-item>

              <div class="form-agreement">
                <el-checkbox v-model="agreement">
                  我已阅读并同意
                  <el-link type="primary" :underline="false">用户协议</el-link>
                  和
                  <el-link type="primary" :underline="false">隐私政策</el-link>
                </el-checkbox>
              </div>
              
              <el-form-item>
                <el-button 
                  type="primary" 
                  size="large" 
                  class="submit-btn"
                  @click="handleRegister"
                >
                  <el-icon><Plus /></el-icon>
                  立即注册
                </el-button>
              </el-form-item>
            </el-form>
          </transition>
        </div>
      </el-card>
    </div>

    <!-- 页脚 -->
    <div class="auth-footer">
      <p>© 2026 安居找房 All Rights Reserved</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { HomeFilled, User, UserPlus, Iphone, Lock, Right, Plus, ChatDotRound, ChatLineRound } from '@element-plus/icons-vue'

const router = useRouter()
const isLogin = ref(true)
const rememberMe = ref(false)
const agreement = ref(false)

// 登录表单
const loginForm = reactive({
  phone: '',
  password: ''
})

// 注册表单
const registerForm = reactive({
  phone: '',
  password: '',
  confirmPassword: '',
  name: ''
})

// 登录处理
const handleLogin = () => {
  console.log('登录:', loginForm)
  // TODO: 调用后端 API
  localStorage.setItem('token', 'mock-token')
  localStorage.setItem('user', JSON.stringify({ phone: loginForm.phone }))
  router.push('/')
}

// 注册处理
const handleRegister = () => {
  if (registerForm.password !== registerForm.confirmPassword) {
    alert('两次密码输入不一致')
    return
  }
  if (!agreement.value) {
    alert('请阅读并同意用户协议和隐私政策')
    return
  }
  console.log('注册:', registerForm)
  // TODO: 调用后端 API
  alert('注册成功，请登录')
  isLogin.value = true
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
  padding: 40px 20px;
}

/* 装饰背景 */
.auth-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.circle-1 {
  width: 600px;
  height: 600px;
  top: -200px;
  right: -200px;
  animation: float 20s infinite ease-in-out;
}

.circle-2 {
  width: 400px;
  height: 400px;
  bottom: -100px;
  left: -100px;
  animation: float 15s infinite ease-in-out reverse;
}

.circle-3 {
  width: 300px;
  height: 300px;
  top: 50%;
  left: 20%;
  animation: float 18s infinite ease-in-out;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -30px) scale(1.05); }
  66% { transform: translate(-20px, 20px) scale(0.95); }
}

/* 品牌区域 */
.brand-section {
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  z-index: 1;
}

.brand-logo {
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.logo-icon {
  font-size: 44px;
  color: #667eea;
}

.brand-name {
  font-size: 32px;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.brand-slogan {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
}

/* 卡片区域 */
.auth-card-wrapper {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 440px;
}

.auth-card {
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: none;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.98);
}

.card-header {
  padding: 0;
  border-bottom: 1px solid #f0f0f0;
}

.tab-switcher {
  display: flex;
}

.tab-btn {
  flex: 1;
  padding: 20px;
  border: none;
  background: transparent;
  font-size: 16px;
  font-weight: 500;
  color: #909399;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.tab-btn:hover {
  color: #409EFF;
  background: #f5f7fa;
}

.tab-btn.active {
  color: #409EFF;
  background: white;
  position: relative;
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 20%;
  right: 20%;
  height: 3px;
  background: linear-gradient(90deg, #409EFF, #66b1ff);
  border-radius: 3px 3px 0 0;
}

.card-body {
  padding: 32px;
}

/* 表单 */
.auth-form {
  animation: fadeIn 0.4s ease-out;
}

.form-title {
  text-align: center;
  margin-bottom: 28px;
}

.form-title h2 {
  font-size: 24px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 8px;
}

.form-title p {
  font-size: 14px;
  color: #909399;
}

.auth-input :deep(.el-input__wrapper) {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 4px 16px;
}

.auth-input :deep(.el-input__inner) {
  height: 48px;
  font-size: 15px;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.form-agreement {
  margin-bottom: 24px;
  font-size: 13px;
}

.submit-btn {
  width: 100%;
  height: 52px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 12px;
  background: linear-gradient(135deg, #409EFF 0%, #66b1ff 100%);
  border: none;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(64, 158, 255, 0.4);
}

/* 分隔线 */
.divider {
  display: flex;
  align-items: center;
  margin: 24px 0;
  color: #c0c4cc;
  font-size: 13px;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #e4e7ed;
}

.divider span {
  padding: 0 16px;
}

/* 社交登录 */
.social-login {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.social-btn {
  width: 48px;
  height: 48px;
  font-size: 22px;
  transition: all 0.3s ease;
}

.social-btn:hover {
  transform: translateY(-3px);
}

.social-btn.wechat {
  color: #07c160;
  border-color: #07c160;
}

.social-btn.wechat:hover {
  background: #07c160;
  color: white;
}

.social-btn.qq {
  color: #12b7f5;
  border-color: #12b7f5;
}

.social-btn.qq:hover {
  background: #12b7f5;
  color: white;
}

/* 表单切换动画 */
.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 0.3s ease;
}

.form-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.form-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* 页脚 */
.auth-footer {
  position: relative;
  z-index: 1;
  margin-top: 40px;
  text-align: center;
}

.auth-footer p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
}

/* 响应式 */
@media (max-width: 480px) {
  .auth-page {
    padding: 20px;
  }
  
  .brand-logo {
    width: 64px;
    height: 64px;
  }
  
  .logo-icon {
    font-size: 36px;
  }
  
  .brand-name {
    font-size: 26px;
  }
  
  .card-body {
    padding: 24px;
  }
  
  .tab-btn {
    padding: 16px;
    font-size: 15px;
  }
}
</style>
