<script setup lang="ts">
import { useLoginStore } from '@/store/login/login'
import { mapPathToMenu } from '@/utils/map-menus'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus

const router = useRouter()
const goMenuMain = (url: string) => {
  router.push(url)
}
defineProps({
  isFoldMenu: {
    type: Boolean,
    default: false
  }
})
// elmenu默认default-active
// 1.第一次进入 第一个 核心技术
// 2.刷新进入的时候 根据路径匹配侧边栏菜单的 active
const route = useRoute()

const defaultActive = computed(() => {
  const pathMenu = mapPathToMenu(route.path, userMenus)
  return pathMenu.id + ''
})
</script>
<template>
  <div class="menu">
    <div class="main-top">
      <h1 class="main-title" v-if="!isFoldMenu">Vue3 +TS </h1>
    </div>
    <el-menu
      active-text-color="#ffffff"
      background-color="#3730A3"
      class="el-menu-vertical-demo"
      :default-active="defaultActive"
      text-color="#DDD6FE"
      :collapse="isFoldMenu"
      collapse-transition="false"
    >
      <template v-for="item in userMenus" :key="item.id">
        <el-sub-menu :index="item.id + ''">
          <template #title>
            <el-icon>
              <component :is="item.icon.split('el-icon-')[1]"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <template v-for="child in item.children" :key="child.id">
            <el-menu-item :index="child.id + ''" @click="goMenuMain(child.url)">{{
              child.name
            }}</el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>
<style scoped lang="less">
.menu {
  height: 100%;
  background-color: #001529;
  .main-top {
    display: flex;
    justify-items: center;
    align-items: center;
    height: 50px;
    .main-title {
      flex: 1;
      font-size: 20px;
      font-weight: bold;
      color: #ffffff;
    }
  }
  .el-menu {
    border-right: none;
  }
  .el-menu-item.is-active {
    font-weight: bold;
    background-color: #25226d;
  }
}
</style>
