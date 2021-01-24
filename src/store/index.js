import { createStore } from 'vuex'
// import target from '../modules/target'

export default createStore({
  state: {
    agentListStore: [
      { name: 'Agente 1', background: 'transparent linear-gradient(160deg,#03DCED 0%, #0cb8e0 100%) 0% 0% no-repeat padding-box', id: 1, repository: 'repository1.com', target: 'target 1', command: 'command 1', isTargetType: false, isRootDomainType: true, isSubDomainType: false, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'run agent 1', image: '', date: '21/01/2020', installedFrom: '' },
      { name: 'Agente 2', background: 'transparent linear-gradient(160deg,#737be5 0%, #7159d3 100%) 0% 0% no-repeat padding-box', id: 2, repository: 'repository2.com', target: 'target 2', command: 'command 2', isTargetType: false, isRootDomainType: true, isSubDomainType: false, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'run agent  2', image: '', date: '21/02/2020', installedFrom: '' },
      { name: 'Agente 3', background: 'transparent linear-gradient(160deg,#03DCED 0%, #0cb8e0 100%) 0% 0% no-repeat padding-box', id: 3, repository: 'repository3.com', target: 'target 3', command: 'command 3', isTargetType: true, isRootDomainType: true, isSubDomainType: false, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'run agent 3', image: '', date: '21/03/2020', installedFrom: '' },
      { name: 'Agente 4', background: '#ff8650 0% 0% no-repeat padding-box', id: 4, repository: 'repository4.com', target: 'target 4', command: 'command 4', isTargetType: false, isRootDomainType: true, isSubDomainType: false, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'run agent 4', image: '', date: '21/04/2020', installedFrom: '' },
      { name: 'Agente 5', background: 'transparent linear-gradient(160deg,#F96767 0%, #FF4343 100%) 0% 0% no-repeat padding-box', id: 5, repository: 'repository5.com', target: 'target 5', command: 'command 5', isTargetType: false, isRootDomainType: true, isSubDomainType: false, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'run agent 5', image: '', date: '21/05/2020', installedFrom: '' },
      { name: 'Agente 6', background: 'transparent linear-gradient(160deg,#F96767 0%, #FF4343 100%) 0% 0% no-repeat padding-box', id: 6, repository: 'repository6.com', target: 'target 6', command: 'command 6', isTargetType: true, isRootDomainType: true, isSubDomainType: false, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'run agent 6', image: '', date: '21/06/2020', installedFrom: '' },
      { name: 'Agente 7', background: 'transparent linear-gradient(135deg,#3adb99 0%, #16c465 100%) 0% 0% no-repeat padding-box', id: 7, repository: 'repository7.com', target: 'target 7', command: 'command 7', isTargetType: false, isRootDomainType: true, isSubDomainType: false, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'run agent 7', image: '', date: '21/07/2020', installedFrom: '' },
      { name: 'Agente 8', background: 'transparent linear-gradient(160deg,#F96767 0%, #FF4343 100%) 0% 0% no-repeat padding-box', id: 8, repository: 'repository8.com', target: 'target 8', command: 'command 8', isTargetType: false, isRootDomainType: true, isSubDomainType: false, isAliveTrigger: true, isHttpOpenTrigger: false, script: 'run agent 8', image: '', date: '21/08/2020', installedFrom: '' }
    ],
    resources: [
      { url: 'http://google.com', categories: ['searcher', 'docs'], id: 1 },
      { url: 'http://yahoo.es', categories: ['searcher'], id: 2 }
    ],
    filterColour: '',
    idAgent: -1,
    systemColors: ['8929e0', '8929e0', 'ff1b4c', 'ff7f46', '00eb74'],
    fromDetailsLink: false,
    idResource: -1,
    check: false,
    agentIdList: [],
    styleList: '1.25rem',
    viewloc: 'Home',
    styleAgentState: false,
    colorDelete: '#000000',
    agentsInstallers: [
      { name: 'Subfinder', description: 'Breve descripcion del agente Subfinder', id: 1, installed: false },
      { name: 'Amass', description: 'Breve descripcion del agente Amass', id: 2, installed: false },
      { name: 'GoBusterMs', description: 'Breve descripcion del agente GoBusterMs', id: 3, installed: false },
      { name: 'SubkisteD', description: 'Breve descripcion del agente SubkisteD', id: 4, installed: false },
      { name: 'ForeingBot', description: 'Breve descripcion del agente ForeingBot', id: 5, installed: false }
    ]
  },
  mutations: {
    addAgent (state, agent) {
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
      for (var index1 in state.agentIdList) {
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
      if (namePath === 'Agents') {
        state.styleAgentState = true
      } else {
        state.styleAgentState = false
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
        isTargetType: false,
        isRootDomainType: false,
        isSubDomainType: false,
        isAliveTrigger: false,
        isHttpOpenTrigger: false,
        script: '',
        image: '',
        date: new Date().toLocaleDateString('es-Es'),
        installedFrom: idInstaller
      }
      state.agentListStore.push(transformedAgent)
    },
    removeAgentFromInstaller (state, idInstaller) {
      const index = state.agentListStore.findIndex(agent => agent.installedFrom === idInstaller)
      if (index !== -1) {
        state.agentListStore.splice(index, 1)
      }
    }
  },
  actions: {
  },
  modules: {
    // target
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
    }
  }
})
