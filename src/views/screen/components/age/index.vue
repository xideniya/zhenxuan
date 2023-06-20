<template>
  <div class="age-container">
    <div class="top">
      <p class="title">年龄统计</p>
      <p class="bg"></p>
    </div>
    <div class="chart" ref="chart"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

let chart = ref()
onMounted(() => {
  let mychart = echarts.init(chart.value)
  mychart.setOption({
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      orient: 'vertical',
      right: 20,
      textStyle: {
        color: 'white',
        fontSize: 15,
      },
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          position: 'inside',
          color: 'white',
        },

        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: '0-15岁' },
          { value: 735, name: '15-18岁' },
          { value: 580, name: '19-23岁' },
          { value: 484, name: '23-30岁' },
          { value: 300, name: '30岁以上' },
        ],
      },
    ],
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
  })
})
</script>

<style scoped>
.age-container {
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
  .chart {
    width: 100%;
    height: 200px;
  }
}
</style>
