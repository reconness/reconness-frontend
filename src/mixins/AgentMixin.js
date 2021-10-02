const AgentMixin = {
  computed: {
    arrayFilterList () {
      if (this.filterColour === '') {
        return this.agentListStore
      } else {
        return this.filterByColor(this.filterColour)
      }
    },
    filteredAgentList () {
      return this.arrayFilterList.slice(this.paginator.startIndex, this.paginator.endIndex)
    }
  },
  methods: {
    addListAgentId (e) {
      const selectedId = Number(e.currentTarget.getAttribute('data-id'))
      const selectedAgentName = e.currentTarget.getAttribute('data-name')
      if (document.getElementById(selectedId).checked === false) {
        this.$store.commit('agent/addIdAgent', { id: selectedId, name: selectedAgentName })
      } else {
        this.$store.commit('agent/removebyIdAgent', selectedId)
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
    prepareToDeleteFromMultipleSelections (e) {
      const entityId = Number(e.currentTarget.getAttribute('data-id'))
      const isCurrentCheckBoxChecked = document.getElementById('remove_customCheckbox' + entityId).checked
      if (!isCurrentCheckBoxChecked) {
        this.prepareToDelete(e, this.$agentType.TARGET)
      } else {
        this.removeTargetEntityToDelete(entityId)
      }
    }
  }
}
export { AgentMixin }
