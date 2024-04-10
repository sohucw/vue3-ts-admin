<script setup lang="ts">
import { localCache } from '@/utils/cache'
import { Avatar, Iphone } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import LoginAccount from './LoginAccount.vue'
import LoginPhone from './LoginPhone.vue'

const activeName = ref<string>('account')
// 记住密码
const isRemeberPwd = ref<boolean>(localCache.getCache('isRemeberPwd') ?? false)
watch(isRemeberPwd, (newValue) => {
  localCache.setCache('isRemeberPwd', newValue)
})
//type LoginAccount =  InstanceType<typeof LoginAccount> 直接不能用LoginAccount
const loginRef = ref<InstanceType<typeof LoginAccount>>()
const handleLoginBtnClick = () => {
  // 识别 是 账号登录 还是 手机登录
  if (activeName.value === 'account') {
    console.log('用户在进行帐号登录')
    // console.table(loginRef.value.accountForm)
    loginRef.value?.loginAction(isRemeberPwd.value)
    // 记住密码
  } else {
    console.log('用户在进行手机登录')
  }
}
</script>
<template>
  <div class="login">
    <div class="login_box">
      <h1>后台管理系统</h1>
      <el-tabs v-model="activeName" type="border-card" class="demo-tabs" stretch>
        <el-tab-pane name="account">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon size="16"><Avatar /></el-icon>
              <span>帐号登录</span>
            </span>
          </template>
          <LoginAccount ref="loginRef"></LoginAccount>
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon size="16"><Iphone /></el-icon>
              <span>手机登录</span>
            </span>
          </template>
          <LoginPhone></LoginPhone>
        </el-tab-pane>
      </el-tabs>
      <div class="loginbtn-box">
        <div class="pwd-box">
          <el-checkbox v-model="isRemeberPwd">记住密码</el-checkbox>
          <el-text type="primary">忘记密码</el-text>
        </div>
        <el-button class="loginbtn" @click="handleLoginBtnClick" type="primary">登录</el-button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.login {
  width: 100%;
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(@/assets/img/login-bg.svg);
  .login_box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 300px;
    h1 {
      font-weight: 900;
      padding-bottom: 20px;
    }
    .demo-tabs {
      width: 100%;
      .el-tabs__item {
        flex: 1;
      }
      .custom-tabs-label {
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          padding: 0 10px;
        }
      }
    }
    .loginbtn-box {
      margin: 12px 0;
      width: 100%;
      .pwd-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .loginbtn {
        width: 100%;
        margin: 10px 0;
      }
    }
  }
}
</style>
