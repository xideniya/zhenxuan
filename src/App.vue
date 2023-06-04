<template>
  <div>app</div>
  <div>哈哈哈哈</div>
  <el-button type="primary">
    <el-icon>
      <Plus></Plus>
    </el-icon>
  </el-button>
  <svg-icon name="shopcar"></svg-icon>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
const arr1 = [1, 23, 2, 6, 7]
arr1.find((item) => {
  return item === 6
})
</script>

<style scoped></style>
