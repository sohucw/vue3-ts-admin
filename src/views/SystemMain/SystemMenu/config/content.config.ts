const contentConfig = {
  pageName: 'menu',
  header: {
    title: '菜单列表',
    btnText: '新建菜单'
  },
  tableItems: [
    //1.2. selection 和 索引
    {
      prop: 'name',
      initialValue: '',
      label: '系统总览',
      slotName: 'roleMenu'
    },
    {
      type: 'normal',
      prop: 'type',
      initialValue: '',
      label: '级别'
    },
    {
      type: 'normal',
      prop: 'url',
      initialValue: '',
      label: '菜单url'
    },
    {
      type: 'normal',
      prop: 'icon',
      initialValue: '',
      label: '菜单icon'
    },
    {
      type: 'normal',
      prop: 'sort',
      initialValue: '',
      label: '排序',
      align: 'center'
    },
    {
      type: 'normal',
      prop: 'permission',
      initialValue: '',
      label: '权限'
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
      headerAlign: 'center',
      fixed: 'right'
    }
  ],
  childrenTree: {
    rowKey: 'id',
    treeProps: {
      children: 'children',
      hasChildren: 'hasChildren'
    }
  }
}
export default contentConfig
