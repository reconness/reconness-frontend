<template>
    <BasicModal modalId="confirmation-before-run-an-agent" modalTitle="Confirm Command">
      <template #body-content>
        <input v-model="command" class="mb-4 form-control agent-placeholder form-input-without-lines" placeholder="Command">
        <div class="custom-control custom-checkbox form-check">
          <input class="form-check-input custom-control-input" type="checkbox" id="agent_customCheckbox6" v-model="activateNotification">
          <label class="form-check-label custom-control-label agent-regular-font black-text agent-disable-weigth" for="agent_customCheckbox6">Activate Notification</label>
        </div>
      </template>
      <template #footer-content>
        <button type="button" @click="executeAgent" class="agent-border btn create-agent-buttons-main-action btn-block btn-danger delete_btn">Run</button>
        <button type="button" @click="resetData" data-dismiss="modal" class="blue-text agent-border btn create-agent-buttons-main-action">Cancel</button>
      </template>
    </BasicModal>
</template>
<script>
import BasicModal from '@/components/Target/BasicModal.vue'
import jQuery from 'jquery'
export default {
  name: 'ConfirmationBeforeRunAnAgent',
  components: {
    BasicModal
  },
  props: {
    dataId: String,
    dataName: String
  },
  data () {
    return {
      command: '',
      activateNotification: false
    }
  },
  methods: {
    executeAgent () {
      jQuery('#confirmation-before-run-an-agent').modal('hide')
      const self = this
      setTimeout(
        function () {
          jQuery('#agentExecutionModalForm').modal('show')
          self.$emit('run-agent', { dataId: self.dataId, dataName: self.dataName, command: self.command, activateNotification: self.activateNotification })
          self.resetData()
        },
        500
      )
    },
    resetData () {
      this.command = ''
      this.activateNotification = false
    }
  }
}
</script>
