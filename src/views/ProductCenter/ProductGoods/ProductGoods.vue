<script setup lang="ts" name="productgoods">
import PageContent from '@/components/PageMain/PageContent/PageContent.vue'
import PageModal from '@/components/PageMain/PageModal/PageModal.vue'
import PageSearch from '@/components/PageMain/PageSearch/PageSearch.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import { usePageContent } from '@/hooks/usePageContent'
import { usePageModal } from '@/hooks/usePageModal'

// search 自定义事件
const { contentRef, queryClick, resetClick } = usePageContent()
// 对modal组件的操作
const { modalRef, modalClick, editClick } = usePageModal()
</script>

<template>
  <div class="productgoods">
    <div class="productcategory">
      <PageSearch
        :searchConfig="searchConfig"
        @query-click="queryClick"
        @reset-click="resetClick"
      ></PageSearch>
      <PageContent
        ref="contentRef"
        :contentConfig="contentConfig"
        @modal-click="modalClick"
        @edit-click="editClick"
      >
        <template #imgSmall="scope">
          <!-- {{ scope.row.imgUrl }} -->
          <el-image :src="scope.row.imgUrl" fit="cover" style="width: 40px">
            <template #error>
              <div class="image-slot">
                <el-icon><icon-picture /></el-icon>
              </div>
            </template>
          </el-image>
          <!-- <div style="display: flex; align-items: center">
            <el-image :preview-src-list="" />
          </div> -->
        </template>
      </PageContent>
      <PageModal ref="modalRef" :modalConfig="modalConfig"></PageModal>
    </div>
  </div>
</template>

<style scoped>
.productgoods {
  border-radius: 7px;
  overflow: hidden;
}
</style>
