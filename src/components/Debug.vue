<template>
    <div class="col-12">
      <div class="modal fade" id="debug-modal" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                <div class="modal-header dialog-without-lines-header">
                    <!-- PARAMETIZABLE -->
                    <h4 class="modal-title"><b>Debug Agent</b></h4>
                </div>
                <div class="modal-body">
                    <!-- PARAMETIZABLE -->
                    <input style="margin-bottom: 20px;" v-model="terminalOutput" class="form-control agent-placeholder form-input-without-lines" placeholder="Terminal one line output">
                    <span class="info-box-text"><b style="padding-right: 10px;">Script</b><a href="https://docs.reconness.com/agents/debug-agent" class="blue-text">Learn more</a></span>
                    <v-ace-editor v-model:value="terminalInput" lang="csharp" style="height:300px; margin-top: 6px;" theme="monokai"/>
                </div>
                <div class="modal-footer dialog-without-lines-footer">
                    <button @click="clearContent" type="submit" data-dismiss="modal" style="color: #00B1FF;" class="agent-border btn create-agent-buttons-main-action">Done</button>
                </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /#debug-modal -->
    </div>
</template>
<script>
import { VAceEditor } from 'vue3-ace-editor'
export default {
  data () {
    return {
      terminalOutput: '',
      terminalInput: ''
    }
  },
  components: {
    VAceEditor
  },
  methods: {
    clearContent: function () {
      this.terminalOutput = ''
      this.terminalInput = ''
    }
  }
}
</script>
