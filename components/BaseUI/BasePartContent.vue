<template>
  <div class="base-part-content" :class="{ noborderbottom: withtable }" :style="styleObject">
    <slot></slot>
    <div :style="paddingObject">
      <slot name="withpadding"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      withtable: {
        type: Boolean,
        default: false
      },
      setheight: {
        type: Boolean,
        default: false
      },
      heightValue: {
        default: 0
      },
      setpaddingbottom: {
        type: Boolean,
        default: false
      },
      adjustHeight: {
        type: Number,
        default: 0
      },
      paddingValue: {
        default: 10
      }
    },
    data() {
      return {
        styleObject: {
          paddingBottom: 0,
          height: 'auto'
        },
        paddingObject: {
          paddingLeft: 10 + 'px',
          paddingTop: 0,
          paddingRight: 10 + 'px',
          paddingBottom: 0
        }
      }
    },
    created(){
      if(this.setheight){
        if(this.heightValue){
          this.styleObject.height = this.heightValue + 'px'
        } else {
          var contentheight = document.documentElement.clientHeight - 185 - this.adjustHeight
          this.styleObject.height = contentheight + 'px'
        }
      }

      if(this.setpaddingbottom){
        this.styleObject.paddingBottom = 10 + 'px'
      }

      if(this.paddingValue){
        this.paddingObject.paddingLeft = this.paddingValue + 'px'
        this.paddingObject.paddingRight = this.paddingValue + 'px'
      }
    }
  }
</script>
<style lang="scss">
  .base-part-content{
    padding-top: 10px;
    border-left: 1px solid #E9EDF3;
    border-right: 1px solid #E9EDF3;
    border-bottom: 1px solid #E9EDF3;
    overflow-y: auto;
    overflow-x: hidden
  }
  .noborderbottom{
    padding-top: 0;
    border-bottom: none;
  }
</style>
