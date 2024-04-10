<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

// 注册map
import chinaJSON from '../data/china.json'
echarts.registerMap('china', chinaJSON as any)

interface IProp {
  option: EChartsOption
}
const props = defineProps<IProp>()
const echartRef = ref<HTMLElement>()

onMounted(() => {
  const echartInstance = echarts.init(echartRef.value!, 'light', {
    renderer: 'canvas'
  })
  // 第一次进入setOption 监听option变化
  watchEffect(() => echartInstance.setOption(props.option))
  // 监听window的缩放
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })
})
</script>
<template>
  <div class="base-echart">
    <div class="echart" ref="echartRef"></div>
  </div>
</template>
<style scoped lang="less">
.base-echart {
  background-color: #ffffff;
  .echart {
    height: 300px;
  }
}
</style>
