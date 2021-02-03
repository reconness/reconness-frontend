<template>
    <div class="col-12">
      <div class="modal fade" id="debug-uninstaller-modal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header dialog-without-lines-header">
                    <!-- PARAMETIZABLE -->
                    <h4 class="modal-title"><b>Confirm Uninstallation</b></h4>
                </div>
                <div class="modal-body">
                    <!-- PARAMETIZABLE -->
                    <p>
                        Are you sure to uninstall this agent: {{installerOptionName}}
                    </p>
                </div>
                <div class="modal-footer dialog-without-lines-footer">
                    <button @click="installer" type="button" data-dismiss="modal" style="color: #00B1FF;" class="agent-border btn create-agent-buttons-main-action">Ok</button>
                    <button type="button" data-dismiss="modal" style="color: #00B1FF;" class="agent-border btn create-agent-buttons-main-action">Cancel</button>
                </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /#debug-modal -->
    </div>
</template>
<script>
export default {
  props: ['installerOptionName', 'installerOption'],
  methods: {
    installer () {
      const success = this.$randomBooleanResult()
      if (success) {
        this.$store.commit('installUninstallAgent', this.installerOption)
        this.$store.commit('removeAgentFromInstaller', this.installerOption)
        this.$toast.add({ severity: 'success', sumary: 'Success', detail: 'The agent was uninstalled', life: 3000 })
      } else {
        this.$toast.add({ severity: 'error', sumary: 'Error', detail: 'An error ocurred during uninstallation', life: 3000 })
      }
    }
  }
}
</script>
