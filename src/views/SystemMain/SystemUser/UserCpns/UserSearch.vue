<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'
// 自定义事件 :查询点击 重置点击
const emits = defineEmits(['queryClick', 'resetClick'])
const searchFormRef = ref<InstanceType<typeof ElForm>>()
// 字段根据服务器返回值
const searchFormData = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: '',
  createAt: ''
})
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
  <div class="search-section">
    <!-- form -->
    <el-form size="large" label-width="80px" ref="searchFormRef" :model="searchFormData">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input placeholder="请输入用户名" v-model="searchFormData.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input placeholder="请输入真实姓名" v-model="searchFormData.realname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话号码" prop="cellphone">
            <el-input placeholder="请输入电话号码" v-model="searchFormData.cellphone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select placeholder="请选择状态" v-model="searchFormData.enable" style="width: 100%">
              <el-option label="启用" :value="1"></el-option>
              <el-option label="禁止" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              type="daterange"
              v-model="searchFormData.createAt"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col>
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
  .el-row {
  }
  .el-form-item {
    margin: 15px 0;
  }
  .search-btns {
    text-align: right;
    padding: 0 50px 10px 0;
  }
}
</style>
