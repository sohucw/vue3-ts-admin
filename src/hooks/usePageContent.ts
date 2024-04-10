// 对setup中相同的逻辑抽取：hooks

import { ref } from 'vue'
import type PageContent from '@/components/PageMain/PageContent/PageContent.vue'

export const usePageContent = () => {
  const contentRef = ref<InstanceType<typeof PageContent>>()
  const queryClick = (formValue: any) => {
    contentRef.value?.fetchPageListData(formValue)
  }
  const resetClick = () => {
    contentRef.value?.fetchPageListData()
  }
  return {
    contentRef,
    queryClick,
    resetClick
  }
}
