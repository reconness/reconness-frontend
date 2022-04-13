<template>
  <div class="col-12">
    <div class="d-flex align-items-center flex-column justify-content-center">
      <div :class="{'user-settings': showSettingsSection, 'pb-3': !showLogsSection}" class="user-management-container">
        <UserList v-if="showUsersSection"/>
        <UserLogs v-else-if="showLogsSection"/>
        <NotificationSettings v-else/>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import UserList from '@/components/User/UserList.vue'
import UserLogs from '@/components/User/UserLogs.vue'
import NotificationSettings from '@/components/User/NotificationSettings.vue'
export default {
  name: 'UserManagement',
  components: {
    UserList,
    UserLogs,
    NotificationSettings
  },
  computed: {
    ...mapState('user', ['showLogsSection', 'showUsersSection', 'showSettingsSection'])
  }
}
</script>
<style scoped>
.user-management-container {
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 19px 45px #0C1F6A6E;
    border: 1px solid #E5E9EC;
    border-radius: 12px;
    width: 60%;
    max-width: 1086px;
}
.user-management-logo-avatar{
    width: 131px;
    height: 131px
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
.user-management-btn-size{
    width: 70px;
    height: 37px;
}
.user-border-admin-role{
    border: 4px solid #00B1FF;
}
.user-management-main-info-img{
    padding: 11px
}
.user-management-action-width{
    width: 190px;
}
.box-shadow-none{
    box-shadow: none !important;
}
</style>
