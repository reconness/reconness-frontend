const AgentMixin = {
  methods: {
    isAgentChecked (agentId) {
      const self = this
      setTimeout(
        function () {
          return self.agentIdList.find(agent => agent.id === agentId)
        },
        1000
      )
    }
  }
}
export { AgentMixin }
