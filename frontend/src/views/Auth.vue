<template>
  <div class="auth-page">
    <el-card class="auth-card">
      <template #header>
        <h2>{{ isLogin ? '用户登录' : '用户注册' }}</h2>
      </template>

      <!-- 登录表单 -->
      <el-form v-if="isLogin" :model="loginForm" label-width="80px">
        <el-form-item label="手机号">
          <el-input v-model="loginForm.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" style="width: 100%">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-link type="primary" @click="isLogin = false">没有账号？立即注册</el-link>
        </el-form-item>
      </el-form>

      <!-- 注册表单 -->
      <el-form v-else :model="registerForm" label-width="80px">
        <el-form-item label="手机号">
          <el-input v-model="registerForm.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="registerForm.password" type="password" placeholder="请设置密码" />
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="registerForm.confirmPassword" type="password" placeholder="请确认密码" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="registerForm.name" placeholder="请输入昵称（可选）" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleRegister" style="width: 100%">注册</el-button>
        </el-form-item>
        <el-form-item>
          <el-link type="primary" @click="isLogin = true">已有账号？立即登录</el-link>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLogin = ref(true)

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
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.auth-card {
  width: 400px;
}

.auth-card h2 {
  text-align: center;
  margin: 0;
  color: #333;
}
</style>
