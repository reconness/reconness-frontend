<template>
    <div class="row ml-3">
        <div class="col-12 col-sm-7 col-lg-8 col-xl-9">
            <div class="row">
              <div class="col-12">
                <GeneralProgressBar :pipeline="pipeline"/>
              </div>
              <div class="col-12">
                <div class="terminal-container mt-3 d-flex flex-column">
                  <div class="ml-4 mt-4">
                    <span v-if="is_terminal_open" class="font-weight-bold">Terminal</span>
                    <span v-else class="font-weight-bold">Logs</span>
                    <span @click="is_terminal_open = !is_terminal_open" class="material-icons blue-text cursor-pointer" style="vertical-align: bottom;"> chevron_right </span>
                  </div>
                  <v-ace-editor v-model:value="script" lang="csharp" style="height:260px; width:90%" theme="monokai"/>
                </div>
              </div>
            </div>
        </div>
        <div class="col-12 col-sm-5 col-lg-4 col-xl-3">
          <div class="terminal-run-agents-container pl-2 pr-2 pt-3 pb-3 h-100">
            <AgentInfo v-for="(agent, index) of getAgentsFromIdPipeline(this.pipeline.id)" :key="agent" :index="index" :agent="agent" :pipeline="pipeline"/>
          </div>
      </div>
    </div>
</template>
<script>
import { VAceEditor } from 'vue3-ace-editor'
import AgentInfo from '@/components/Pipelines/AgentInfo.vue'
import GeneralProgressBar from '@/components/Pipelines/GeneralProgressBar.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'TerminalSection',
  components: {
    AgentInfo,
    GeneralProgressBar,
    VAceEditor
  },
  props: {
    pipeline: Object
  },
  computed: {
    ...mapGetters('pipelines', ['getAgentsFromIdPipeline'])
  },
  data () {
    return {
      script: '',
      is_terminal_open: false
    }
  }
}
</script>
<style scoped>
.terminal-container{
  height: 370px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 3px 12px 23px #00000017;
  border-radius: 18px;
  width: 100%;
}
.terminal-container .ace_editor{
    margin: auto;
}
.terminal-run-agents-container{
    background: #FBFBFB 0% 0% no-repeat padding-box;
    box-shadow: 3px 12px 23px #00000017
}
.terminal-run-agents-container div.info-box.agent_info_panel{
    width: 90%;
    margin: auto;
    margin-bottom: 12px
}

@media (min-width: 1900px) {
  .terminal-run-agents-container div.info-box.agent_info_panel{
    width: 55%;
  }
}
</style>
