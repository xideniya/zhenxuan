<template>
  <div class="map-container" ref="mapContainer"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import chinajson from './china.json'
let mapContainer = ref()
onMounted(() => {
  echarts.registerMap('china', chinajson)
  let myCharts = echarts.init(mapContainer.value)
  myCharts.setOption({
    geo: {
      map: 'china',
      label: {
        show: true,
        color: 'white',
      },
      itemStyle: {
        borderColor: 'rgba(147, 235, 248, 1)',
        borderWidth: 1,
        areaColor: {
          type: 'radial',
          x: 0.5,
          y: 0.5,
          r: 0.8,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(147, 235, 248, 0)', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(147, 235, 248, 0.2)', // 100% 处的颜色
            },
          ],
          globalCoord: false, // 缺省为 false
        },
        shadowColor: 'rgba(128, 217, 248, 1)',
        shadowOffsetX: -2,
        shadowOffsetY: 2,
        shadowBlur: 10,
      },
    },
    series: [
      {
        type: 'lines',
        data: [
          {
            coords: [
              [116.416, 39.916], // 起点
              [113.233, 23.1667], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: '#FF7F50',
              width: 3,
            },
          },
          {
            coords: [
              [91.0, 29.6], // 起点
              [126.633, 45.75], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: '#FF7F50',
              width: 3,
            },
          },
        ],
        effect: {
          show: true,
          constantSpeed: 40,
          trailLength: 0,
          symbol:
            'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',
          symbolSize: 20,
          color: '#FF7F50',
        },
      },
    ],
  })
})
</script>

<style scoped lang="scss">
.map-container {
}
</style>
