<template>
  <div class="vue-table-pagination">
      <slot></slot>
  </div>
</template>
<style>
  .vue-table-pagination {
    padding-top: 15px;
    padding-right: 20px;
    padding-bottom: 50px;
    overflow: hidden;
  }
  .el-pagination{
    float:right;
  }
</style>
