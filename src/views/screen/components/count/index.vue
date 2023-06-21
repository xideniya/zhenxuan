<template>
  <div class="count-container">
    <div class="top">
      <p class="title">游客行为</p>
      <p class="bg"></p>
    </div>
    <div class="main" ref="main"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
const main = ref()
onMounted(() => {
  const mychart = echarts.init(main.value)
  mychart.setOption({
    radar: {
      // shape: 'circle',
      indicator: [
        { name: 'Sales' },
        { name: 'Administration' },
        { name: 'Information Technology' },
        { name: 'Customer Support' },
        { name: 'Development' },
        { name: 'Marketing' },
      ],
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [14200, 13000, 20000, 35000, 50000, 18000],
            name: 'Allocated Budget',
          },
          {
            value: [15000, 14000, 28000, 26000, 42000, 21000],
            name: 'Actual Spending',
          },
        ],
      },
    ],
  })
})
</script>

<style scoped lang="scss">
.count-container {
  background: url('../../images/dataScreen-main-lb.png') no-repeat;
  background-size: cover;
  margin-top: 10px;
  .top {
    padding-left: 20px;
    .title {
      font-size: 20px;
      margin-bottom: 15px;
    }
    .bg {
      width: 68px;
      height: 7px;
      margin: 10px 0;
      background: url('../../images/dataScreen-title.png') no-repeat;
      background-size: cover;
    }
  }
  .main {
    height: calc(100% - 52px);
    width: 100%;
  }
}
</style>
