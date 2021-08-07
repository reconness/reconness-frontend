<template>
    <div class="col-12">
      <div class="modal fade" id="debug-modal" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                <div class="modal-header dialog-without-lines-header">
                  <!-- PARAMETERIZABLE -->
                    <h4 class="modal-title"><b>Debug Agent</b></h4>
                </div>
                <div class="modal-body">
                  <!-- PARAMETERIZABLE -->
                    <input style="margin-bottom: 20px;" v-model="terminalOutput" class="form-control agent-placeholder form-input-without-lines" placeholder="Terminal one line output">
                    <span class="info-box-text"><b style="padding-right: 10px;">Script</b><a href="https://docs.reconness.com/agents/debug-agent" class="blue-text">Learn more</a></span>
                    <v-ace-editor v-model:value="terminalInput" lang="csharp" style="height:300px; margin-top: 6px;" theme="monokai"/>
                    <p class="script-result">{{ executionResult }}</p>
                </div>
                <div class="modal-footer dialog-without-lines-footer">
                    <button @click="executeCode" :disabled="btnValidations" type="button" class="agent-border btn create-agent-buttons-main-action btn-block btn-danger delete_btn">Run</button>
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
  name: 'Debug',
  components: {
    VAceEditor
  },
  data () {
    return {
      terminalOutput: '',
      terminalInput: '',
      executionResult: ''
    }
  },
  computed: {
    btnValidations: function () {
      if (this.terminalOutput && this.terminalInput) {
        return false
      }
      return true
    }
  },
  methods: {
    clearContent: function () {
      this.terminalOutput = ''
      this.terminalInput = ''
      this.executionResult = ''
    },
    executeCode: function () {
      if (this.terminalInput !== '') {
        const success = this.$randomBooleanResult()
        if (success) {
          this.executionResult = 'Compiled successfully'
        } else {
          this.executionResult = 'Failed to compile with errors'
        }
      }
    }
  }
}
</script>
<style>
  p.script-result{
    margin-top: 6px;
  }
</style>
