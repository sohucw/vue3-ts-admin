import type { RouteRecordRaw } from 'vue-router'
// 本地加载
function loadLocalRoutes() {
  // 6. 动态添加路由
  const localRoutesArr: RouteRecordRaw[] = []
  // 6.1 动态加载router文件夹中的ts
  const filesSystem = import.meta.glob('../router/SystemMain/**/*.ts', { eager: true })
  const filesAnalysis = import.meta.glob('../router/AnalysisMain/**/*.ts', { eager: true })
  const filesProduct = import.meta.glob('../router/ProductCenter/**/*.ts', { eager: true })

  const files: Record<string, any> = {
    ...filesSystem,
    ...filesAnalysis,
    ...filesProduct,
  }
  // 6.1.2 将加载的对象放到localRoutesArr
  for (const key in files) {
    const module = files[key]
    localRoutesArr.push(module.default)
  }
  return localRoutesArr
}
// 第一次的路由 active
export let firstMenu: any = null
export const mapMenuToRoute = (userMenus: any[]) => {
  // 加载本地路由
  //   console.log(localRoutesArr)
  const localRoutesArr = loadLocalRoutes()
  // 6.2 根据菜单去匹配正确的路由
  const routes: RouteRecordRaw[] = []

  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      // console.log(submenu)
      // 如果建立动态路由文件夹和服务器给的路由地址相同
      // const route = localRoutesArr.find((item) => item.path === submenu.url)
      // console.log(route)
      // 创建文件名与路由不同 所以要找相同点
      const submenuUrl = submenu.url.split('/')[3]
      // console.log('submenuUrl', submenuUrl)
      localRoutesArr.forEach((item) => {
        const route = item.path.toLowerCase().split('/')[2]
        if (route.includes(submenuUrl)) {
          item.path = submenu.url
          // console.log('路由：', item.path, submenu.url)
          // 一级路由菜单
          if (!routes.find((item) => item.path === menu.url)) {
            routes.push({ path: menu.url, redirect: item.path })
          }
          // 二级路由菜单
          routes.push(item)
          if (!firstMenu && item) firstMenu = submenu
          //   router.addRoute('main', item)
        }
      })
    }
  }
  return routes
}
/**
 * 根据路径匹配需要显示的菜单 active
 * @param path 需要匹配的路径
 * @param userMenus 所有的菜单
 */
export const mapPathToMenu = (path: string, userMenus: any[]) => {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
  return undefined
}
/**
 *
 * @param path 当前用户所在的路由地址
 * @param userMenus 所有的菜单
 * @returns 面包屑需要展示的数组
 */
export const mapPathToBreadCrumb = (path: string, userMenus: any[]) => {
  const breadcrumbs: any[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        breadcrumbs.push({ id: menu.id, name: menu.name, url: menu.url })
        const { id, name, url } = submenu
        breadcrumbs.push({ id, name, url })
      }
    }
  }
  return breadcrumbs
}
/**
 * 角色管理：权限选择：编辑
 * 菜单映射到id列表
 * @param menuList
 */
export const mapMenuListToTreeById = (menuList: any[]) => {
  const ids: number[] = []
  const recurseGetId = (menus: any[]) => {
    for (const item of menus) {
      if (item.children) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  recurseGetId(menuList)
  return ids
}
/**
 * 登录时将用户的按钮权限 映射到 permissions：string[]
 * @param menuList 菜单列表
 * @returns permissions 按钮权限
 */
export const mapMenuListToPermission = (menuList: any[]) => {
  const permissions: string[] = []

  const findPermission = (menus: any[]) => {
    for (const item of menus) {
      // permission 存在在 type=3的数组里
      if (item.type === 3) {
        permissions.push(item.permission)
      } else {
        findPermission(item.children ?? [])
      }
    }
  }
  findPermission(menuList)
  return permissions
}
