<template>
  <div class="container">
    <div class="left">
      <!--      菜单折叠按钮-->
      <el-icon class="icon" @click="handelFold">
        <component :is="settingStore.flag"></component>
      </el-icon>
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item
          v-for="(item, index) in route.matched"
          :key="index"
          :to="item.path"
          v-show="item.meta['title']"
        >
          <el-icon style="margin: 0 5px; vertical-align: top">
            <component :is="item.meta['icon']"></component>
          </el-icon>
          <span>{{ item.meta['title'] }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      <!--      右侧三个按钮-->
      <el-button
        size="small"
        icon="Refresh"
        title="刷新"
        circle
        @click="handleRefresh"
      ></el-button>
      <el-button
        size="small"
        icon="FullScreen"
        title="全屏"
        circle
        @click="handleFullScreen"
      ></el-button>

      <el-popover
        placement="bottom"
        title="主题设置"
        :width="200"
        trigger="hover"
        content="this is content, this is content, this is content"
      >
        <el-form>
          <el-form-item label="主题颜色">
            <el-color-picker
              v-model="color"
              show-alpha
              size="small"
              :predefine="predefineColors"
              @change="colorChange"
            />
          </el-form-item>
          <el-form-item label="暗黑模式">
            <el-switch v-model="value1" size="small" @change="changeDark" />
          </el-form-item>
        </el-form>
        <template #reference>
          <el-button
            size="small"
            icon="Setting"
            circle
            title="设置"
          ></el-button>
        </template>
      </el-popover>
      <!--      用户头像-->
      <img :src="userStore.avatar" alt="头像" style="border-radius: 50%" />
      <!--      下拉菜单-->
      <el-dropdown class="dropdown">
        <span class="el-dropdown-link">
          {{ userStore.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import useSettingStore from '@/store/modules/setting.ts'
import { useRoute, useRouter } from 'vue-router'
import useUserStore from '@/store/modules/user.ts'
import { ElNotification } from 'element-plus'
import { ref } from 'vue'
// 控制展开图标
let settingStore = useSettingStore()
const handelFold = () => {
  settingStore.ToggleMenuFold()
}
// 匹配顶部路由
const route = useRoute()
// 刷新按钮
const handleRefresh = () => {
  settingStore.refresh = !settingStore.refresh
}
// 暗黑模式开关
let value1 = ref(false)
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
const changeDark = () => {
  //如果您只需要暗色模式，只需在 html 上添加一个名为 dark 的类 。
  let html = document.documentElement
  value1.value ? (html.className = 'dark') : (html.className = '')
}
// 主题颜色设置
const colorChange = () => {
  // document.documentElement 是全局变量时
  const el = document.documentElement
  // const el = document.getElementById('xxx')

  // 获取 css 变量
  getComputedStyle(el).getPropertyValue(`--el-color-primary`)

  // 设置 css 变量
  el.style.setProperty('--el-color-primary', color.value)
}
// 全屏
const handleFullScreen = () => {
  // 判断当前是否全屏
  let isFull = document.fullscreenElement
  if (!isFull) {
    // 进入全屏模式
    document.documentElement.requestFullscreen()
  } else {
    // 退出全屏模式
    document.exitFullscreen()
  }
}
// 用户信息
const userStore = useUserStore()
// 退出登录
const router = useRouter()
const logout = async () => {
  try {
    await userStore.userLogout()
    await router.push({
      path: '/login',
      query: {
        redirect: route.fullPath,
      },
    })
  } catch (error) {
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    height: $base-tabbar-height;
    align-items: center;
    margin-left: 20px;
    .icon {
      margin-right: 15px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    height: $base-tabbar-height;
    margin-right: 15px;
    img {
      width: 24px;
      height: 24px;
      margin-left: 10px;
    }
    .dropdown {
      margin-left: 10px;
    }
  }
}
</style>
