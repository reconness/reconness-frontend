<template>
  <div class="col-12">
    <div class="poppins modal fade" id="message-box-notification-modal" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-md modal-dialog-centered">
            <div class="modal-content border-radius-12px gray-background-box">
              <div class="modal-body">
                <div class="row">
                  <div class="col-12">
                    <div class="d-flex flex-column align-items-center justify-content-center mb-3">
                      <HelpIco v-if="isNotificationMessageTypeConfirmSelected" :variableClass="'mt-3 question-mark-size question-mark-color'"/>
                      <span v-else-if="isNotificationMessageTypeSuccessSelected" class="material-icons mt-3 blue-text notification-settings-icon-size">check_circle_outline</span>
                      <span v-if="isNotificationMessageTypeConfirmSelected" class="message-box-notification-type-text black-text font-size-24px mt-2 font-weight-semibold">Confirm</span>
                      <span v-if="isNotificationMessageTypeSuccessSelected" class="message-box-notification-type-text black-text font-size-24px mt-2 font-weight-semibold">Success</span>
                      <span v-html="notificationMessageDescription" class="message-box-notification-description black-text font-size-16px px-2 mt-4"></span>
                    </div>
                  </div>
                </div>
                </div> <!-- /.modal-body -->
              <div class="modal-footer border-radius-12px highlight-area dialog-without-lines-footer d-flex justify-content-center">
                  <button v-if="isNotificationMessageTypeConfirmSelected" @click="setActionToTake(true)" type="button" class="btn message-box-btn message-box-btn-accept-fontcolor">Accept</button>
                  <button v-if="isNotificationMessageTypeConfirmSelected" @click="setActionToTake(false)" type="button" class="btn message-box-btn message-box-btn-cancel-fontcolor" data-dismiss="modal">Cancel</button>
                  <button v-else @click="resetAndSetActionToTake(true)" type="button" class="btn message-box-btn blue-text" data-dismiss="modal">Accept</button>
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
    ...mapMutations('general', ['updateNotificationMessageActionSelected']),
    ...mapMutations('target', ['updateOperationStatusInfo']),
    setActionToTake: function (action) {
      this.updateNotificationMessageActionSelected(action)
      jQuery('#message-box-notification-modal').modal('hide')
    },
    resetAndSetActionToTake (action) {
      this.updateNotificationMessageActionSelected(action)
      jQuery('#message-box-notification-modal').modal('hide')
      this.resetOperationStatus()
    },
    resetOperationStatus () {
      this.updateOperationStatusInfo(this.$entityStatus.WAITING, '')
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
.notification-settings-icon-size{
  font-size: 10rem;
}
</style>
