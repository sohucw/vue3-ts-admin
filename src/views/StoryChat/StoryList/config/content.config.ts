const contentConfig = {
  pageName: 'story',
  header: {
    title: '故事列表'
  },
  tableItems: [
    //1.2. selection 和 索引

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
      prop: 'title',
      label: '故事标题',
      initialValue: '',
      align: 'center',
      headerAlign: 'center',
      showOverflowTooltip: true,
      minWidth: '200'
    },
    {
      type: 'normal',
      prop: 'content',
      label: '故事内容',
      initialValue: '',
      align: 'center',
      headerAlign: 'center',
      showOverflowTooltip: true,
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
    }
  ]
}
export default contentConfig
