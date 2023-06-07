import { defineStore } from 'pinia'
const useSettingStore = defineStore('Setting', {
  state: () => {
    return {
      flag: 'Expand', //控制菜单展开折叠
      refresh: false, // 刷新按钮
    }
  },
  actions: {
    ToggleMenuFold() {
      this.flag = this.flag === 'Expand' ? 'Fold' : 'Expand'
    },
  },
})
export default useSettingStore
