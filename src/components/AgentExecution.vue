<template>
  <div class="col-12">
    <form>
        <div class="modal fade" id="agentExecutionModalForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
          <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content agent-containers">
                   <div class="modal-body">
                          <div class="row">
                            <div class="col-12 col-sm-5 col-md-6">
                                <div class="info-box agent_info_panel">
                                    <div class="info-box-content">
                                      <div class="border-right">
                                        <span class="info-box-text mb-2 font-weight-bold">My Agent</span>
                                        <span class="mr-4">00:06:00</span>
                                        <MotionPauseOutline />
                                        <div class="mt-2 output-selector">
                                          <span class="mr-2">Terminal</span><span class="pl-2 border-left">Logs</span>
                                        </div>
                                      </div>
                                        <!-- <span class="info-box-number">
                                        10
                                        <small>%</small>
                                        </span> -->
                                    </div>
                                    <span class="info-box-icon elevation-1 process_status_panel container-container-circular-bar">
                                      <span class="border container-circular-bar">
                                      </span>
                                    </span>
                                    <!-- /.info-box-content -->
                                </div>
                            </div>
                            <div class="col-12 col-sm-7 col-md-6">
                                <div class="info-box bg-transparent process_status_panel">
                                        <div class="info-box-content">
                                            <div class="d-flex space_between">
                                              <span class="info-box-text">Process status</span>
                                              <span class="info-box-text">00:06:00</span>
                                            </div>
                                            <div class="progress">
                                                <div class="progress-bar agent_exec_progress_bar main_reconnes_bg-color" style="width: 70%"></div>
                                            </div>
                                            <div class="d-flex align_left-ordered_columns">
                                            <span class="processbar-text">running</span>
                                            <div class="align_left-ordered_columns">
                                              <span>Terminal</span>
                                              <span  class="material-icons ml-2 blue-text" style="line-height: 1.6"> chevron_right </span>
                                            </div>
                                            </div>
                                        </div>
                                            <!-- /.info-box-content -->
                                    </div>
                            </div>
                            <div class="col-12">
                                <v-ace-editor v-model:value="terminal_ouput" lang="csharp" style="height:300px" theme="monokai"/>
                                <div class="d-flex flex-row-reverse mt-3">
                                  <button style="color: #FF4545;" type="button" class="agent-border btn create-agent-buttons-main-action" data-dismiss="modal">STOP</button>
                                </div>
                                <div class="text-center">
                                  <span class="material-icons cursor-pointer" @mouseover="toggle">keyboard_arrow_down</span>
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
import MotionPauseOutline from '@/components/Icons/MotionPauseOutline.vue'
import OverlayPanel from 'primevue/overlaypanel'
export default {
  data: function () {
    return {
      terminal_ouput: '',
      logs_generated: ''
    }
  },
  components: {
    VAceEditor,
    MotionPauseOutline,
    OverlayPanel
  },
  methods: {
    toggle (event) {
      this.$refs.op.toggle(event)
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

</style>
