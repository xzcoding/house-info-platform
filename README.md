# 🏠 房屋信息展示平台

> 基于 WEB 的房源展示与用户连接平台

[![Status](https://img.shields.io/badge/status-planning-blue)]()
[![Vue](https://img.shields.io/badge/Vue-3-green)]()
[![Node](https://img.shields.io/badge/Node.js-20-green)]()

---

## 📋 项目介绍

本项目是一个基于 WEB 的房屋信息展示平台，旨在连接购房者与销售顾问，引导用户到自由信息平台，便于后期成交。

### 核心功能

- ✅ **房源展示**：房源列表、详情、图片、位置
- ✅ **用户系统**：注册登录、个人中心
- ✅ **销售对接**：电话、微信、在线咨询
- ✅ **咨询管理**：咨询表单、跟进记录

### 目标用户

- **购房者/租房者**：查找房源，联系销售
- **销售顾问**：接收咨询，跟进客户
- **平台管理员**：管理房源，管理销售

---

## 🚀 快速开始

### 环境要求

- Node.js 20+
- MySQL 8.0+
- Redis 6.0+

### 前端开发

```bash
cd frontend
npm install
npm run dev
```

### 后端开发

```bash
cd backend
npm install
cp .env.example .env
# 编辑 .env 配置
npm run dev
```

---

## 📁 项目结构

```
house-info-platform/
├── docs/                    # 项目文档
│   ├── 01-产品需求文档.md
│   ├── 02-技术方案设计.md
│   └── 03-项目计划.md
├── frontend/                # 前端代码 (Vue 3)
│   ├── src/
│   │   ├── components/     # 公共组件
│   │   ├── views/          # 页面组件
│   │   ├── api/            # API 调用
│   │   └── utils/          # 工具函数
│   └── package.json
├── backend/                 # 后端代码 (Node.js)
│   ├── src/
│   │   ├── routes/         # 路由
│   │   ├── controllers/    # 控制器
│   │   ├── models/         # 数据模型
│   │   └── middleware/     # 中间件
│   └── package.json
├── database/                # 数据库脚本
│   └── schema.sql
└── .github/workflows/       # CI/CD
```

---

## 📊 功能模块

### 用户端

| 模块 | 功能 | 状态 |
|------|------|------|
| 首页 | 房源搜索、推荐房源 | ⏳ |
| 房源列表 | 筛选、排序、分页 | ⏳ |
| 房源详情 | 图片、信息、位置、联系 | ⏳ |
| 登录注册 | 手机号验证、密码登录 | ⏳ |
| 个人中心 | 个人信息、咨询记录 | ⏳ |

### 管理端

| 模块 | 功能 | 状态 |
|------|------|------|
| 房源管理 | CRUD、上下架 | ⏳ |
| 销售管理 | CRUD、分配房源 | ⏳ |
| 用户管理 | 查看用户、咨询记录 | ⏳ |

---

## 🛠️ 技术栈

### 前端
- **框架**：Vue 3 + Vite
- **UI 库**：Element Plus
- **状态管理**：Pinia
- **路由**：Vue Router
- **HTTP**：Axios

### 后端
- **语言**：Node.js
- **框架**：Express
- **数据库**：MySQL 8.0
- **缓存**：Redis
- **认证**：JWT

### 部署
- **前端**：Vercel
- **后端**：Railway
- **数据库**：Railway MySQL
- **CI/CD**：GitHub Actions

---

## 📅 项目计划

| 阶段 | 时间 | 交付物 |
|------|------|--------|
| 需求与设计 | Week 1 | PRD、技术设计 |
| 前端开发 | Week 2-3 | 前端代码 |
| 后端开发 | Week 2-3 | 后端代码、API |
| 测试部署 | Week 4 | 测试报告、上线 |

详细计划见：[docs/03-项目计划.md](docs/03-项目计划.md)

---

## 📞 联系方式

- **项目仓库**：https://github.com/[your-username]/house-info-platform
- **项目负责人**：[待填写]

---

## 📄 许可证

MIT License

---

*由 DevTeam Alpha 开发*  
*最后更新：2026-02-25*
