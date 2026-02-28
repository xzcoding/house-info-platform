---
name: ui-ux-pro-max
description: 优化 Vue 3 前端项目界面设计和用户体验，使用 Element Plus 组件库打造现代化、美观的 UI。适用于房屋信息展示平台等需要提升视觉效果的 Web 应用。
---

# UI/UX Pro Max - 界面优化专家

## 设计原则

### 1. 现代化视觉风格
- 使用圆角设计（border-radius: 8px-16px）
- 卡片式布局，带阴影效果（box-shadow）
- 渐变色彩点缀
- 充足的留白空间

### 2. 配色方案
- **主色调**: #409EFF (Element Plus 蓝色)
- **辅助色**: #67C23A (成功绿)、#E6A23C (警告橙)、#F56C6C (危险红)
- **中性色**: 
  - 文字主色: #303133
  - 文字次色: #606266
  - 边框色: #DCDFE6
  - 背景色: #F5F7FA

### 3. 字体规范
- 标题: 18px-24px, font-weight: 600
- 正文: 14px-16px, font-weight: 400
- 辅助文字: 12px-13px, color: #909399

### 4. 间距规范
- 卡片内边距: 20px-24px
- 元素间距: 12px-16px
- 区块间距: 24px-32px

## 组件优化清单

### 页面头部 (Header)
- [ ] 使用渐变背景或毛玻璃效果
- [ ] Logo 添加悬停动画
- [ ] 导航项添加下划线动画
- [ ] 用户头像区域优化

### 卡片组件 (Card)
- [ ] 添加悬停阴影效果
- [ ] 图片区域圆角处理
- [ ] 价格标签高亮显示
- [ ] 添加收藏/分享按钮

### 按钮 (Button)
- [ ] 主按钮使用渐变背景
- [ ] 添加悬停缩放效果
- [ ] 图标按钮统一风格

### 表单 (Form)
- [ ] 输入框聚焦动画
- [ ] 标签顶部对齐
- [ ] 错误提示友好显示

### 列表 (List)
- [ ] 添加骨架屏加载
- [ ] 空状态友好提示
- [ ] 分页器样式优化

## 动画效果

### 入场动画
```css
.fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 悬停效果
```css
.card-hover {
  transition: all 0.3s ease;
}
.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}
```

## 响应式设计

### 断点设置
- 移动端: < 768px
- 平板: 768px - 1024px
- 桌面: > 1024px

### 移动端优化
- [ ] 底部固定导航栏
- [ ] 卡片单列布局
- [ ] 触摸友好的按钮尺寸
- [ ] 图片懒加载

## 优化步骤

1. **分析当前界面**: 识别视觉问题和不一致之处
2. **制定优化方案**: 根据上述规范设计改进方案
3. **更新样式**: 修改 CSS/SCSS 文件
4. **优化组件**: 改进 Vue 组件结构和样式
5. **添加交互**: 实现动画和过渡效果
6. **测试验证**: 检查各页面视觉效果

## 常用代码片段

### 毛玻璃效果
```css
.glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
```

### 渐变背景
```css
.gradient-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### 阴影层级
```css
.shadow-sm { box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
.shadow-md { box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
.shadow-lg { box-shadow: 0 12px 24px rgba(0,0,0,0.12); }
```
