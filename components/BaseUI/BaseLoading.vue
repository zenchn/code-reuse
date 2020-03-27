<template>
  <div>
    <div class="loading-area" v-if="isLoading" v-loading="isLoading" :element-loading-text="loadingText"></div>
  </div>
</template>
<script>
  export default {
    props: {
      loadingText: {
        type: String,
        default: '数据加载中，请稍等……'
      }
    },
    data() {
      return {
        isLoading: false
      }
    },
    methods: {
      showLoading() {
        this.isLoading = true
      },
      hideLoading() {
        this.isLoading = false
      }
    },
  }
</script>
<style lang="scss">
.loading-area{
  position: fixed;
  right:0;
  bottom: 0;
  left: 194px;
  top: 90px;
  z-index: 99999;
}
</style>
