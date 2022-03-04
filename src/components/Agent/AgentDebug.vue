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
                    <input v-model="terminalOutput" class="mb-4 form-control agent-placeholder form-input-without-lines" placeholder="Terminal one line output">
                    <span class="info-box-text"><b class="pr-2">Script</b><a href="https://docs.reconness.com/agents/debug-agent" target="_blank" rel="noopener noreferrer" class="blue-text">Learn more</a></span>
                    <v-ace-editor v-model:value="terminalInput" lang="csharp" style="height:300px; margin-top: 6px;" theme="monokai"/>
                    <p class="script-result">{{ executionResult }}</p>
                </div>
                <div class="modal-footer dialog-without-lines-footer">
                    <button @click="executeCode" :disabled="btnValidations || agentIsInDebug" type="button" class="agent-border btn create-agent-buttons-main-action btn-block btn-danger delete_btn">Run</button>
                    <button @click="clearContent" type="submit" data-dismiss="modal" class="blue-text agent-border btn create-agent-buttons-main-action">Done</button>
                </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /#debug-modal -->
    </div>
</template>
<script>
import { VAceEditor } from 'vue3-ace-editor'
import { mapActions } from 'vuex'
export default {
  name: 'AgentDebug',
  components: {
    VAceEditor
  },
  data () {
    return {
      terminalOutput: '',
      terminalInput: '',
      executionResult: '',
      agentIsInDebug: false
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
    ...mapActions('agent', ['debugCode']),
    clearContent: function () {
      this.terminalOutput = ''
      this.terminalInput = ''
      this.executionResult = ''
      this.agentIsInDebug = false
    },
    executeCode: function () {
      if (this.terminalInput !== '') {
        this.agentIsInDebug = true
        this.debugCode({
          terminalOutput: this.terminalOutput,
          script: this.terminalInput
        }).then(success => {
          this.executionResult = success
          this.agentIsInDebug = false
        }).catch(function (error) {
          this.executionResult = error
          this.agentIsInDebug = false
        })
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
