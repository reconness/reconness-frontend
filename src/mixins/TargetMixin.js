const TargetMixin = {
  computed: {
    isOnTargetView () {
      return this.$route.name === 'Targets'
    }
  },
  methods: {
    addListTargetId (e) {
      const selectedId = Number(e.currentTarget.getAttribute('data-id'))
      const selectedTargetName = e.currentTarget.getAttribute('data-name')
      if (document.getElementById(selectedId).checked === false) {
        this.addIdTarget({ id: selectedId, name: selectedTargetName })
      } else {
        this.removebyIdTarget(selectedId)
      }
    },
    prepareToDelete (e) {
      const targetName = e.currentTarget.getAttribute('data-name')
      const targetId = e.currentTarget.getAttribute('data-id')
      this.addEntityToDelete(
        {
          id: parseInt(targetId),
          name: targetName,
          type: this.$agentType.TARGET
        }
      )
    }
  }
}
export { TargetMixin }
