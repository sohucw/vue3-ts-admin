<script setup lang="ts">
import { useSystemStore } from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const systemStore = useSystemStore()
// 自定义事件
const emits = defineEmits(['modalClick', 'editClick'])
// 定义函数用于 ===> 发送网络请求
// 分页相关currentPage/ pageSize
const currentPage = ref(1)
const pageSize = ref(5)
const fetchPageListData = (formData: any = {}) => {
  // console.log(pageSize.value, currentPage.value)
  // 获取size和offset(偏移)
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  // 真正发送网络请求
  const pageInfo = { size, offset }
  // 搜索

  // console.log('info:', info)
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.fetchPostListDataRequestAction('users', queryInfo)
}
// 调起 user的action,请求userlist数据
fetchPageListData()

// 获取userlists数据
const { dataLists, dataTotal } = storeToRefs(systemStore)

// 操作：编辑按钮
const editClick = (itemData: any) => {
  emits('editClick', itemData)
  // console.log('编辑', itemData)
}
// 操作：删除按钮
const deleteClick = (row: any) => {
  const { id } = row
  ElMessageBox.confirm('确定要删除吗?', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      // 发送删除网络请求
      systemStore.fetchDeleteDataRequestAction('users', id).then(() => {
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
      })
    })
    .catch(() => {
      ElMessage({
        type: 'warning',
        message: '取消删除'
      })
    })
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
      <h3 class="title">用户列表</h3>
      <el-button class="addbtn" type="primary" @click="newAddData">新建数据</el-button>
    </div>
    <!-- datashow -->
    <div class="content-data">
      <el-table :data="dataLists" style="width: 100%" border table-layout="auto" fix>
        <el-table-column type="selection" width="40px" />
        <el-table-column type="index" align="center" label="序号" width="60px" />
        <el-table-column prop="name" label="用户名" header-align="center" />
        <el-table-column prop="realname" label="真实姓名" header-align="center" />
        <el-table-column prop="cellphone" label="电话" align="center" header-align="center" />
        <el-table-column prop="enable" label="状态" align="center" header-align="center">
          <!-- 作用域插槽 -->
          <template #default="scope">
            <el-tag v-if="scope.row.enable === 1" type="success">启用 </el-tag>
            <el-tag v-else type="warning">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="departmentId" label="部门" align="center" header-align="center" />
        <el-table-column prop="roleId" label="角色" align="center" header-align="center" />
        <el-table-column prop="createAt" label="创建时间" align="center" header-align="center">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column prop="updateAt" label="更新时间" align="center" header-align="center">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" header-align="center" align="center">
          <template #default="scope">
            <div class="btn-cell">
              <el-button text size="small" type="primary" icon="edit" @click="editClick(scope.row)"
                >编辑</el-button
              >
              <el-button
                text
                size="small"
                type="danger"
                icon="delete"
                @click="deleteClick(scope.row)"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
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
