import axios from 'axios'
export default ({
  namespaced: true,
  state: {
    agentListStore: [
      { name: 'Agent 1', background: 'transparent linear-gradient(160deg,#03DCED 0%, #0cb8e0 100%) 0% 0% no-repeat padding-box', id: 1, repository: 'repository1.com', target: 'target 1', command: 'command 1', type: 3, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'run agent 1', image: '', date: '21/01/2020', installedFrom: '', lastRun: '01/01/2021' },
      { name: 'Agent 2', background: 'transparent linear-gradient(160deg,#737be5 0%, #7159d3 100%) 0% 0% no-repeat padding-box', id: 2, repository: 'repository2.com', target: 'target 2', command: 'command 2', type: 3, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'run agent  2', image: '', date: '21/02/2020', installedFrom: '', lastRun: '02/01/2021' },
      { name: 'Agent 3', background: 'transparent linear-gradient(160deg,#03DCED 0%, #0cb8e0 100%) 0% 0% no-repeat padding-box', id: 3, repository: 'repository3.com', target: 'target 3', command: 'command 3', type: 3, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'run agent 3', image: '', date: '21/03/2020', installedFrom: '', lastRun: null, agentBranch: [] },
      { name: 'Agent 4', background: '#ff8650 0% 0% no-repeat padding-box', id: 4, repository: 'repository4.com', target: 'target 4', command: 'command 4', type: 1, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'run agent 4', image: '', date: '21/04/2020', installedFrom: '', lastRun: '01/03/2021' },
      { name: 'Agent 5', background: 'transparent linear-gradient(160deg,#F96767 0%, #FF4343 100%) 0% 0% no-repeat padding-box', id: 5, repository: 'repository5.com', target: 'target 5', command: 'command 5', type: 3, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'run agent 5', image: '', date: '21/05/2020', installedFrom: '', lastRun: '03/03/2021' },
      { name: 'Agent 6', background: 'transparent linear-gradient(160deg,#F96767 0%, #FF4343 100%) 0% 0% no-repeat padding-box', id: 6, repository: 'repository6.com', target: 'target 6', command: 'command 6', type: 2, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'run agent 6', image: '', date: '21/06/2020', installedFrom: '', lastRun: '12/02/2021' },
      { name: 'Agent 7', background: 'transparent linear-gradient(135deg,#3adb99 0%, #16c465 100%) 0% 0% no-repeat padding-box', id: 7, repository: 'repository7.com', target: 'target 7', command: 'command 7', type: 1, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'run agent 7', image: '', date: '21/07/2020', installedFrom: '', lastRun: '24/02/2021' },
      { name: 'Agent 8', background: 'transparent linear-gradient(160deg,#F96767 0%, #FF4343 100%) 0% 0% no-repeat padding-box', id: 8, repository: 'repository8.com', target: 'target 8', command: 'command 8', type: 2, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'run agent 8', image: '', date: '08/01/2020', installedFrom: '', lastRun: '01/01/2021' }
    ],
    resources: [
      { url: 'http://google.com', categories: ['searcher', 'docs'], id: 1 },
      { url: 'http://yahoo.es', categories: ['searcher'], id: 2 }
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
    idResource: -1,
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
    agentSequence: 30,
    authentication_token: ''
  },
  mutations: {
    confirm (state, valueIN) {
      state.nameRoute = valueIN.route
      state.valueDelete = valueIN.name
    },
    addAgent (state, agent) {
      state.agentSequence = state.agentSequence + 1
      agent.id = state.agentSequence
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
    addResource (state, resource) {
      state.resources.push(resource)
    },
    mapAndUpdateResources (state, resources) {
      state.resources.splice(0, state.resources.length)
      let newResource
      resources.forEach(resource => {
        newResource = {
          id: resource.id,
          url: resource.url,
          categories: resource.categories.split(', ')
        }
        state.resources.push(newResource)
      })
    },
    setSelectedResource (state, idResource) {
      state.idResource = idResource
    },
    removeResource (state, idResource) {
      const index = state.resources.findIndex(resource => resource.id === idResource)
      if (index !== -1) {
        state.resources.splice(index, 1)
      }
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
      if (namePath === 'Notifications') {
        state.styleNotificationsState = true
      }
      state.viewloc = namePath
    },
    installUninstallAgent (state, idAgent) {
      const index = state.agentsInstallers.findIndex(agent => agent.id === idAgent)
      if (index !== -1) {
        state.agentsInstallers[index].installed = !state.agentsInstallers[index].installed
      }
    },
    addAgentFromInstaller (state, idInstaller) {
      const installer = state.agentsInstallers.find(item => item.id === parseInt(idInstaller))
      const transformedAgent = {
        name: installer.name,
        background: 'transparent linear-gradient(160deg,#03DCED 0%, #0cb8e0 100%) 0% 0% no-repeat padding-box',
        id: state.agentListStore.length + 1,
        repository: 'installer-repository.com',
        target: 'target-installer',
        command: 'command-installer',
        type: 1,
        isAliveTrigger: false,
        isHttpOpenTrigger: false,
        script: '',
        image: '',
        date: new Date(),
        installedFrom: idInstaller
      }
      state.agentListStore.push(transformedAgent)
    },
    removeAgentFromInstaller (state, idInstaller) {
      const index = state.agentListStore.findIndex(agent => agent.installedFrom === idInstaller)
      if (index !== -1) {
        state.agentListStore.splice(index, 1)
      }
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
    updateAuthenticationToken (state, token) {
      state.authentication_token = token
    }
  },
  actions: {
    login ({ commit, state }, credentials) {
      return axios.post('/auth/login',
        {
          userName: credentials.username,
          password: credentials.password
        })
        .then(function (response) {
          commit('updateAuthenticationToken', response.data.auth_token)
          axios.defaults.headers.common.Authorization = 'Bearer ' + state.authentication_token
          return true
        })
        .catch(function () {
          return false
        })
    },
    loadResources ({ state, commit }) {
      if (state.authentication_token !== '') {
        return axios.get('/references')
          .then(function (response) {
            commit('mapAndUpdateResources', response.data)
            return true
          })
          .catch(function () {
            return false
          })
      }
    },
    addResource ({ state, commit, dispatch }, resource) {
      if (state.authentication_token !== '') {
        return axios.post('/references', {
          url: resource.url,
          categories: resource.categories.join(',')
        })
          .then(function (response) {
            dispatch('loadResources')
            return true
          })
          .catch(function () {
            return false
          })
      }
    },
    deleteResource ({ state, dispatch }, idResource) {
      if (state.authentication_token !== '') {
        return axios.delete('/references/' + idResource)
          .then(function (response) {
            dispatch('loadResources')
            return true
          })
          .catch(function () {
            return false
          })
      }
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
    daysWithMostInteractionsLastWeek (state) {
      return [22, 30, 70, 77, 42, 20, 50]
    }
  }
})
