export const listPagi = {
  data() {
    return {
      list: null,
      listLoading: true,
      currentPage: 1,
      pageSizes: 10,
      pagishow: false,
      total:''
    }
  },
  methods: {
    handleSearchKeyup:function(){
      this.currentPage = 1
      this.pageSizes = 10
      this.fetchData()
    },
    onSubmit: function () {
      this.currentPage = 1
      this.pageSizes = 10
      this.fetchData()
    },
    //当前条数
    handleSizeChange (val) {
      this.pageSizes = val
      this.fetchData()
    },
    //当前页数
    handleCurrentChange (val) {
      this.currentPage = val
      this.fetchData()
    }
  },
}