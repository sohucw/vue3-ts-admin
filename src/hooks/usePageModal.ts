import { ref } from 'vue'
import type PageModal from '@/components/PageMain/PageModal/PageModal.vue'
type EditCallBack = (data: any) => void
type NEWCallBack = (data?: any) => void
export const usePageModal = (newCallBack?: NEWCallBack, editCallBack?: EditCallBack) => {
  const modalRef = ref<InstanceType<typeof PageModal>>()
  const modalClick = () => {
    modalRef.value?.setModalVisible()
    if (newCallBack) {
      newCallBack()
    }
  }
  const editClick = (itemData: any) => {
    modalRef.value?.setModalVisible(false, itemData)
    console.log({ ...itemData })
    if (editCallBack) {
      editCallBack(itemData)
    }
  }
  return {
    modalRef,
    modalClick,
    editClick
  }
}
