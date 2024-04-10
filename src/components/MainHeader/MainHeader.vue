<script setup lang="ts">
import { ref } from 'vue'
import HeaderInfo from './HeaderInfo/HeaderInfo.vue'
import HeaderCrumb from './HeaderCrumb/HeaderCrumb.vue'
const emit = defineEmits(['foldChange'])
const isFold = ref(false)
const handleMenuIcon = () => {
  isFold.value = !isFold.value
  // 自定义事件
  emit('foldChange', isFold.value)
}
</script>
<template>
  <div class="main-header">
    <div class="collsape" @click="handleMenuIcon">
      <el-icon size="22">
        <component :is="isFold ? 'Expand' : 'Fold'"></component>
      </el-icon>
    </div>
    <div class="header-center">
      <HeaderCrumb></HeaderCrumb>
    </div>
    <div class="header-infobox">
      <HeaderInfo></HeaderInfo>
    </div>
  </div>
</template>
<style scoped lang="less">
.main-header {
  height: 100%;
  display: flex;
  justify-items: center;
  align-items: center;
  .collsape {
    display: flex;
  }
  .header-center {
    padding: 0 15px;
    box-sizing: border-box;
    flex: 1;
  }
  .header-infobox {
    display: flex;
  }
}
</style>
