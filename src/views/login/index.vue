<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <!--登录的表单-->
        <el-form
          class="el_form"
          :model="loginForm"
          :rules="rules"
          ref="loginElForm"
        >
          <h1 class="h1">Hello</h1>
          <h2 class="h2">欢迎来到甄选</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User as any"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              show-password
              :prefix-icon="Lock as any"
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
import { useRoute, useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time.ts'
const loginForm = reactive({
  username: 'admin',
  password: 'atguigu123',
})
// 控制按钮加载效果
let loading = ref(false)
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
let loginElForm = ref()
// 用户登录
const login = async () => {
  // 全部的表单项通过再发请求
  await loginElForm.value.validate()
  loading.value = true
  let message = getTime()
  try {
    await userStore.userLogin(loginForm)
    loading.value = false
    // 登录后返回退出前的路由
    let path: any = route.query.redirect ? route.query.redirect : '/'
    await router.push({
      path,
    })
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
//表单校验对象
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '用户名长度5到10位', trigger: 'change' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 10, message: '密码长度6到10位', trigger: 'change' },
  ],
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
