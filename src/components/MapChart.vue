<template>
  <div class="bg">
    <div id="container" style="height: 600px;"></div>
  </div>
</template>

<script setup>
  import * as echarts from 'echarts'
  import 'echarts/extension/bmap/bmap'
  import {onMounted} from "vue";

  let myChart
  let app = {};
  let option;
  const data = [
    { name: '伦敦', value: 5.227532954},
    { name: '伯明翰', value: 321.5609913 },
    { name: '曼彻斯特', value: 119.2253982 },
    { name: '谢菲尔德', value: 156.6068837 },
    { name: '利物浦', value: 125.8052727 },
    { name: '利兹', value: 378.3932133 },
    { name: '爱丁堡', value: 127.4555486 },
    { name: '布里斯托', value: 130.570337 },
    { name: '南安普顿', value: 42.59292644 },
    { name: '诺丁汉', value: 74.64977838 },
    { name: '纽卡斯尔', value: 75.31080398 },
    { name: '巴斯', value: 53.19793733 },

  ];

  const geoCoordMap = {
    伦敦: [-0.119534,51.503316],
    伯明翰: [-1.886702,52.482207],
    曼彻斯特: [-2.241589,53.478939],
    谢菲尔德: [-1.471217,53.381329],
    利物浦: [-2.991573,53.408372],
    利兹: [-1.545542,53.80406],
    爱丁堡: [-3.172277,55.952747],
    布里斯托: [-2.590785,51.4678],
    南安普顿: [-1.395735,50.935073],
    诺丁汉: [-1.154866,52.949581],
    纽卡斯尔: [-1.614654,54.979215],
    巴斯: [-2.359175,51.37987],
  };

  const convertData = function (data) {
    let res = [];
    for (let i = 0; i < data.length; i++) {
      let geoCoord = geoCoordMap[data[i].name];
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value)
        });
      }
    }
    return res;
  };
  option = {
    title: {
      text: '英国交通流量图',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    bmap: {
      center: [-0.1, 51.5],
      zoom: 7,
      roam: true,
      mapStyle: {
        styleJson: [
          {
            featureType: 'water',
            elementType: 'all',
            stylers: {
              color: '#d1d1d1'
            }
          },
          {
            featureType: 'land',
            elementType: 'all',
            stylers: {
              color: '#f3f3f3'
            }
          },
          {
            featureType: 'railway',
            elementType: 'all',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'highway',
            elementType: 'all',
            stylers: {
              color: '#fdfdfd'
            }
          },
          {
            featureType: 'highway',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'arterial',
            elementType: 'geometry',
            stylers: {
              color: '#fefefe'
            }
          },
          {
            featureType: 'arterial',
            elementType: 'geometry.fill',
            stylers: {
              color: '#fefefe'
            }
          },
          {
            featureType: 'poi',
            elementType: 'all',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'green',
            elementType: 'all',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'subway',
            elementType: 'all',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'manmade',
            elementType: 'all',
            stylers: {
              color: '#d1d1d1'
            }
          },
          {
            featureType: 'local',
            elementType: 'all',
            stylers: {
              color: '#d1d1d1'
            }
          },
          {
            featureType: 'arterial',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'boundary',
            elementType: 'all',
            stylers: {
              color: '#fefefe'
            }
          },
          {
            featureType: 'building',
            elementType: 'all',
            stylers: {
              color: '#d1d1d1'
            }
          },
          {
            featureType: 'label',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#999999'
            }
          }
        ]
      }
    },
    series: [
      {
        name: '车流量',
        type: 'scatter',
        coordinateSystem: 'bmap',
        data: convertData(data),
        symbolSize: function (val) {
          return val[2] / 10;
        },
        encode: {
          value: 2
        },
        label: {
          formatter: '{b}',
          position: 'right',
          show: false
        },
        emphasis: {
          label: {
            show: true
          }
        }
      },
      {
        name: '车流量',
        type: 'effectScatter',
        coordinateSystem: 'bmap',
        data: convertData(
            data
                .sort(function (a, b) {
                  return b.value - a.value;
                })
                .slice(0, 6)
        ),
        symbolSize: function (val) {
          return val[2] / 10;
        },
        encode: {
          value: 2
        },
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        label: {
          formatter: '{b}',
          position: 'right',
          show: true
        },
        itemStyle: {
          shadowBlur: 10,
          shadowColor: '#333'
        },
        emphasis: {
          scale: true
        },
        zlevel: 1
      }
    ]
  };

  onMounted(() => {
    setTimeout(() => {
      let dom = document.getElementById('container');
      myChart = echarts.init(dom, null, {
        renderer: 'canvas',
        useDirtyRect: false
      });

      if (option && typeof option === 'object') {
        myChart.setOption(option);
      }

      window.addEventListener('resize', myChart.resize);
    }, 2000)
  })

</script>

<style scoped>
  .bg {
    border: 10px solid rgba(255,255,255,.5);
    background: rgba(255,255,255,.5);
    border-radius: 10px;
  }
</style>
