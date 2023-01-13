<template>
  <div class="common-layout">
    <el-container>
      <el-aside style="width: 25vw;padding-left: 20px;padding-top: 20px">
        <LeftBottomChart></LeftBottomChart>
      </el-aside>
      <el-main>
        <MapChart @place="getNewPlace"></MapChart>
      </el-main>
      <el-aside style="width: 25vw;padding-right: 20px;padding-top: 20px">
        <RightBottomChart></RightBottomChart>
      </el-aside>
    </el-container>
    <el-container>
      <el-aside style="width: 44vw; margin-left: 4vw;padding-bottom: 20px">
        <LeftChart :city="city"></LeftChart>
      </el-aside>
      <el-main style="width: 1vw;"></el-main>
      <el-aside style="width: 44vw; margin-right: 4vw;padding-bottom: 20px">
        <RightChart></RightChart>
      </el-aside>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
  import LeftChart from "@/components/LeftChart.vue";
  import RightChart from "@/components/RightChart.vue";
  import MapChart from "@/components/MapChart.vue";
  import LeftBottomChart from "@/components/LeftBottomChart.vue";
  import RightBottomChart from "@/components/RightBottomChart.vue";
  import {ref} from "vue";

  const city = ref('City of London')
  const getNewPlace = (place: string) => {
    console.log('Home' + place)

    switch (place) {
      case '伦敦':
        city.value = 'City of London'
            break
      case '爱丁堡':
        city.value = 'City of Edinburgh'
            break
      case '曼彻斯特':
        city.value = 'Manchester'
            break
      case '谢菲尔德':
        city.value = 'Sheffield'
            break
      case '利物浦':
        city.value = 'Liverpool'
            break
      case '利兹':
        city.value = 'Leeds'
            break
      case '伯明翰':
        city.value = 'Birmingham'
            break
      case '布里斯托':
        city.value = 'Bristol, City of'
            break
      case '南安普顿':
        city.value = 'Southampton'
            break
      case '诺丁汉':
        city.value = 'Nottingham'
            break
      case '纽卡斯尔':
        city.value = 'Newcastle upon Tyne'
            break
      case '巴斯':
        city.value = 'Bath and North East Somerset'
            break
    }

  }

</script>

<style lang="scss" scoped>
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
  }

  .common-layout {
    background: linear-gradient(skyblue, pink);
  }

</style>
