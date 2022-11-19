const RootDomainsLoadingMixin = {
  methods: {
    loadRootdomainAgents: function () {
      const self = this
      this.$store.dispatch('agent/loadAgentsFromServer').then(function (fullAgents) {
        if (fullAgents) {
          self.$store.dispatch('agent/updateFilteredAgentsByType', {
            type: self.$entityTypeData.ROOTDOMAIN.id,
            list: fullAgents
          })
          self.$store.dispatch('agent/loadRunningAgentsFromServer').then(function (runningAgentsRespose) {
            runningAgentsRespose.data.forEach(runningAgent => {
              const searchedAgent = self.$store.state.agent.rootDomainAgents.find(agent => agent.name === runningAgent)
              if (searchedAgent) {
                self.$store.commit('agent/updateStatusRootDomainAgentByName', {
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
export { RootDomainsLoadingMixin }
