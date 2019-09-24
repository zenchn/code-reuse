<template>
  <div class="counter-wrap">
    <el-input v-model="counter" class="counter-input" @blur="changeValue"></el-input>
    <span @click="count_up" class="counter-btn btn-up"><i class="el-icon-arrow-up"></i></span>
    <span @click="count_down" class="counter-btn btn-down"><i class="el-icon-arrow-down"></i></span>
  </div>
</template>

<script>
export default {
  props: {
    weight: {
      default:''
    },
    parentIndex: {
      default: ''
    },
    childIndex: {
      default: ''
    },
    isDisabled: {
      default: ''
    }
  },
  data() {
    return {
      counter: this.weight
    }
  },
  methods: {
    count_up() {
      if(this.isDisabled){
        return false
      }
      if(this.counter == 1){
        return false
      }
      this.counter = (this.counter - 0 + 0.05).toFixed(2)
      this.$emit('changeCounter',{
        counter: this.counter,
        parentIndex: this.parentIndex,
        childIndex: this.childIndex
      })
    },
    count_down() {
      if(this.isDisabled){
        return false
      }
      if(this.counter == 0){
        return false
      }
      this.counter = (this.counter - 0 - 0.05).toFixed(2)
      this.$emit('changeCounter',{
        counter: this.counter,
        parentIndex: this.parentIndex,
        childIndex: this.childIndex
      })
    },
    changeValue() {
      this.$emit('changeCounter',{
        counter: this.counter,
        parentIndex: this.parentIndex,
        childIndex: this.childIndex
      })
    }
  },
}
</script>

<style lang="scss">
.counter-wrap{
  display: inline-block;
  width: 105px;
  position: relative;
}
.counter-input{
  width: 105px;
}
.counter-btn{
  position: absolute;
  right: 0;
  display: inline-block;
  width: 30px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  cursor:pointer;
  i{
    font-size: 10px;
  }
}
.btn-up{
  top: 0;
  border-left: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
}
.btn-down{
  bottom: 0;
  border-left: 1px solid #e5e5e5;
}
</style>
