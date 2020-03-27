<template>
  <div class="baseBuildingInfo" :class="{innerInfo: inner}">
    <div v-if="isStatic">
      <span>建筑名称：{{buildingName}}</span>
      <span class="second-info">所在地区：</span>{{areaFullName}}
    </div>
    <div v-else><slot></slot></div>
  </div>
</template>
<script>
  import { getBuildingInfo } from '@/api/common/common'
  export default {
    props: {
      buildingId: {
        type: String,
        default: ''
      },
      inner: {
        type: Boolean,
        default: false
      },
      isStatic: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        buildingName: '',
        areaFullName: ''
      }
    },
    mounted () {
      this.updateBuilding(this.buildingId)
    },
    methods: {
      updateBuilding(buildingId){
        if(buildingId){
          getBuildingInfo(buildingId).then(res => {
            this.buildingName = res.data.buildingName
            this.areaFullName = res.data.areaFullName
          })
        }
      }
    },
  }
</script>
<style lang="scss">
  .baseBuildingInfo{
    background:rgba(41,117,230, .1);
    overflow: hidden;
    margin: 0 10px 10px 10px;
    padding: 15px 20px;
    color: #638ECA;
    font-size: 14px;
    &.innerInfo{
      margin: 0 0 10px 0;
    }
    p{
      text-align: center;
    }
    .second-info{
      position: relative;
      padding-left: 41px;
      &:before{
        content: '';
        position: absolute;
        left: 20px;
        top: 1px;
        width: 1px;
        height: 14px;
        background: #638ECA;
      }
    }
  }
</style>
