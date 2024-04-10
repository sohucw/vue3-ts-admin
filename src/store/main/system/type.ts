export interface IUser {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  departmentId: number
  roleId: number
  createAt: string
  updateAt: string
}
export interface ISystemState {
  userLists: IUser[]
  totalCount: number
  dataLists: any[]
  dataTotal: 0
}
