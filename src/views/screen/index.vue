<template>
  <div class="container">
    <div class="screen" ref="screen">
      <div class="top">
        <Top></Top>
      </div>
      <div class="bottom">
        <div class="left">
          <Tourist class="tourist"></Tourist>
          <Gender class="gender"></Gender>
          <Age class="age"></Age>
        </div>
        <div class="middle">
          <Map class="map"></Map>
          <Line class="line"></Line>
        </div>
        <div class="right">
          <Rank class="rank"></Rank>
          <Year class="year"></Year>
          <Count class="count"></Count>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Top from './components/top/index.vue'
import Age from './components/age/index.vue'
import Gender from './components/gender/index.vue'
import Tourist from './components/tourist/index.vue'
import Map from './components/map/index.vue'
import Line from './components/line/index.vue'
import Rank from './components/rank/index.vue'
import Year from './components/year/index.vue'
import Count from './components/count/index.vue'

const screen = ref()
// 缩放比例，取较小的倍数
const getScale = (w = 1920, h = 1080) => {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return Math.min(ww, wh)
}
const changeSize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}
onMounted(() => {
  changeSize()
})
window.addEventListener('resize', changeSize)
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url('./images/bg.png');
  background-size: cover;
  .screen {
    width: 1920px;
    height: 1080px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform-origin: left top;
    .top {
      width: 100%;
      height: 40px;
    }
    .bottom {
      display: flex;
      color: white;
      width: 100%;
      .left {
        flex: 1;
        height: 1040px;
        display: flex;
        flex-direction: column;
        .tourist {
          flex: 1.5;
        }
        .gender {
          flex: 1;
        }
        .age {
          flex: 1;
        }
      }
      .middle {
        flex: 2;
        display: flex;
        flex-direction: column;
        .map {
          flex: 4;
        }
        .line {
          flex: 1;
          margin-left: 10px;
          width: calc(100% - 10px);
        }
      }
      .right {
        flex: 1;
        padding-left: 10px;
        height: 1040px;
        display: flex;
        flex-direction: column;
        .rank {
          flex: 1.5;
        }
        .year {
          flex: 1;
        }
        .count {
          flex: 1;
        }
      }
    }
  }
}
</style>
