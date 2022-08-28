import { mapMutations } from 'vuex'
const StatusMessageMixin = {
  methods: {
    ...mapMutations('target', ['updateOperationStatusInfo']),
    updateOperationStatus (status, message) {
      this.updateOperationStatusInfo(
        { status: status, message: message }
      )
      this.setWaitingOnOperationStatusAfterSeconds()
    },
    setWaitingOnOperationStatusAfterSeconds () {
      const self = this
      setTimeout(
        function () {
          self.updateOperationStatusInfo(
            { status: self.$entityStatus.WAITING, message: '' }
          )
        },
        10000
      )
    }
  }
}
export { StatusMessageMixin }
