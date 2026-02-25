-- 房屋信息展示平台 - 数据库初始化脚本
-- MySQL 8.0+

CREATE DATABASE IF NOT EXISTS house_platform CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE house_platform;

-- 用户表
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  phone VARCHAR(20) UNIQUE NOT NULL COMMENT '手机号',
  name VARCHAR(50) COMMENT '姓名',
  password_hash VARCHAR(255) COMMENT '密码哈希',
  avatar VARCHAR(500) COMMENT '头像 URL',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_phone (phone)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- 销售顾问表
CREATE TABLE agents (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL COMMENT '姓名',
  phone VARCHAR(20) NOT NULL COMMENT '电话',
  wechat VARCHAR(100) COMMENT '微信',
  avatar VARCHAR(500) COMMENT '头像 URL',
  status ENUM('active', 'inactive') DEFAULT 'active' COMMENT '状态',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='销售顾问表';

-- 房源表
CREATE TABLE houses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL COMMENT '标题',
  price DECIMAL(10,2) NOT NULL COMMENT '价格',
  area DECIMAL(8,2) NOT NULL COMMENT '面积',
  rooms INT NOT NULL COMMENT '室',
  halls INT NOT NULL COMMENT '厅',
  bathrooms INT DEFAULT 1 COMMENT '卫',
  location VARCHAR(200) COMMENT '区域',
  address VARCHAR(500) COMMENT '详细地址',
  description TEXT COMMENT '描述',
  agent_id INT COMMENT '负责销售',
  status ENUM('on_sale', 'sold', 'rented', 'off') DEFAULT 'on_sale' COMMENT '状态',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (agent_id) REFERENCES agents(id),
  INDEX idx_status (status),
  INDEX idx_agent (agent_id),
  INDEX idx_location (location)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='房源表';

-- 房源图片表
CREATE TABLE house_images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  house_id INT NOT NULL COMMENT '房源 ID',
  image_url VARCHAR(500) NOT NULL COMMENT '图片 URL',
  image_type ENUM('cover', 'room', 'kitchen', 'bathroom', 'other') DEFAULT 'other' COMMENT '类型',
  sort_order INT DEFAULT 0 COMMENT '排序',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (house_id) REFERENCES houses(id) ON DELETE CASCADE,
  INDEX idx_house (house_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='房源图片表';

-- 咨询记录表
CREATE TABLE consultations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT COMMENT '用户 ID',
  house_id INT NOT NULL COMMENT '房源 ID',
  agent_id INT NOT NULL COMMENT '销售 ID',
  user_name VARCHAR(50) COMMENT '用户姓名',
  user_phone VARCHAR(20) COMMENT '用户电话',
  message TEXT COMMENT '咨询内容',
  status ENUM('new', 'contacted', 'completed', 'cancelled') DEFAULT 'new' COMMENT '状态',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (house_id) REFERENCES houses(id),
  FOREIGN KEY (agent_id) REFERENCES agents(id),
  INDEX idx_status (status),
  INDEX idx_user (user_id),
  INDEX idx_agent (agent_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='咨询记录表';

-- 初始数据 - 销售顾问
INSERT INTO agents (name, phone, wechat, status) VALUES
('张顾问', '13800138001', 'zhang_agent', 'active'),
('李顾问', '13800138002', 'li_agent', 'active'),
('王顾问', '13800138003', 'wang_agent', 'active');
