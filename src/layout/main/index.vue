<template>
  <!--  路由切换动画效果-->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import useSettingStore from '@/store/modules/setting.ts'
import { nextTick, ref, watch } from 'vue'
// 刷新操作
let flag = ref(true)
const settingStore = useSettingStore()
watch(
  () => settingStore.refresh,
  () => {
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 1s;
}
.fade-enter-to {
  opacity: 1;
}
</style>
