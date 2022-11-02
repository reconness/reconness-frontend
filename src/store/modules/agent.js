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
    agentSequence: 30,
    selectedAgents: [],
    configFilePath: '',
    rootDomainAgents: [],
    subDomainAgents: []
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
      const agentId = state.agentListStore[index].id
      if (index >= 0) {
        const indexInstaller = state.agentsInstallers.findIndex(agentInstaller => agentInstaller.id === agentId)
        if (indexInstaller !== -1) {
          state.agentsInstallers[indexInstaller].installed = false
        }
        state.agentListStore.splice(index, 1)
      }
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
    updateSelectedAgents (state, agents) {
      state.selectedAgents = agents
    },
    clearSelectedAgentsList (state) {
      state.selectedAgents.splice(0, state.selectedAgents.length)
    },
    updateFilteredAgentsByType (state, agentsData) {
      if (agentsData.type === 2) {
        state.rootDomainAgents.splice(0, state.rootDomainAgents.length)
        const filteredAgents = agentsData.list.filter(item => item.type === 2)
        filteredAgents.forEach(item => {
          state.rootDomainAgents.push(item)
        })
      }
      if (agentsData.type === 3) {
        state.subDomainAgents.splice(0, state.subDomainAgents.length)
        const filteredAgents = agentsData.list.filter(item => item.type === 3)
        filteredAgents.forEach(item => {
          state.subDomainAgents.push(item)
        })
      }
    },
    updateStatusRootDomainAgent (state, params) {
      const filteredAgent = state.rootDomainAgents.find(agent => agent.id === params.idAgent)
      filteredAgent.status = params.status
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
    mostInteractionsLastWeekPerDay (state, getters, rootState) {
      const interactionsPerDay = []
      if (rootState.target.dashboardData) {
        for (let daysOfWeekIndex = 0; daysOfWeekIndex <= 6; daysOfWeekIndex++) {
          const value = rootState.target.dashboardData.interactions.find(dayContent => dayContent.day === daysOfWeekIndex)
          if (value) {
            interactionsPerDay.push(value.count)
          } else {
            interactionsPerDay.push(0)
          }
        }
      }
      return interactionsPerDay
    },
    daysWithMostInteractionsLastWeek (state, getters, rootState) {
      const interactionsDays = []
      if (rootState.target.dashboardData) {
        rootState.target.dashboardData.interactions.forEach(dayContent => {
          interactionsDays.push(
            getters.getWeekDayLetter(dayContent.day)
          )
        })
        return interactionsDays
      }
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
    isAgentInstalled: (state, getters) => (agentId) => {
      const index = state.agentListStore.findIndex(agent => agent.id === agentId)
      return index >= 0
    },
    mapServerAgentMarket: (state, getters) => (agents) => {
      const newMarkedAgents = []
      let newMarkedAgent
      agents.forEach(agent => {
        newMarkedAgent = {
          name: agent.name,
          description: 'Description of agent ' + agent.name,
          id: agent.id,
          installed: getters.isAgentInstalled(agent.id),
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
        lastRun: new Date(agent.lastRun),
        createdBy: agent.createdBy,
        categories: agent.categories,
        configurationFile: agent.configurationFileName,
        triggerSubdomainIncExcServicePort: agent.triggerSubdomainIncExcServicePort,
        triggerSubdomainServicePort: agent.triggerSubdomainServicePort,
        triggerSubdomainIncExcName: agent.triggerSubdomainIncExcName,
        triggerSubdomainName: agent.triggerSubdomainName,
        triggerSubdomainIncExcIP: agent.triggerSubdomainIncExcIP,
        triggerSubdomainIP: agent.triggerSubdomainIP,
        triggerSubdomainIncExcTechnology: agent.triggerSubdomainIncExcTechnology,
        triggerSubdomainTechnology: agent.triggerSubdomainTechnology,
        triggerSubdomainIncExcLabel: agent.triggerSubdomainIncExcLabel,
        triggerSubdomainLabel: agent.triggerSubdomainLabel,
        triggerSkipIfRunBefore: agent.triggerSkipIfRunBefore,
        triggerRootdomainName: agent.triggerRootdomainName,
        triggerRootdomainIncExcName: agent.triggerRootdomainIncExcName,
        triggerSubdomainIsMainPortal: agent.triggerSubdomainIsMainPortal,
        status: 3
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
        createdBy: agent.createdBy,
        triggerSubdomainIsAlive: agent.isAliveTrigger,
        triggerSubdomainHasHttpOrHttpsOpen: agent.isHttpOpenTrigger,
        categories: agent.categories,
        image: agent.image,
        configurationFileName: agent.configurationFile,
        triggerSubdomainIncExcServicePort: agent.triggerSubdomainIncExcServicePort,
        triggerSubdomainServicePort: agent.triggerSubdomainServicePort,
        triggerSubdomainIncExcName: agent.triggerSubdomainIncExcName,
        triggerSubdomainName: agent.triggerSubdomainName,
        triggerSubdomainIncExcIP: agent.triggerSubdomainIncExcIP,
        triggerSubdomainIP: agent.triggerSubdomainIP,
        triggerSubdomainIncExcTechnology: agent.triggerSubdomainIncExcTechnology,
        triggerSubdomainTechnology: agent.triggerSubdomainTechnology,
        triggerSubdomainIncExcLabel: agent.triggerSubdomainIncExcLabel,
        triggerSubdomainLabel: agent.triggerSubdomainLabel,
        triggerSkipIfRunBefore: agent.triggerSkipIfRunBefore,
        triggerRootdomainName: agent.triggerRootdomainName,
        triggerRootdomainIncExcName: agent.triggerRootdomainIncExcName,
        triggerSubdomainIsMainPortal: agent.triggerSubdomainIsMainPortal
      }
      return mappedAgent
    },
    entitySource: (state, getters) => (agent) => {
      return {
        USER: { id: 1, description: 'User' },
        SYSTEM: { id: 2, description: 'System' }
      }
    },
    getWeekDayLetter: (state) => (dayNumber) => {
      const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
      return days[dayNumber]
    },
    filterAgentsByType (state, agentsData) {
      const filteredAgents = agentsData.list.filter(agent => (agent.type === agentsData.type))
      return filteredAgents
    }
  },
  actions: {
    removeAgentsSelected ({ state, commit, rootState }) {
      rootState.general.entitiesToDelete.forEach(entity => {
        const index = state.agentListStore.findIndex(agent => agent.id === entity.id)
        if (index !== -1) {
          commit('removeAgent', entity.name)
        }
      })
      commit('general/clearReferencesToDelete', null, { root: true })
      commit('clearSelectedAgentsList')
    },
    clearAgentEntitiesToDelete ({ state, commit, rootState, dispatch }) {
      const agentNames = []
      rootState.general.entitiesToDelete.forEach(entity => {
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
        commit('general/clearReferencesToDelete', null, { root: true })
        commit('clearSelectedAgentsList')
        return { status: false, message: error.response.data }
      })
    },
    clearSingleAgentEntityToDelete ({ state, commit, rootState, dispatch }) {
      let promiseResult
      const entityId = rootState.general.entitiesToDelete[0].id
      const index = state.agentListStore.findIndex(agent => agent.id === entityId)
      if (index !== -1) {
        const agentName = state.agentListStore[index].name
        promiseResult = axios.delete('/agents/' + agentName)
          .then(function (response) {
            dispatch('removeAgentsSelected')
            return { status: true, message: '' }
          })
          .catch(function (error) {
            commit('general/clearReferencesToDelete', null, { root: true })
            commit('clearSelectedAgentsList')
            return { status: false, message: error.response.data }
          })
      }
      return promiseResult
    },
    loadMarketplace ({ state, commit, getters, rootState }) {
      if (rootState.auth.authentication_token !== '') {
        return axios.get('/agents/marketplace')
          .then(function (response) {
            const agentsMarketMapped = getters.mapServerAgentMarket(response.data)
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
    loadAgentsFromServer ({ state, getters, rootState }) {
      if (rootState.auth.authentication_token !== '') {
        return axios.get('/agents')
          .then(function (response) {
            const agentsMapped = getters.mapAgents(response.data)
            return agentsMapped
          })
          .catch(function () {
            return []
          })
      }
    },
    addAgentToServer ({ state, rootState, getters }, agent) {
      if (rootState.auth.authentication_token !== '') {
        return axios.post('/agents', getters.mapAgentFromLocalToServer(agent))
          .then(function (response) {
            agent.id = response.data.id
            agent.script = response.data.script
            state.agentListStore.push(agent)
            return { status: true, message: '' }
          })
          .catch(function (error) {
            return { status: false, message: error.response.data }
          })
      }
    },
    removeAgentFromInstaller ({ state, commit }, installer) {
      const index = state.agentListStore.findIndex(agent => agent.id === installer.idInstaller)
      if (index !== -1) {
        return axios.delete('/agents/' + installer.nameInstaller)
          .then(function (response) {
            commit('removeAgent', installer.nameInstaller)
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
    },
    addAndPrepareSelectedAgentIdsToRemove ({ state, rootGetters, getters, commit }) {
      commit('general/clearReferencesToDelete', null, { root: true })
      state.selectedAgents.forEach(element => {
        const name = getters.getAgentById(element).name
        const entity = {
          id: element,
          name: name,
          type: rootGetters['general/entityTypeData'].AGENT
        }
        commit('general/addEntityToDelete', entity, { root: true })
      })
    },
    uploadAgentConfigurationFile ({ state, rootState }, configurationFileData) {
      if (rootState.auth.authentication_token !== '') {
        return axios.post('/agents/upload/' + configurationFileData.agentName, configurationFileData.formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(function (response) {
          return { status: true, message: '', data: response.data }
        }).catch(function (error) {
          return { status: false, message: error.response.data }
        })
      }
    },
    getConfigurationFilesLocation ({ state, rootState }) {
      if (rootState.auth.authentication_token !== '') {
        return axios.get('/agents/configuration/path')
          .then(function (response) {
            state.configFilePath = response.data
            return { status: true, message: '' }
          })
          .catch(function (error) {
            state.configFilePath = ''
            return { status: false, message: error.response.data }
          })
      }
    },
    getConfigurationContent ({ state, rootState }, agentName) {
      if (rootState.auth.authentication_token !== '') {
        return axios.get('/agents/' + agentName)
          .then(function (response) {
            return { status: true, message: '', data: response.data.configurationContent }
          })
          .catch(function (error) {
            return { status: false, message: error.response.data }
          })
      }
    },
    stopRunningAgent ({ state, rootState }, payload) {
      if (rootState.auth.authentication_token !== '') {
        return axios.post('/agents/stop', payload)
          .then(function (response) {
            return { status: true, message: '', data: response.data.configurationContent }
          })
          .catch(function (error) {
            return { status: false, message: error.response.data }
          })
      }
    }
  }
})
