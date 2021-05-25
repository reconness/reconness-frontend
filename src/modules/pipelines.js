export default {
  namespaced: true,
  state: {
    pipelinesListStore: [
      {
        id: 1,
        name: 'My Pipeline 1',
        date: '02/04/2021',
        statusRun: true,
        startingAgent: 1,
        type: 1,
        agent: [
          {
            name: 'Agent 1',
            background:
              'transparent linear-gradient(160deg,#03DCED 0%, #0cb8e0 100%) 0% 0% no-repeat padding-box',
            id: 1,
            agentBranch: []
          },
          {
            name: 'Agent 2',
            background:
              'transparent linear-gradient(160deg,#737be5 0%, #7159d3 100%) 0% 0% no-repeat padding-box',
            id: 2,
            agentBranch: []
          },
          {
            name: 'Agent 5',
            background: 'transparent linear-gradient(160deg,#F96767 0%, #FF4343 100%) 0% 0% no-repeat padding-box',
            id: 5,
            agentBranch: []
          },
          {
            name: 'Agent 6',
            background: 'transparent linear-gradient(160deg,#F96767 0%, #FF4343 100%) 0% 0% no-repeat padding-box',
            id: 6,
            agentBranch: []
          },
          {
            name: 'Agent 7',
            background: 'transparent linear-gradient(135deg,#3adb99 0%, #16c465 100%) 0% 0% no-repeat padding-box',
            id: 7,
            agentBranch: []
          },
          {
            name: 'Agent 8',
            background: 'transparent linear-gradient(160deg,#F96767 0%, #FF4343 100%) 0% 0% no-repeat padding-box',
            id: 8,
            agentBranch: []
          }
        ],
        locations: [
          {
            name: 'target11.com',
            entityType: 1,
            entityId: 1
          },
          {
            name: 'target12.com',
            entityType: 2,
            entityId: 2
          }
        ],
        calendars: [
          {
            enabled: false,
            time: new Date(),
            date: new Date('01/08/2020'),
            repeat: 0
          },
          {
            enabled: true,
            time: new Date(),
            date: new Date('09/23/2020'),
            repeat: 1
          },
          {
            enabled: false,
            time: new Date(),
            date: new Date('02/21/2021'),
            repeat: 3
          },
          {
            enabled: false,
            time: new Date(),
            date: new Date('03/15/2021'),
            repeat: 2
          },
          {
            enabled: false,
            time: new Date(),
            date: new Date('04/26/2021'),
            repeat: 4
          }
        ]
      },
      {
        id: 2,
        name: 'My Pipeline 2',
        date: '02/03/2021',
        statusRun: true,
        startingAgent: 1,
        type: 1,
        agent: [
          {
            name: 'Agent 1',
            background:
              'transparent linear-gradient(160deg,#03DCED 0%, #0cb8e0 100%) 0% 0% no-repeat padding-box',
            id: 1,
            agentBranch: []
          },
          {
            name: 'Agent 2',
            background:
              'transparent linear-gradient(160deg,#737be5 0%, #7159d3 100%) 0% 0% no-repeat padding-box',
            id: 2,
            agentBranch: {
              name: 'Agent 1',
              background: 'transparent linear-gradient(160deg,#03DCED 0%, #0cb8e0 100%) 0% 0% no-repeat padding-box',
              id: 1
            }
          },
          {
            name: 'Agent 5',
            background: 'transparent linear-gradient(160deg,#F96767 0%, #FF4343 100%) 0% 0% no-repeat padding-box',
            id: 5,
            agentBranch: []
          }
        ],
        locations: [
          {
            name: 'target21.com',
            entityType: 1,
            entityId: 1
          },
          {
            name: 'target22.com',
            entityType: 2,
            entityId: 2
          }
        ],
        calendars: [
          {
            enabled: false,
            time: new Date(),
            date: new Date('01/08/2020'),
            repeat: 0
          },
          {
            enabled: false,
            time: new Date(),
            date: new Date('03/15/2021'),
            repeat: 2
          },
          {
            enabled: false,
            time: new Date(),
            date: new Date('04/26/2021'),
            repeat: 4
          }
        ]
      },
      {
        id: 3,
        name: 'My Pipeline 3',
        date: '02/04/2020',
        statusRun: false,
        startingAgent: 1,
        type: 2,
        agent: [
          {
            name: 'Agent 1',
            background:
              'transparent linear-gradient(160deg,#03DCED 0%, #0cb8e0 100%) 0% 0% no-repeat padding-box',
            id: 1,
            agentBranch: []
          },
          {
            name: 'Agent 2',
            background:
              'transparent linear-gradient(160deg,#737be5 0%, #7159d3 100%) 0% 0% no-repeat padding-box',
            id: 2,
            agentBranch: []
          },
          {
            name: 'Agent 5',
            background: 'transparent linear-gradient(160deg,#F96767 0%, #FF4343 100%) 0% 0% no-repeat padding-box',
            id: 5,
            agentBranch: []
          }
        ],
        locations: [
          {
            name: 'target31.com',
            entityType: 1,
            entityId: 1
          },
          {
            name: 'target32.com',
            entityType: 2,
            entityId: 2
          }
        ],
        calendars: [
          {
            enabled: false,
            time: new Date(),
            date: new Date('01/08/2020'),
            repeat: 0
          },
          {
            enabled: false,
            time: new Date(),
            date: new Date('04/26/2021'),
            repeat: 4
          }
        ]
      },
      {
        id: 4,
        name: 'My Pipeline 4',
        date: '01/04/2020',
        statusRun: true,
        startingAgent: 1,
        type: 2,
        agent: [
          {
            name: 'Agent 1',
            background:
              'transparent linear-gradient(160deg,#03DCED 0%, #0cb8e0 100%) 0% 0% no-repeat padding-box',
            id: 1,
            agentBranch: []
          },
          {
            name: 'Agent 2',
            background:
              'transparent linear-gradient(160deg,#737be5 0%, #7159d3 100%) 0% 0% no-repeat padding-box',
            id: 2,
            agentBranch: []
          },
          {
            name: 'Agent 5',
            background: 'transparent linear-gradient(160deg,#F96767 0%, #FF4343 100%) 0% 0% no-repeat padding-box',
            id: 5,
            agentBranch: []
          }
        ],
        locations: [
          {
            name: 'target41.com',
            entityType: 1,
            entityId: 1
          },
          {
            name: 'target42.com',
            entityType: 2,
            entityId: 2
          }
        ],
        calendars: [
          {
            enabled: false,
            time: new Date(),
            date: new Date('01/08/2020'),
            repeat: 0
          },
          {
            enabled: true,
            time: new Date(),
            date: new Date('09/23/2020'),
            repeat: 1
          },
          {
            enabled: false,
            time: new Date(),
            date: new Date('02/21/2021'),
            repeat: 3
          }
        ]
      },
      {
        id: 5,
        name: 'My Pipeline 5',
        date: '01/03/2020',
        statusRun: true,
        startingAgent: 1,
        type: 3,
        agent: [
          {
            name: 'Agent 1',
            background:
              'transparent linear-gradient(160deg,#03DCED 0%, #0cb8e0 100%) 0% 0% no-repeat padding-box',
            id: 1,
            agentBranch: [{
              name: 'Agent 5',
              background: 'transparent linear-gradient(160deg,#F96767 0%, #FF4343 100%) 0% 0% no-repeat padding-box',
              id: 5
            }, { name: 'Agent 2', background: 'transparent linear-gradient(160deg,#737be5 0%, #7159d3 100%) 0% 0% no-repeat padding-box', id: 2 }]
          },
          {
            name: 'Agent 2',
            background:
              'transparent linear-gradient(160deg,#737be5 0%, #7159d3 100%) 0% 0% no-repeat padding-box',
            id: 2,
            agentBranch: []
          },
          {
            name: 'Agent 5',
            background: 'transparent linear-gradient(160deg,#F96767 0%, #FF4343 100%) 0% 0% no-repeat padding-box',
            id: 5,
            agentBranch: []
          }
        ],
        locations: [
          {
            name: 'target51.com',
            entityType: 1,
            entityId: 1
          },
          {
            name: 'target52.com',
            entityType: 2,
            entityId: 2
          }
        ],
        calendars: [
          {
            enabled: false,
            time: new Date(),
            date: new Date('03/15/2021'),
            repeat: 2
          },
          {
            enabled: false,
            time: new Date(),
            date: new Date('04/26/2021'),
            repeat: 4
          }
        ]
      }
    ],
    isDefaultViewOnPipelines: true,
    check: false,
    styleList: '1.25rem',
    pipelinesIdList: [],
    idPipeline: -1,
    colorDelete: '#000000',
    checkDetail: false,
    styleListDetail: '1.25rem',
    pipelinesIdAgentsList: [],
    colorDeleteDetail: '#000000',
    autoId: 99,
    branchFather: -1,
    idFather: -1,
    idSon: -1,
    addStartingAgent: false
  },
  mutations: {
    changeIsBranchFather (state, value) {
      state.branchFather = value
    },
    changeValueToDelete (state, objectValue) {
      state.idFather = objectValue.idFather
      state.idSon = objectValue.idSon
    },
    changeValueStartPoint (state, value) {
      state.addStartingAgent = value
    },
    removebyIdPipelines (state, id) {
      const index = state.pipelinesIdList.findIndex(pipeline => pipeline.id === id)
      if (index !== -1) {
        state.pipelinesIdList.splice(index, 1)
        if (state.pipelinesIdList.length === 0) {
          state.colorDelete = '#000000'
        }
      }
    },
    removeAgentOfPipelineWorkflow (state, idPipeline) {
      const pipeline = state.pipelinesListStore.find(pipeline => pipeline.id === idPipeline)
      const indexAgent = pipeline.agent.findIndex(agent => agent.id === state.idFather)
      if (state.idSon !== -1 && state.idFather !== -1) {
        const branch = pipeline.agent[indexAgent].agentBranch
        const indexBranch = branch.findIndex(agentBranch => agentBranch.id === state.idSon)
        branch.splice(indexBranch, 1)
        state.idSon = -1
      } else {
        if (indexAgent !== -1) {
          if (pipeline.startingAgent === state.idFather) {
            pipeline.startingAgent = -1
          }
          pipeline.agent.splice(indexAgent, 1)
        }
        state.idFather = -1
        state.branchFather = -1
      }
    },
    setIdPipeline (state, id) {
      state.idPipeline = id
    },
    setIsDefaultViewOnPipelines (state, value) {
      state.isDefaultViewOnPipelines = value
    },
    editList (state) {
      state.check = !state.check
      state.styleList = '0px'
    },
    addIdPipeline (state, pipeline) {
      state.pipelinesIdList.push(pipeline)
      if (state.pipelinesIdList.length === 1) {
        state.colorDelete = '#ff4545'
      }
    },
    removePipelinesChecked (state) {
      for (const index1 in state.pipelinesIdList) {
        const index = state.pipelinesListStore.findIndex(pipeline => pipeline.id === state.pipelinesIdList[index1].id)
        if (index !== -1) {
          state.pipelinesListStore.splice(index, 1)
        }
      }
      state.pipelinesIdList = []
      state.check = false
      state.styleList = '1.25rem'
      state.colorDelete = '#000000'
    },
    cancelIdPipelines (state) {
      state.pipelinesIdList = []
      state.check = !state.check
      state.styleList = '1.25rem'
      state.colorDelete = '#000000'
    },
    updatePipelineName (state, pipeline) {
      state.pipelinesListStore.find(item => item.id === pipeline.id).name = pipeline.name
    },
    editListDetail (state) {
      state.checkDetail = !state.check
      state.styleListDetail = '0px'
    },
    addIdAgentPipelineDetail (state, pipeline) {
      state.pipelinesIdAgentsList.push(pipeline)
      if (state.pipelinesIdAgentsList.length === 1) {
        state.colorDeleteDetail = '#ff4545'
      }
    },
    removebyIdAgentPipelinesDetail (state, id) {
      const index = state.pipelinesIdAgentsList.findIndex(pipeline => pipeline.id === id)
      if (index !== -1) {
        state.pipelinesIdAgentsList.splice(index, 1)
        if (state.pipelinesIdAgentsList.length === 0) {
          state.colorDeleteDetail = '#000000'
        }
      }
    },
    cancelIdAgentPipelinesDetail (state) {
      state.pipelinesIdAgentsList = []
      state.checkDetail = !state.checkDetail
      state.styleListDetail = '1.25rem'
      state.colorDeleteDetail = '#000000'
    },
    removeAgentsPipelinesChecked (state, idPipeline) {
      const Pipeline = state.pipelinesListStore.find(pipeline => pipeline.id === idPipeline)
      for (const index1 in state.pipelinesIdAgentsList) {
        const index = Pipeline.agent.findIndex(agent => agent.id === state.pipelinesIdAgentsList[index1].id)
        if (index !== -1) {
          Pipeline.agent.splice(index, 1)
        }
      }
      state.pipelinesIdAgentsList = []
      state.checkDetail = false
      state.styleListDetail = '1.25rem'
      state.colorDeleteDetail = '#000000'
    },
    cancelElementSelected (state, nameRoute) {
      if (nameRoute === 'Pipelines') {
        state.pipelinesIdList = []
        state.check = !state.check
        state.styleList = '1.25rem'
        state.colorDelete = '#000000'
      } else {
        state.pipelinesIdAgentsList = []
        state.checkDetail = !state.checkDetail
        state.styleListDetail = '1.25rem'
        state.colorDeleteDetail = '#000000'
      }
    },
    addPipeline (state, data) {
      data.id = ++state.autoId
      state.pipelinesListStore.push(data)
    },
    updatePipeline (state, pipeline) {
      const item = state.pipelinesListStore.find(item => item.id === pipeline.id)
      Object.assign(item, pipeline)
    },
    setIdTarget (state, id) {
      state.idTarget = id
    }
  },
  getters: {
    getPipelineById: (state) => (id) => {
      return state.pipelinesListStore.find(pipeline => pipeline.id === id)
    },
    getIdPipeline (state) {
      return state.idPipeline
    }
  }
}
