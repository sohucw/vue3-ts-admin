import { TOKEN } from '@/global/constance'
import router from '@/router'
import {
  accountLoginRequest,
  userInfoByIdRequest,
  userMenusByRoleIdRequest
} from '@/service/modules/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { mapMenuListToPermission, mapMenuToRoute } from '@/utils/map-menus'

import { defineStore } from 'pinia'
import useMainStore from '../main/main'
// interface IUserInfo {
//   id: number
//   name: string
//   realname: string
//   cellphone: number
//   enable: number
//   createAt: string
//   updateAt: string
//   role: {
//     id: number
//     name: string
//     intro: string
//     createAt: string
//     updateAt: string
//   }
//   department: {
//     id: number
//     name: string
//     parentId: null
//     createAt: string
//     updateAt: string
//     leader: string
//   }
// }
interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  permissionBtns: string[]
}
export const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: [],
    permissionBtns: []
  }),
  actions: {
    async accountLoginAction(account: IAccount) {
      const res = await accountLoginRequest(account)
      // 1. 获取登录成功后的信息
      const id = res.data.id
      this.token = res.data.token
      // 2.进行本地缓存
      localCache.setCache(TOKEN, this.token)
      // 3.获取用户的详细信息：角色信息
      const userInfoRes = await userInfoByIdRequest(id)
      const userInfo = userInfoRes.data
      this.userInfo = userInfo
      // 4.根据 用户的 角色信息 ，获取 用户权限信息（菜单信息）
      const menuListRes = await userMenusByRoleIdRequest(this.userInfo.role.id)
      const userMenus = menuListRes.data
      userMenus.pop();
      console.log(userMenus)
      this.userMenus = userMenus

      // 5. 本地缓存 用户菜单信息和角色信息
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)
      // 5.5 请求所有的role和department
      const mainStore = useMainStore()
      mainStore.fecthEntiresDataAction()
      // 6.0  重要： 获取登录用户的所有按钮的权限 （比如：创建用户、删除用户等等）
      const permissionBtns = mapMenuListToPermission(userMenus)
      console.table(permissionBtns)
      this.permissionBtns = permissionBtns
      // 6. 重要： 动态添加路由
      const routes = mapMenuToRoute(userMenus)
      routes.forEach((item) => router.addRoute('main', item))

      // 3.进行跳转（mian页面）
      router.push('/main')
    },
    loadlocalCacheAction() {
      // 用户刷新进行的默认加载数据
      const token = localCache.getCache(TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus
        // 刷新之后请求最新的role和department
        const mainStore = useMainStore()
        mainStore.fecthEntiresDataAction()
        // 缓存 permission
        const permissionBtns = mapMenuListToPermission(userMenus)
        this.permissionBtns = permissionBtns
        // 6. 动态添加路由
        const routes = mapMenuToRoute(userMenus)
        routes.forEach((item) => router.addRoute('main', item))
      }
    }
  }
})
