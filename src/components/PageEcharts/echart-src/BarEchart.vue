<script setup lang="ts">
import { computed } from 'vue'
import BaseEchart from './BaseEchart.vue'
import type { EChartsOption } from 'echarts'

//
interface IPieProps {
  showGoodsCateFavor: {
    labels: any[]
    values: any[]
  }
}
const props = defineProps<IPieProps>()
const option = computed<EChartsOption>(() => {
  return {
    title: {
      text: '支持鼠标滚动缩放'
    },
    tooltip: {
      show: true,
      trigger: 'item'
    },
    dataZoom: {
      start: 0,
      type: 'inside'
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        interval: 0
      },
      data: props.showGoodsCateFavor.labels
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: props.showGoodsCateFavor.values,
        type: 'bar',
        showBackground: true,

        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#6dd5ed' // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#2193b0' // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        },

        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.1)'
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
