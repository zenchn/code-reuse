<template>
  <div class="tableList" :class="{ mt10 : mt }">
    <div class="tableList-text" :class="{ opacity: opacity }" >
      <slot></slot>
      <div class="head-right">
        <slot class="aaa" name="headright"></slot>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      mt: {
        type: Boolean,
        default: false
      },
      opacity: {
        type: Boolean,
        default: false
      }
    },
  }
</script>
<style lang="scss">
.tableList{
  position: relative;
  border-width: 0px;
  width: 100%;
  height: 40px!important;
  font-weight: 400;
  font-size: 14px;
  text-align: left;
  line-height: 36px;
  margin-top: 0!important;
  &.mt10{
    margin-top: 10px!important;
  }
  .tableList-text{
    overflow: hidden;
    width: 100%;
    height: 40px;
    background: inherit;
    background: #EEF1F5;
    box-sizing: border-box;
    border: 1px solid #EEF1F5;
    color: #555;
    font-size: 14px;
    text-align: left;
    line-height: 40px;
    padding-left:20px;
    &.opacity{
      background:rgba(238,241,245,.4);
    }
    .head-right{
      position: absolute;
      height: 30px!important;
      line-height: 30px;
      top: 5px;
      right: 20px;
      div{
        height: 30px;
        line-height: 30px;
      }
    }
  }
  .el-input,.el-input__inner{
    height: 30px;
    font-size: 12px;
    width: 130px;
  }
  .el-date-editor--datetimerange{
    width: 350px;
    margin-left: 10px;
  }
  .widedatetime .el-input__inner{
    width: 200px;
  }
  .widedatetime.el-input{
    width: 200px;
  }
  .el-range-editor.el-input__inner{
    padding: 0 10px;
  }
}
</style>
