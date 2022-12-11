<template>
  <div class="common-layout">
    <el-container>
      <el-aside style="width: 25vw;padding-left: 20px;padding-top: 20px">
        <LeftBottomChart></LeftBottomChart>
      </el-aside>
      <el-main>
        <MapChart></MapChart>
      </el-main>
      <el-aside style="width: 25vw;padding-right: 20px;padding-top: 20px">
        <RightBottomChart></RightBottomChart>
      </el-aside>
    </el-container>
    <el-container>
      <el-aside style="width: 44vw; margin-left: 4vw;padding-bottom: 20px">
        <LeftChart></LeftChart>
      </el-aside>
      <el-main style="width: 1vw;"></el-main>
      <el-aside style="width: 44vw; margin-right: 4vw;padding-bottom: 20px">
        <RightChart></RightChart>
      </el-aside>
    </el-container>
  </div>
<!--  <div class="grid-container">
    <div>
      <LeftChart></LeftChart>
    </div>
    <div>
      <MapChart></MapChart>
    </div>
    <div>
      <RightChart></RightChart>
    </div>
    <div>
      <RightBottomChart></RightBottomChart>
    </div>
    <div>
      <BottomChart></BottomChart>
    </div>
    <div>
      <LeftBottomChart></LeftBottomChart>
    </div>
  </div>-->
</template>

<script lang="ts" setup>
import LeftChart from "@/components/LeftChart.vue";
import RightChart from "@/components/RightChart.vue";
import MapChart from "@/components/MapChart.vue";
import LeftBottomChart from "@/components/LeftBottomChart.vue";
import BottomChart from "@/components/BottomChart.vue";
import RightBottomChart from "@/components/RightBottomChart.vue";

</script>

<style lang="scss" scoped>
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
  }
</style>
