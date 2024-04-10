import type { IModalConfig } from '@/components/PageMain/PageModal/type'
const modalConfig: IModalConfig = {
  pageName: 'department',
  header: {
    newTitle: '新建部门',
    editTitle: '编辑部门'
  },
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '部门名称',
      placeholder: '请输入部门名称',
      initialValue: ''
    },

    {
      type: 'input',
      prop: 'leader',
      label: '部门领导',
      placeholder: '请输入领导名称',
      initialValue: ''
    },
    {
      type: 'select',
      prop: 'parentId',
      label: '选择部门',
      placeholder: '请选择部门',
      options: [],
      initialValue: ''
    }
  ]
}
export default modalConfig
