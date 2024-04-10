<script setup lang="ts">
import { computed } from 'vue'
import { useAnalysisStore } from '@/store/main/analysis/analysis'
import { storeToRefs } from 'pinia'
import CountCard from './DashCpns/CountCard/CountCard.vue'
import EchartCard from './DashCpns/EchartCard/EchartCard.vue'
import {
  PieChart,
  LineEchart,
  RoseEchart,
  BarEchart,
  MapEchart
} from '@/components/PageEcharts/index'

// 获取count部分的数据
const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysisDataAction()
const { countLists, goodsCategoryCount, salesCount, favorsCount, citiesGoodsCount } =
  storeToRefs(analysisStore)

const showGoodsCategoryCount = computed(() => {
  return goodsCategoryCount.value.map((item) => {
    return {
      name: item.name,
      value: item.goodsCount
    }
  })
})
const showGoodsCategorySale = computed(() => {
  const labels = salesCount.value.map((item) => item.name)
  const values = salesCount.value.map((item) => item.goodsCount)
  return { labels, values }
})
const showGoodsCateFavor = computed(() => {
  const labels = favorsCount.value.map((item) => item.name)
  const values = favorsCount.value.map((item) => item.goodsFavor)
  return { labels, values }
})
const showCitiesGoodsCount = computed(() => {
  return citiesGoodsCount.value.map((item) => {
    return {
      name: item.address,
      value: item.count
    }
  })
})
</script>
<template>
  <div class="dashboard">
    <!-- 1.顶部数字：数据展示 -->

    <el-row :gutter="10">
      <template v-for="item in countLists" :key="item.amount">
        <el-col :span="6" :xs="24" :sm="12" :md="6">
          <CountCard v-bind="item"></CountCard>
        </el-col>
      </template>
    </el-row>
    <!-- echarts部分 -->
    <div class="echarts">
      <el-row :gutter="10">
        <el-col :span="7" :xs="24" :sm="12" :md="7">
          <EchartCard title="分类商品数量(饼图)">
            <template #echarts>
              <PieChart :showGoodsCategoryCount="showGoodsCategoryCount"></PieChart>
            </template>
          </EchartCard>
        </el-col>
        <el-col :span="10" :xs="24" :sm="12" :md="10">
          <EchartCard title="不同城市商品销量">
            <template #echarts>
              <MapEchart :showCitiesGoodsCount="showCitiesGoodsCount"></MapEchart>
            </template>
          </EchartCard>
        </el-col>
        <el-col :span="7" :xs="24" :sm="12" :md="7">
          <EchartCard title="分类商品数量(玫瑰图)">
            <template #echarts>
              <RoseEchart
                seriesName="数量"
                :showGoodsCategoryCount="showGoodsCategoryCount"
              ></RoseEchart>
            </template>
          </EchartCard>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <EchartCard title="分类商品的销量">
            <template #echarts>
              <LineEchart :showGoodsCategorySale="showGoodsCategorySale"></LineEchart>
            </template>
          </EchartCard>
        </el-col>
        <el-col :span="12">
          <EchartCard title="分类商品的收藏">
            <template #echarts>
              <BarEchart :showGoodsCateFavor="showGoodsCateFavor"></BarEchart>
            </template>
          </EchartCard>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped lang="less">
.dashboard {
  border-radius: 7px;
  overflow: hidden;
  .echarts {
    margin: 10px 0;
    .el-row {
      margin: 10px 0;
    }
  }
}
</style>
