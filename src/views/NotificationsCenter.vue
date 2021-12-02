<template>
<div class="poppins">
<div class="content-wrapper screen-height">
      <div class="container-fluid">
          <div class="row">
            <div class="col-12 border-bottom">
              <div class="row">
                  <div class="w-60px"></div>
                  <div class="col-1 my-2 border-left font-size-14px font-weight-light black-text">Status</div>
                  <div class="col-4 my-2 border-left font-size-14px font-weight-light black-text">Description</div>
                  <div class="col-2 my-2 border-left font-size-14px font-weight-light black-text">Date</div>
              </div>
            </div>
          </div>
          <div class="row">
            <div v-if="!isTodaysNotificationsEmpty" class="col-12 border-bottom">
              <p class="mb-1 mt-1 ml-5 font-weight-semibold font-size-20px">Today</p>
            </div>
            <div v-for="notification of getTodaysNotifications" :class="{'header-bottom-line-shadow': !notification.readed}" :key="notification.id" class="col-12">
              <div class="row border-bottom">
                  <div class="w-60px"></div>
                  <div class="col-1 my-2">
                        <span v-if="notification.status === this.$entityStatus.FAILED" class="font-size-14px material-icons red-text">cancel</span>
                        <span v-else-if="notification.status === this.$entityStatus.SUCCESS" class="font-size-14px blue-text material-icons">check_circle</span>
                        <span v-else class="material-icons font-size-14px green-text">play_circle</span>
                  </div>
                  <div class="col-4 my-2 font-size-14px" :class="{'font-weight-medium': !notification.readed}">
                    {{notification.description}}
                  </div>
                  <div class="col-2 my-2 font-size-14px agent-mini-color-gray font-weight-light">
                    {{this.$getFormatedTime(notification.created)}}
                  </div>
              </div>
            </div>
            <div v-if="!isYesterdayNotificationsEmpty" class="col-12 border-bottom header-bottom-line-shadow">
              <p class="ml-5 mt-1 mb-1 font-weight-semibold font-size-20px">Yesterday</p>
            </div>
            <div :class="{'header-bottom-line-shadow': !notification.readed}" v-for="notification of getYesterdayNotifications" :key="notification.id" class="col-12">
              <div class="row">
                  <div class="w-60px"></div>
                  <div class="col-1 my-2">
                        <span v-if="notification.status === this.$entityStatus.FAILED" class="font-size-14px material-icons red-text">cancel</span>
                        <span v-else-if="notification.status === this.$entityStatus.SUCCESS" class="font-size-14px blue-text material-icons">check_circle</span>
                        <span v-else class="material-icons font-size-14px green-text">play_circle</span>
                  </div>
                  <div class="col-4 my-2 font-size-14px" :class="{'font-weight-medium': !notification.readed}">
                    {{notification.description}}
                  </div>
                  <div class="col-2 my-2 font-size-14px agent-mini-color-gray font-weight-light">
                    {{this.$getFormatedTime(notification.created)}}
                  </div>
              </div>
            </div>
            <div class="col-12 border-bottom header-bottom-line-shadow">
              <p class="ml-5 mt-1 mb-1 font-weight-semibold font-size-20px">Older</p>
            </div>
            <div v-for="notification of getOlderNotifications" :class="{'header-bottom-line-shadow': !notification.readed}" :key="notification.id" class="col-12">
              <div class="row border-bottom">
                  <div class="w-60px"></div>
                  <div class="col-1 my-2">
                        <span v-if="notification.status === this.$entityStatus.FAILED" class="font-size-14px material-icons red-text">cancel</span>
                        <span v-else-if="notification.status === this.$entityStatus.SUCCESS" class="font-size-14px blue-text material-icons">check_circle</span>
                        <span v-else class="material-icons font-size-14px green-text">play_circle</span>
                  </div>
                  <div class="col-4 my-2 font-size-14px" :class="{'font-weight-medium': !notification.readed}">
                    {{notification.description}}
                  </div>
                  <div class="col-2 my-2 font-size-14px agent-mini-color-gray font-weight-light">
                    {{ notification.created.toISOString().slice(0, 10) + ' ' + this.$getFormatedTime(notification.created) }}
                  </div>
              </div>
            </div>
          </div>
      </div>
</div>
<div class="w-100 pt-2 h-8vh left-aside pb-2 mt-3 pr-3 d-flex position-sticky bottom-0">
  <div class="d-flex justify-content-center align-items-center w-100">
    <span class="font-size-14px">{{getTotalNotifications}} notifications</span>
  </div>
</div>
</div>
</template>
<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
export default {
  name: 'NotificationsCenter',
  computed: {
    ...mapState('notification', ['notifications']),
    ...mapGetters('notification', ['getTodaysNotifications', 'getYesterdayNotifications', 'getOlderNotifications']),
    isTodaysNotificationsEmpty () {
      return this.getTodaysNotifications.length === 0
    },
    isYesterdayNotificationsEmpty () {
      return this.getYesterdayNotifications.length === 0
    },
    getTotalNotifications () {
      return this.notifications.length
    }
  },
  mounted () {
    this.$store.commit('agent/updateLocView', 'NotificationsCenter', true)
    this.updateNotificationsStatus()
  },
  methods: {
    ...mapMutations('notification', ['removeUnreadStatusToAll']),
    setSelectedReference (e) {
      const selectedId = e.currentTarget.getAttribute('data-id')
      this.$store.commit('referent/setSelectedResource', selectedId)
    },
    updateNotificationsStatus () {
      const self = this
      setTimeout(
        function () {
          self.removeUnreadStatusToAll()
        },
        3000
      )
    }
  }
}
</script>
<style scoped>
.header-bottom-line-shadow {
    background: #fbfbfb 0% 0% no-repeat padding-box;
    opacity: 1;
    box-shadow: 0px 6px 10px #0000000F
}
</style>
