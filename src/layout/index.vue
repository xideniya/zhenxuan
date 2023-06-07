<template>
  <div class="layout-container">
    <!--    左侧菜单-->
    <div class="sliderbar" :class="{ fold: settingStore.flag === 'Fold' }">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <el-menu
          :router="true"
          :default-active="route.fullPath"
          text-color="white"
          background-color="#001529"
          :collapse="settingStore.flag === 'Fold'"
        >
          <Menuleft :routes="userStore.routes"></Menuleft>
        </el-menu>
      </el-scrollbar>
    </div>
    <!--    顶部导航-->
    <div class="tabbar" :class="{ fold: settingStore.flag === 'Fold' }">
      <Tabbar></Tabbar>
    </div>
    <!--    内容区域-->
    <div class="main" :class="{ fold: settingStore.flag === 'Fold' }">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
import Menuleft from '@/layout/menuleft/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
import useUserStore from '@/store/modules/user.ts'
import useSettingStore from '@/store/modules/setting.ts'
import { useRoute } from 'vue-router'
const userStore = useUserStore()
const route = useRoute()
const settingStore = useSettingStore()
</script>

<style scoped lang="scss">
.layout-container {
  width: 100%;
  height: 100vh;
  //侧边栏
  .sliderbar {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-left-color;
    transition: all 0.3s;
    &.fold {
      width: $base-menu-fold-width;
    }
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-logo-height);
      color: white;
      .el-menu {
        border-right: none;
      }
    }
  }
  //顶部导航
  .tabbar {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    transition: all 0.3s;
    &.fold {
      width: calc(100% - $base-menu-fold-width);
      left: $base-menu-fold-width;
    }
  }
  // 内容区域
  .main {
    position: absolute;
    top: $base-tabbar-height;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;
    &.fold {
      width: calc(100% - $base-menu-fold-width);
      left: $base-menu-fold-width;
    }
  }
}
</style>
