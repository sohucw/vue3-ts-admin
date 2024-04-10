import pkRequest from '@/service'

export const postAllUserLists = (queryInfo: any) => {
  return pkRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}
export const deleteUserById = (id: number) => {
  return pkRequest.delete({
    url: `/users/${id}`
  })
}
