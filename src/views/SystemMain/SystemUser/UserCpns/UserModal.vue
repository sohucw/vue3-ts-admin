<script setup lang="ts">
import useMainStore from '@/store/main/main'
import { useSystemStore } from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'

const dialogVisible = ref(false)

const formData = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  departmentId: '',
  roleId: ''
})
// 判断是新建还是编辑
const isNewRef = ref(true)
// 记录编辑的 id
const editData = ref()
// 可见方法
const setModalVisible = (isNew: boolean = true, itemData?: any) => {
  dialogVisible.value = true
  isNewRef.value = isNew
  if (!isNew && itemData) {
    // 编辑数据
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    // 新建空的
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = ''
  }
}
// 角色 部门
const mainStore = useMainStore()
const { entriesRoles, entriesDepartments } = storeToRefs(mainStore)
// 确定 判断是新建还是编辑
const systemStore = useSystemStore()
const handleConfirmClick = () => {
  // console.log(formData)
  dialogVisible.value = false
  if (isNewRef.value) {
    systemStore.fetchNewDataAddRequestAction('users', formData)
  } else {
    const id = editData.value.id
    systemStore.fetchUpdateDataRequestAction('users', id, formData)
  }
}
defineExpose({
  setModalVisible
})
</script>
<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建用户' : '编辑用户'"
      width="30%"
      center
    >
      <el-form :model="formData" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="密  码" v-if="isNewRef">
          <el-input v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="formData.realname"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="formData.cellphone"></el-input>
        </el-form-item>
        <el-form-item label="选择角色">
          <el-select v-model="formData.roleId" class="m-2" placeholder="选择角色">
            <template v-for="item in entriesRoles" :key="item.id">
              <el-option :label="item.name" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="选择部门">
          <el-select v-model="formData.departmentId" class="m-2" placeholder="选择角色">
            <template v-for="item in entriesDepartments" :key="item.id">
              <el-option :label="item.name" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<style scoped lang="less"></style>
