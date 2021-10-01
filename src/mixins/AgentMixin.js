const AgentMixin = {
  computed: {
    isOnAgentView () {
      return this.$route.name === 'Agent'
    },
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
    }
  }
}
export { AgentMixin }
