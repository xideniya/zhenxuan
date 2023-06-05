<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="el_form">
          <h1 class="h1">Hello</h1>
          <h2 class="h2">欢迎来到甄选</h2>
          <el-form-item>
            <el-input
              :prefix-icon="User as string"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              show-password
              :prefix-icon="Lock as string"
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="login-btn"
              :loading="loading"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import useUserStore from '@/store/modules/user.ts'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time.ts'

const loginForm = reactive({
  username: 'admin',
  password: '111111',
})
// 控制按钮加载效果
let loading = ref(false)
const router = useRouter()
const userStore = useUserStore()
const login = async () => {
  loading.value = true
  let message = getTime()
  try {
    await userStore.userLogin(loginForm)
    loading.value = false
    await router.push('/')
    ElNotification({
      type: 'success',
      message: '登录成功',
      title: `Hi，${message}好`,
    })
  } catch (error) {
    loading.value = false
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
</script>

<style scoped lang="scss">
.login-container {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  .el_form {
    position: relative;
    top: 30vh;
    width: 80%;
    background: url('@/assets/images/login_form.png');
    padding: 40px;
    .h1 {
      font-size: 40px;
      color: white;
    }
    .h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
