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
                          <UserManagementHeader/>
                      </div>
                  </div>
              </div>
              <div class="user-management-content-body mt-3 mx-5">
                  <div class="row">
                      <div class="col-12">
                          <div class="form-group d-flex align-items-center">
                              <label class="user-logs-label-select font-weight-medium font-size-14px mr-1">Log files</label>
                              <select class="form-control logs-files-management-select" @change="getLogData" v-model="logName">
                                <option value="" disabled hidden selected>Please select an option</option>
                                <option v-for="log of logs" :value="log" :key="log">{{log}}</option>
                              </select>
                              <SpinnerCircle addCss="blue-text spinner-circle-size ml-3" :show="isBackgroundProcessRunning"/>
                          </div>
                      </div>
                      <div class="col-12">
                          <div class="form-group">
                            <textarea readonly class="form-control user-logs-files-content" rows="17" v-model="logText"></textarea>
                          </div>
                          <div class="d-flex justify-content-end mb-2">
                            <button :disabled="isNotLogSelected" @click="updateNotificationMessage" type="button" class="red-text agent-border btn create-agent-buttons-main-action" data-toggle="modal" data-target="#message-box-notification-modal" data-dismiss="modal">Clean</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
</template>
<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
import UserManagementHeader from '@/components/User/UserManagementHeader.vue'
import { TargetMixin } from '@/mixins/TargetMixin'
import SpinnerCircle from '@/components/General/SpinnerCircle.vue'
export default {
  name: 'LogsFilesManagement',
  components: {
    UserManagementHeader,
    SpinnerCircle
  },
  data () {
    return {
      logText: '',
      logName: '',
      isBackgroundProcessRunning: false
    }
  },
  mixins: [TargetMixin],
  computed: {
    ...mapState('general', ['notificationMessageActionSelected']),
    ...mapState('logfile', ['logs']),
    ...mapGetters('user', ['getLoggedUserData', 'getGravatarUrlByEmail', 'getRoleById', 'roles']),
    isNotLogSelected () {
      return this.$validateIsBlank(this.logName)
    }
  },
  watch: {
    notificationMessageActionSelected: function (value) {
      if (value) {
        this.cleanLogInfoByNameFromServer(this.logName).then(response => {
          if (response.status) {
            this.logText = ''
            this.updateOperationStatus(this.$entityStatus.SUCCESS, this.$message.successMessageForLogFileCleaning)
          } else {
            this.updateOperationStatus(this.$entityStatus.FAILED, response.message)
          }
        })
        this.resetData()
      }
    }
  },
  mounted () {
    this.loadLogsNames()
  },
  methods: {
    ...mapMutations('general', ['updateNotificationMessageType', 'updateNotificationMessageActionSelected', 'updateNotificationMessageDescription']),
    ...mapMutations('user', ['removeUserLogByName']),
    ...mapActions('logfile', ['cleanLogInfoByNameFromServer', 'getLogInfoByNameFromServer', 'loadLogsNames']),
    getLogData: function () {
      this.isBackgroundProcessRunning = true
      this.getLogInfoByNameFromServer(this.logName).then(response => {
        if (response.status) {
          this.logText = response.message
        } else {
          this.logText = ''
        }
        this.isBackgroundProcessRunning = false
      })
    },
    updateNotificationMessage: function () {
      this.updateNotificationMessageType(this.$notificationMessageType.CONFIRM)
      const notificationMessageDesc = 'Are you sure to clean this log: <span class="font-weight-semibold"> ' + this.logName + ' </span>'
      this.updateNotificationMessageDescription(notificationMessageDesc)
    },
    resetData: function () {
      this.updateNotificationMessageActionSelected(false)
      this.logText = ''
    }
  }
}
</script>
<style scoped>
.user-logs-files-content{
    resize: none;
}
textarea.user-logs-files-content:read-only{
  background-color: #ffffff;
}
.user-logs-logo-avatar{
    width: 81px;
    height: 81px
}
table.user-management-users-list{
    border: 1px solid #E5E9EC;
    border-radius: 6px;
}
table.user-management-users-list.table thead th{
    border-bottom: 1px solid #E5E9EC;
}
.user-management-listing-users{
    height: 212px;
}

.user-management-plus-logo{
    width: 58px;
    height: 58px;
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
.font-size-14px{
  font-size: 14px;
}
.font-size-16px{
  font-size: 16px;
}
.user-border-admin-role{
    border: 4px solid #00B1FF;
}
.user-management-main-info-img{
    padding: 7px
}
textarea, select{
  border: 1px solid #E5E9EC;
  border-radius: 6px;
}
.user-logs-cancel-btn{
  width: 77px;
  height: 36px;
}
.spinner-circle-size{
  height: 20px;
  width: 20px;
}
.logs-files-management-select{
  width: 90%
}

</style>
