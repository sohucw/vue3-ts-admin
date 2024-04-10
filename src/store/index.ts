import { createPinia } from 'pinia'
import type { App } from 'vue'
import { useLoginStore } from './login/login'

const pinia = createPinia()

function registerStore(app: App<Element>) {
  app.use(pinia)
  // 页面加载从local中拿
  const loginStore = useLoginStore()
  loginStore.loadlocalCacheAction()
}
export default registerStore
