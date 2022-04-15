<template>
    <div class="user-management-content m-2">
              <div class="user-management-content-header mt-5 mx-5 d-flex justify-content-between align-items-center">
                    <div class="user-management-main-info d-flex align-items-center">
                      <div class="user-management-main-info-img rounded-circle user-border-admin-role">
                          <img v-if="!this.$validateIsBlank(getLoggedUserData.profilePicture)" :src="getLoggedUserData.profilePicture" class="rounded-circle user-logs-logo-avatar" alt="User Image">
                          <img v-else :src="getGravatarUrlByEmail(getLoggedUserData.email)" class="rounded-circle user-logs-logo-avatar" alt="User Image">
                      </div>
                      <div class="ml-3 user-management-main-info-gdata d-flex flex-column">
                          <span class="user-management-username">{{getLoggedUserData.firstname}} {{getLoggedUserData.lastname}}</span>
                          <div class="user-management-roles">
                              <UserManagementHeader/>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="user-management-content-body mt-3 mx-5">
                  <div class="row">
                      <div class="col-12">
                          <span @click="updateIsUserNotificationSettingsSelected(true)" :class="{'user-payload-selected-pill': isUserNotificationSettingsSelected}" class="p-2 user-setting-pill user-setting-notification-pill notification-active font-size-14px cursor-pointer">Notification Settings</span>
                          <span @click="updateIsUserNotificationSettingsSelected(false)" :class="{'user-payload-selected-pill': !isUserNotificationSettingsSelected}" class="p-2 user-setting-pill user-setting-payload-pill font-size-14px ml-4 cursor-pointer">Notification Payloads</span>
                      </div>
                      <div class="col-12">
                          <div v-if="isUserNotificationSettingsSelected">
                          <div class="p-3 form-settings-main-container mt-4">
                            <div class="">
                                <label class="font-size-16px font-weight-normal" for="user-settings-url">URL</label>
                                <input v-model="notificationsSettings.url" class="border-ligth-gray border-radius-6px form-control" id="user-settings-url">
                            </div>
                            <div class="mt-1">
                                <label class="font-size-16px font-weight-normal" for="user-settings-method">Method</label>
                                <input v-model="notificationsSettings.method" class="border-ligth-gray border-radius-6px form-control" id="user-settings-method">
                            </div>
                            <div class="mt-1">
                                <label class="font-size-16px font-weight-normal" for="user-settings-payload">Payload</label>
                                <input v-model="notificationsSettings.payload" class="border-ligth-gray border-radius-6px form-control" id="user-settings-payload">
                            </div>
                          </div>
                          <div class="mt-2 text-right font-size-14px font-italic">
                            <span>To know more about settings the notifications check the</span><a href="#" class="blue-text"> documentation</a>
                          </div>
                          </div>
                        <div v-else class="p-3 form-settings-main-container mt-4">
                            <div class="">
                                <label class="font-size-16px font-weight-normal" for="user-payload-rootdomain">New Root Domain. Use <span v-pre class="user-payload-highlighted">{{rootDomain}}</span> to obtain <span class="user-payload-highlighted">scriptOutput.rootDomain</span> value</label>
                                <input v-model="notificationsSettings.rootDomain" class="border-ligth-gray border-radius-6px form-control" id="user-payload-rootdomain">
                            </div>
                            <div class="mt-1">
                                <label class="font-size-16px font-weight-normal" for="user-payload-subdomain">New Subdomain. Use <span v-pre class="user-payload-highlighted">{{domain}}</span> to obtain <span class="user-payload-highlighted">scriptOutput.Subdomain</span> value</label>
                                <input v-model="notificationsSettings.subDomain" class="border-ligth-gray border-radius-6px form-control" id="user-payload-subdomain">
                            </div>
                            <div class="mt-1">
                                <label class="font-size-16px font-weight-normal" for="user-payload-ipaddress">New IpAdreess. Use <span v-pre class="user-payload-highlighted">{{ip}}</span> to obtain <span class="user-payload-highlighted">scriptOutput.Ip</span> value</label>
                                <input v-model="notificationsSettings.ipAddress" class="border-ligth-gray border-radius-6px form-control" id="user-payload-ipaddress">
                            </div>
                            <div class="mt-1">
                                <label class="font-size-16px font-weight-normal" for="user-payload-isalive">New IsAlive. Use <span v-pre class="user-payload-highlighted">{{isAlive}}</span> to obtain <span class="user-payload-highlighted">scriptOutput.IsAlive</span> value</label>
                                <input v-model="notificationsSettings.isAlive" class="border-ligth-gray border-radius-6px form-control" id="user-payload-isalive">
                            </div>
                          </div>
                      </div>
                      <div class="col-12">
                        <div class="mt-5 d-flex justify-content-end">
                            <button type="button" @click="saveNotificationsSettingsToLoggedUserAction(notificationsSettings)" class="blue-text agent-border btn create-agent-buttons-main-action">Accept</button>
                        </div>
                      </div>
                  </div>
              </div>
          </div>
</template>
<script>
import jQuery from 'jquery'
import { mapGetters, mapMutations, mapState, mapActions } from 'vuex'
import UserManagementHeader from '@/components/User/UserManagementHeader.vue'
export default {
  name: 'NotificationManagement',
  components: {
    UserManagementHeader
  },
  computed: {
    ...mapGetters('user', ['getLoggedUserData', 'getGravatarUrlByEmail', 'getRoleById', 'roles']),
    ...mapState('target', ['operationStatus'])
  },
  mounted () {
    this.loadUserNotificationsSettings().then(response => {
      if (response.status) {
        this.loadNotificationsSettings()
      }
    })
  },
  data () {
    return {
      isUserNotificationSettingsSelected: true,
      notificationsSettings: {
        url: '',
        method: '',
        payload: '',
        rootDomain: '',
        subDomain: '',
        ipAddress: '',
        isAlive: ''
      }
    }
  },
  watch: {
    operationStatus: {
      handler: function (result) {
        if (result.status === this.$entityStatus.SUCCESS) {
          this.updateNotificationMessageType(this.$notificationMessageType.SUCCESS)
          this.updateNotificationMessageDescription(this.$message.successMessageForNotificationUpdate)
          jQuery('#message-box-notification-modal').modal()
        } else if (result.status === this.$entityStatus.FAILED) {
          this.updateNotificationMessageType(this.$notificationMessageType.ERROR)
          this.updateNotificationMessageDescription(this.$message.errorMessageForAllPurpose)
          jQuery('#message-box-notification-modal').modal()
        }
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations('user', ['saveNotificationsSettingsToLoggedUser']),
    ...mapMutations('general', ['updateNotificationMessageType', 'updateNotificationMessageActionSelected', 'updateNotificationMessageDescription']),
    ...mapActions('notification', ['saveNotificationsSettingsToLoggedUserAction', 'loadUserNotificationsSettings']),
    updateIsUserNotificationSettingsSelected (flag) {
      this.isUserNotificationSettingsSelected = flag
    },
    loadNotificationsSettings () {
      this.notificationsSettings = this.getLoggedUserData.notification
    }
  }
}
</script>
<style scoped>
.user-logs-logo-avatar{
    width: 81px;
    height: 81px
}
.user-management-listing-users{
    height: 212px;
}
.agent-border{
    border: 1px solid #F1F3F5;
    border-radius: 12px;
    width: 90px;
    height: 47px;
}
.user-management-username{
    font-size: 24px;
}
.user-management-role-name{
    color: #707070;
}
.user-role-ico{
    width: 19px;
    height: 17px;
}
.user-border-admin-role{
    border: 4px solid #00B1FF;
}
.user-management-main-info-img{
    padding: 7px
}
.user-setting-pill{
    border: 1px solid #E5E9EC;
    border-radius: 6px;
}
.form-settings-main-container{
    background: #FBFBFB 0% 0% no-repeat padding-box;
    border: 1px solid #E5E9EC;
    border-radius: 6px;
}
.user-payload-highlighted{
    color: #FF5596;
}
.user-payload-selected-pill{
    box-shadow: 0px 19px 45px #0C1F6A6E;
}

</style>
