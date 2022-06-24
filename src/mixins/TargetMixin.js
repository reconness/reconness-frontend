import { mapMutations } from 'vuex'
const TargetMixin = {
  computed: {
    isOnTargetView () {
      return this.$route.name === 'Targets'
    },
    isOnTargetDetailView () {
      return this.$route.name === 'TargetDetail'
    },
    isOnRootDetailsView () {
      return this.$route.name === 'RootDomainDetails'
    },
    arrayTargetFilterList () {
      if (this.filterColour === '') {
        return this.targetListStore
      } else {
        return this.filterByColor(this.filterColour)
      }
    },
    filteredTargetList () {
      return this.arrayTargetFilterList.slice(this.paginator.startIndex, this.paginator.endIndex)
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
    },
    setTargetId (e) {
      const selectedTargetId = e.currentTarget.getAttribute('data-id')
      this.$store.commit('target/setIdTarget', selectedTargetId)
    }
  }
}
export { TargetMixin }
