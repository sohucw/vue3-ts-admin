<script setup lang="ts">
interface Iprops {
  title: string
}
const props = defineProps<Iprops>()
</script>
<template>
  <div class="echarts-card">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span>{{ props.title }}</span>
        </div>
      </template>
      <div class="card-echarts">
        <slot name="echarts">echarts</slot>
      </div>
    </el-card>
  </div>
</template>
<style scoped lang="less">
.echarts-card {
  background-color: #ffffff;
}
</style>
