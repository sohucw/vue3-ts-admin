<script setup lang="ts" name="storylist">
import PageContent from '@/components/PageMain/PageContent/PageContent.vue'

import contentConfig from './config/content.config'
</script>

<template>
  <div class="storylist">
    <PageContent :contentConfig="contentConfig"></PageContent>
  </div>
</template>

<style scoped>
.storylist {
  border-radius: 7px;
  overflow: hidden;
}
</style>
