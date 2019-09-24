export const closeTag = {
  data() {
    return {
      
    }
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path
    },
    closeSelectedTag(view) {
      this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view)
        }
      })
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView)
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        this.$router.push('/index')
      }
    },
    closeTag(){
      var currentPath = this.$route.path
      var tagViews = this.$store.state.tagsView.visitedViews
      var index = this._.findIndex(tagViews,['path',currentPath])
      this.closeSelectedTag(tagViews[index])
    }
  },
}