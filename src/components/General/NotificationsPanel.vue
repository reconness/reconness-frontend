<template>
<div class="poppins position-absolute notification-panel-top-container">
          <div class="notifications-aside notifications-container-border-radius control-sidebar-dark installer-agents">
        <div class="p-3 notifications-top-container control-sidebar-content sticky-top d-flex align-items-center justify-content-between">
            <span class="font-size-20px font-weight-medium">Notifications</span>
            <span class="cursor-pointer clear-all font-weight-light">Clear All</span>
        </div>
        <div class="sidebar-list marketplace-agent-container">
          <dl class="row h-100">
            <dt class="col-12">
                <div class="justify-content-between d-flex h-100 align-items-center">
                    <p class="font-weight-medium font-size-14px">Today</p>
                    <span class="notifications-count font-weight-light">{{getTodaysTotalUnreadNotifications}} new notifications</span>
              </div>
            </dt>
          </dl>
        </div>
        <div class="sidebar-list marketplace-agent-container" v-for="notification of getTodaysNotifications" :key="notification.id">
          <dl class="row h-100" :class="{'notification-new-indicator': notification.readed===false}">
              <dt class="col-10">
                  <div class="d-flex h-100 align-items-center">
                    <p class="font-size-14px font-weight-light">{{  notification.description  }}</p>
                    </div>
                  </dt>
                  <dd class="col-2 mb-0">
                    <div class="h-100 w-100 d-flex align-items-center h-100">
                        <span v-if="notification.status === this.$entityStatus.FAILED" class="font-size-20px material-icons red-text">cancel</span>
                        <span v-else-if="notification.status === this.$entityStatus.SUCCESS" class="font-size-20px blue-text material-icons">check_circle</span>
                        <span v-else class="material-icons font-size-20px green-text">play_circle</span>
                    </div>
                </dd>
          </dl>
        </div>
        <div class="sidebar-list marketplace-agent-container">
          <dl class="row h-100">
            <dt class="col-12">
                <div class="justify-content-between  d-flex h-100 align-items-center">
                    <p class="font-weight-medium font-size-14px">Yesterday</p>
                    <span class="notifications-count font-weight-light">{{getYesterdayTotalUnreadNotifications}} new notifications</span>
                </div>
            </dt>
          </dl>
        </div>
        <div class="sidebar-list marketplace-agent-container" v-for="notification of getYesterdayNotifications" :key="notification.id">
          <dl class="row h-100" :class="{'notification-new-indicator': notification.readed===false}">
              <dt class="col-10">
                  <div class="d-flex h-100 align-items-center">
                    <p class="font-size-14px font-weight-light">{{  notification.description  }}</p>
                    </div>
                  </dt>
                  <dd class="col-2 mb-0">
                    <div class="h-100 w-100 d-flex align-items-center h-100">
                        <span v-if="notification.status === this.$entityStatus.FAILED" class="font-size-20px material-icons red-text">cancel</span>
                        <span v-else-if="notification.status === this.$entityStatus.SUCCESS" class="font-size-20px blue-text material-icons">check_circle</span>
                        <span v-else class="material-icons font-size-20px green-text">play_circle</span>
                    </div>
                </dd>
          </dl>
        </div>
        <div class="sticky-bottom sidebar-list marketplace-total-agents-container">
          <dl class="row">
            <dt class="col-12">
              <router-link @click="showNotificationsMenu" :to="{name: 'NotificationsCenter'}">
              <p class="text-center marketplace-total-agents-font">View all notifications</p>
              </router-link>
            </dt>
          </dl>
        </div>
      </div>
      </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'NotificationsPanel',
  computed: {
    ...mapState('notification', ['notifications']),
    ...mapGetters('notification', ['getTodaysNotifications', 'getTodaysTotalUnreadNotifications', 'getYesterdayNotifications', 'getYesterdayTotalUnreadNotifications', 'getOlderNotifications'])
  },
  mounted () {
    this.updateNotificationsStatus()
  },
  methods: {
    ...mapMutations('notification', ['showNotificationsMenu', 'removeUnreadStatusTodayAndYesterday']),
    updateNotificationsStatus () {
      const self = this
      setTimeout(
        function () {
          self.removeUnreadStatusTodayAndYesterday()
        },
        3000
      )
    }
  }
}
</script>
<style scoped>
.marketplace-total-agents-container{
  height: 46px;
  padding: 0 .5rem 0 .5rem;
}
.marketplace-agent-name-font{
  font: normal normal 300 14px/45px Poppins;
  letter-spacing: 0px;
}
.marketplace-title-font{
  font: normal normal medium 20px/32px Poppins;
  letter-spacing: 0px;
}
.marketplace-agent-container{
  height: 48px;
  padding: 0 .5rem 0 .5rem;
}
.marketplace-total-agents-font{
  font: normal normal normal 14px/45px Poppins;
  letter-spacing: 0px;
}
.notifications-top-container{
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border: 1px solid #E5E9EC;
    border-radius: 8px 8px 0px 0px;
}
.notifications-container-border-radius{
    border-radius: 8px 8px 0px 0px;
}
.clear-all{
 font-size: 11px;
 color: #707070;;
}
.notification-new-indicator{
    /* background: #00B1FF 0% 0% no-repeat padding-box;
border-radius: 0px 4px 4px 0px; */
    border-left: 2px solid #00B1FF;
    border-right: 2px solid #00B1FF;;
}
.notifications-count{
    color: #707070;
    font-size: 11px;
}
.notifications-aside{
  height: fit-content;
}
div.notifications-aside{
  overflow-y: auto;
}
div.notifications-aside::-webkit-scrollbar{
  display: none;
}
div.notifications-aside{
  -ms-overflow-style: none;
  scrollbar-width: none;
}
div.notifications-aside{
  overflow-y: auto;
}
.notification-panel-top-container{
  right: 0;
}
</style>
