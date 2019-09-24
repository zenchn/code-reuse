<template>
  <div :class="className" :id="id" :style="{height:height,width:width}" ></div>
</template>

<script>
  let echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/pie')
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')

  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      name: {
        type: String
      },
      id: {
        type: String,
        default: 'piechart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '100%'
      },
      xData: {
        type: Array
      },
      sData: {
        type: Array
      }
    },
    data () {
      return {
        chart: null
      }
    },
    mounted () {
      this.initChart()
      //this.chart = null
    },
    beforeDestroy () {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    watch: {
      sData: {
        handler(newValue, oldValue) {
          this.sData = newValue
          this.initChart()
        },
        deep: true
      },
      xData: {
        handler(newValue, oldValue) {
          this.xData = newValue
          this.initChart()
        },
        deep: true
      },
    },
    methods: {
      initChart () {
        const theme = {
          color: [
            '#FE8463', '#9BCA63', '#FAD860', '#60C0DD', '#0084C6',
            '#D7504B', '#C6E579', '#26C0C0', '#F0805A', '#F4E001',
            '#B5C334'
          ]
        }
        this.chart = echarts.init(document.getElementById(this.id),theme)
        this.chart.setOption({
          noDataLoadingOption: {
            text: '暂无数据',
            effect: 'bubble',
            effectOption: {
                effect: {
                    n: 0
                }
            }
          },
          title : {
            text: '',
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          // legend: {
          //   orient: 'vertical',
          //   left: 'left',
          //   data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
          // },
          series : [
            {
              name: this.name,
              type: 'pie',
              radius : ['50%', '70%'],
              data: this.sData,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
      },
      refreshchart() {
        this.chart.clear()
        this.initChart()
      }
    }
  }
</script>
