<template>
  <div class="bg" style="height: 600px;">
    <el-select v-model="selectData.year" class="m-2" placeholder="Select" size="small" @change="initData">
      <el-option
          v-for="item in years"
          :key="item"
          :label="item"
          :value="item"
      />
    </el-select>
    <div id="main_right" style="height: 100%"></div>
  </div>
</template>

<script lang="ts" setup>
  import * as echarts from 'echarts';
  import {onMounted, reactive, ref} from "vue";
  import {SelectType} from '@/type/selectType'
  import {EChartsType} from "echarts";
  import {getDataByCityAndYear} from "@/request/api";

  const citys = ['City of London', 'City of Edinburgh', 'Manchester']
  const years = [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]
  const selectData = reactive<SelectType>({
    city: 'City of London',
    year: 2012
  })

  let myChart: EChartsType

  const gaugeData = ref([
    {
      value: 20,
      name: 'London',
      title: {
        offsetCenter: ['0%', '-30%']
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ['0%', '-20%']
      }
    },
    {
      value: 40,
      name: 'Manchester',
      title: {
        offsetCenter: ['0%', '0%']
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ['0%', '10%']
      }
    },
    {
      value: 60,
      name: 'Edinburgh',
      title: {
        offsetCenter: ['0%', '30%']
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ['0%', '40%']
      }
    }
  ])

  const option = reactive({
    title: {
      text: '三主城车流量对比码表图',
      left: 'left'
    },
    series: [
      {
        max: 2000000000,
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        pointer: {
          show: false
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            borderWidth: 1,
            borderColor: '#464646'
          }
        },
        axisLine: {
          lineStyle: {
            width: 40
          }
        },
        splitLine: {
          show: false,
          distance: 0,
          length: 10
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false,
          distance: 50
        },
        data: gaugeData,
        title: {
          fontSize: 14
        },
        detail: {
          width: 50,
          height: 14,
          fontSize: 14,
          color: 'auto',
          borderColor: 'auto',
          borderRadius: 20,
          borderWidth: 1,
          formatter: '{value}辆'
        }
      }
    ]
  })

  const london = ref<number>(0)
  const edinburgh = ref<number>(0)
  const manchester = ref<number>(0)

  const initData = () => {
    citys.forEach(async (city, index) => {
      selectData.city = city
      const {data: res} = await getDataByCityAndYear(selectData)
      console.log(res)
      switch (city) {
        case 'City of London':
          london.value = res.data[0].cars_and_taxis.toFixed(0)
          break
        case 'City of Edinburgh':
          edinburgh.value = res.data[0].cars_and_taxis.toFixed(0)
          break
        case 'Manchester':
          manchester.value = res.data[0].cars_and_taxis.toFixed(0)
          break
      }
    })
    gaugeData.value[0].value = london.value;
    gaugeData.value[1].value = edinburgh.value;
    gaugeData.value[2].value = manchester.value;
    setTimeout(() => {
      option && myChart.setOption(option);
    }, 500)
  }

  onMounted(() => {
    let chartDom = document.getElementById('main_right');
    myChart = echarts.init(chartDom!);
    initData()
    setTimeout(() => {
      initData()
    }, 500)

    /*setInterval(function () {
      gaugeData[0].value = +(Math.random() * 100).toFixed(2);
      gaugeData[1].value = +(Math.random() * 100).toFixed(2);
      gaugeData[2].value = +(Math.random() * 100).toFixed(2);
      myChart.setOption({
        series: [
          {
            data: gaugeData
          }
        ]
      });
    }, 2000);*/

  })

</script>

<style scoped>
  .bg {
    border: 10px solid rgba(255,255,255,.5);
    background: rgba(255,255,255,.5);
    border-radius: 10px;
  }
</style>
