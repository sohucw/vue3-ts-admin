<script setup lang="ts">
import OverviewCard from './OverviewCpn/OverviewCard.vue'
import OverviewTree from './OverviewCpn/OverviewTree.vue'
</script>
<template>
  <div class="overview">
    <!-- 关于 -->
    <OverviewCard title="关于">
      <template #content>
        <p class="content">
          Vue3Admin 是基于Vue3、Pinia、VueRouter、Vite、ElementPlus、TypeScript、Echarts等后台系统
        </p>
      </template>
    </OverviewCard>
    <!-- 技术栈 -->
    <OverviewCard title="技术栈">
      <template #content>
        <ul class="p2">
          <li>开发工具：<span class="cxt-text">VScode</span></li>
          <li>编程语言：<span class="cxt-text">TypeScript5.x + JavaScript</span></li>
          <li>构建工具：<span class="cxt-text">Vite4.x</span></li>
          <li>前端框架：<span class="cxt-text">Vue3.x</span></li>
          <li>路由工具：<span class="cxt-text">VueRouter 4.x</span></li>
          <li>状态管理：<span class="cxt-text">Pinia 2.x</span></li>
          <li>UI框架：<span class="cxt-text">ElementPlus 2.3.x</span></li>
          <li>可视化：<span class="cxt-text">Echarts 5.4.x</span></li>
          <!-- <li>富文本：<span class="cxt-text">WangEdit（未做）</span></li> -->
          <li>工具库：<span class="cxt-text">@vueuse/core + dayjs + countup.js</span></li>
          <li>CSS预编译：<span class="cxt-text">Less/Sass</span></li>
          <li>HTTP工具：<span class="cxt-text">Axios</span></li>
          <li>代码规范：<span class="cxt-text">EditorConfig+Prettier + ESLint</span></li>
        </ul>
      </template>
    </OverviewCard>
    <!-- 项目结构 -->
    <OverviewCard title="项目结构">
      <template #content>
        <OverviewTree></OverviewTree>
      </template>
    </OverviewCard>
  </div>
</template>
<style scoped lang="less">
.overview {
  .overview-card {
    margin-bottom: 15px;
    ul.p2 {
      li {
        padding: 7px 0;
      }
      .cxt-text {
        color: var(--el-color-primary);
      }
    }
  }
}
</style>
