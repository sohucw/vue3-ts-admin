import pkRequest from '@/service'

export const getAmountListData = () => {
  return pkRequest.get({
    url: '/goods/amount/list'
  })
}
// echarts 展示数据
// 分类商品数量
export const getCatetoryGoodsCount = () => {
  return pkRequest.get({
    url: '/goods/category/count'
  })
}
// 分类商品数量（玫瑰图）
// 分类商品的销量
export const getGoodsSalesCount = () => {
  return pkRequest.get({
    url: '/goods/category/sale'
  })
}
// 分类商品的收藏
export const getGoodsFavorCount = () => {
  return pkRequest.get({
    url: '/goods/category/favor'
  })
}
// 不同城市商品销量
export const getCitiesGoodsCount = () => {
  return pkRequest.get({
    url: '/goods/address/sale'
  })
}
