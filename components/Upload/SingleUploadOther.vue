<template>
  <div>
    <el-upload
      accept="apk"
      v-loading.body="listLoading"
      element-loading-text="上传中，请稍候..."
      class="avatar-uploader"
      action="real/tempFile/upload"
      :multiple=false
      :data="uploadParam"
      :show-file-list="false"
      :auto-upload="true"
      :disabled="isDisabled"
      :beforeUpload="beforeAvatarUpload"
      :on-success="handleAvatarSuccess"
      :on-Error="uploadError"
      :headers="headers">
      <el-button type="primary" class="zenchn" v-if="!fileName">选择</el-button>
      <div v-else class="apkuploaded" @click.stop="doNothing">
        <div class="apkarea"></div>
        <div class="apkoperate">
          <p @click="toDownload" style="cursor:pointer"><span class="text-btn blue-text">{{fileName}}</span></p>
          <p>{{fileSize}}</p>
          <p><el-button type="danger" class="zenchn" @click="delApk" :disabled="isDisabled">删除</el-button></p>
        </div>
      </div>
    </el-upload>
  </div>
</template>
<script>
import { uploadUrl } from '@/api/uploadUrl'
import { getToken } from '@/utils/auth'
import { delPortrait, deleteIdCard } from '@/api/common/common'
export default {
  data () {
    return {
      uploadParam: {
        fileSet: ''
      },
      notEdit: false,
      showOperate: false,
      uploadedImg: '',
      listLoading:false,
      previewVisible: false,
      fileName: '',
      fileSize: '',
      fileUrl: ''
    }
  },
  props:{
    fileSet: {
      type: String,
      default: ''
    },
    apkFileUrl: {
      type: String,
      default: ''
    },
    nowfileName: {
      type: String,
      default: ''
    },
    nowfileSize: {
      type: String,
      default: ''
    },
    operate: {
      type: Boolean,
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    deleteType: {
      type: String,
      default: ''
    }
  },
  computed: {
    headers(){
      return{
        'Authorization':getToken()
      }
    }
  },
  created() {
    this.uploadParam.fileSet = this.fileSet
    this.fileName = this.nowfileName
    this.fileSize = this.nowfileSize
    this.fileUrl = this.apkFileUrl
    this.$emit('uploadchange',{fileName: this.fileName, fileSet: this.uploadParam.fileSet})
  },
  methods: {
    //成功回调
    handleAvatarSuccess (res, file) {
      this.listLoading = false
      this.fileName = file.raw.name
      this.fileUrl = res.data.fileUrl
      this.fileSize = (file.raw.size / 1024 / 1024).toFixed(2) + 'MB'
      this.$emit('uploadchange',{fileName: this.fileName, fileSet: this.uploadParam.fileSet})
    },
    // 失败回调
    uploadError (response, file, fileList) {
      this.listLoading = false
      this.$message.error('上传失败，请重试！')
    },

    beforeAvatarUpload (file) {
      this.listLoading = true
      let arrayLen = (file.name.split('.')).length-1
      
      const isLt100M = file.size / 1024 / 1024 < 100
      const extension = file.name.split('.')[arrayLen] === 'apk'
      if (!extension) {
        this.listLoading = false
        this.$message.error('上传文件只能是apk格式!')
        return false
      }
      if (!isLt100M) {
        this.$message.error('上传apk文件大小不能超过100MB!')
        this.listLoading = false
        return false
      }
      return extension || isLt100M
    },
    uploadOver(){
      if(this.operate){
        this.showOperate = true
      } else {
        this.notEdit = true
      }
    },
    uploadOut(){
      if(this.operate){
        this.showOperate = false
      } else {
        this.notEdit = false
      }
    },
    delApk(){
      this.fileName = ''
      this.$emit('uploadchange',{fileName: this.fileName, fileSet: this.uploadParam.fileSet})
    },
    doNothing(){
      
    },
    toDownload(){
      window.open(encodeURI(this.fileUrl),'_blank')
    },
    refresh(){
      this.uploadedImg = this.imageUrl
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #A6A6A6;
  width: 78px;
  height: 78px;
  line-height: 78px;
  text-align: center;
}
.avatar {
  width: 78px;
  height: 78px;
  display: block;
  position: relative
}

.upload-place{
  width: 78px;
  height: 78px;
  line-height: 78px;
  text-align: center;
  border: 1px dashed #9C9C9C;
}

.upload-operate{
  position: absolute;
  right: 0;
  bottom: 0;
  width: 78px;
  height: 78px;
  background: rgba(0,0,0,.2)
}

.upload-icon{
  width: 30px;
  height: 30px;
  position: absolute;
  top: 24px;
}

.upload-del{
  background: url(/static/images/up_del.png);
  left: 5px;
}

.upload-view{
  background: url(/static/images/up_view.png);
  right: 5px;
}

.upload-view2{
  background: url(/static/images/up_view.png);
  right: 25px;
}

.apkuploaded{
  overflow: hidden;
}

.apkarea{
  width: 170px;
  height: 170px;
  float: left;
  border: 1px solid #e5e5e5;
  background: url(/static/images/apk.png);
}

.apkoperate{
  margin-left: 200px;
  text-align: left;
}
</style>
