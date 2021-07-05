<template>
  <div>
    <!-- Contains navs-bar -->
    <NavBarTwoRunPipeline :id="id" :pipelineName="this.getPipelineById(parseInt(this.id)).name" />
    <div class="content-wrapper">
        <div class="container-fluid pl-0">
        <hr class="mt-1 mb-0" />
        <div class="content">
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
              <div v-if="!showRunContainer" class="action-panel-container action-panel-container-stop d-flex flex-column">
                <span class="cursor-pointer material-icons red-font-color m-auto" @click="executePipeline">stop</span>
                <span class="pb-2 m-auto red-font-color">STOP</span>
              </div>
              <div v-else class="action-panel-container action-panel-container-run d-flex flex-column start-btn">
                <div class="m-auto">
                <span class="cursor-pointer" @click="executePipeline"><RocketIco /></span>
                </div>
                <span class="pb-2 m-auto white-font-color">RUN</span>
              </div>
            </div>
          </div> <!-- .row -->
          <ExecutionAreaAgent :AgentsPipelineList="getPipelineById(parseInt(this.id)).agent" :startingAgentId="startingAgentId" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { mapGetters } from 'vuex'
import NavBarTwoRunPipeline from '@/components/Pipelines/NavBarTwoRunPipeline.vue'
import ExecutionAreaAgent from '@/components/Pipelines/ExecutionAreaAgent.vue'
import RocketIco from '@/components/Icons/RocketIco.vue'

export default {
  name: 'PipelineRunView',
  data: function () {
    return {
      progressValue: 0,
      showRunContainer: true
    }
  },
  components: {
    NavBarTwoRunPipeline,
    ExecutionAreaAgent,
    RocketIco
  },
  props: {
    id: String,
    AgentsPipelineList: Object,
    startingAgentId: Number
  },
  computed: {
    ...mapGetters('pipelines', ['getPipelineById'])
  },
  methods: {
    executePipeline () {
      this.showRunContainer = !this.showRunContainer
    }
  }
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
.action-panel span.material-icons.red-font-color{
  font-size: 2.5rem
}
.pipeline-run-progress{
  height: 5px;
}
.action-panel-container{
  border-radius: 17px;
  width: 76%;
  height: 96%;
}
.action-panel-container-stop{
  background-color: #ffffff;
}

.action-panel-container-run{
  background-color: #007bff;
}
div.action-panel-container-run.start-btn svg{
  margin: auto;
  width: 30px;
  height: 35px;
  margin-top: 9px;
  fill: #ffffff;
}

.white-font-color{
  color: #ffffff;
}
</style>
