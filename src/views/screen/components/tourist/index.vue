<template>
  <div class="tourist-container">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="total">
        可预约总量
        <span>9999</span>
        人
      </p>
    </div>
    <div class="number">
      <span v-for="(item, index) in `${people}人`" :key="index">
        {{ item }}
      </span>
    </div>
    <div class="charts" ref="charts">123</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill'

let people = ref(216908)
let charts = ref()
onMounted(() => {
  let myCharts = echarts.init(charts.value)
  myCharts.setOption({
    series: [
      {
        type: 'liquidFill',
        data: [0.8],
        radius: '80%',
      },
    ],
  })
})
</script>

<style scoped lang="scss">
.tourist-container {
  background: url('../../images/dataScreen-main-lb.png') no-repeat;
  background-size: cover;
  margin-top: 10px;
  padding-left: 20px;
  .top {
    .title {
      font-size: 20px;
      margin-bottom: 20px;
    }
    .bg {
      width: 68px;
      height: 7px;
      margin: 10px 0;
      background: url('../../images/dataScreen-title.png') no-repeat;
      background-size: cover;
    }
    .total {
      float: right;
      font-size: 20px;
      span {
        color: yellowgreen;
      }
    }
  }
  .number {
    margin-top: 60px;
    span {
      display: inline-block;
      width: 60px;
      height: 60px;
      background: url('../../images/total.png');
      text-align: center;
      line-height: 60px;
      margin-right: 5px;
      font-size: 30px;
      color: #29fcff;
    }
  }
  .charts {
    width: 100%;
    height: 264px;
  }
}
</style>
