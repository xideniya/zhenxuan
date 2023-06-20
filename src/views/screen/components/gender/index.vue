<template>
  <div class="gender-container">
    <div class="top">
      <p class="title">性别统计</p>
      <p class="bg"></p>
    </div>
    <div class="people">
      <div class="man">
        <div>男士</div>
        <img src="../../images/man.png" alt="男" />
      </div>
      <div class="women">
        <div>女士</div>
        <img src="../../images/woman.png" alt="女" />
      </div>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
const charts = ref()
onMounted(() => {
  let myChart = echarts.init(charts.value)
  myChart.setOption({
    xAxis: {
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: {
      type: 'category',
      show: false,
    },
    series: [
      {
        type: 'bar',
        data: [58],
        barWidth: 20,
        z: 100,
        itemStyle: {
          borderRadius: [0, 15, 15, 0],
          color: 'skyblue',
        },
      },
      {
        type: 'bar',
        data: [100],
        barWidth: 20,
        barGap: '-98%',
        itemStyle: {
          color: 'mediumvioletred',
        },
      },
    ],
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  })
})
</script>

<style scoped lang="scss">
.gender-container {
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
  .people {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 25px;
    .man {
      display: flex;
      flex-direction: column;
      width: 111px;
      height: 115px;
      background: url('../../images/man-bg.png');
      text-align: center;
      line-height: 25px;
      align-items: center;
      img {
        margin-top: 15px;
        width: 60px;
        height: 64px;
      }
    }

    .women {
      display: flex;
      flex-direction: column;
      width: 111px;
      height: 115px;
      background: url('../../images/woman-bg.png');
      text-align: center;
      line-height: 25px;
      align-items: center;
      img {
        margin-top: 15px;
        width: 60px;
        height: 64px;
      }
    }
  }
  .charts {
    height: 100px;
  }
}
</style>
