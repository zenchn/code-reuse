<template>
  <div>
    <el-upload
      accept="image/png,image/jpeg,image/jpg"
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
      <div @mouseover="uploadOver" @mouseout="uploadOut">
        <div class="avatar">
          <img v-if="uploadedImg" :src="uploadedImg" class="avatar" ref="uploadParam">
          <div v-else class="upload-place">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </div>
          <div v-if="uploadedImg && showOperate" class="upload-operate" @click.stop="doNothing">
            <span @click.stop="delUploadedImg" class="upload-icon upload-del"></span>
            <span class="upload-icon upload-view" @click.stop="previewVisible = true"></span>
          </div>
          <div v-if="uploadedImg && !showOperate && notEdit" class="upload-operate" @click.stop="doNothing">
            <span class="upload-icon upload-view2" @click.stop="previewVisible = true"></span>
          </div>
        </div>
      </div>
    </el-upload>
    <el-dialog title="图片预览" :visible.sync="previewVisible" width="300px">
      <img width="100%" :src="uploadedImg" alt="">
    </el-dialog>
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
      previewVisible: false
    }
  },
  props:{
    imageUrl: {
      default: '',
    },
    fileSet: {
      type: String,
      default: ''
    },
    limited: {
      type: Number,
      default: 1
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
    },
    inspectStaffId: {
      default: ''
    },
    surface: {
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
  watch: {
    imageUrl(newValue, oldValue) {
      this.uploadedImg = newValue
    }
  },
  created() {
    this.uploadParam.fileSet = this.fileSet
    this.uploadedImg = this.imageUrl
    this.$emit('uploadchange',{fileset: this.uploadParam.fileSet})
  },
  methods: {
    //成功回调
    handleAvatarSuccess (res, file) {
      this.listLoading = false
      this.uploadedImg = file.url
      this.$emit('uploadchange',{fileset: this.uploadParam.fileSet})
    },
    // 失败回调
    uploadError (response, file, fileList) {
      this.$message.error('上传失败，请重试！')
    },

    beforeAvatarUpload (file) {
      this.listLoading = true
      const isJPEG = file.type === 'image/jpeg'
      const isJPG = file.type === 'image/jpg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < this.limited
      if (!isJPG && !isJPEG && !isPNG) {
        this.$message.error('上传图片必须是JPG/PNG 格式!')
        this.listLoading = false
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过'+ this.limited +'MB!')
        this.listLoading = false
        return false
      }
      return isJPG || isLt2M || isJPEG || isPNG
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
    delUploadedImg(){
      this.uploadedImg = ''
      this.$emit('uploadchange',{fileset: ''})
      if(this.deleteType){
        if(this.deleteType == 'avatar'){
          delPortrait().then(res => {
            
          })
        }

        if(this.deleteType == 'inspector'){
          deleteIdCard(this.inspectStaffId,this.surface).then(res => {
      
          })
        }
      }
    },
    doNothing(){
      
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

</style>
