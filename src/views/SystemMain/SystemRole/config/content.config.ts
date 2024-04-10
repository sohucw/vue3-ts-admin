const contentConfig = {
  pageName: 'role',
  header: {
    title: '角色列表',
    btnText: '新建角色'
  },
  tableItems: [
    //1.2. selection 和 索引
    {
      type: 'selection',
      initialValue: '',
      label: '选择',
      width: '40px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      type: 'index',
      label: '序号',
      initialValue: '',
      width: '60px',
      align: 'center',
      headerAlign: 'center'
    },
    {
      type: 'normal',
      prop: 'name',
      label: '角色名称',
      initialValue: '',
      align: 'center',
      headerAlign: 'center'
    },
    {
      type: 'normal',
      label: '权限介绍',
      initialValue: '',
      align: 'center',
      headerAlign: 'center',
      prop: 'intro'
    },
    {
      type: 'timer',
      label: '创建时间',
      initialValue: '',
      align: 'center',
      headerAlign: 'center',
      prop: 'createAt'
    },
    {
      type: 'timer',
      label: '更新时间',
      initialValue: '',
      align: 'center',
      headerAlign: 'center',
      prop: 'updateAt'
    },
    {
      type: 'handler',
      label: '操作',
      initialValue: '',
      align: 'center',
      headerAlign: 'center'
    }
  ]
}
export default contentConfig
