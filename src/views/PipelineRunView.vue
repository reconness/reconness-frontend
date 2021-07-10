<template>
  <div>
    <!-- Contains navs-bar -->
    <NavBarTwoRunPipeline :id="id" :pipelineName="referencedPipeline.name" />
    <div class="content-wrapper">
        <div class="container-fluid pl-0">
        <hr class="mt-1 mb-0" />
        <div :class="{content: isTerminalHided}">
          <GeneralProgressBar v-if="isTerminalHided" :pipeline="referencedPipeline"/>
          <TerminalSection v-if="!isTerminalHided" :pipeline="referencedPipeline"/>
          <ExecutionAreaPipelineAgent v-else @mainFlowExecutionIsDone="stopFlow" :pipeline="referencedPipeline" :startMainProcess="startRunning" :AgentsPipelineList="referencedPipeline.agent" :startingAgentId="startingAgentId" />
        </div>
      </div>
    </div>
    <AgentExecution :id-agent="agent.id" :name-agent="agent.name" :status="agent.status" :color="agent.background"/>
  </div>
</template>
<script>

import { mapGetters, mapState } from 'vuex'
import NavBarTwoRunPipeline from '@/components/Pipelines/NavBarTwoRunPipeline.vue'
import ExecutionAreaPipelineAgent from '@/components/Pipelines/ExecutionAreaPipelineAgent.vue'
import GeneralProgressBar from '@/components/Pipelines/GeneralProgressBar.vue'
import TerminalSection from '@/components/Pipelines/TerminalSection.vue'
import AgentExecution from '@/components/Target/AgentExecution.vue'

export default {
  name: 'PipelineRunView',
  data: function () {
    return {
      progressValue: 0,
      showRunContainer: true,
      referencedPipeline: null,
      startRunning: false,
      stopProcess: false
    }
  },
  created: function () {
    this.referencedPipeline = this.getPipelineById(parseInt(this.id))
  },
  components: {
    NavBarTwoRunPipeline,
    ExecutionAreaPipelineAgent,
    GeneralProgressBar,
    TerminalSection,
    AgentExecution
  },
  props: {
    id: String,
    AgentsPipelineList: Object,
    startingAgentId: Number
  },
  computed: {
    ...mapGetters('pipelines', ['getPipelineById']),
    ...mapState('pipelines', ['isTerminalHided', 'agent'])
  },
  methods: {
    managePipelineRun (isRunning) {
      this.startRunning = isRunning
    },
    stopFlow () {
      // this.startRunning = false
      this.stopProcess = true
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
</style>
