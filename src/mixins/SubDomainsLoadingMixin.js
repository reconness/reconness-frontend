const SubDomainsLoadingMixin = {
  methods: {
    loadSubdomainAgents: function () {
      const self = this
      this.$store.dispatch('agent/loadAgentsFromServer').then(function (fullAgents) {
        if (fullAgents) {
          self.$store.dispatch('agent/updateFilteredAgentsByType', {
            type: self.$entityTypeData.SUBDOMAIN.id,
            list: fullAgents
          })
          self.$store.dispatch('agent/loadRunningAgentsFromServer').then(function (runningAgentsRespose) {
            runningAgentsRespose.data.forEach(runningAgent => {
              const searchedAgent = self.$store.state.agent.subDomainAgents.find(agent => agent.name === runningAgent)
              if (searchedAgent) {
                self.$store.commit('agent/updateStatusSubDomainAgentByName', {
                  status: self.$entityStatus.RUNNING,
                  agentName: searchedAgent.name
                })
              }
            })
          })
        }
      })
    }
  }
}
export { SubDomainsLoadingMixin }
