/**
 * 数据库配置
 */

const mysql = require('mysql2/promise');

const config = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'house_platform',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

let pool = null;

/**
 * 获取数据库连接池
 */
async function getPool() {
  if (!pool) {
    try {
      pool = mysql.createPool(config);
      
      // 测试连接
      const connection = await pool.getConnection();
      console.log('✅ 数据库连接成功');
      connection.release();
    } catch (error) {
      console.error('❌ 数据库连接失败:', error.message);
      console.log('⚠️  使用内存数据存储');
      pool = null;
    }
  }
  return pool;
}

/**
 * 执行查询
 */
async function query(sql, params) {
  const pool = await getPool();
  if (!pool) {
    throw new Error('数据库未连接');
  }
  const [rows] = await pool.execute(sql, params);
  return rows;
}

/**
 * 关闭连接池
 */
async function close() {
  if (pool) {
    await pool.end();
    console.log('数据库连接已关闭');
  }
}

module.exports = {
  getPool,
  query,
  close
};
