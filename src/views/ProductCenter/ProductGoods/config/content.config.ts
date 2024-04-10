const contentConfig = {
  pageName: 'goods',
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
      headerAlign: 'center',
      fixed: 'left'
    },
    {
      type: 'index',
      label: '序号',
      initialValue: '',
      width: '60px',
      align: 'center',
      headerAlign: 'center',
      fixed: 'left'
    },
    {
      type: 'normal',
      prop: 'name',
      label: '商品名称',
      initialValue: '',
      align: 'center',
      headerAlign: 'center',
      showOverflowTooltip: true,
      width: '200',
      fixed: 'left'
    },
    {
      type: 'normal',
      prop: 'oldPrice',
      label: '原始价',
      initialValue: '',
      align: 'center',
      headerAlign: 'center',
      width: '100px'
    },
    {
      type: 'normal',
      prop: 'newPrice',
      label: '新价格',
      initialValue: '',
      align: 'center',
      headerAlign: 'center',
      width: '100px'
    },
    {
      type: 'normal',
      prop: 'desc',
      label: '商品描述',
      initialValue: '',
      align: 'center',
      headerAlign: 'center',
      showOverflowTooltip: true,
      width: '200'
    },
    {
      type: 'normal',
      prop: 'status',
      label: '状态',
      initialValue: '',
      align: 'center',
      headerAlign: 'center',
      width: '60'
    },
    {
      type: 'custom',
      prop: 'imgUrl',
      label: '图片',
      initialValue: '',
      align: 'center',
      headerAlign: 'center',
      slotName: 'imgSmall'
    },
    {
      type: 'normal',
      prop: 'inventoryCount',
      label: '库存',
      initialValue: '',
      align: 'center',
      headerAlign: 'center',
      width: '100'
    },
    {
      type: 'normal',
      prop: 'saleCount',
      label: '销量',
      initialValue: '',
      align: 'center',
      headerAlign: 'center',
      minWidth: '100'
    },
    {
      type: 'normal',
      prop: 'favorCount',
      label: '收藏',
      initialValue: '',
      align: 'center',
      headerAlign: 'center',
      minWidth: '100'
    },
    {
      type: 'normal',
      prop: 'address',
      label: '地址',
      initialValue: '',
      align: 'center',
      headerAlign: 'center',
      minWidth: '200'
    },
    {
      type: 'timer',
      label: '创建时间',
      initialValue: '',
      align: 'center',
      headerAlign: 'center',
      prop: 'createAt',
      width: '180'
    },
    {
      type: 'timer',
      label: '修改时间',
      initialValue: '',
      align: 'center',
      headerAlign: 'center',
      prop: 'updateAt',
      width: '180'
    },
    {
      type: 'handler',
      label: '操作',
      initialValue: '',
      align: 'center',
      headerAlign: 'center',
      width: '190px',
      fixed: 'right'
    }
  ]
}
export default contentConfig
