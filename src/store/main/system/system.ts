import {
  deleteDataRequest,
  newDataAddRequest,
  postListDataRequest,
  updateDataRequest
} from '@/service/modules/main/main'
import { deleteUserById, postAllUserLists } from '@/service/modules/main/system'
import { defineStore } from 'pinia'
import useMainStore from '../main'
import type { ISystemState } from './type'

export const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    userLists: [],
    totalCount: 0,
    dataLists: [],
    dataTotal: 0
  }),
  actions: {
    async postAllUserListsAction(queryInfo: any) {
      const userListRes = await postAllUserLists(queryInfo)
      const { list, totalCount } = userListRes.data
      this.userLists = list
      this.totalCount = totalCount
    },
    async deleteUserByIdAction(id: number) {
      const deleteRes = await deleteUserById(id)
      console.log(deleteRes)
      this.postAllUserListsAction({ size: 5, offset: 0 })
    },
    // 抽取的 增删改查
    async fetchPostListDataRequestAction(url: string, queryInfo: any) {
      const resData = await postListDataRequest(url, queryInfo)
      const { list, totalCount } = resData.data
      this.dataLists = list
      this.dataTotal = totalCount ?? 0
    },
    async fetchNewDataAddRequestAction(url: string, queryInfo: any) {
      // 创建新数据
      await newDataAddRequest(url, queryInfo)
      // 重新发送网络请求
      this.fetchPostListDataRequestAction(url, { size: 5, offset: 0 })
      // 再次获取完整的entries的数据：角色和部门
      this.fetchNewData()
    },
    async fetchUpdateDataRequestAction(url: string, id: number, queryInfo: any) {
      const res = await updateDataRequest(url, id, queryInfo)
      console.log(res)
      // 重新发送网络请求
      this.fetchPostListDataRequestAction(url, { size: 5, offset: 0 })
      this.fetchNewData()
    },
    async fetchDeleteDataRequestAction(url: string, id: number) {
      const res = await deleteDataRequest(url, id)
      console.log(res)
      this.fetchPostListDataRequestAction(url, { size: 5, offset: 0 })
      this.fetchNewData()
    },
    fetchNewData() {
      const mainStore = useMainStore()
      mainStore.fecthEntiresDataAction()
    }
  }
})
