import { getEntriesDatas } from '@/service/modules/main/main'
import { defineStore } from 'pinia'
interface IMainState {
  entriesRoles: any[]
  entriesDepartments: any[]
  entriesMenus: any[]
}

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entriesRoles: [],
    entriesDepartments: [],
    entriesMenus: []
  }),
  actions: {
    //   角色 和 部门 完整菜单
    fecthEntiresDataAction() {
      this.getRolesEntriesDatas('role')
      this.getDepartmentsEntriesData('department')
      this.getMenusEntriesData('menu')
    },
    async getRolesEntriesDatas(path: string) {
      const res = await getEntriesDatas(path)
      this.entriesRoles = res.data?.list
    },
    async getDepartmentsEntriesData(path: string) {
      const res = await getEntriesDatas(path)
      this.entriesDepartments = res.data?.list
    },
    async getMenusEntriesData(path: string) {
      const res = await getEntriesDatas(path)
      this.entriesMenus = res.data?.list
    }
  }
})

export default useMainStore
