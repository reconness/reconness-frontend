<template>
    <div class="user-management-content m-2">
              <div class="user-management-content-header mt-5 mx-5 d-flex justify-content-between align-items-center">
                    <div class="user-management-main-info d-flex align-items-center">
                      <div class="user-management-main-info-img rounded-circle user-border-admin-role">
                          <img src="/adminlte/img/reconnes/user2-160x160.jpg" class="rounded-circle user-logs-logo-avatar" alt="User Logo">
                      </div>
                      <div class="ml-3 user-management-main-info-gdata d-flex flex-column">
                          <span class="user-management-username">John Smith</span>
                          <div class="user-management-roles">
                              <AccountCogIco class="user-role-ico"/>
                              <span class="font-size-16px user-management-role-name ml-1">Administrator Owner</span>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="user-management-content-body mt-3 mx-5">
                  <div class="row">
                      <div class="col-12">
                          <span @click="updateIsUserNotificationSettingsSelected(true)" :class="{'user-payload-selected-pill': isUserNotificationSettingsSelected}" class="p-2 user-setting-pill user-setting-notification-pill notification-active font-size-14px">Notification Settings</span>
                          <span @click="updateIsUserNotificationSettingsSelected(false)" :class="{'user-payload-selected-pill': !isUserNotificationSettingsSelected}" class="p-2 user-setting-pill user-setting-payload-pill font-size-14px ml-4">Notification Payloads</span>
                      </div>
                      <div class="col-12">
                          <div v-if="isUserNotificationSettingsSelected">
                          <div class="p-3 form-settings-main-container mt-4">
                            <div class="">
                                <label class="font-size-16px font-weight-normal" for="user-settings-url">URL</label>
                                <input class="border-ligth-gray border-radius-6px form-control" id="user-settings-url">
                            </div>
                            <div class="mt-1">
                                <label class="font-size-16px font-weight-normal" for="user-settings-method">Method</label>
                                <input class="border-ligth-gray border-radius-6px form-control" id="user-settings-method">
                            </div>
                            <div class="mt-1">
                                <label class="font-size-16px font-weight-normal" for="user-settings-payload">Payload</label>
                                <input class="border-ligth-gray border-radius-6px form-control" id="user-settings-payload">
                            </div>
                          </div>
                          <div class="mt-2 text-right font-size-14px font-italic">
                            <span>To know more about settings the notifications check the</span><a href="#" class="blue-text"> documentation</a>
                          </div>
                          </div>
                        <div v-else class="p-3 form-settings-main-container mt-4">
                            <div class="">
                                <label class="font-size-16px font-weight-normal" for="user-payload-rootdomain">New Root Domain. Use <span v-pre class="user-payload-highlighted">{{rootDomain}}</span> to obtain <span class="user-payload-highlighted">scriptOutput.rootDomain</span> value</label>
                                <input class="border-ligth-gray border-radius-6px form-control" id="user-payload-rootdomain">
                            </div>
                            <div class="mt-1">
                                <label class="font-size-16px font-weight-normal" for="user-payload-subdomain">New Subdomain. Use <span v-pre class="user-payload-highlighted">{{domain}}</span> to obtain <span class="user-payload-highlighted">scriptOutput.Subdomain</span> value</label>
                                <input class="border-ligth-gray border-radius-6px form-control" id="user-payload-subdomain">
                            </div>
                            <div class="mt-1">
                                <label class="font-size-16px font-weight-normal" for="user-payload-ipaddress">New IpAdreess. Use <span v-pre class="user-payload-highlighted">{{ip}}</span> to obtain <span class="user-payload-highlighted">scriptOutput.Ip</span> value</label>
                                <input class="border-ligth-gray border-radius-6px form-control" id="user-payload-ipaddress">
                            </div>
                            <div class="mt-1">
                                <label class="font-size-16px font-weight-normal" for="user-payload-isalive">New IsAlive. Use <span v-pre class="user-payload-highlighted">{{isAlive}}</span> to obtain <span class="user-payload-highlighted">scriptOutput.IsAlive</span> value</label>
                                <input class="border-ligth-gray border-radius-6px form-control" id="user-payload-isalive">
                            </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
</template>
<script>
import AccountCogIco from '@/components/Icons/AccountCogIco.vue'
export default {
  name: 'UserSettings',
  components: {
    AccountCogIco
  },
  data () {
    return {
      isUserNotificationSettingsSelected: true
    }
  },
  methods: {
    updateIsUserNotificationSettingsSelected (flag) {
      this.isUserNotificationSettingsSelected = flag
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
