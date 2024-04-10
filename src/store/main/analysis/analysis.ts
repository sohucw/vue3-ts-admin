import {
  getAmountListData,
  getCatetoryGoodsCount,
  getCitiesGoodsCount,
  getGoodsFavorCount,
  getGoodsSalesCount
} from '@/service/modules/main/analysis/analysis'
import { defineStore } from 'pinia'

interface IAnalysis {
  countLists: any[]
  goodsCategoryCount: any[]
  citiesGoodsCount: any[]
  favorsCount: any[]
  salesCount: any[]
}
export const useAnalysisStore = defineStore('analysis', {
  state: (): IAnalysis => ({
    countLists: [],
    goodsCategoryCount: [],
    citiesGoodsCount: [],
    favorsCount: [],
    salesCount: []
  }),
  actions: {
    fetchAnalysisDataAction() {
      this.getAmountListDataAction()
      this.getCatetoryGoodsCountAction()
      this.getCitiesGoodsCountAction()
      this.getGoodsFavorCountAction()
      this.getGoodsSalesCountAction()
    },
    async getAmountListDataAction() {
      const amountRes = await getAmountListData()
      this.countLists = amountRes.data
    },
    async getCatetoryGoodsCountAction() {
      const goodsCategoryCountRes = await getCatetoryGoodsCount()
      this.goodsCategoryCount = goodsCategoryCountRes.data
    },
    async getCitiesGoodsCountAction() {
      const citesRes = await getCitiesGoodsCount()
      this.citiesGoodsCount = citesRes.data
    },
    async getGoodsFavorCountAction() {
      const favorsRes = await getGoodsFavorCount()
      this.favorsCount = favorsRes.data
    },
    async getGoodsSalesCountAction() {
      const saleRes = await getGoodsSalesCount()
      this.salesCount = saleRes.data
    }
  }
})
