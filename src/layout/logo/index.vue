<template>
  <div class="logo">
    <img src="../../../logo.png" :alt="setting.title" />
    <p v-show="settingStore.flag === 'Expand'">{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting.ts'
import useSettingStore from '@/store/modules/setting.ts'
const settingStore = useSettingStore()
</script>

<style scoped lang="scss">
.logo {
  display: flex;
  align-items: center;
  height: $base-logo-height;
  width: 100%;
  color: white;
  padding: 10px;
  img {
    width: 40px;
    height: 40px;
  }
  p {
    font-size: 20px;
    margin-left: 10px;
    transition: all 0.3s;
  }
}
</style>
