import { mapMutations } from 'vuex'
const TargetMixin = {
  computed: {
    isOnTargetView () {
      return this.$route.name === 'Targets'
    },
    isOnTargetDetailView () {
      return this.$route.name === 'TargetDetail'
    }
  },
  methods: {
    ...mapMutations('target', ['updateOperationStatusInfo']),
    addListTargetId (e) {
      const selectedId = Number(e.currentTarget.getAttribute('data-id'))
      const selectedTargetName = e.currentTarget.getAttribute('data-name')
      if (document.getElementById(selectedId).checked === false) {
        this.addIdTarget({ id: selectedId, name: selectedTargetName })
      } else {
        this.removebyIdTarget(selectedId)
      }
    },
    prepareToDelete (e, entityType) {
      const entityName = e.currentTarget.getAttribute('data-name')
      const entityId = e.currentTarget.getAttribute('data-id')
      this.addEntityToDelete(
        {
          id: parseInt(entityId),
          name: entityName,
          type: entityType // this.$agentType.TARGET
        }
      )
    },
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
        5000
      )
    }
  }
}
export { TargetMixin }
