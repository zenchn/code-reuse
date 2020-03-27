<template>
  <div class="vue-table-search" :class="{innerSearch: inner, largeSearch: large}">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    props: {
      inner: {
        type: Boolean,
        default: false
      },
      large: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
<style lang="scss">
  .vue-table-search {
    position: relative;
    padding: 10px 10px 0 10px!important;
    overflow: hidden;
    .el-form {
      float: left;
    }
    .el-form-item {
      margin-bottom: 10px;
    }
    .el-button{
      margin-bottom: 10px;
    }
    .el-form-item__content{
      line-height: 30px;
    }
    .specialinput{
      .el-form-item__content{
        width: 100%;
      }
    }
    .el-form-item__label{
      line-height: 30px;
    }
    .el-input__inner{
      height: 30px;
      line-height: 30px;
    }
    .el-date-editor--datetimerange{
      width: 360px;
    }
    .el-button--small{
      padding: 8px 15px;
    }
    .el-form-item__content{
      width: 217px
    }
    .el-cascader{
      width: 217px;
      line-height: 30px;
    }
    .el-cascader__label{
      padding: 0 10px;
    }
    .el-select{
      width: 217px;
    }
    .el-icon-time{
      line-height: 25px;
    }
    .el-range-separator{
      line-height: 25px;
    }
    .el-button+.el-button{
      margin-left: 0;
      margin-right: 2px;
    }
    &.largeSearch{
      .el-form-item__content{
        width: 280px
      }
      .el-cascader{
        width: 280px;
        line-height: 30px;
      }
      .el-select{
        width: 280px;
      }
    }
  }
  .innerSearch{
    padding: 10px 0 0 0!important;
  }
</style>
