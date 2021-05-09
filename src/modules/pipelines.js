export default {
  namespaced: true,
  state: {
    pipelinesListStore: [
      {
        id: 1,
        name: 'My Pipeline 1',
        date: '02/04/2021',
        statusRun: true,
        agent: [
          {
            name: 'Agent 1',
            background:
              'transparent linear-gradient(160deg,#03DCED 0%, #0cb8e0 100%) 0% 0% no-repeat padding-box',
            id: 1
          },
          {
            name: 'Agent 2',
            background:
              'transparent linear-gradient(160deg,#737be5 0%, #7159d3 100%) 0% 0% no-repeat padding-box',
            id: 2
          },
          {
            name: 'Agent 5',
            background: 'transparent linear-gradient(160deg,#F96767 0%, #FF4343 100%) 0% 0% no-repeat padding-box',
            id: 5
          },
          {
            name: 'Agent 6',
            background: 'transparent linear-gradient(160deg,#F96767 0%, #FF4343 100%) 0% 0% no-repeat padding-box',
            id: 6
          },
          {
            name: 'Agent 7',
            background: 'transparent linear-gradient(135deg,#3adb99 0%, #16c465 100%) 0% 0% no-repeat padding-box',
            id: 7
          },
          {
            name: 'Agent 8',
            background: 'transparent linear-gradient(160deg,#F96767 0%, #FF4343 100%) 0% 0% no-repeat padding-box',
            id: 8
          }
        ]
      },
      {
        id: 2,
        name: 'My Pipeline 2',
        date: '02/03/2021',
        statusRun: true,
        agent: [
          {
            name: 'Agent 1',
            background:
              'transparent linear-gradient(160deg,#03DCED 0%, #0cb8e0 100%) 0% 0% no-repeat padding-box',
            id: 1
          },
          {
            name: 'Agent 2',
            background:
              'transparent linear-gradient(160deg,#737be5 0%, #7159d3 100%) 0% 0% no-repeat padding-box',
            id: 2
          },
          {
            name: 'Agent 5',
            background: 'transparent linear-gradient(160deg,#F96767 0%, #FF4343 100%) 0% 0% no-repeat padding-box',
            id: 5
          }
        ]
      },
      {
        id: 3,
        name: 'My Pipeline 3',
        date: '02/04/2020',
        statusRun: false,
        agent: [
          {
            name: 'Agent 1',
            background:
              'transparent linear-gradient(160deg,#03DCED 0%, #0cb8e0 100%) 0% 0% no-repeat padding-box',
            id: 1
          },
          {
            name: 'Agent 2',
            background:
              'transparent linear-gradient(160deg,#737be5 0%, #7159d3 100%) 0% 0% no-repeat padding-box',
            id: 2
          },
          {
            name: 'Agent 5',
            background: 'transparent linear-gradient(160deg,#F96767 0%, #FF4343 100%) 0% 0% no-repeat padding-box',
            id: 5
          }
        ]
      },
      {
        id: 4,
        name: 'My Pipeline 4',
        date: '01/04/2020',
        statusRun: true,
        agent: [
          {
            name: 'Agent 1',
            background:
              'transparent linear-gradient(160deg,#03DCED 0%, #0cb8e0 100%) 0% 0% no-repeat padding-box',
            id: 1
          },
          {
            name: 'Agent 2',
            background:
              'transparent linear-gradient(160deg,#737be5 0%, #7159d3 100%) 0% 0% no-repeat padding-box',
            id: 2
          },
          {
            name: 'Agent 5',
            background: 'transparent linear-gradient(160deg,#F96767 0%, #FF4343 100%) 0% 0% no-repeat padding-box',
            id: 5
          }
        ]
      },
      {
        id: 5,
        name: 'My Pipeline 5',
        date: '01/03/2020',
        statusRun: true,
        agent: [
          {
            name: 'Agent 1',
            background:
              'transparent linear-gradient(160deg,#03DCED 0%, #0cb8e0 100%) 0% 0% no-repeat padding-box',
            id: 1
          },
          {
            name: 'Agent 2',
            background:
              'transparent linear-gradient(160deg,#737be5 0%, #7159d3 100%) 0% 0% no-repeat padding-box',
            id: 2
          },
          {
            name: 'Agent 5',
            background: 'transparent linear-gradient(160deg,#F96767 0%, #FF4343 100%) 0% 0% no-repeat padding-box',
            id: 5
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
    autoId: 99
  },
  mutations: {
    removebyIdPipelines (state, id) {
      const index = state.pipelinesIdList.findIndex(pipeline => pipeline.id === id)
      if (index !== -1) {
        state.pipelinesIdList.splice(index, 1)
        if (state.pipelinesIdList.length === 0) {
          state.colorDelete = '#000000'
        }
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
      if (nameRoute === 'pipelines') {
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
    }
  },
  getters: {
    getPipelineById: (state) => (id) => {
      return state.pipelinesListStore.find(pipeline => pipeline.id === id)
    }
  }
}
