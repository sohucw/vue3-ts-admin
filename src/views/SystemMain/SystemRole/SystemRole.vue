<script setup lang="ts" name="systemrole">
import { storeToRefs } from 'pinia'
import { nextTick, ref } from 'vue'
import type { ElTree } from 'element-plus'
import useMainStore from '@/store/main/main'

import PageContent from '@/components/PageMain/PageContent/PageContent.vue'
import PageSearch from '@/components/PageMain/PageSearch/PageSearch.vue'
import PageModal from '@/components/PageMain/PageModal/PageModal.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'

import { usePageContent } from '@/hooks/usePageContent'
import { usePageModal } from '@/hooks/usePageModal'
import { mapMenuListToTreeById } from '@/utils/map-menus'

const otherInfo = ref()
const treeRef = ref<InstanceType<typeof ElTree>>()

// 点击角色的编辑按钮后，再点击新建按钮出现了tree选中的情况
const newCallBack = () => {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}
const editTreeDataCallBack = (itemData: any) => {
  const ids = mapMenuListToTreeById(itemData.menuList)
  nextTick(() => {
    treeRef.value?.setCheckedKeys(ids)
  })
}

const { contentRef, queryClick, resetClick } = usePageContent()
const { modalRef, modalClick, editClick } = usePageModal(newCallBack, editTreeDataCallBack)

const mainStore = useMainStore()
const { entriesMenus } = storeToRefs(mainStore)

const handleElTreeChecked = (data1: any, data2: any) => {
  // console.log(data1, data2)
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  // console.log(menuList)
  otherInfo.value = { menuList }
}
</script>
<template>
  <div class="systemrole">
    <PageSearch
      :searchConfig="searchConfig"
      @queryClick="queryClick"
      @resetClick="resetClick"
    ></PageSearch>
    <PageContent
      ref="contentRef"
      :contentConfig="contentConfig"
      @modalClick="modalClick"
      @editClick="editClick"
    ></PageContent>
    <PageModal ref="modalRef" :modalConfig="modalConfig" :otherInfo="otherInfo">
      <template #menu>
        <el-tree
          ref="treeRef"
          :data="entriesMenus"
          show-checkbox
          node-key="id"
          highlight-current
          @check="handleElTreeChecked"
          :props="{ children: 'children', label: 'name' }"
        />
      </template>
    </PageModal>
  </div>
</template>

<style scoped>
.systemrole {
  border-radius: 7px;
  overflow: hidden;
}
</style>
