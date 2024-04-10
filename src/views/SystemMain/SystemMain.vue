<script setup lang="ts">
import MainMenu from '@/components/MainMenu/MainMenu.vue'
import MainHeader from '@/components/MainHeader/MainHeader.vue'
import { ref } from 'vue'
// 处理header中子组件的自定义事件 collsape
const isFoldMenu = ref(false)
const handleFlodChange = (isFold: boolean) => {
  isFoldMenu.value = isFold
}
</script>
<template>
  <div class="main">
    <div class="common-layout">
      <el-container>
        <el-aside :width="isFoldMenu ? '60px' : '190px'">
          <MainMenu :isFoldMenu="isFoldMenu"></MainMenu>
        </el-aside>
        <el-container>
          <el-header height="50px">
            <main-header @fold-change="handleFlodChange"></main-header>
          </el-header>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<style scoped lang="less">
.main {
  height: 100%;
  .common-layout {
    height: inherit;
    .el-container {
      height: inherit;
    }
    .el-aside {
      overflow-x: hidden;
      overflow-y: auto;
      text-align: left;
      cursor: pointer;
      transition: width 0.3s linear;
      scrollbar-width: none;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        display: none;
      }
      // line-height: 200px;
    }
    .el-header {
      background-color: #ffffff;
      box-shadow: 0 0 5px #f5f5f5;
      border-bottom: 1px solid #f8f8f8;
    }
    .el-main {
      background-color: #f5f5f5;
    }
  }
}
</style>
