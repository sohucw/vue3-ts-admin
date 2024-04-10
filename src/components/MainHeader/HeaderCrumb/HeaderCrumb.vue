<script setup lang="ts">
import { useLoginStore } from '@/store/login/login'
import { mapPathToBreadCrumb } from '@/utils/map-menus'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userMenus = useLoginStore().userMenus
const breadcrumbs = computed(() => mapPathToBreadCrumb(route.path, userMenus))
</script>
<template>
  <div class="crumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in breadcrumbs" :key="item.id">
        <el-breadcrumb-item :to="item.url">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>
<style scoped lang="less">
.crumb {
}
</style>
