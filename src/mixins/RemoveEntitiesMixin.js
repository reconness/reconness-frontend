const RemoveEntitiesMixin = {
  methods: {
    prepareToDelete (e, entityType) {
      const entityName = e.currentTarget.getAttribute('data-name')
      const entityId = e.currentTarget.getAttribute('data-id')
      this.addEntityToDelete(
        {
          id: entityId,
          name: entityName,
          type: entityType // this.$agentType.TARGET
        }
      )
    },
    prepareToDeleteFromMultipleSelections (e, entityType) {
      const entityId = e.currentTarget.getAttribute('data-id')
      const isCurrentCheckBoxChecked = document.getElementById('remove_customCheckbox' + entityId).checked
      if (!isCurrentCheckBoxChecked) {
        this.prepareToDelete(e, entityType)
      } else {
        this.removeTargetEntityToDelete(entityId)
      }
    }
  }
}
export { RemoveEntitiesMixin }
