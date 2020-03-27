<template>
  <span>
    <el-form-item :label="startLabel ? startLabel : ''">
      <el-date-picker
        v-model="initStartTime"
        :picker-options="startOptions"
        @change="startTimeStatus"
        type="date"
        :clearable="clearable"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        :placeholder="startText">
      </el-date-picker>
    </el-form-item>
    <el-form-item :label="endLabel ? endLabel : ''">
      <el-date-picker
        v-model="initEndTime"
        :picker-options="endOptions"
        @change="endTimeStatus"
        type="date"
        :clearable="clearable"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        :placeholder="endText">
      </el-date-picker>
    </el-form-item>
  </span>
</template>

<script>
export default {
  props: {
    startText: {
      type: String,
      default:'开始日期'
    },
    endText: {
      type: String,
      default:'结束日期'
    },
    startLabel: {
      type: String,
      default: ''
    },
    endLabel: {
      type: String,
      default: ''
    },
    hasDefaultTime: false,
    defaultStartTime: '',
    defaultEndTime: '',
    clearable: true
  },
  data() {
    return {
      createDate: '',
      overDate: '',
      initStartTime: '',
      initEndTime: '',
      startOptions: {
        disabledDate: (time) => {
          let endDateVal = this.initEndTime;
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime();
          }
        }
      },
      endOptions: {
        disabledDate: (time) => {
          let beginDateVal = this.initStartTime;
          if (beginDateVal) {
            return time.getTime() < new Date(beginDateVal).getTime()
          }
        }
      }
    }
  },
  created(){
    if(this.hasDefaultTime){
      this.initStartTime = this.defaultStartTime
      this.initEndTime = this.defaultEndTime
      this.setNewDate()
    }
  },
  methods: {
    startTimeStatus:function(value){
      this.createDate = value
      this.setNewDate()
    },
    endTimeStatus:function(value){
      this.overDate = value
      this.setNewDate()
    },
    setNewDate(){
      this.$emit('datechange',{ startTime: this.initStartTime, endTime: this.initEndTime })
    },
    clearDate(){
      this.initStartTime = ''
      this.initEndTime = ''
      this.setNewDate()
    }
  }
}
</script>
