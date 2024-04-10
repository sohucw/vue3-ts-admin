<script setup lang="ts">
import { computed } from 'vue'
import BaseEchart from './BaseEchart.vue'
import type { EChartsOption } from 'echarts'

interface IPieProps {
  showGoodsCategoryCount: any[]
}
const props = defineProps<IPieProps>()
const option = computed<EChartsOption>(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      itemWidth: 20,
      itemHeight: 10,
      orient: 'horizontal',
      itemGap: 5,
      padding: [0, 5]
    },
    series: [
      {
        name: '数量',
        type: 'pie',
        radius: '50%',
        labelLine: {
          show: true,
          length: 10,
          length2: 20,
          smooth: true
        },
        data: props.showGoodsCategoryCount,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>
<template>
  <div class="pie-echart">
    <BaseEchart :option="option"></BaseEchart>
  </div>
</template>
<style scoped lang="less"></style>
