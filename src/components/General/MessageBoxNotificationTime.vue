<template>
  <div class="col-12">
    <div class="poppins modal fade" id="notifications-time-message-box-modal" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-md modal-dialog-centered">
            <div class="modal-content border-radius-12px gray-background-box">
              <div class="modal-body">
                <div class="row">
                  <div class="col-12">
                    <div class="d-flex flex-column align-items-center justify-content-center mb-3">
                      <HelpIco v-if="isNotificationMessageTypeConfirmSelected" :variableClass="'mt-3 question-mark-size question-mark-color'"/>
                      <span v-if="isNotificationMessageTypeConfirmSelected" class="message-box-notification-type-text black-text font-size-24px mt-2 font-weight-semibold">Confirm</span>
                      <span v-html="notificationMessageDescription" class="message-box-notification-description black-text font-size-16px px-2 mt-4"></span>
                      <div class="mt-3 userform-role-title">
                        <div class="form-group ml-3user mt-2 d-flex">
                          <div class="ml-2 custom-control custom-radio form-check">
                            <input v-model="notificationToRemove"  value="today" class="form-check-input custom-control-input" type="radio" id="agent_customCheckbox1">
                            <label class="form-check-label custom-control-label agent-regular-font black-text agent-disable-weigth d-flex align-items-center" for="agent_customCheckbox1">
                              Today
                            </label>
                          </div>
                          <div class="ml-2 custom-control custom-radio form-check ml-4">
                            <input v-model="notificationToRemove" value="yesterday" class="form-check-input custom-control-input" type="radio" id="agent_customCheckbox2">
                            <label class="form-check-label custom-control-label agent-regular-font black-text agent-disable-weigth d-flex align-items-center" for="agent_customCheckbox2">
                              Yesterday
                            </label>
                          </div>
                          <div class="ml-2 custom-control custom-radio form-check ml-4">
                            <input v-model="notificationToRemove" value="older" class="form-check-input custom-control-input" type="radio" id="agent_customCheckbox3">
                            <label class="form-check-label custom-control-label agent-regular-font black-text agent-disable-weigth d-flex align-items-center" for="agent_customCheckbox3">
                              Olders
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div> <!-- /.modal-body -->
              <div class="modal-footer border-radius-12px highlight-area dialog-without-lines-footer d-flex justify-content-center">
                  <button @click="setActionToTake(true)" type="button" class="btn message-box-btn message-box-btn-accept-fontcolor">Accept</button>
                  <button @click="setActionToTake(false)" type="button" class="btn message-box-btn message-box-btn-cancel-fontcolor" data-dismiss="modal">Cancel</button>
              </div> <!-- /.modal-footer dialog-without-lines-footer -->
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /#confirmation-modal -->
    </div>
</template>
<script>
import HelpIco from '@/components/Icons/HelpIco.vue'
import jQuery from 'jquery'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'MessageBoxNotification',
  components: {
    HelpIco
  },
  data () {
    return {
      notificationToRemove: 'older'
    }
  },
  computed: {
    ...mapState('general', ['notificationMessageType', 'notificationMessageDescription']),
    isNotificationMessageTypeErrorSelected () {
      return this.notificationMessageType === this.$notificationMessageType.ERROR
    },
    isNotificationMessageTypeConfirmSelected () {
      return this.notificationMessageType === this.$notificationMessageType.CONFIRM
    },
    isNotificationMessageTypeSuccessSelected () {
      return this.notificationMessageType === this.$notificationMessageType.SUCCESS
    }
  },
  methods: {
    ...mapMutations('general', ['updateNotificationMessageActionSelected', 'updateNotificationTimeSelected']),
    setActionToTake: function (action) {
      this.updateNotificationMessageActionSelected(action)
      this.updateNotificationTimeSelected(this.notificationToRemove)
      jQuery('#notifications-time-message-box-modal').modal('hide')
    }
  }
}
</script>
<style scoped>
.question-mark-size{
  width: 40%;
  height: 50%
}
.question-mark-color{
  fill: #ff4545;
}
.question-title-font-color{
  color: #707070;
}
.question-title-font-size{
  font-size: 1.4rem;
}
.question-title-text-width{
  width: 60%;
}
.message-box-btn {
  border: 1px solid #e5e9ec;
  border-radius: 8px;
  background-color: transparent;
  width: 88px
}
.message-box-btn-cancel-fontcolor {
  color: #707070;
}
.message-box-btn-accept-fontcolor {
  color: #ff4545;
}
.message-box-notification-type-text{
    color: #707070 !important;
}
.border-radius-12px{
    border-radius: 12px;
}
</style>
