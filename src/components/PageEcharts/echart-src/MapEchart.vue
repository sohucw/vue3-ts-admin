<script setup lang="ts">
import { computed } from 'vue'
import BaseEchart from './BaseEchart.vue'
import type { EChartsOption } from 'echarts'
import type { IEchartValueType } from '../types'
import { convertData } from '../utils/convert-data'

interface IMapProps {
  showCitiesGoodsCount: IEchartValueType[]
}
const props = defineProps<IMapProps>()
const option = computed<EChartsOption>((): any => {
  return {
    title: {},
    tooltip: {
      trigger: 'item',
      formatter: function (params: any) {
        return params.name + ':' + params.value[2]
      }
    },
    legend: {},
    visualMap: {
      min: 0,
      max: 60000,
      left: 20,
      bottom: 20,
      calculabel: true,
      text: ['高', '低'],
      inRange: {
        color: ['rgb(70,240,252)', 'rgb(255,220,46)', 'rgb(245,38,186)']
      },
      textStyle: {
        color: '#fff'
      }
    },
    geo: {
      map: 'china',
      roam: 'scale',
      emphasis: {
        areaColor: '#f4cccc',
        borderColor: 'rgb(9,54,95)',
        itemStyle: {
          areaColor: 'f4cccc'
        }
      }
    },
    series: [
      {
        name: '',
        type: 'scatter',
        coordinateSystem: 'geo',
        map: 'china',
        data: convertData(props.showCitiesGoodsCount),
        symbolSize: 12,
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
  <div class="map-echart">
    <BaseEchart :option="option"></BaseEchart>
  </div>
</template>
<style scoped lang="less"></style>
