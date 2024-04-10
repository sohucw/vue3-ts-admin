const contentConfig = {
  pageName: 'category',
  header: {
    title: '商品分类列表',
    btnText: '新建分类'
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
      label: '商品名称',
      initialValue: '',
      align: 'center',
      headerAlign: 'center'
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
      label: '修改时间',
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
      headerAlign: 'center',
      width: '190px'
    }
  ]
}
export default contentConfig
