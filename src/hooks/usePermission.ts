import { useLoginStore } from '@/store/login/login'

export const usePermissions = (permissionID: string) => {
  // 获取是否对数据有增删改查的权限
  const loginStore = useLoginStore()
  const { permissionBtns } = loginStore
  return Boolean(permissionBtns.find((item: any) => item.includes(permissionID)))
}
