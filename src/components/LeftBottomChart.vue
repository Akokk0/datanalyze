<template>
  <div class="bg" style="height: 600px">
    <el-select v-model="selectData.year" class="m-2" placeholder="Select" size="small" @change="initData">
      <el-option
          v-for="item in years"
          :key="item"
          :label="item"
          :value="item"
      />
    </el-select>
    <div id="main_left" style="height: 100%;"></div>
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
        offsetCenter: ['-40%', '80%']
      },
      detail: {
        offsetCenter: ['-40%', '95%']
      }
    },
    {
      value: 40,
      name: 'Manchester',
      title: {
        offsetCenter: ['0%', '80%']
      },
      detail: {
        offsetCenter: ['0%', '95%']
      }
    },
    {
      value: 60,
      name: 'Edinburgh',
      title: {
        offsetCenter: ['40%', '80%']
      },
      detail: {
        offsetCenter: ['40%', '95%']
      }
    }
  ])

  let option = reactive({
    title: {
      text: '三主城道路里程对比码表图',
      left: 'left'
    },
    series: [
      {
        type: 'gauge',
        anchor: {
          show: true,
          showAbove: true,
          size: 18,
          itemStyle: {
            color: '#FAC858'
          }
        },
        max: 2000,
        pointer: {
          icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
          width: 8,
          length: '80%',
          offsetCenter: [0, '8%']
        },
        progress: {
          show: true,
          overlap: true,
          roundCap: true
        },
        axisLine: {
          roundCap: true
        },
        data: gaugeData.value,
        title: {
          fontSize: 14
        },
        detail: {
          width: 40,
          height: 14,
          fontSize: 14,
          color: '#fff',
          backgroundColor: 'auto',
          borderRadius: 3,
          formatter: '{value}KM'
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
      switch (city) {
        case 'City of London':
          london.value = res.data[0].link_length_km.toFixed(0)
              break
        case 'City of Edinburgh':
          edinburgh.value = res.data[0].link_length_km.toFixed(0)
              break
        case 'Manchester':
          manchester.value = res.data[0].link_length_km.toFixed(0)
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
    let chartDom = document.getElementById('main_left');
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
