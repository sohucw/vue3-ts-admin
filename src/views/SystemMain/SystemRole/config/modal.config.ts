import type { IModalConfig } from '@/components/PageMain/PageModal/type'
const modalConfig: IModalConfig = {
  pageName: 'role',
  header: {
    newTitle: '新建角色',
    editTitle: '编辑角色'
  },
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '角色名称',
      placeholder: '请输入角色名称',
      initialValue: ''
    },
    {
      type: 'input',
      prop: 'intro',
      label: '权限介绍',
      placeholder: '请输入权限介绍',
      initialValue: ''
    },
    {
      type: 'custom',
      slotName: 'menu',
      label: '设置权限',
      initialValue: ''
    }
  ]
}
export default modalConfig
