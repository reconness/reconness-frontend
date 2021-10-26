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
                    <a href="https://raw.githubusercontent.com/reconness/reconness-agents/master/Dockerfile" class="blue-text">Download Dockerfile</a>
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
export default {
  name: 'InstallOnDebug',
  props: {
    installerOption: Number
  },
  mixins: [TargetMixin],
  methods: {
    installer () {
      const success = this.$randomBooleanResult()
      if (success) {
        this.$store.commit('agent/installUninstallAgent', this.installerOption)
        this.$store.commit('agent/addAgentFromInstaller', this.installerOption)
        this.updateOperationStatus(this.$entityStatus.SUCCESS, this.$message.successMessageForAgentInstallation)
      } else {
        this.updateOperationStatus(this.$entityStatus.FAILED, this.$message.errorMessageForAgentInstallation)
      }
    }
  }
}
</script>
