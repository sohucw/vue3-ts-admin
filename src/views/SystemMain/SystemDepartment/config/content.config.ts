const contentConfig = {
  pageName: 'department',
  header: {
    title: '部门列表',
    btnText: '新建部门'
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
      label: '部门名称',
      initialValue: '',
      align: 'center',
      headerAlign: 'center'
    },
    {
      type: 'normal',
      label: '部门领导',
      initialValue: '',
      align: 'center',
      headerAlign: 'center',
      prop: 'leader'
    },
    {
      type: 'normal',
      label: '上级领导',
      initialValue: '',
      align: 'center',
      headerAlign: 'center',
      prop: 'parentId'
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
      type: 'handler',
      label: '操作',
      initialValue: '',
      align: 'center',
      headerAlign: 'center',
      width: '190px'
    }
  ]
}
export default contentConfig
