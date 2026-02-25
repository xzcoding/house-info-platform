/**
 * AI 图片生成脚本
 * 使用通义万相 API 生成房屋信息展示平台所需图片
 */

const fs = require('fs');
const path = require('path');

// 通义万相 API 配置
const WANXIANG_CONFIG = {
  apiKey: process.env.WANXIANG_API_KEY || '',
  apiSecret: process.env.WANXIANG_API_SECRET || '',
  endpoint: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation'
};

// 图片生成提示词
const IMAGE_PROMPTS = [
  // 第 1 批：房源封面图 (15 张)
  {
    category: 'cover',
    prompts: [
      '现代简约风格独立房屋，白色外墙，大落地窗，灰色屋顶，绿色花园，蓝天白云，高清摄影，8K 分辨率',
      '现代高层公寓楼，玻璃幕墙，城市景观，黄昏时分，灯光亮起，繁华都市，高清摄影',
      '豪华欧式别墅，米色石材外墙，红色瓦屋顶，私家花园，游泳池，绿树环绕，阳光明媚',
      '中式庭院别墅，青瓦白墙，园林景观设计，传统与现代结合，高清摄影',
      '现代联排别墅，棕色外墙，大阳台，社区绿化，温馨家庭氛围',
      '海滨度假别墅，蓝色屋顶，白色外墙，海景阳台，热带植物，度假风情',
      '山顶景观别墅，现代设计，全景落地窗，山景视野，高端大气',
      '城市平层公寓，现代简约，大阳台，城市景观，精致生活',
      '花园洋房，红色砖墙，绿色屋顶，私家花园，温馨舒适',
      '现代 loft 公寓，工业风格，挑高设计，金属元素，时尚前卫',
      '北欧风格别墅，浅色木质，大窗户，简约设计，自然光线',
      '地中海风格别墅，蓝色门窗，白色墙面，拱形设计，浪漫风情',
      '现代独栋别墅，灰色外墙，几何设计，庭院绿化，高端品质',
      '温馨小洋房，粉色外墙，尖顶设计，小花坛，童话风格',
      '高端大平层，玻璃幕墙，城市核心地段，豪华装修，成功人士'
    ],
    size: '1200x800',
    count: 15
  },
  
  // 第 2 批：户型图 (8 张)
  {
    category: 'floorplan',
    prompts: [
      '现代一室一厅户型图，俯视图，简洁线条，标注尺寸，白色背景，专业建筑设计风格',
      '现代二室二厅户型图，俯视图，简洁线条，标注尺寸，白色背景，CAD 制图风格',
      '现代三室二厅户型图，俯视图，简洁线条，标注尺寸，白色背景，专业设计',
      '现代四室两厅户型图，俯视图，简洁线条，标注尺寸，白色背景，高端住宅',
      '复式楼户型图，俯视图，两层设计，楼梯位置，简洁线条，白色背景',
      '别墅户型图，俯视图，多层设计，花园位置，车库位置，专业设计',
      'loft 公寓户型图，俯视图，挑高设计，开放式布局，工业风格',
      '大平层户型图，俯视图，宽敞布局，多个卧室，豪华设计'
    ],
    size: '800x600',
    count: 8
  },
  
  // 第 3 批：客厅实景图 (10 张)
  {
    category: 'living_room',
    prompts: [
      '现代简约客厅，米色布艺沙发，木质地板，大落地窗，自然光线，绿植点缀，温馨舒适',
      '北欧风格客厅，浅色沙发，白色墙面，木质家具，简约设计，自然光线',
      '轻奢风格客厅，深色皮质沙发，金属元素，大理石茶几，高端大气',
      '中式风格客厅，实木家具，中式屏风，茶文化元素，传统典雅',
      '美式风格客厅，布艺沙发，壁炉设计，温馨舒适，家庭氛围',
      '现代风格客厅，L 型沙发，电视背景墙，简约设计，年轻人喜爱',
      '法式风格客厅，精致雕花，水晶吊灯，浪漫优雅，高端品质',
      '日式风格客厅，榻榻米元素，木质家具，简约自然，禅意设计',
      '工业风格客厅，裸露砖墙，金属灯具，皮质沙发，个性时尚',
      '地中海风格客厅，蓝色元素，拱形设计，海洋风情，浪漫舒适'
    ],
    size: '1200x800',
    count: 10
  }
];

/**
 * 调用通义万相 API 生成图片
 */
async function generateImage(prompt, size = '1024*1024') {
  // 通义万相支持的尺寸：1024*1024, 720*1280, 1280*720
  const validSizes = ['1024*1024', '720*1280', '1280*720'];
  if (!validSizes.includes(size)) {
    size = '1024*1024'; // 默认尺寸
  }
  
  const payload = {
    model: 'wanx-v1',
    input: {
      prompt: prompt
    },
    parameters: {
      size: size,
      n: 1,
      seed: Math.floor(Math.random() * 1000000)
    }
  };
  
  console.log(`    📤 请求参数：${JSON.stringify(payload.parameters)}`);
  
  try {
    const response = await fetch(WANXIANG_CONFIG.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${WANXIANG_CONFIG.apiKey}`
      },
      body: JSON.stringify(payload)
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      console.error(`    ❌ API 错误：${response.status}`, JSON.stringify(result));
      throw new Error(`API 请求失败：${response.status} - ${result.message || 'Unknown error'}`);
    }
    
    return result;
  } catch (error) {
    console.error(`    ❌ 生成图片失败：${error.message}`);
    return null;
  }
}

/**
 * 批量生成图片
 */
async function batchGenerateImages() {
  console.log('🎨 开始 AI 图片生成...\n');
  
  const outputDir = path.join(__dirname, '../assets/images');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  let totalGenerated = 0;
  let totalFailed = 0;
  
  for (const batch of IMAGE_PROMPTS) {
    console.log(`\n📁 开始生成第${batch.category}类图片 (${batch.count}张)...\n`);
    
    for (let i = 0; i < batch.prompts.length; i++) {
      const prompt = batch.prompts[i];
      const filename = `${batch.category}_${i + 1}.png`;
      const filepath = path.join(outputDir, filename);
      
      console.log(`  🖼️  生成 ${filename}...`);
      
      const result = await generateImage(prompt, batch.size);
      
      if (result && result.output && result.output.results) {
        // 保存生成的图片
        const imageUrl = result.output.results[0].url;
        console.log(`    ✅ 生成成功：${imageUrl}`);
        totalGenerated++;
      } else {
        console.log(`    ❌ 生成失败`);
        totalFailed++;
      }
      
      // 避免请求过快，等待 1 秒
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  console.log('\n\n🎉 图片生成完成！');
  console.log(`✅ 成功：${totalGenerated} 张`);
  console.log(`❌ 失败：${totalFailed} 张`);
  console.log(`📁 保存目录：${outputDir}`);
}

// 运行生成脚本
if (require.main === module) {
  if (!WANXIANG_CONFIG.apiKey) {
    console.error('❌ 错误：请设置 WANXIANG_API_KEY 环境变量');
    console.error('');
    console.error('使用方法:');
    console.error('  export WANXIANG_API_KEY=your_api_key');
    console.error('  node scripts/generate-images.js');
    process.exit(1);
  }
  
  batchGenerateImages();
}

module.exports = { generateImage, batchGenerateImages };
