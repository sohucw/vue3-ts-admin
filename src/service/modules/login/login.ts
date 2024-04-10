import pkRequest from '@/service'
import type { IAccount } from '@/types'

export const accountLoginRequest = (account: IAccount) => {
  //   const { name, password } = account
  return pkRequest.post({
    url: '/login',
    data: account
  })
}
// 查询用户信息
export const userInfoByIdRequest = (id: number) => {
  return pkRequest.get({
    url: `/users/${id}`
  })
}
// 根据role id 查询角色 菜单
export const userMenusByRoleIdRequest = (id: number) => {
  return pkRequest.get({
    url: `/role/${id}/menu`
  })
}
