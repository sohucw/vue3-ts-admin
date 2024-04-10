<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useSystemStore } from '@/store/main/system/system'

import { formatUTC } from '@/utils/format'

import { usePermissions } from '@/hooks/usePermission'

// 获取数据信息
interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnText?: string
    }
    tableItems: any[]
    childrenTree?: any
  }
}
const props = defineProps<IProps>()
const systemStore = useSystemStore()
// 自定义事件
const emits = defineEmits(['modalClick', 'editClick'])

// 获取是否对数据有增删改查的权限

const isCreate = usePermissions(`${props.contentConfig.pageName}:create`)
const isUpdate = usePermissions(`${props.contentConfig.pageName}:update`)
const isDelete = usePermissions(`${props.contentConfig.pageName}:delete`)
const isQuery = usePermissions(`${props.contentConfig.pageName}:query`)

// 定义函数用于 ===> 发送网络请求
// 分页相关currentPage/ pageSize
const currentPage = ref(1)
const pageSize = ref(5)
const fetchPageListData = (formData: any = {}) => {
  // 没有查询数据的权限
  if (!isQuery) return
  // console.log(pageSize.value, currentPage.value)
  // 获取size和offset(偏移)
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  // 真正发送网络请求
  const pageInfo = { size, offset }
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.fetchPostListDataRequestAction(props.contentConfig.pageName, queryInfo)
}

// 监听systemStore中的actions被执行
systemStore.$onAction(({ name, after }) => {
  // 用户操作：取消的话就不用
  after(() => {
    if (
      name === 'deleteUserByIdAction' ||
      name === 'fetchUpdateDataRequestAction' ||
      name === 'fetchNewDataAddRequestAction'
    ) {
      currentPage.value = 1
    }
  })
})
// 调起 action,请求dataLists数据
fetchPageListData()

// 获取dataLists数据
const { dataLists, dataTotal } = storeToRefs(systemStore)

// 操作：编辑按钮
const editClick = (itemData: any) => {
  emits('editClick', itemData)
  // console.log('编辑', itemData)
}
// 操作：删除按钮
const deleteClick = (row: any) => {
  const { id } = row
  systemStore.fetchDeleteDataRequestAction(props.contentConfig.pageName, id)
}

// 分页
const pageSizeChange = () => {
  fetchPageListData()
}
const currentPageChange = () => {
  fetchPageListData()
}
// 新建 编辑
const newAddData = () => {
  emits('modalClick')
}

defineExpose({
  fetchPageListData
})
</script>
<template>
  <div class="user-content">
    <!-- title -->
    <div class="content-title">
      <h3 class="title">
        {{ contentConfig?.header?.title ?? '数据列表' }}
      </h3>
      <template v-if="isCreate">
        <el-button class="addbtn" type="primary" @click="newAddData">
          {{ contentConfig?.header?.btnText ?? '新建数据' }}
        </el-button>
      </template>
    </div>
    <!-- datashow -->
    <div class="content-data">
      <el-table
        :data="dataLists"
        style="width: 100%"
        border
        table-layout="auto"
        fix
        v-bind="props.contentConfig.childrenTree"
      >
        <template v-for="item in contentConfig.tableItems" :key="item">
          <template v-if="item.type === 'timer'">
            <el-table-column v-bind="item" align="center" header-align="center">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column :label="item.label" v-bind="item" header-align="center" align="center">
              <template #default="scope">
                <div class="btn-cell">
                  <el-button
                    v-if="isUpdate"
                    text
                    size="small"
                    type="primary"
                    icon="edit"
                    @click="editClick(scope.row)"
                    >编辑</el-button
                  >
                  <el-button
                    text
                    v-if="isDelete"
                    size="small"
                    type="danger"
                    icon="delete"
                    @click="deleteClick(scope.row)"
                    >删除</el-button
                  >
                </div>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column v-bind="item">
              <!-- 具名插槽 -->
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column v-bind="item"></el-table-column>
          </template>
        </template>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="data-pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20]"
        layout="total,sizes,prev, pager, next,jumper"
        :total="dataTotal"
        @size-change="pageSizeChange"
        @current-change="currentPageChange"
        hide-on-single-page
      />
    </div>
  </div>
</template>
<style scoped lang="less">
.user-content {
  padding: 15px;
  background-color: #ffffff;
  margin-top: 10px;
  box-sizing: border-box;
  .content-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-weight: 900;
    }
    .addbtn {
      font-weight: 900;
    }
  }
  .content-data {
    padding: 15px 0;

    .el-table {
      z-index: 0;
    }
    .btn-cell {
      display: flex;
      justify-content: center;
    }
  }
  .data-pagination {
    display: flex;
    align-items: center;
    justify-content: end;
    margin-top: 30px;
  }
  .message-box {
    z-index: 99;
  }
}
</style>
