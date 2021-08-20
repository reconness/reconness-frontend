const PipelineMixin = {
  methods: {
    isChecked (itemID) {
      if (this.checkSelected === false) {
        if (this.pipelinesIdList.find(pipeline => pipeline.id === itemID)) {
          if (this.checkDeleted === itemID) {
            return false
          } else {
            return true
          }
        } else {
          if (this.checkDeleted === itemID) {
            return true
          } else {
            return false
          }
        }
      }
    }
  }
}
export { PipelineMixin }
