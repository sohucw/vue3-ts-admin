<script setup lang="ts">
import { reactive } from 'vue'
interface typeFormPhone {
  phone: string
  validate: string
}
const fromPhone = reactive<typeFormPhone>({
  phone: '',
  validate: ''
})
</script>
<template>
  <div class="phone">
    <el-form :model="fromPhone" style="max-width: 460px" label-width="60" status-icon>
      <el-form-item label="手机号">
        <el-input v-model="fromPhone.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="验证码" class="validate-box">
        <el-input
          class="validate-input"
          type="text"
          v-model="fromPhone.validate"
          autocomplete="off"
        />
        <el-button class="validate-btn" type="primary">验证码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style scoped lang="less">
.validate-box {
  display: flex;
  flex-direction: row;
  .validate-input {
    flex: 1;
  }
  .validate-btn {
    width: 80px;
    box-sizing: border-box;
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>
