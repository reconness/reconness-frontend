import axios from 'axios'
export default ({
  namespaced: true,
  state: {
    agentListStore: [],
    filterColour: '',
    idAgent: -1,
    systemColors: [
      {
        primaryColor: '#03DCED',
        secondaryColor: '#0cb8e0'
      },
      {
        primaryColor: '#737be5',
        secondaryColor: '#7159d3'
      },
      {
        primaryColor: '#F96767',
        secondaryColor: '#FF4343'
      },
      {
        primaryColor: '#FF9966',
        secondaryColor: '#f36a33'
      },
      {
        primaryColor: '#3adb99',
        secondaryColor: '#16c465'
      }
    ],
    fromDetailsLink: false,
    check: false,
    agentIdList: [],
    styleList: '1.25rem',
    viewloc: 'Home',
    styleAgentState: false,
    styleTargetState: false,
    stylePipelinesState: false,
    styleLogsState: false,
    styleNotificationsState: false,
    colorDelete: '#000000',
    agentsInstallers: [],
    isNotesSectionOpened: false,
    isDeletetFromForm: false,
    isElementDeleted: false,
    nameRoute: '',
    valueDelete: '',
    isDefaultViewOnAgent: true,
    agentSequence: 30
  },
  mutations: {
    confirm (state, valueIN) {
      state.nameRoute = valueIN.route
      state.valueDelete = valueIN.name
    },
    addAgent (state, agent) {
      state.agentSequence = state.agentSequence + 1
      agent.id = state.agentSequence.toString()
      state.agentListStore.push(agent)
    },
    setIdAgent (state, id) {
      state.idAgent = id
    },
    addIdAgent (state, agent) {
      state.agentIdList.push(agent)
      if (state.agentIdList.length === 1) {
        state.colorDelete = '#ff4545'
      }
    },
    updateAgent (state, agent) {
      const item = state.agentListStore.find(item => item.id === agent.id)
      Object.assign(item, agent)
    },
    isFilter (state, backg) {
      state.filterColour = backg
    },
    editList (state) {
      state.check = !state.check
      state.styleList = '0px'
    },
    removeAgent (state, agentName) {
      const index = state.agentListStore.findIndex(agent => agent.name === agentName)
      if (index !== -1) {
        const installerReference = state.agentListStore[index].installedFrom
        if (installerReference) {
          const indexInstaller = state.agentsInstallers.findIndex(agent => agent.id === installerReference)
          if (indexInstaller !== -1) {
            state.agentsInstallers[indexInstaller].installed = !state.agentsInstallers[indexInstaller].installed
          }
        }
        state.agentListStore.splice(index, 1)
      }
    },
    removeAgents (state) {
      for (const index1 in state.agentIdList) {
        const index = state.agentListStore.findIndex(agent => agent.id === state.agentIdList[index1].id)
        if (index !== -1) {
          const installerReference = parseInt(state.agentListStore[index].installedFrom)
          if (!isNaN(installerReference)) {
            const indexInstaller = state.agentsInstallers.findIndex(agent => agent.id === installerReference)
            if (indexInstaller !== -1) {
              state.agentsInstallers[indexInstaller].installed = !state.agentsInstallers[indexInstaller].installed
            }
          }
          state.agentListStore.splice(index, 1)
        }
      }
      state.agentIdList = []
      state.check = false
      state.styleList = '1.25rem'
      state.colorDelete = '#000000'
    },
    setDetailsLinks (state, isSelected) {
      state.fromDetailsLink = isSelected
    },
    cancelIdAgent (state) {
      state.agentIdList = []
      state.check = !state.check
      state.styleList = '1.25rem'
      state.colorDelete = '#000000'
    },
    removebyIdAgent (state, id) {
      const index = state.agentIdList.findIndex(agent => agent.id === id)
      if (index !== -1) {
        state.agentIdList.splice(index, 1)
        if (state.agentIdList.length === 0) {
          state.colorDelete = '#000000'
        }
      }
    },
    updateLocView (state, namePath) {
      state.styleTargetState = false
      state.styleAgentState = false
      state.stylePipelinesState = false
      state.styleLogsState = false
      state.styleNotificationsState = false
      if (namePath === 'Agents') {
        state.styleAgentState = true
      }
      if (namePath === 'Targets') {
        state.styleTargetState = true
      }
      if (namePath === 'Pipelines') {
        state.stylePipelinesState = true
      }
      if (namePath === 'Logs') {
        state.styleLogsState = true
      }
      if (namePath === 'NotificationsCenter') {
        state.styleNotificationsState = true
      }
      state.viewloc = namePath
    },
    installUninstallAgent (state, agentIndex) {
      state.agentsInstallers[agentIndex].installed = !state.agentsInstallers[agentIndex].installed
    },
    addAgentFromInstaller (state, agentInstallerMapped) {
      const predefinedColors = state.systemColors
      const randomColor = predefinedColors[Math.floor(Math.random() * predefinedColors.length)]
      agentInstallerMapped.primaryColor = randomColor.primaryColor
      agentInstallerMapped.secondaryColor = randomColor.secondaryColor
      state.agentListStore.push(agentInstallerMapped)
    },
    setIsNotesSectionOpened (state, value) {
      state.isNotesSectionOpened = value
    },
    setIsDeletetFromForm (state, value) {
      state.isDeletetFromForm = value
    },
    setIsElementDeleted (state, value) {
      state.isElementDeleted = value
    },
    setIsDefaultViewOnAgent (state, value) {
      state.isDefaultViewOnAgent = value
    },
    updateAgents (state, agents) {
      state.agentListStore.splice(0, state.agentListStore.length)
      agents.forEach(agent => {
        state.agentListStore.push(agent)
      })
    },
    updateAgentsInstallers (state, agentsInstallersMapped) {
      state.agentsInstallers.splice(0, state.agentsInstallers.length)
      agentsInstallersMapped.forEach(agent => {
        state.agentsInstallers.push(agent)
      })
    },
    updateInstalledFromFieldOnAgentList (state, agentsMarketMapped) {
      let foundedAgentindex
      agentsMarketMapped.forEach(agentMarket => {
        foundedAgentindex = state.agentListStore.findIndex(agent => agent.name === agentMarket.id)
        if (foundedAgentindex !== -1) {
          state.agentListStore[foundedAgentindex].installedFrom = agentMarket.id
        }
      })
    }
  },
  getters: {
    idAgent: state => {
      return state.idAgent
    },
    getAgentById: (state) => (id) => {
      return state.agentListStore.find(agent => agent.id === id)
    },
    getAgentByName: (state) => (name) => {
      return state.agentListStore.find(agent => agent.name === name)
    },
    filterByColor (state) {
      return function (colour) {
        return state.agentListStore.filter(item => item.primaryColor.includes(colour))
      }
    },
    getRandomColor: state => {
      return state.systemColors[Math.floor(Math.random() * state.systemColors.length)]
    },
    getLastAgentSubdom (state) {
      return state.agentListStore.filter(item => item.type === 3).slice(-4)
    },
    getLastAgentRootDomain (state) {
      return state.agentListStore.filter(item => item.type === 2).slice(-4)
    },
    getAgentsByType: (state) => (type) => {
      return state.agentListStore.filter(item => item.type === type)
    },
    getFilteredAgentsByName: (state) => (name) => {
      return state.agentListStore.filter(agent => agent.name.includes(name))
    },
    daysWithMostInteractionsLastWeek (state) {
      return [22, 30, 70, 77, 42, 20, 50]
    },
    getEntityTypeByDescription: (state) => (descriptionEntity) => {
      if (descriptionEntity === null) {
        return 3
      }
      const transformedDescription = descriptionEntity.toLowerCase()
      if (transformedDescription === 'target') {
        return 1
      } else if (transformedDescription === 'rootdomain') {
        return 2
      } else {
        return 3
      }
    },
    getEntitySourceByDescription: (state) => (entitySourceDescription) => {
      if (entitySourceDescription === null) {
        return 1
      }
      const transformedDescription = entitySourceDescription.toLowerCase()
      if (transformedDescription === 'user') {
        return 1
      } else {
        return 2
      }
    },
    getEntitySourceDescriptionByCode: (state) => (entitySourceCode) => {
      if (entitySourceCode === 1) {
        return 'user'
      }
      return 'system'
    },
    getPrimaryColor: (state) => (primaryColor) => {
      if (primaryColor === null) {
        return '#737be5'
      }
      return primaryColor
    },
    getSecondaryColor: (state) => (secondaryColor) => {
      if (secondaryColor === null) {
        return '#7159d3'
      }
      return secondaryColor
    },
    getEntityTypeDescriptionByCode: (state) => (entityTypeCode) => {
      if (entityTypeCode === 1) {
        return 'target'
      } else if (entityTypeCode === 2) {
        return 'rootdomain'
      } else {
        return 'subdomain'
      }
    },
    isAgentInstalled: (state, getters) => (agentName) => {
      const index = state.agentListStore.findIndex(agent => agent.name === agentName)
      return index >= 0
    },
    mapServerAgentMarket: (state, getters) => (agents) => {
      const newMarkedAgents = []
      let newMarkedAgent
      agents.forEach(agent => {
        newMarkedAgent = {
          name: agent.name,
          description: 'Description of agent ' + agent.name,
          id: agent.name,
          installed: getters.isAgentInstalled(agent.name),
          category: agent.category,
          command: agent.command,
          isByRootDomain: agent.isByRootDomain,
          isByTarget: agent.isByTarget,
          isBySubdomain: agent.isBySubdomain,
          scriptUrl: agent.scriptUrl,
          repository: agent.repository
        }
        newMarkedAgents.push(newMarkedAgent)
      })
      return newMarkedAgents
    },
    mapAgents: (state, getters) => (agents) => {
      const newAgents = []
      let newAgent
      agents.forEach(agent => {
        newAgent = getters.mapAgentFromServerToLocal(agent)
        newAgents.push(newAgent)
      })
      return newAgents
    },
    mapAgentFromServerToLocal: (state, getters) => (agent) => {
      const mappedAgent = {
        name: agent.name,
        primaryColor: getters.getPrimaryColor(agent.primaryColor),
        secondaryColor: getters.getSecondaryColor(agent.secondaryColor),
        id: agent.id,
        repository: agent.repository,
        command: agent.command,
        type: getters.getEntityTypeByDescription(agent.agentType),
        isAliveTrigger: agent.triggerSubdomainIsAlive,
        isHttpOpenTrigger: agent.triggerSubdomainHasHttpOrHttpsOpen,
        script: '',
        image: agent.image,
        date: new Date(),
        installedFrom: '',
        lastRun: new Date(agent.lastRun),
        createdBy: getters.getEntitySourceByDescription(agent.createdBy),
        categories: agent.categories
      }
      if (agent.script != null) {
        mappedAgent.script = agent.script
      }
      return mappedAgent
    },
    mapAgentFromLocalToServer: (state, getters) => (agent) => {
      const mappedAgent = {
        name: agent.name,
        command: agent.command,
        repository: agent.repository,
        agentType: getters.getEntityTypeDescriptionByCode(agent.type),
        entitySource: agent.createdBy,
        primaryColor: agent.primaryColor,
        secondaryColor: agent.secondaryColor,
        script: agent.script,
        createdBy: getters.getEntitySourceDescriptionByCode(agent.createdBy),
        triggerSubdomainIsAlive: agent.isAliveTrigger,
        triggerSubdomainHasHttpOrHttpsOpen: agent.isHttpOpenTrigger,
        categories: agent.categories,
        image: agent.image
      }
      return mappedAgent
    }
  },
  actions: {
    removeAgentsSelected ({ state, commit, rootState }) {
      rootState.target.entitiesToDelete.forEach(entity => {
        const index = state.agentListStore.findIndex(agent => agent.id === entity.id)
        if (index !== -1) {
          commit('removeAgent', entity.name)
        }
      })
      commit('target/clearReferencesToDelete', null, { root: true })
    },
    clearAgentEntitiesToDelete ({ state, commit, rootState, dispatch }) {
      const agentNames = []
      rootState.target.entitiesToDelete.forEach(entity => {
        let agentName
        const index = state.agentListStore.findIndex(agent => agent.id === entity.id)
        if (index !== -1) {
          agentName = state.agentListStore[index].name
          agentNames.push(agentName)
        }
      })
      return axios.delete('/agents/batch', {
        data: agentNames
      }).then(function (response) {
        dispatch('removeAgentsSelected')
        return { status: true, message: '' }
      }).catch(function (error) {
        return { status: false, message: error.response.data }
      })
    },
    loadMarketplace ({ state, commit, getters, rootState }) {
      if (rootState.auth.authentication_token !== '') {
        return axios.get('/agents/marketplace')
          .then(function (response) {
            const agentsMarketMapped = getters.mapServerAgentMarket(response.data)
            commit('updateInstalledFromFieldOnAgentList', agentsMarketMapped)
            commit('updateAgentsInstallers', agentsMarketMapped)
            return true
          }).catch(function () {
            return false
          })
      }
    },
    loadAgents ({ state, commit, getters, rootState }) {
      if (rootState.auth.authentication_token !== '') {
        return axios.get('/agents')
          .then(function (response) {
            const agentsMapped = getters.mapAgents(response.data)
            commit('updateAgents', agentsMapped)
            return true
          })
          .catch(function () {
            return false
          })
      }
    },
    addAgentToServer ({ state, rootState, getters }, agent) {
      if (rootState.auth.authentication_token !== '') {
        return axios.post('/agents', getters.mapAgentFromLocalToServer(agent))
          .then(function (response) {
            agent.id = response.data.id
            state.agentListStore.push(agent)
            return { status: true, message: '' }
          })
          .catch(function (error) {
            return { status: false, message: error.response.data }
          })
      }
    },
    removeAgentFromInstaller ({ state }, installer) {
      const index = state.agentListStore.findIndex(agent => agent.installedFrom === installer.idInstaller)
      if (index !== -1) {
        return axios.delete('/agents/' + installer.nameInstaller)
          .then(function (response) {
            state.agentListStore.splice(index, 1)
            return { status: true, message: '' }
          }).catch(function (error) {
            return { status: false, message: error.response.data }
          })
      }
    },
    updateAgentToServer ({ state, rootState, getters, commit }, agent) {
      if (rootState.auth.authentication_token !== '') {
        return axios.put('/agents/' + agent.id, getters.mapAgentFromLocalToServer(agent))
          .then(function (response) {
            commit('updateAgent', agent)
            return { status: true, message: '' }
          })
          .catch(function (error) {
            return { status: false, message: error.response.data }
          })
      }
    },
    agentInstallerUninstaller ({ state, rootState, getters, commit }, agentId) {
      const index = state.agentsInstallers.findIndex(agent => agent.id === agentId)
      if (index !== -1) {
        const agentInstaller = state.agentsInstallers[index]
        return axios.post('/agents/install', agentInstaller)
          .then(function (response) {
            commit('installUninstallAgent', index)
            const agentDto = response.data
            const mappedAgent = getters.mapAgentFromServerToLocal(agentDto)
            mappedAgent.createdBy = 2
            mappedAgent.installedFrom = agentInstaller.id
            state.agentListStore.push(mappedAgent)
            return { status: true, message: '' }
          }).catch(function (error) {
            return { status: false, message: error.response.data }
          })
      }
    },
    debugCode ({ state, rootState, getters, commit }, debugScripts) {
      if (rootState.auth.authentication_token !== '') {
        return axios.post('/agents/debug', debugScripts)
          .then(function (response) {
            return response.data
          })
          .catch(function (error) {
            return error.data
          })
      }
    }
  }
})
