<template>
  <div class="year-container">
    <div class="top">
      <p class="title">年度游客量对比</p>
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
  let mycharts = echarts.init(main.value)
  mycharts.setOption({
    title: {
      text: '散点图',
      textStyle: {
        color: 'white',
      },
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {},
    series: [
      {
        type: 'scatter',
        data: [432, 543, 32, 532, 654, 12, 345, 222, 78, 112],
        label: {
          show: true,
          position: 'top',
        },
      },
    ],
  })
})
</script>

<style scoped lang="scss">
.year-container {
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
