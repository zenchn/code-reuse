import { getOrgManageRightCascadeData,getAreasCascadeData} from '@/api/common/common'

export const orgarea = {
  data() {
    return {
      orgOptions: [], //级联数据
      orgProps: {
          label: 'shortName',
          value: 'orgId',
          children: 'children'
      },

      areaOptions:[],
      areaProps: {
        label: 'name',
        value: 'code',
        children: 'children'
      },
    }
  },
  methods: {
    //机构选择变化
    orgHandleChange(val){
      this.listQuery.orgGroup = val
      let id = val[val.length - 1]
      this.listQuery.orgId = id
      this.freshArea()
    },

    //父级机构选项变化时触发的事件
    orgHandleItemChange (val) {
      this.listQuery.orgGroup = val
      let id = val[val.length - 1]
      this.listQuery.orgId = id
      this.freshArea()
    },
    //区域选择变化
    areaHandleChange(val){
      this.listQuery.areaGroup = val
      let id = val[val.length - 1]
      this.listQuery.areaCode = id
      
    },
    //父级区域选项变化时触发的事件
    areaHandleItemChange (val) {
      this.listQuery.areaGroup = val
      let id = val[val.length - 1]
      this.listQuery.areaCode = id
    },
    freshArea() {
      if(this.listQuery.orgId){
        getAreasCascadeData(this.listQuery.orgId).then(res => {
          this.areaOptions = res.data
          this.listQuery.areaGroup = [res.data[0].code]
          this.listQuery.areaCode = res.data[0].code
        })
      } else {
        this.listQuery.orgGroup = []
        this.areaOptions = []
        this.listQuery.areaGroup = []
        this.listQuery.areaCode = ''
      }
    }
  },
}