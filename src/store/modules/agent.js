import axios from 'axios'
export default ({
  namespaced: true,
  state: {
    agentListStore: [
      {
        name: 'Agent 1',
        primaryColor: '#03DCED',
        secondaryColor: '#0cb8e0',
        createdBy: 2,
        id: 1,
        repository: 'repository1.com',
        target: 'target 1',
        command: 'command 1',
        type: 3,
        isAliveTrigger: true,
        isHttpOpenTrigger: false,
        script: 'run agent 1',
        image: '',
        date: '21/01/2020',
        installedFrom: '',
        lastRun: '01/01/2021'
      },
      {
        name: 'Agent 2',
        primaryColor: '#737be5',
        secondaryColor: '#7159d3',
        createdBy: 1,
        id: 2,
        repository: 'repository2.com',
        target: 'target 2',
        command: 'command 2',
        type: 3,
        isAliveTrigger: true,
        isHttpOpenTrigger: false,
        script: 'run agent  2',
        image: '',
        date: '21/02/2020',
        installedFrom: '',
        lastRun: '02/01/2021'
      },
      {
        name: 'Agent 3',
        primaryColor: '#03DCED',
        secondaryColor: '#0cb8e0',
        createdBy: 1,
        id: 3,
        repository: 'repository3.com',
        target: 'target 3',
        command: 'command 3',
        type: 3,
        isAliveTrigger: true,
        isHttpOpenTrigger: false,
        script: 'run agent 3',
        image: '',
        date: '21/03/2020',
        installedFrom: '',
        lastRun: null,
        agentBranch: []
      },
      {
        name: 'Agent 4',
        primaryColor: '#ff8650',
        secondaryColor: '#ff8650',
        createdBy: 1,
        id: 4,
        repository: 'repository4.com',
        target: 'target 4',
        command: 'command 4',
        type: 1,
        isAliveTrigger: true,
        isHttpOpenTrigger: false,
        script: 'run agent 4',
        image: '',
        date: '21/04/2020',
        installedFrom: '',
        lastRun: '01/03/2021'
      },
      {
        name: 'Agent 5',
        primaryColor: '#F96767',
        secondaryColor: '#FF4343',
        createdBy: 1,
        id: 5,
        repository: 'repository5.com',
        target: 'target 5',
        command: 'command 5',
        type: 3,
        isAliveTrigger: true,
        isHttpOpenTrigger: false,
        script: 'run agent 5',
        image: '',
        date: '21/05/2020',
        installedFrom: '',
        lastRun: '03/03/2021'
      },
      {
        name: 'Agent 6',
        primaryColor: '#F96767',
        secondaryColor: '#FF4343',
        createdBy: 1,
        id: 6,
        repository: 'repository6.com',
        target: 'target 6',
        command: 'command 6',
        type: 2,
        isAliveTrigger: true,
        isHttpOpenTrigger: false,
        script: 'run agent 6',
        image: '',
        date: '21/06/2020',
        installedFrom: '',
        lastRun: '12/02/2021'
      },
      {
        name: 'Agent 7',
        primaryColor: '#3adb99',
        secondaryColor: '#16c465',
        createdBy: 1,
        id: 7,
        repository: 'repository7.com',
        target: 'target 7',
        command: 'command 7',
        type: 1,
        isAliveTrigger: true,
        isHttpOpenTrigger: false,
        script: 'run agent 7',
        image: '',
        date: '21/07/2020',
        installedFrom: '',
        lastRun: '24/02/2021'
      },
      {
        name: 'Agent 8',
        primaryColor: '#F96767',
        secondaryColor: '#FF4343',
        createdBy: 1,
        id: 8,
        repository: 'repository8.com',
        target: 'target 8',
        command: 'command 8',
        type: 2,
        isAliveTrigger: true,
        isHttpOpenTrigger: false,
        script: 'run agent 8',
        image: '',
        date: '08/01/2020',
        installedFrom: '',
        lastRun: '01/01/2021'
      }
    ],
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
    agentsInstallers: [
      { name: 'Subfinder', description: 'Breve descripcion del agente Subfinder', id: 1, installed: false },
      { name: 'Amass', description: 'Breve descripcion del agente Amass', id: 2, installed: false },
      { name: 'GoBusterMs', description: 'Breve descripcion del agente GoBusterMs', id: 3, installed: false },
      { name: 'SubkisteD', description: 'Breve descripcion del agente SubkisteD', id: 4, installed: false },
      { name: 'ForeingBot', description: 'Breve descripcion del agente ForeingBot', id: 5, installed: false }
    ],
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
        const installerReference = parseInt(state.agentListStore[index].installedFrom)
        if (!isNaN(installerReference)) {
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
    filterByColor (state) {
      return function (colour) {
        return state.agentListStore.filter(item => item.background.includes(colour))
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
        target: agent.target,
        command: agent.command,
        type: getters.getEntityTypeByDescription(agent.agentType),
        isAliveTrigger: agent.triggerSubdomainIsAlive,
        isHttpOpenTrigger: agent.triggerSubdomainHasHttpOrHttpsOpen,
        script: '',
        image: '',
        date: new Date(),
        installedFrom: '',
        lastRun: new Date(agent.lastRun),
        createdBy: getters.getEntitySourceByDescription(agent.createdBy),
        categories: []
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
        categories: [],
        entitySource: agent.createdBy,
        primaryColor: agent.primaryColor,
        secondaryColor: agent.secondaryColor,
        script: agent.script,
        createdBy: getters.getEntitySourceDescriptionByCode(agent.createdBy),
        triggerSubdomainIsAlive: agent.isAliveTrigger,
        triggerSubdomainHasHttpOrHttpsOpen: agent.isHttpOpenTrigger,
        target: agent.target
      }
      return mappedAgent
    }
  },
  actions: {
    removeAgentsSelected ({ state, rootState }) {
      rootState.target.entitiesToDelete.forEach(entity => {
        const index = state.agentListStore.findIndex(agent => agent.id === entity.id)
        if (index !== -1) {
          state.agentListStore.splice(index, 1)
        }
      })
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
        return true
      }).catch(function () {
        return false
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
            return true
          })
          .catch(function (response) {
            return false
          })
      }
    },
    removeAgentFromInstaller ({ state }, installer) {
      const index = state.agentListStore.findIndex(agent => agent.installedFrom === installer.idInstaller)
      if (index !== -1) {
        return axios.delete('/agents/' + installer.nameInstaller)
          .then(function (response) {
            state.agentListStore.splice(index, 1)
            return true
          }).catch(function () {
            return false
          })
      }
    },
    updateAgentToServer ({ state, rootState, getters, commit }, agent) {
      if (rootState.auth.authentication_token !== '') {
        return axios.put('/agents/' + agent.id, getters.mapAgentFromLocalToServer(agent))
          .then(function (response) {
            commit('updateAgent', agent)
            return true
          })
          .catch(function (response) {
            return false
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
            return true
          }).catch(function () {
            return false
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
