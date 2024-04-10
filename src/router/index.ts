import { TOKEN } from '@/global/constance'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/LoginAdmin/LoginAdmin.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/SystemMain/SystemMain.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/NotFound/NotFound.vue')
    }
  ]
})
// 路由动态添加

// 路由导航守卫
router.beforeEach((to) => {
  // console.log(to, from)
  const token = localCache.getCache(TOKEN)
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }
  // 如果是进入到main当中
  if (to.path === '/main') {
    return firstMenu?.url
  }
})

export default router
