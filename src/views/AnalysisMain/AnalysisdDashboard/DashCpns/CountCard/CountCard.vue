<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CountUp } from 'countup.js'

interface Iprops {
  amount?: string
  title?: string
  tips?: string
  number1?: number
  number2?: number
  subtitle?: string
}
const props = withDefaults(defineProps<Iprops>(), {
  title: '商品总销量',
  tips: '所有商品的总销量',
  number1: 509989,
  number2: 509989,
  subtitle: '商品总销量'
})

// countup使用 执行动画
const count1Ref = ref<HTMLElement>()
const count2Ref = ref<HTMLElement>()

onMounted(() => {
  const countup1 = new CountUp(count1Ref.value!, props.number1)
  countup1.start()
  const countup2 = new CountUp(count2Ref.value!, props.number1)
  countup2.start()
})
</script>
<template>
  <div class="count-card">
    <div class="card-title">
      <div class="title">{{ title }}</div>
      <div class="card-icon">
        <el-tooltip :content="tips" placement="bottom" effect="light">
          <el-icon><InfoFilled /></el-icon>
        </el-tooltip>
      </div>
    </div>
    <div class="count">
      <span v-if="amount === 'saleroom'">¥</span>
      <span class="count-text" ref="count1Ref">{{ number1 }}</span>
    </div>

    <div class="count-footer">
      <span>{{ subtitle }}: </span>
      <span v-if="amount === 'saleroom'">¥</span>
      <span ref="count2Ref">{{ number2 }}</span>
    </div>
  </div>
</template>
<style scoped lang="less">
.count-card {
  background-color: #ffffff;
  border-radius: 5px;
  padding: 10px 15px;
  .card-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #888888;
    .title {
      letter-spacing: 0.06rem;
    }
  }
  .count {
    padding: 5px 0;
    font-size: 1.8rem;
  }
  .count-footer {
    padding-top: 7px;
    color: #666666;
    border-top: 1px solid #f5f5f5;
  }
}
</style>
