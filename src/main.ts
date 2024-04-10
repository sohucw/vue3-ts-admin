// 重置css
import './assets/index.less'
import 'normalize.css'
import { createApp } from 'vue'
import App from './App.vue'
// 路由
import router from './router'
import store from './store'
// 全局注册 图标
import icons from './global/register-icons'

// 针对 ElMessage loading等样式引入
// vite-plugin-style-import 自动引入样式
// import 'element-plus/theme-chalk/el-message.css'
const app = createApp(App)
app.use(icons)
app.use(store)

app.use(router)

app.mount('#app')
