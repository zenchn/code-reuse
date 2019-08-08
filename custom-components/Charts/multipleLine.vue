<template>
  <div :class="className" :id="id" style="width:100%" :style="{height:height}"></div>
</template>

<script>
let echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/line')
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
          trigger: 'item',
          enterable: true,
          position: function (point, params, dom, rect, size) {
            // 固定在顶部
            return [point[0] - 170, '10%'];
          },
          formatter: function (params) {
            var btnhtml = ''
            if(params.data.type == 'gnss'){
              btnhtml = '<div style="overflow:hidden;padding-top:15px;padding-bottom:10px;"><span id="btn1" class="tooltipbtn">此时数值作为基准</span><span id="btn2" class="tooltipbtn">此刻时间作为基准</span></div></div>'
            } else {
              btnhtml = '<div style="overflow:hidden;padding-top:15px;padding-bottom:10px;"><span id="btn3" class="tooltipbtn">此时数值作为基准</span></div></div>'
            }
            var imgurl = ''
            if(params.data.img){
              imgurl = params.data.img
            } else {
              imgurl = 144
            }

            var info = ''
            if(params.data.info){
              info = params.data.info
            }

            var temperature = ''
            if(params.data.temperature){
              temperature = params.data.temperature
            }

            var humidity = ''
            if(params.data.humidity){
              humidity = params.data.humidity
            }

            var direct = ''
            if(params.data.direct){
              direct = params.data.direct
            }

            var power = ''
            if(params.data.power){
              power = params.data.power
            }

            var htmlStr ='<div style="width: 250px;font-size:15px;">';
            htmlStr += '<p style="text-align: center">'+params.seriesName + '：'+params.value + '</p><div style="overflow:hidden">';
            htmlStr += '<div style="float: left;text-align:center;margin-top:10px;"><img src="./static/weather_icon/g2/icon/day/'+imgurl+'.png" style="width:50px;height:50px;"/>'+'<p>'+info+'</p>'+'</div>';
            htmlStr += '<div style="margin-left: 20px;float: left;font-size: 13px;margin-top: 10px;">';
            htmlStr += '<p>'+'温度' + '：'+temperature+'℃'+'</p>';
            htmlStr += '<p>'+'湿度' + '：'+humidity+'%'+'</p>';
            htmlStr += '<p>'+'风速' + '：'+direct+ power+'</p>';
            htmlStr += '<p>'+'时间' + '：'+params.data.dataTime+'</p>';
            htmlStr += '</div></div>';
            htmlStr += btnhtml;
            return htmlStr;
          }
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
      this.chart.off('click')
      this.chart.on('click',function(params){
        if (params.data.type == 'sensor') {
          that.$emit('changegateway',{bid:params.data.bid})
        }
      })

      this.chart.on('mouseover',function(params){
        var id = params.data.bid  
        if(params.data.type == 'gnss') {
          var gnsschart = document.getElementById('child')
          gnsschart.onclick=function(ev){
            var ev = ev||window.event;
            var target = ev.target || ev.srcElement;
            if(target.id == 'btn1') {
              that.$emit('setGnssDatabase',{id: id, type: 'data', from: 'gnss'})
            }
            if(target.id == 'btn2') {
              that.$emit('setGnssTimebase',{id: id, type: 'time', from: 'gnss'})
            }
          }
        } else {
          var sensorchart = document.getElementById('child2')
          sensorchart.onclick=function(ev){
            var ev = ev||window.event;
            var target = ev.target || ev.srcElement;
            if(target.id == 'btn3') {
              that.$emit('setSensorDatabase',{id: id, type: 'data', from: 'sensor'})
            }
          }
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
