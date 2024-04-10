const searchConfig = {
  pageName: 'goods',
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '商品名称',
      initialValue: ''
    },
    {
      type: 'input',
      prop: 'oldPrice',
      label: '原始价',
      initialValue: '',
      align: 'center',
      headerAlign: 'center'
    },
    {
      type: 'input',
      prop: 'newPrice',
      label: '新价格',
      initialValue: ''
    },
    {
      type: 'input',
      prop: 'desc',
      label: '商品描述',
      initialValue: ''
    },
    {
      type: 'input',
      prop: 'status',
      label: '状态'
    },
    {
      type: 'input',
      prop: 'imgUrl',
      label: '图片'
    },
    {
      type: 'input',
      prop: 'inventoryCount',
      label: '库存'
    },
    {
      type: 'input',
      prop: 'saleCount',
      label: '销量'
    },
    {
      type: 'input',
      prop: 'favorCount',
      label: '收藏'
    },
    {
      type: 'input',
      prop: 'address',
      label: '地址'
    }
  ]
}
export default searchConfig
