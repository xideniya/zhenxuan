<template>
  <div>
    <el-card>
      <el-row>
        <el-col span="8">
          <img
            :src="userStore.avatar"
            alt="头像"
            style="width: 100px; height: 100px"
            class="avatar"
          />
        </el-col>
        <el-col span="16" class="title">
          <div class="message">{{ message }}好，{{ userStore.username }}!</div>
          <div class="content">甄选运营平台</div>
        </el-col>
      </el-row>
    </el-card>
    <div style="display: flex; justify-content: center">
      <svg-icon name="welcome" width="500px" height="500px"></svg-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user.ts'
import { getTime } from '@/utils/time.ts'

const userStore = useUserStore()
let message = getTime()
</script>

<style scoped>
.title {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 15px;
}
.avatar {
  border-radius: 50%;
}
.message {
  font-weight: 700;
  font-size: 20px;
}
.content {
  font-style: italic;
}
</style>
