<template>
  <div class="bg" style="height: 550px;">
    <el-select v-model="selectData.year" class="m-2" placeholder="Select" @change="initData" size="small">
      <el-option
          v-for="item in years"
          :key="item"
          :label="item"
          :value="item"
      />
    </el-select>
    <div id="right" style="height: 95%;"></div>
  </div>
</template>

<script lang="ts" setup>
  import * as echarts from "echarts";
  import {computed, onMounted, reactive} from "vue";
  import {getDataByCityAndYear} from "@/request/api";
  import {SelectType} from "@/type/selectType";
  import {EChartsType} from "echarts";

  let rightChart: EChartsType

  const citys = ['City of London', 'City of Edinburgh', 'Manchester', 'Sheffield', 'Liverpool', 'Leeds', 'Birmingham', 'Bristol, City of', 'Southampton', 'Nottingham', 'Newcastle upon Tyne', 'Bath and North East Somerset']
  const years = [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]
  const selectData = reactive<SelectType>({
    city: 'City of London',
    year: 2012
  })

  const data: number[] = []

  const initData = () => {
    citys.forEach(async (value, index) => {
      selectData.city = value
      const {data: res} = await getDataByCityAndYear(selectData)
      data[index] = res.data[0].link_length_km
      option && rightChart.setOption(option.value);
    })
  }
  initData()

  const option = computed(() => {
    return {
      title: {
        text: '十二城道路里程柱状图',
        left: 'left'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: citys,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        },
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data
        }
      ]
    }
  })

  onMounted(() => {
    let chartRight = document.getElementById('right')!;
    rightChart = echarts.init(chartRight);
  })


</script>

<style scoped>
  .bg {
    border: 10px solid rgba(255,255,255,.5);
    background: rgba(255,255,255,.5);
    border-radius: 10px;
  }
</style>
