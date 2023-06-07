<template>
  <template v-for="item in routes">
    <!--      没有子路由-->
    <el-menu-item
      v-if="!item.children && !item.meta.hidden"
      :key="item.path"
      :index="item.path"
    >
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ item.meta.title }}</span>
      </template>
    </el-menu-item>
    <!--      一个子路由-->
    <el-menu-item
      v-if="item.children && item.children.length === 1 && !item.meta.hidden"
      :key="item.children[0].path"
      :index="item.children[0].path"
    >
      <el-icon>
        <component :is="item.children[0].meta.icon"></component>
      </el-icon>
      <template #title>
        <span>{{ item.children[0]['meta'].title }}</span>
      </template>
    </el-menu-item>
    <!--      多个子路由-->
    <el-sub-menu
      v-if="item.children && item.children.length > 1 && !item.meta.hidden"
      :index="item.path"
      :key="item.path"
    >
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <!--        递归组件-->
      <Menu-left :routes="item.children"></Menu-left>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
defineProps(['routes'])
</script>
<script lang="ts">
export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  name: 'Menu-left',
}
</script>

<style scoped></style>
