<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'barchart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '500px'
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
    this.chart = null
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
        title: {
          text: '',
          x: '20',
          top: '20',
          textStyle: {
            color: '#000',
            fontSize: '22'
          },
          subtextStyle: {
            color: '#90979c',
            fontSize: '16'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            textStyle: {
              color: '#000'
            }
          }
        },
        grid: {
          borderWidth: 0,
          top: 50,
          right: 20,
          bottom: 70,
          textStyle: {
            color: '#fff'
          }
        },
        calculable: true,
        xAxis: {
          type: 'category',
          data: this.xData
        },
        yAxis: {
          type: 'value'
        },
        series: this.sData
      })
    }
  }
}
</script>
