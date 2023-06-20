<template>
  <div class="rank-container">
    <div class="top">
      <p class="title">热门景区排行</p>
      <p class="bg"></p>
    </div>
    <div class="main" ref="main"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

let main = ref()
onMounted(() => {
  let charts = echarts.init(main.value)
  charts.setOption({
    tooltip: { show: false },
    grid: { left: 10, top: 25, bottom: 20, right: 10, containLabel: true },
    xAxis: {
      type: 'value',
      boundaryGap: false,
      max: 30, // Math.ceil(max / 4) * 5 || 10
      //axisLine: { show: true, lineStyle: { color: '#ccc' } },
      axisTick: { show: false },
      axisLabel: { color: 'white', fontSize: 16 },
      splitLine: { show: false },
      //splitLine: {show:false,  lineStyle: { color: ['#CEEDFF'], type: [5, 8], dashOffset: 3 } },
    },
    yAxis: {
      type: 'category',
      data: ['颐和园', '故宫', '长城', '景山公园', '圆明园'],
      axisLine: { show: false },
      //axisLine: { show: true, lineStyle: { color: '#ccc' } },
      axisTick: { show: false }, //length: 3
      axisLabel: { fontSize: 16, color: 'white', margin: 16, padding: 0 },
      inverse: true,
    },
    series: [
      {
        name: '数量',
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(82, 168, 255, 0.1)',
          borderRadius: [0, 8, 8, 0],
        },
        itemStyle: {
          borderRadius: [0, 8, 8, 0],
          color: function (params) {
            // 定义一个颜色集合
            let colorList = [
              '#52A8FF',
              '#00B389',
              '#FFA940',
              '#FF5A57',
              '#29EFC4',
            ]
            // 对每个bar显示一种颜色
            return colorList[params.dataIndex]
          },
        },
        barMaxWidth: 16,
        label: {
          show: true,
          position: 'insideRight',
          offset: [-5, 2],
          color: 'white',
        },
        data: [29, 18, 13, 19, 17, 8],
      },
    ],
  })
})
</script>

<style scoped lang="scss">
.rank-container {
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
    width: 100%;
    height: calc(100% - 52px);
  }
}
</style>
