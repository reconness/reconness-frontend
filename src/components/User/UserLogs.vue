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
                          <div class="form-group">
                              <label>Log files</label>
                              <select class="form-control" @change="getLogData" v-model="logName">
                                <option value="" disabled hidden selected>Please select an option</option>
                                <option v-for="log of loggedUser.logs" :value="log.id" :key="log.id">{{log.name}}</option>
                              </select>
                          </div>
                      </div>
                      <div class="col-12">
                          <div class="form-group">
                            <textarea class="form-control user-logs-files-content" rows="6" v-model="logText"></textarea>
                          </div>
                          <div class="d-flex">
                          <button type="button" class="red-text agent-border btn create-agent-buttons-main-action" data-dismiss="modal">Cancel</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
</template>
<script>
import AccountCogIco from '@/components/Icons/AccountCogIco.vue'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'UserLogs',
  components: {
    AccountCogIco
  },
  data () {
    return {
      logText: '',
      logName: ''
    }
  },
  computed: {
    ...mapState('user', ['users', 'loggedUser']),
    ...mapGetters('user', ['getLogInfoByName'])
  },
  methods: {
    getLogData: function () {
      console.log(this.getLogInfoByName(this.logName))
      this.logText = this.getLogInfoByName(this.logName)
    }
  }
}
</script>
<style scoped>
.user-logs-files-content{
    resize: none;
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

</style>
