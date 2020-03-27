<template>
  <div class="basenodatatip" :style="{height: height + 'px', lineHeight: height + 'px'}">
    暂无数据
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: Number,
      default: 300
    }
  }
}
</script>

<style lang="scss">
.basenodatatip{
  text-align: center;
  font-size: 14px;
  color: #333;
}
</style>
