const AgentMixin = {
  methods: {
    addListAgentId (e) {
      const selectedId = Number(e.currentTarget.getAttribute('data-id'))
      const selectedAgentName = e.currentTarget.getAttribute('data-name')
      if (document.getElementById(selectedId).checked === false) {
        this.$store.commit('addIdAgent', { id: selectedId, name: selectedAgentName })
      } else {
        this.$store.commit('removebyIdAgent', selectedId)
      }
    }
  }
}
export { AgentMixin }
