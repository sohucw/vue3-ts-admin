const searchConfig = {
  pageName: 'goods',
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '类别名称',
      placeholder: '请输入类别名称',
      initialValue: ''
    },
    {
      type: 'input',
      prop: 'address',
      label: '商品地址',
      placeholder: '请输入商品地址',
      initialValue: ''
    },
    {
      type: 'select',
      prop: 'status',
      label: '状态',
      placeholder: '请选择商品状态',
      initialValue: '',
      options: []
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间',
      initialValue: ''
    }
  ]
}
export default searchConfig
