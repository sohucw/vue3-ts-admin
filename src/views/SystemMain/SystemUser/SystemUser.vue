<script setup lang="ts" name="systemuser">
import { computed } from 'vue'
// 数据导入与组件
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import PageSearch from '@/components/PageMain/PageSearch/PageSearch.vue'
import PageContent from '@/components/PageMain/PageContent/PageContent.vue'
import PageModal from '@/components/PageMain/PageModal/PageModal.vue'
import useMainStore from '@/store/main/main'
import { storeToRefs } from 'pinia'
// setup中公共部门抽取
import { usePageContent } from '@/hooks/usePageContent'
import { usePageModal } from '@/hooks/usePageModal'
// 对配置项modalConfig进行数据操作
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const { entriesRoles, entriesDepartments } = storeToRefs(mainStore)
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'roleId') {
      const option = entriesRoles.value.map((item) => {
        return { label: item.name, value: item.id }
      })
      item.options.push(...option)
    } else if (item.prop === 'departmentId') {
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
  <div class="systemuser">
    <!-- 搜索区 -->
    <PageSearch
      :searchConfig="searchConfig"
      @query-click="queryClick"
      @reset-click="resetClick"
    ></PageSearch>
    <!-- 数据展示区 -->
    <div class="data-lists">
      <PageContent
        ref="contentRef"
        :contentConfig="contentConfig"
        @modal-click="modalClick"
        @edit-click="editClick"
      >
        <!-- 插槽 -->
        <template #enable="scope">
          <el-button v-if="scope.row.enable === 1" type="success" plain size="small"
            >启用
          </el-button>
          <el-button v-else type="warning" plain size="small">禁用</el-button>
        </template>
      </PageContent>
    </div>
    <PageModal ref="modalRef" :modalConfig="modalConfigRef"></PageModal>
  </div>
</template>
<style scoped lang="less">
.systemuser {
  border-radius: 7px;
  overflow: hidden;
}
</style>
