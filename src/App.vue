<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>
<template>
  <div class="home">
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>
<style scoped lang="less">
.home {
  width: 100%;
  height: 100vh;
}
</style>
