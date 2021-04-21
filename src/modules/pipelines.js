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
    colorDelete: '#000000'
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
    }
  },
  getters: {
    getPipelineById: (state) => (id) => {
      return state.pipelinesListStore.find(pipeline => pipeline.id === id)
    }
  }
}
