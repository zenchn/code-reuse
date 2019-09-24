<template>
  <div :class="className" :id="id" style="width:100%" :style="{height:height}"></div>
</template>

<script>
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/axis')
require('echarts/lib/component/axisPointer')
require('echarts/lib/component/legend')
require('echarts/lib/component/toolbox')
require('echarts/lib/component/title')
require('echarts/lib/component/dataZoom')
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    subtext: {
      type: String
    },
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chartid'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    },
    chartdata:Object
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  watch: {
    chartdata: {
      handler(newValue, oldValue) {
        this.chartdata = newValue
        this.initChart()
      },
      deep: true
    }
  },
  methods: {
    initChart() {
      var that = this
      this.chart = echarts.init(document.getElementById(this.id))
      var afterData = this.chartdata
      var option = {
        title: {
            text: this.title
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          left: 'center',
          show: true,
          data: afterData.legend
        },
        xAxis: afterData.xAxis,
          color:['#0097e6', '#44bd32', '#8c7ae6', '#e1b12c','#273c75','#2f3640', '#487eb0'],
        grid: {
          left: '5%',
          right: '5%',
          containLabel: true
        },
        yAxis: afterData.yAxis,
        toolbox: {
            show: true,
            orient: 'vertical',
            right:'20px',
            top: 'center',
            feature: {
              mark: {show: true},
              magicType: {show: true, type: ['bar','line']},
              saveAsImage: {show: true}
            }
        },
        dataZoom: [{
            // startValue: '2017-06-01'
        }, {
            type: 'inside'
        }],
        series: afterData.series
      }
      this.chart.clear()
      this.chart.on('click',function(params){
        if (params.data.type == 'sensor') {
          that.$emit('changegateway',{bid:params.data.bid})
        }
      })
      this.chart.setOption(option)
    },
    refreshchart(){
      this.initChart()
    },
    parentHandleclick(){
      console.log('parent')
    }
  }
}
</script>
