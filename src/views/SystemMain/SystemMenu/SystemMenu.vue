<script setup lang="ts" name="systemmenu">
import PageContent from '@/components/PageMain/PageContent/PageContent.vue'
import contentConfig from './config/content.config'
</script>
<template>
  <div class="systemmenu">
    <PageContent :contentConfig="contentConfig"> </PageContent>
  </div>
</template>

<style scoped>
.systemmenu {
  border-radius: 7px;
  overflow: hidden;
}
</style>
