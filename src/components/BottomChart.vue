<template>
  <div class="bg">
    <el-select v-model="selectData.year" class="m-2" placeholder="Select" @change="initData">
      <el-option
          v-for="item in years"
          :key="item"
          :label="item"
          :value="item"
      />
    </el-select>
    <div id="container_radar" style="height: 600px;"></div>
  </div>
</template>

<script setup>
  import * as echarts from 'echarts'
  import {onMounted, reactive, ref} from "vue";
  import {getDataByCityAndYear} from "@/request/api";

  let motor = []
  let car = []

  const citys = ['City of London','Birmingham', 'Southampton', 'Manchester', 'Nottingham', 'Newcastle upon Tyne']
  const years = [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]
  const selectData = reactive({
    city: 'City of London',
    year: 2012
  })

  const source = ref([
    [],
    [],
    [246926973633.57874, 246567973633.57874, 246945373633.57874, 256426973633.57874, 246542973633.57874, 345926973633.57874],
    [278626973633.57874, 255626973633.57874, 277626973633.57874, 222426973633.57874, 311926973633.57874, 324926973633.57874]
  ])

  const option = {
    title: {
      text: '南部地区主要城市车辆类型对比'
    },
    legend: {
      data: ['Motor', 'Car', 'Tax', 'Bus']
    },
    radar: {
      // shape: 'circle',
      indicator: [
        //城市展示最大区间值
        { name: '伦敦', max: 6500 },
        { name: '伯明翰', max: 16000 },
        { name: '南安普顿', max: 30000 },
        { name: '曼彻斯特', max: 38000 },
        { name: '诺丁汉', max: 52000 },
        { name: '纽卡斯尔', max: 25000 }
      ]
    },
    series: [
      {
        name: 'Motor vs Car vs Tax vs Bus',
        type: 'radar',
        data: [
          {
            //车辆数据
            value: [1, 2, 3, 4, 5, 6],
            //车辆类型
            name: 'Motor'
          },
          {
            value: [1, 2, 3, 4, 5, 6],
            name: 'Car'
          },
          {
            value: [1, 2, 3, 4, 5, 6],
            name: 'Tax'
          },
          {
            value: [1, 2, 3, 4, 5, 6],
            name: 'Bus'
          }
        ]
      }
    ]
  }

  // 初始化数据
  const initData = async () => {
    for (const value of years) {
      const {data: res} = await getDataByCityAndYear(selectData)
      motor.push(res.data[0].all_motor_vehicles)
      car.push(res.data[0].cars_and_taxis)
    }
    source.value[0].push(...motor)
    source.value[1].push(...car)
  }
  initData()

  onMounted(() => {
    let dom = document.getElementById('container_radar');
    let myChart = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });
    if (option && typeof option === 'object') {
      myChart.setOption(option);
    }
  })

  window.addEventListener('resize', myChart.resize);

</script>

<style scoped>
  .bg {
    border: 10px solid rgba(255,255,255,.5);
    background: rgba(255,255,255,.5);
  }
</style>
