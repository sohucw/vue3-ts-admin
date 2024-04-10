<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ElForm, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useLoginStore } from '@/store/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'

const accountForm = reactive<IAccount>({
  name: localCache.getCache('name') ?? 'coderwhy',
  password: localCache.getCache('password') ?? '123456'
})
// 校验规则
const AccountRules: FormRules = {
  name: [
    { required: true, message: '请输入正确的账户名称！', trigger: 'blur' },
    {
      pattern: /[a-z0-9]{6,20}$/,
      message: '帐号长度为6-20位数字或字母',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入正确的账户密码！', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度6-20位', trigger: 'blur' }
  ]
}
// 验证
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
// 登录逻辑

const loginAction = (isRemeberPwd: boolean) => {
  console.log('account login action function exection')
  formRef.value?.validate((valid, fields) => {
    if (valid) {
      // 1.获取用户的帐号和密码
      const { name, password } = accountForm
      // 2.向服务器发送网络请求
      loginStore.accountLoginAction({ name, password }).then((res) => {
        // 登录成功，是否 记住密码
        if (isRemeberPwd) {
          localCache.setCache('name', name)
          localCache.setCache('password', password)
        } else {
          localCache.removeCache('name')
          localCache.removeCache('password')
        }
      })
      console.log('验证成功!')
      //
    } else {
      ElMessage.error('请输入正确的帐号和密码！')
      console.log('验证失败！', fields)
    }
  })
}

defineExpose({
  loginAction
})
</script>
<template>
  <div class="account">
    <el-form
      ref="formRef"
      :rules="AccountRules"
      :model="accountForm"
      style="max-width: 460px"
      label-width="60"
      status-icon
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="accountForm.name" placeholder="请输入帐号" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="accountForm.password"
          show-password
          autocomplete="off"
          placeholder="请输入密码"
        />
      </el-form-item>
    </el-form>
  </div>
</template>
<style scoped lang="less">
.notice {
  margin-bottom: 20px;
}
</style>
