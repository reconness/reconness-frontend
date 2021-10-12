const PipelineMixin = {
  methods: {
    addListPipelinesId (e) {
      const selectedId = Number(e.currentTarget.getAttribute('data-id'))
      const selectedPipelinesName = e.currentTarget.getAttribute('data-name')
      if (document.getElementById(selectedId).checked === false) {
        this.addIdPipeline({ id: selectedId, name: selectedPipelinesName })
      } else {
        this.removebyIdPipelines(selectedId)
      }
    },
    prepareToDeleteFromMultipleSelections (e, entityType) {
      const entityId = Number(e.currentTarget.getAttribute('data-id'))
      const isCurrentCheckBoxChecked = document.getElementById('remove_customCheckbox' + entityId).checked
      if (!isCurrentCheckBoxChecked) {
        this.prepareToDelete(e, entityType)
      } else {
        this.removeTargetEntityToDelete(entityId)
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
    }
  }
}
export { PipelineMixin }
