const AgentMixin = {
  computed: {
    arrayAgentFilterList () {
      if (this.filterColour === '') {
        return this.agentListStore
      } else {
        return this.filterByColor(this.filterColour)
      }
    },
    filteredAgentList () {
      return this.arrayAgentFilterList.slice(this.paginator.startIndex, this.paginator.endIndex)
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
    setAgentId (e) {
      const selectedAgentId = e.currentTarget.getAttribute('data-id')
      this.$store.commit('agent/setIdAgent', selectedAgentId)
    }
  }
}
export { AgentMixin }
