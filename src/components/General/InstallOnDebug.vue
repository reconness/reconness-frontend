<template>
    <div class="col-12">
      <div class="modal fade" id="debug-installer-modal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header dialog-without-lines-header">
                    <!-- PARAMETIZABLE -->
                    <h4 class="modal-title"><b>Confirm Installation</b></h4>
                </div>
                <div class="modal-body">
                    <!-- PARAMETIZABLE -->
                    <p>
                        Remember you need to have the Dockerfile with the Agent installation instruction
                    </p>
                    <a href="https://raw.githubusercontent.com/reconness/reconness-agents/master/Dockerfile" target="_blank" rel="noopener noreferrer" class="blue-text">Download Dockerfile</a>
                </div>
                <div class="modal-footer dialog-without-lines-footer">
                    <button @click="installer" type="button" data-dismiss="modal" class="blue-text agent-border btn create-agent-buttons-main-action">Install</button>
                </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /#debug-modal -->
    </div>
</template>
<script>
import { TargetMixin } from '@/mixins/TargetMixin'
import { mapActions } from 'vuex'
export default {
  name: 'InstallOnDebug',
  props: {
    installerOption: String
  },
  mixins: [TargetMixin],
  methods: {
    ...mapActions('agent', ['agentInstallerUninstaller']),
    installer () {
      this.agentInstallerUninstaller(this.installerOption).then(success => {
        if (success) {
          this.updateOperationStatus(this.$entityStatus.SUCCESS, this.$message.successMessageForAgentInstallation)
        } else {
          this.updateOperationStatus(this.$entityStatus.FAILED, this.$message.errorMessageForAgentInstallation)
        }
      })
    }
  }
}
</script>
