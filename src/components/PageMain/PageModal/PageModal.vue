<script setup lang="ts">
import { useSystemStore } from '@/store/main/system/system'
import { reactive, ref } from 'vue'

const dialogVisible = ref(false)
// 数据、类型导入
import type { IModalProps } from './type'
const props = defineProps<IModalProps>()
// 定义内部的属性
const initialForm: any = {}
// 初始化formData 因为modal一开始就是false的 不渲染初始值
for (const item of props.modalConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ''
}
const formData = reactive<any>(initialForm)
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
      const item = props.modalConfig.formItems.find((item: any) => item.prop === key)
      formData[key] = item ? item.initialValue : ''
    }
    editData.value = null
  }
}
// 确定 判断是新建还是编辑
const systemStore = useSystemStore()
const handleConfirmClick = () => {
  dialogVisible.value = false
  // console.log(formData)
  let infoData = { ...formData }
  if (props.otherInfo) {
    infoData = { ...formData, ...props.otherInfo }
  }
  if (!isNewRef.value && editData.value) {
    const id = editData.value.id
    systemStore.fetchUpdateDataRequestAction(props.modalConfig.pageName, id, infoData)
  } else {
    systemStore.fetchNewDataAddRequestAction(props.modalConfig.pageName, infoData)
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
      :title="isNewRef ? props.modalConfig.header?.newTitle : props.modalConfig.header?.editTitle"
      width="30%"
      center
    >
      <el-form :model="formData" label-width="100px">
        <template v-for="item in modalConfig.formItems" :key="item.prop">
          <template v-if="item.type === 'password'">
            <el-form-item v-if="isNewRef" :label="item.label" :prop="item.prop">
              <el-input v-model="formData.password" show-password></el-input>
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  type="daterange"
                  v-model="formData[item.prop]"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-model="formData[item.prop]"
                  style="width: 100%"
                >
                  <template v-for="op in item.options" :key="op.value">
                    <el-option :label="op.label" :value="op.value"></el-option>
                  </template>
                </el-select>
              </template>
              <template v-else-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
              <template v-else>
                <el-input :placeholder="item.placeholder" v-model="formData[item.prop]"></el-input>
              </template>
            </el-form-item>
          </template>
        </template>
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
