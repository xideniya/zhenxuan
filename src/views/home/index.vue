<template>
  <div>
    <el-card>
      <div class="box">
        <img
          :src="userStore.avatar"
          alt="头像"
          style="width: 100px; height: 100px; margin-right: 30px"
          class="avatar"
        />

        <div class="title">
          <div class="message" style="margin-bottom: 15px">
            {{ message }}好，{{ userStore.username }}!
          </div>
          <div class="content">甄选运营平台</div>
        </div>
      </div>
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
.box {
  display: flex;
  align-items: center;
}
</style>
