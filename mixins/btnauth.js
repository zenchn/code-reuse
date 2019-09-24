import { mapGetters } from 'vuex'
export const btnauth = {
    data () {
        return {
            authedBtn: {}
        }
    },
    computed: {
      ...mapGetters([
        'permission_routers'
      ])
    },
    created () {
      var authList=localStorage.getItem("authList")
      // console.log(authList)
      let arr = JSON.parse(authList)
      this.authedBtn = arr
    },
    methods: {
        hasAuth: function (auth) {
          let arrList = this.authedBtn
          let result = true
          if(arrList){
            for(let t = 0; t < arrList.length; t++){
              if(auth === arrList[t]){
                return result
              }
            }
          } else {
            return false
          }
        }
    }
}
