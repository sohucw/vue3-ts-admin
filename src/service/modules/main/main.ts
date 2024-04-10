import pkRequest from '@/service'

//
export const getEntriesDatas = (path: string) => {
  return pkRequest.post({
    url: `/${path}/list`
  })
}

export const newDataAddRequest = (url: string, queryInfo: any) => {
  return pkRequest.post({
    url: `/${url}`,
    data: queryInfo
  })
}

export const updateDataRequest = (url: string, id: number, queryInfo: any) => {
  return pkRequest.patch({
    url: `/${url}/${id}`,
    data: queryInfo
  })
}

export const deleteDataRequest = (url: string, id: number) => {
  return pkRequest.delete({
    url: `/${url}/${id}`
  })
}

export const postListDataRequest = (url: string, queryInfo: any) => {
  return pkRequest.post({
    url: `/${url}/list`,
    data: queryInfo
  })
}
