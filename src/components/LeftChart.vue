<template>
  <div class="bg" style="height: 550px">
    <div id="left" style="height: 100%"></div>
  </div>
</template>

<script lang="ts" setup>

import {computed, onMounted, reactive, ref, defineProps, watch} from "vue";
import {getDataByCityAndYear, getVehicleTypeByYear} from "@/request/api";
import * as echarts from "echarts";
import {EChartsType} from "echarts";

// 接收父组件传来的city
const props = defineProps(['city'])

// 监听city的变化
watch(() => props.city, () => {
  selectData.city = props.city
  cityData()
})

let motor: number[] = []
let car: number[] = []
const source = ref([
  ['product', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'],
  ['Motor'],
  ['Car'],
  ['Tax', 246926973633.57874, 246567973633.57874, 246945373633.57874, 256426973633.57874, 246542973633.57874, 345926973633.57874, 369926973633.57874, 378926973633.57874, 339926973633.57874, 327926973633.57874],
  ['Bus', 278626973633.57874, 255626973633.57874, 277626973633.57874, 222426973633.57874, 311926973633.57874, 324926973633.57874, 339926973633.57874, 246926973633.57874, 369926973633.57874, 399926973633.57874]
])

let leftChart: EChartsType

let year: number[] = [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021]
const selectData = reactive({
  city: props.city,
  year: 2012
})

// 初始化数据
const initData = async () => {
  for (const value of year) {
    const {data: res} = await getVehicleTypeByYear(value)
    motor.push(res.data.motorVehicleCount)
    car.push(res.data.carsCount)
  }
  source.value[1].push(...motor)
  source.value[2].push(...car)
}
// initData()

const cityData = async () => {
  // Get data by city and year
  year.forEach(async (value, index) => {
    selectData.year = value
    const {data: res} = await getDataByCityAndYear(selectData)
    console.log(res)
    /*console.log(source.value[1][index + 1])
    console.log(source.value[2][index + 1])*/
    source.value[1][index + 1] = res.data[0].all_motor_vehicles
    source.value[2][index + 1] = res.data[0].cars_and_taxis
    source.value[3][index + 1] = res.data[0].all_motor_vehicles - Math.random() * (20000000 - 100) + 100
    source.value[4][index + 1] = res.data[0].cars_and_taxis - Math.random() * (20000000 - 100) + 100
  })
  setTimeout(() => {
    leftChart.setOption<echarts.EChartsOption>(option.value);
  }, 500)
}
cityData()

type EChartsOption = echarts.EChartsOption;
const option = computed<EChartsOption>(() => {
  return  {
    title: {
      text: '近几年车辆类型对比图',
      left: 'left'
    },
    legend: {},
    tooltip: {
      trigger: 'axis',
      showContent: false
    },
    dataset: {
      source: source.value
    },
    xAxis: { type: 'category' },
    yAxis: { gridIndex: 0, max: 5000000000.0000 },
    grid: { top: '55%' },
    series: [
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'pie',
        id: 'pie',
        radius: '30%',
        center: ['50%', '25%'],
        emphasis: {
          focus: 'self'
        },
        label: {
          formatter: '{b}: {@2012} ({d}%)'
        },
        encode: {
          itemName: 'product',
          value: '2012',
          tooltip: '2012'
        }
      }
    ]
  };
})

onMounted(() => {
  let chartLeft = document.getElementById('left')!;
  leftChart = echarts.init(chartLeft);

  setTimeout(function () {
    leftChart.on('updateAxisPointer', function (event: any) {
      const xAxisInfo = event.axesInfo[0];
      if (xAxisInfo) {
        const dimension = xAxisInfo.value + 1;
        leftChart.setOption<echarts.EChartsOption>({
          series: {
            id: 'pie',
            label: {
              formatter: '{b}: {@[' + dimension + ']} ({d}%)'
            },
            encode: {
              value: dimension,
              tooltip: dimension
            }
          }
        });
      }
    });

    leftChart.on('updateAxisPointer', function (event: any) {
      const xAxisInfo = event.axesInfo[0];
      if (xAxisInfo) {
        const dimension = xAxisInfo.value + 1;
        leftChart.setOption<echarts.EChartsOption>({
          series: {
            id: 'pie',
            label: {
              formatter: '{b}: {@[' + dimension + ']} ({d}%)'
            },
            encode: {
              value: dimension,
              tooltip: dimension
            }
          }
        });
      }
    });
    setTimeout(() => {
      leftChart.setOption<echarts.EChartsOption>(option.value);
    }, 2000)
  }, 1500);

})
</script>

<style scoped>
  .bg {
    border: 10px solid rgba(255,255,255,.5);
    background: rgba(255,255,255,.5);
    border-radius: 10px;
  }
</style>
