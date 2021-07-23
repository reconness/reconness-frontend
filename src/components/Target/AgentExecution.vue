<template>
  <div class="col-12">
    <form>
        <div class="modal fade" id="agentExecutionModalForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
          <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content agent-containers">
                   <div class="modal-body">
                          <div class="row">
                            <div class="col-12 col-sm-5 col-md-6 col-lg-4">
                                <div class="info-box agent_info_panel" v-bind:style ="{background: color}">
                                    <div class="info-box-content">
                                      <div class="border-right">
                                        <span class="info-box-text mb-2 font-weight-bold overflow-visible">{{ nameAgent }}</span>
                                        <span v-if="isTimeElapsedExternal" class="mr-4">{{ elapsedTime }}</span>
                                        <span  v-else class="mr-4">{{ time }}</span>
                                        <MotionPlayOutlineIco />
                                        <div class="mt-2 output-selector">
                                          <span @click="setIsAgentInfoOpenedForTerminal(true)" class="mr-2 cursor-pointer">Terminal</span><span @click="setIsAgentInfoOpenedForTerminal(false)" class="pl-2 border-left cursor-pointer">Logs</span>
                                        </div>
                                      </div>
                                    </div>
                                    <span class="info-box-icon elevation-1 process_status_panel container-container-circular-bar">
                                      <span class="border container-circular-bar">
                                        <div class="circular-bar-container border">
                                          <CircleProgress v-if="showCircleProgressBar" :percent="progressValue" :size="30" :border-width="3" :border-bg-width="3" empty-color="#ff959e" fill-color="#ffffff"/>
                                          <span style="opacity:0.2" v-else class="material-icons white-text">done</span>
                                        </div>
                                      </span>
                                    </span>
                                    <!-- /.info-box-content -->
                                </div>
                            </div>
                            <div class="col-12 col-sm-7 col-md-6 col-lg-8">
                                <div class="info-box bg-transparent process_status_panel">
                                        <div class="info-box-content">
                                            <div class="d-flex space_between">
                                              <span class="info-box-text">Process status</span>
                                              <span class="info-box-text">{{ time }}</span>
                                            </div>
                                            <div class="progress">
                                                <div :style="{ width: progressValue+'%' }" class="progress-bar agent_exec_progress_bar main_reconnes_bg-color"></div>
                                            </div>
                                            <div class="d-flex align_left-ordered_columns">
                                            <span v-if="agentStatus.status == 1" class="processbar-text">running</span>
                                            <div class="align_left-ordered_columns agent-terminal-fade">
                                              <span class="font-weight-bold black-text" v-if="isAgentInfoOpenedForTerminal">Terminal</span>
                                              <span class="font-weight-bold black-text" v-else>Logs</span>
                                              <span @click="setIsAgentInfoOpenedForTerminal(!isAgentInfoOpenedForTerminal)" class="material-icons ml-2 blue-text cursor-pointer" style="vertical-align: bottom;"> chevron_right </span>
                                            </div>
                                            </div>
                                        </div>
                                            <!-- /.info-box-content -->
                                    </div>
                            </div>
                            <div class="col-12">
                                <v-ace-editor v-model:value="terminal_ouput" lang="csharp" :readonly="true" style="height:300px" theme="monokai"/>
                                <div class="d-flex flex-row-reverse mt-3">
                                  <button v-if="this.$route.name !== 'PipelineRunView'" @click="closeWindow" style="color: #FF4545;" type="button" class="agent-border btn create-agent-buttons-main-action" data-dismiss="modal">STOP</button>
                                  <button v-else @click="closeWindow" style="color: #FF4545;" type="button" class="agent-border btn create-agent-buttons-main-action" data-dismiss="modal">DONE</button>
                                </div>
                                <div class="text-center">
                                  <span class="material-icons cursor-pointer" @click="minimizeWindow" @mouseover="toggle">keyboard_arrow_down</span>
                                </div>
                            </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </form>
      <OverlayPanel :baseZIndex=100 ref="op" appendTo="body" id="overlay_panel"  >
        <small class="font-weight-bold">Hide Process Status</small>
      </OverlayPanel>
    </div>
</template>
<script>
import { VAceEditor } from 'vue3-ace-editor'
import MotionPlayOutlineIco from '@/components/Icons/MotionPlayOutlineIco.vue'
import OverlayPanel from 'primevue/overlaypanel'
import CircleProgress from 'vue3-circle-progress'
import { mapMutations, mapState } from 'vuex'
import { ProgressBarMixin } from '@/mixins/ProgressBarMixin'
import jQuery from 'jquery'
export default {
  data: function () {
    return {
      terminal_ouput: '',
      logs_generated: '',
      is_running: false,
      is_terminal_open: true,
      minimized: false
    }
  },
  components: {
    VAceEditor,
    MotionPlayOutlineIco,
    OverlayPanel,
    CircleProgress
  },
  mixins: [ProgressBarMixin],
  computed: {
    ...mapState('target', ['agentStatus']),
    ...mapState('pipelines', ['isAgentInfoOpenedForTerminal']),
    showCircleProgressBar: function () {
      return this.status !== this.$entityStatus.FINISHED || this.$route.name === 'RootDomainDetails' || this.$route.name === 'SubDomainDetails'
    },
    isTimeElapsedExternal: function () {
      return this.elapsedTime !== '00:00:00' && this.progressValue > 0
    }
  },
  methods: {
    ...mapMutations('target', ['setAgentStatus', 'updateStatusRootDomainAgent', 'updateStatusSubDomainAgent']),
    ...mapMutations('pipelines', ['setIsAgentInfoOpenedForTerminal']),
    toggle (event) {
      this.$refs.op.toggle(event)
    },
    switchAgentStatus (event) {
      if (this.$route.name === 'RootDomainDetails') {
        this.updateStatusRootDomainAgent({
          status: event,
          idTarget: parseInt(this.$route.params.idTarget),
          idRoot: parseInt(this.$route.params.id),
          idAgent: parseInt(this.idAgent)
        })
      } else {
        this.updateStatusSubDomainAgent({
          status: this.$entityStatus.RUNNING,
          idTarget: parseInt(this.$route.params.idTarget),
          idRoot: parseInt(this.$route.params.id),
          idAgent: parseInt(this.idAgent),
          idSubDomain: parseInt(this.$route.params.idsubdomain)
        })
      }
      this.setAgentStatus({ status: event, id: parseInt(this.idAgent) })
    },
    minimizeWindow () {
      jQuery('#agentExecutionModalForm').modal('hide')
      this.minimized = true
      this.$refs.op.hide()
    },
    closeWindow () {
      if (this.$route.name !== 'PipelineRunView') {
        this.setAgentStatus({ status: this.$entityStatus.FINISHED, id: parseInt(-1) })
        if (this.$route.name === 'RootDomainDetails') {
          this.updateStatusRootDomainAgent({
            status: this.$entityStatus.FINISHED,
            idTarget: parseInt(this.$route.params.idTarget),
            idRoot: parseInt(this.$route.params.id),
            idAgent: parseInt(this.idAgent)
          })
        } else {
          this.updateStatusSubDomainAgent({
            status: this.$entityStatus.FINISHED,
            idTarget: parseInt(this.$route.params.idTarget),
            idRoot: parseInt(this.$route.params.id),
            idAgent: parseInt(this.idAgent),
            idSubDomain: parseInt(this.$route.params.idsubdomain)
          })
        }
        this.stopClock()
      }
    }
  },
  props: {
    idAgent: Number,
    nameAgent: String,
    status: {
      type: Number,
      default: 2
    },
    color: {
      type: String,
      default: ''
    },
    elapsedTime: {
      default: '00:00:00',
      type: String
    }
  },
  watch: {
    agentStatus (value) {
      if (this.$route.name !== 'PipelineRunView') {
        if (value.status === this.$entityStatus.RUNNING && !this.minimized) {
          this.playClock()
        }
      }
    },
    status (value) {
      if (this.$route.name === 'PipelineRunView') {
        if (value === this.$entityStatus.RUNNING) {
          this.playClock()
        } else {
          this.stopClock()
        }
      }
    },
    progressValue () {
      if (this.isTimeElapsedExternal) {
        this.time = this.elapsedTime
      }
    }
  }
}
</script>
<style>
.space_between{
    justify-content: space-between;
}
.align_left-ordered_columns{
  flex-direction: column;
  align-items: flex-end;
}
.process_status_panel{
  box-shadow: none !important;
}
.container-circular-bar{
  width: 3rem;
  height: 3rem;
  border: 2px solid #dee2e6 !important;
  border-radius: 10px;
}
.agent_info_panel{
  background: #FF5A5A 0% 0% no-repeat padding-box;
  border-radius: 18px;
  box-shadow: 13px 19px 41px #0C1F6A3B;
  opacity: 1;
}
.agent_info_panel span{
  color: #ffffff;
}
.agent_info_panel .info-box-text{
  font-size: 20px;
}
.agent_info_panel svg{
  fill: #ffffff;
}
.process_status_panel .space_between span, .align_left-ordered_columns .processbar-text{
  color: #b3b3b3;
}
.output-selector{
  font-size: 14px;
}
.circular-bar-container{
  width: 40px;
  height: 40px;
  margin: 2px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 10px;
  background-color: rgba(255,255,255,0.3);
}
.vue3-circular-progressbar{
  margin-left: 10%;
}
.vue3-circular-progressbar svg{
  margin-bottom: 53%;
}
.progress{
  height: 5px !important;
}
#agentExecutionModalForm .info-box-content svg:hover{
  cursor: pointer;
}
</style>
