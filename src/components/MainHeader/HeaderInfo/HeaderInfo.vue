<script setup lang="ts">
import { TOKEN } from '@/global/constance'
import { useLoginStore } from '@/store/login/login'
import { localCache } from '@/utils/cache'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

// 个人信息
const loginStore = useLoginStore()
const { userInfo } = storeToRefs(loginStore)
// 退出登录
const router = useRouter()
const exitSystemClickBtn = () => {
  localCache.removeCache(TOKEN)
  router.push('/login')
}
</script>
<template>
  <div class="info-msgbox">
    <el-icon size="18"><Bell /></el-icon>
    <el-badge is-dot class="item">
      <el-icon size="18"><ChatDotRound /></el-icon>
    </el-badge>

    <el-icon size="18"><Postcard /></el-icon>
  </div>
  <div class="userinfo-box">
    <el-avatar
      class="user-avatar"
      size="32"
      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    />
    <el-dropdown size="large">
      <span class="el-dropdown-link">
        <span class="username">{{ userInfo.name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <el-icon><InfoFilled /></el-icon>
            个人信息
          </el-dropdown-item>
          <el-dropdown-item>
            <el-icon><Unlock /></el-icon>
            修改密码
          </el-dropdown-item>
          <el-dropdown-item divided @click="exitSystemClickBtn">
            <el-icon><SwitchButton /></el-icon>
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<style scoped lang="less">
.info-msgbox {
  display: flex;
  justify-items: center;
  align-items: center;
  box-sizing: border-box;
  .el-badge {
    font-size: 12px;
  }
  .el-icon {
    margin: 0 5px;
    cursor: pointer;
    display: block;
    :hover {
      background-color: antiquewhite;
    }
  }
}
.userinfo-box {
  display: flex;
  margin-left: 10px;
  align-items: center;
  cursor: pointer;
  .username {
    padding: 0 10px;
    font-size: 15px;
    cursor: pointer;
    outline: none;
  }
  .el-dropdown-link {
    display: flex;
    align-items: center;
    outline: none;
  }
}
</style>
