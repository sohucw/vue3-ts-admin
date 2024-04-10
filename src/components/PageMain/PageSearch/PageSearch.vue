<script setup lang="ts">
import { usePermissions } from '@/hooks/usePermission'
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'
// 数据导入
interface IProps {
  searchConfig: {
    pageName: string
    formItems: any[]
  }
}
const props = defineProps<IProps>()
// 权限查询
const isQuery = usePermissions(`${props.searchConfig.pageName}:query`)
// 自定义事件 :查询点击 重置点击
const emits = defineEmits(['queryClick', 'resetClick'])
const searchFormRef = ref<InstanceType<typeof ElForm>>()
// 字段根据服务器返回值
const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ''
}
const searchFormData = reactive(initialForm)

// 重置
const handleResetClick = () => {
  searchFormRef.value?.resetFields()
  // 重置之后，也要发送网络请求
  emits('resetClick')
}

const handleSearchClick = () => {
  // 点击 查询 得到查询结果 要展示在usercontent的表格上
  // 兄弟组件之间的事件传递
  // 点击后 点击事件 传递给 父组件 再由父组件 完成
  emits('queryClick', searchFormData)
}
</script>
<template>
  <div class="search-section" v-if="isQuery">
    <!-- form -->
    <el-form size="large" label-width="80px" ref="searchFormRef" :model="searchFormData">
      <el-row :gutter="10">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" prop="item.name">
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  type="daterange"
                  v-model="searchFormData[item.prop]"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-model="searchFormData[item.prop]"
                  style="width: 100%"
                >
                  <template v-for="op in item.options" :key="op.value">
                    <el-option :label="op.label" :value="op.value"></el-option>
                  </template>
                </el-select>
              </template>
              <template v-else>
                <el-input
                  :placeholder="item.placeholder"
                  v-model="searchFormData[item.prop]"
                ></el-input>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <!-- btns -->
    <div class="search-btns">
      <el-button size="default" icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button size="default" type="primary" icon="Search" @click="handleSearchClick"
        >查询</el-button
      >
    </div>
  </div>
</template>
<style scoped lang="less">
.search-section {
  background-color: #ffffff;
  padding: 15px;
  box-sizing: border-box;

  .el-form-item {
    margin: 15px 0;
  }
  .search-btns {
    text-align: right;
    padding: 0 50px 10px 0;
  }
}
</style>
