<script lang="ts" setup>
interface Iprops {
  title: string
}
const props = defineProps<Iprops>()
</script>
<template>
  <div class="overview-card">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span class="title">{{ props.title }}</span>
        </div>
      </template>
      <slot name="content">content</slot>
    </el-card>
  </div>
</template>
<style scoped lang="less">
.overview-card {
  .box-card {
    .card-header {
      .title {
        font-weight: 900;
        font-size: 15px;
      }
    }
  }
}
</style>
