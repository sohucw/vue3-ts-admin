<script setup lang="ts">
import BaseEchart from './BaseEchart.vue'
import type { EChartsOption } from 'echarts'
import { computed } from 'vue'

interface IPieProps {
  showGoodsCategoryCount: any[]
  seriesName?: string
}
const props = defineProps<IPieProps>()
const option = computed<EChartsOption>(() => {
  return {
    title: {},
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      show: false
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: props.seriesName,
        type: 'pie',
        radius: [5, 80],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 5
        },
        data: props.showGoodsCategoryCount,
        labelLine: {
          show: true,
          length: 5,
          length2: 10
        },
        startAngle: 45
      }
    ]
  }
})
</script>
<template>
  <div class="rose-pie">
    <BaseEchart :option="option"></BaseEchart>
  </div>
</template>
<style scoped lang="less"></style>
