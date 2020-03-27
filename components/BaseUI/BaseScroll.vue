<template>
  <div class="scroll-container" @mouseover="pauseScroll" @mouseout="restartScroll">
    <el-scrollbar ref="myScrollbar" :horizon="horizon">
      <div :style="{ maxHeight: height + 'px',paddingBottom: pbvalue + 'px' }">
        <slot></slot>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
  export default {
    props: {
      horizon: {
        type: Boolean,
        default: false
      },
      height: {
        default: '100'
      },
      pbvalue: {
        default: '30'
      },
      openAuto: false
    },
    data() {
      return {
        scrollTop: -100,
        isMove: true
      }
    },
    mounted() {
      this.autoscroll()
    },
    methods: {
      autoscroll() {
        if(this.openAuto){
          setInterval(() => {
            if(this.isMove){
              if(this.scrollTop >= this.$refs['myScrollbar'].wrap.scrollHeight - 220){
                this.scrollTop = 0
              }
              this.scrollTop = this.scrollTop + 1
              this.$refs['myScrollbar'].wrap.scrollTop = this.scrollTop
            }
          },30)
        }
      },
      pauseScroll(){
        this.isMove = false
      },
      restartScroll(){

        this.scrollTop = this.$refs['myScrollbar'].wrap.scrollTop
        this.isMove = true
      }
    },
  }
</script>
<style lang="scss">
.scroll-container .el-scrollbar__wrap{
  overflow-x: hidden;
}
</style>