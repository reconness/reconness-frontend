<template>
  <div class="col-12">
    <form>
        <div class="modal fade" id="agentExecutionModalForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
          <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content agent-containers">
                   <div class="modal-body">
                          <div class="row">
                            <div class="col-12 col-sm-5">
                                <div class="info-box">
                                    <div class="info-box-content">
                                        <span class="info-box-text">My Agent</span>
                                        <span>00:06:00</span>
                                        <div>
                                            <span>Terminal</span><span>Logs</span>
                                        </div>
                                        <!-- <span class="info-box-number">
                                        10
                                        <small>%</small>
                                        </span> -->
                                    </div>
                                    <span class="info-box-icon bg-info elevation-1"></span>
                                    <!-- /.info-box-content -->
                                </div>
                            </div>
                            <div class="col-12 col-sm-7">
                                <div class="info-box bg-info">
                                        <div class="info-box-content">
                                            <div class="d-flex space_between">
                                              <span class="info-box-text">Process status</span>
                                              <span class="info-box-text">00:06:00</span>
                                            </div>
                                            <div class="progress">
                                                <div class="progress-bar" style="width: 70%"></div>
                                            </div>
                                            <div class="d-flex align_left-ordered_columns">
                                            <span>running</span>
                                            <span>Terminal</span>
                                            </div>
                                        </div>
                                            <!-- /.info-box-content -->
                                    </div>
                            </div>
                            <div class="col-12">
                                <v-ace-editor v-model:value="terminal_ouput" lang="csharp" style="height:300px" theme="monokai"/>
                            </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </form>
    </div>
</template>
<script>
import { VAceEditor } from 'vue3-ace-editor'
export default {
  data: function () {
    return {
      terminal_ouput: '',
      logs_generated: ''
    }
  },
  components: {
    VAceEditor
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

</style>
