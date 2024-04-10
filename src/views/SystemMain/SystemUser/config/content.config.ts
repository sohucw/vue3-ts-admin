const contentConfig = {
  pageName: 'users',
  header: {
    title: '用户列表',
    btnText: '新建用户'
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
      label: '用户名',
      initialValue: '',
      align: 'center',
      headerAlign: 'center'
    },
    {
      type: 'normal',
      prop: 'realname',
      label: '真实姓名',
      initialValue: '',
      align: 'center',
      headerAlign: 'center'
    },
    {
      type: 'normal',
      prop: 'cellphone',
      label: '电话',
      initialValue: '',
      align: 'center',
      headerAlign: 'center'
    },
    {
      type: 'custom',
      prop: 'enable',
      label: '状态',
      initialValue: '',
      align: 'center',
      headerAlign: 'center',
      slotName: 'enable'
    },
    {
      type: 'timer',
      prop: 'createAt',
      label: '创建时间',
      initialValue: '',
      align: 'center',
      headerAlign: 'center'
    },
    {
      type: 'timer',
      prop: 'updateAt',
      label: '更新时间',
      initialValue: '',
      align: 'center',
      headerAlign: 'center'
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
