<template>
  <div>home</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useUserStore from '@/store/modules/user.ts'
const userStore = useUserStore()
onMounted(() => {
  userStore.getUserInfo()
})
</script>

<style scoped></style>
