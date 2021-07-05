<template>
  <div>
    <!-- Contains navs-bar -->
    <NavBarTwoRunPipeline :pipelineName="this.getPipelineById(parseInt(this.id)).name" />
    <div class="content-wrapper">
        <div class="container-fluid">
        <div class="content">
        <!-- <hr class="mt-1 mb-0" /> -->
          <!-- <div class="row border-container ml-3 mr-3 mt-2"> -->
          <div class="row ml-3 mr-3 mt-4">
            <div class="col-11 m-auto">
              <div class="d-flex justify-content-between">
                <span class="info-box-text agent-mini-color-gray">Process status</span>
                <span class="info-box-text agent-mini-color-gray">00:06:00</span>
              </div>
              <div class="progress pipeline-run-progress">
                <div :style="{ width: progressValue+'10%' }" class="progress-bar agent_exec_progress_bar main_reconnes_bg-color"></div>
              </div>
              <span class="float-right agent-mini-color-gray">waiting</span>
            </div>
            <div class="col-1 action-panel">
              <div class="action-panel-container d-flex flex-column">
                <span class="cursor-pointer material-icons red-font-color m-auto">stop</span>
                <span class="pb-2 m-auto red-font-color">STOP</span>
              </div>
            </div>
          </div> <!-- .row -->
          <!-- CREATE COMPONENT INSTEAD -->
          <ExecutionAreaAgent :AgentsPipelineList="getPipelineById(parseInt(this.id)).agent" :startingAgentId="startingAgentId" />
        </div>
      </div>
    </div>
    <!-- <AgentListWorkflow :routeName= 'this.$route.name'></AgentListWorkflow> -->
  </div>
</template>
<script>

import { mapGetters } from 'vuex'
import NavBarTwoRunPipeline from '@/components/Pipelines/NavBarTwoRunPipeline.vue'
import ExecutionAreaAgent from '@/components/Pipelines/ExecutionAreaAgent.vue'
// import PipelineWorkflow from '@/components/Pipelines/PipelineWorkflow.vue'

export default {
  name: 'PipelineRunView',
  data: function () {
    return {
      progressValue: 0
    }
  },
  components: {
    NavBarTwoRunPipeline,
    ExecutionAreaAgent
  //   AgentListWorkflow,
  //   PipelineWorkflow
  },
  props: {
    id: String,
    AgentsPipelineList: Object,
    startingAgentId: Number
  },
  computed: {
    ...mapGetters('pipelines', ['getPipelineById'])
  //   ...mapState('pipelines', ['checkDetail']),
  //   changePading () {
  //     let padding
  //     if (this.checkDetail) {
  //       padding = '.5rem'
  //     } else {
  //       padding = '1rem'
  //     }
  //     return padding
  //   }
  }
  // methods: {
  //   collapseDown () {
  //     document.getElementById('scroll-div').scrollBy({ top: 120, behavior: 'smooth' })
  //   },
  //   collapseUp () {
  //     document.getElementById('scroll-div').scrollBy({ top: -120, behavior: 'smooth' })
  //   },
  //   setDetailsLink (e) {
  //     const selectedAgentId = e.currentTarget.getAttribute('data-id')
  //     this.$store.commit('setIdAgent', selectedAgentId)
  //     this.$store.commit('setDetailsLinks', true)
  //   }
  // },
  // mounted () {
  //   this.$store.commit('updateLocView', 'Pipelines', true)
  // }
}
</script>
<style scoped>
.info-box {
  border-radius: 16px;
  box-shadow: none;
  opacity: 1;
  border: 1px solid #e8ebef;
  background-color: transparent;
}
.border-container {
    border: 1px solid #e8ebef;
    border-radius: 12px;
    opacity: 1;
}

#scroll-div{
  height: 120px;
  overflow:hidden;
}
div small{
  color: #b3b3b3;
}
.action-panel span:first-child{
  font-size: 3rem
}
.pipeline-run-progress{
  height: 5px;
}
.action-panel-container{
  border-radius: 17px;
  background-color: #ffffff;
  width: 76%;
  height: 96%;
}
</style>
