<template>
  <div class="line-container">
    <div class="top">
      <p class="title">未来7天游客数量趋势图</p>
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
  let myChart = echarts.init(chart.value)
  myChart.setOption({
    title: {
      text: '访问量',
      textStyle: {
        color: 'white',
        fontSize: 12,
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      splitLine: {
        show: false,
      },
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
    yAxis: {
      axisLine: {
        show: true,
      },
      axisTick: {
        show: true,
      },
      boundaryGap: false,
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        type: 'line',
        data: [52, 96, 201, 88, 43, 79, 152],
        smooth: 0.6,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'red', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'blue', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
    ],
    grid: {
      left: 40,
      right: 10,
      top: 30,
      bottom: 30,
    },
  })
})
</script>

<style scoped lang="scss">
.line-container {
  width: 100%;
  height: 100%;
  background: url('../../images/dataScreen-main-cb.png') no-repeat;
  background-size: cover;
  .top {
    padding-left: 20px;
    .title {
      font-size: 16px;
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
    height: calc(100% - 40px);
  }
}
</style>
