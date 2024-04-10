<script setup lang="ts" name="systemdepartment">
import PageContent from '@/components/PageMain/PageContent/PageContent.vue'
import PageModal from '@/components/PageMain/PageModal/PageModal.vue'
import PageSearch from '@/components/PageMain/PageSearch/PageSearch.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import { usePageContent } from '@/hooks/usePageContent'
import { usePageModal } from '@/hooks/usePageModal'
import { computed } from 'vue'
import useMainStore from '@/store/main/main'
import { storeToRefs } from 'pinia'

// 对 modalConfig 处理
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const { entriesDepartments } = storeToRefs(mainStore)
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      const option = entriesDepartments.value.map((item) => {
        return { label: item.name, value: item.id }
      })
      item.options.push(...option)
    }
  })
  return modalConfig
})

// search 自定义事件
const { contentRef, queryClick, resetClick } = usePageContent()
// 对modal组件的操作
const { modalRef, modalClick, editClick } = usePageModal()
</script>
<template>
  <div class="systemdepartment">
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
    ></PageContent>
    <PageModal ref="modalRef" :modalConfig="modalConfigRef"></PageModal>
  </div>
</template>

<style scoped>
.systemdepartment {
  border-radius: 7px;
  overflow: hidden;
}
</style>
