import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// 导入 UI 组件库
import UIUXProMax from 'ui-ux-pro-max'
import 'ui-ux-pro-max/dist/style.css'

// 导入图标库
import * as IconPark from '@icon-park/vue-next'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(UIUXProMax)

// 注册全局图标
Object.keys(IconPark).forEach(key => {
  app.component(key, IconPark[key])
})

app.mount('#app')
