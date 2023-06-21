<template>
  <div class="top">
    <div class="left">
      <div>
        <router-link to="/home" class="lbutton">首页</router-link>
      </div>
    </div>
    <div class="middle">
      <div class="title">智慧旅游可视化大屏数据</div>
    </div>
    <div class="right">
      <div class="rbutton">统计报告</div>
      <div class="time">{{ time }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment'
import { onBeforeUnmount, onMounted, ref } from 'vue'
let time = ref(moment().format('YYYY-MM-DD hh:mm:ss'))
let timepiece = ref<number>(0)
onMounted(() => {
  timepiece.value = setInterval(() => {
    time.value = moment().format('YYYY-MM-DD hh:mm:ss')
  }, 1000)
})
onBeforeUnmount(() => {
  clearInterval(timepiece.value)
})
</script>

<style scoped lang="scss">
.top {
  width: 100%;
  height: 100%;
  display: flex;
  .left {
    display: flex;
    height: 100%;
    flex: 1;
    background: url('../../images/dataScreen-header-left-bg.png');
    background-size: cover;
    justify-content: right;
    .lbutton {
      display: block;
      color: #29fcff;
      width: 150px;
      height: 100%;
      line-height: 40px;
      text-align: center;
      background: url('../../images/dataScreen-header-btn-bg-l.png');
      background-size: cover;
      font-size: 18px;
      text-decoration: none;
    }
  }
  .middle {
    flex: 2;
    .title {
      height: 74px;
      width: 100%;
      background: url('../../images/dataScreen-header-center-bg.png') no-repeat;
      background-size: cover;
      line-height: 74px;
      text-align: center;
      color: #29fcff;
      font-size: 25px;
    }
  }
  .right {
    display: flex;
    flex: 1;
    background: url('../../images/dataScreen-header-left-bg.png');
    background-size: cover;
    color: #29fcff;
    font-size: 18px;
    line-height: 40px;
    text-align: center;
    .rbutton {
      width: 150px;
      height: 100%;
      background: url('../../images/dataScreen-header-btn-bg-r.png');
      background-size: cover;
    }
    .time {
      width: calc(100% - 150px);
    }
  }
}
</style>
