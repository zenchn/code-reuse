<template>
  <div style="position:relative;">
    <div id="container" style="height: 400px"></div>
    <div class="mapsearch-scollbar" v-if="showpanel">
      <base-scroll :height="370" :pbvalue="50">
        <div id="panel"></div>
      </base-scroll>
    </div>
    <div id="myMapSearch" style="position: absolute;top: 0px;width:280px;left: 10px;">
      <div>
        <el-input v-model="input"  @keyup.enter.native="handleSearchKeyup" style="width:200px;height:30px;line-height:30px;display:inline-block"></el-input>
        <el-button type="primary" class="zenchn" @click="searchAddress">搜索</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initAccord: {
      default:''
    },
  },
  data() {
    return {
      input: '',
      zoom: 12,
      center: [120.149799, 30.246539],
      markers: [],
      map: "",
      point: "",
      localsearch: "",
      placeSearch: '',
      showpanel: false,
      initLocate: ''
    }
  },
  created(){
    this.initLocate = this.initAccord
  },
  mounted(){
    this.initMap()
  },
  methods: {
    initMap() {
      let AMap = window.AMap
      this.map = new AMap.Map('container', {
        resizeEnable: true,
        center: this.center,
        zoom: this.zoom,
        features: ['bg', 'road', 'building']//设置地图上显示的元素种类, 支持'bg'（地图背景）、'point'（POI点）、'road'（道路）、'building'（建筑物）
      })
      var that = this

      AMap.service('AMap.PlaceSearch',function(){
        that.placeSearch = new AMap.PlaceSearch({
          pageSize: 5, // 单页显示结果条数
          pageIndex: 1, // 页码
          citylimit: false,  //是否强制限制在设置的城市内搜索
          map: that.map, // 展现结果的地图实例
          panel: "panel", // 结果列表将在此容器中进行展示。
          autoFitView: true,
          renderStyle: 'default'
        });
      })

      AMap.event.addListener(this.placeSearch, "selectChanged", this.selectAddress);

      if(this.initLocate){
        var marker = new AMap.Marker({
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
          position: this.initLocate.split(',')
        });
        this.map.setCenter(this.initLocate.split(','))
        this.map.clearMap();
        this.map.add(marker);
      }
      //地图点击
      this.map.on('click', function (e) {
        var marker = new AMap.Marker({
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
          position: [e.lnglat.getLng(),e.lnglat.getLat()]
        });
        that.map.clearMap();
        that.map.add(marker);
        that.$emit('getlocate',{lng:e.lnglat.getLng(), lat:e.lnglat.getLat()})
      });
    },
    searchAddress() {
      this.showpanel = true
      this.map.clearMap()
      this.placeSearch.search(this.input);
    },
    selectAddress(e) {
      let location = e.selected.data.location;
      this.$emit('getlocate',{lng:location.lng, lat:location.lat})
    },
    handleSearchKeyup:function(){
      this.searchAddress()
    }
  },
}
</script>

<style lang="scss">

#myMapSearch{
  .el-input__inner{
    height: 30px;
    line-height: 30px;
  }
}
.mapsearch-scollbar{
  position: absolute;
  top: 40px;
  left: 10px;
  width: 280px;
}
</style>
