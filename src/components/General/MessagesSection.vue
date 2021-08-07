<template>
    <transition name="slide-fade">
      <aside v-if="this.isMessageSectionOpened" class="control-sidebar-dark main-messages-container overflow-auto" v-click-outside="closeComments">
        <div class="p-3 control-sidebar-content-target-details overflow-auto message-container">
            <input class="form-control target-input-borders" placeholder="Write your comments here..." v-model="message">
            <CommentIco/>
            <button :disabled="message === ''" style="height: 1.7rem;" class="custom-comments btn float-right btn-sm mt-2 px-3 border-right rounded-0" @click="sendMessage">Send</button>
            <button style="height: 1.7rem;" class="custom-comments btn float-right btn-sm mt-2 px-3 border-left border-right rounded-0" @click="message = ''">Cancel</button>
        </div>

        <div class="sidebar-list comments-list">
          <dl class="row">
            <div class="col-7">
              <h5>Comments List</h5>
            </div>
            <div v-if="getMessages.length !== 0" class="col-5">
              <a class="float-right sortby-lnk" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"  aria-expanded="false" >
                <p class="float-left">Sort by</p>
                <button type="button" class="btn btn-light sortby-comments">
                  <i class="material-icons">sort</i>
                </button>
              </a>
              <div class="dropdown-menu dropdown-menu-right">
              <a class="dropdown-item float-left" href="#" v-on:click="orderByUserName()">
                  <i class="material-icons float-left">title</i>
                  <p class="float-left">User Name</p>
                  <i class="material-icons arrow-right" v-if="!order_by_date && active_arrow_down_message">keyboard_arrow_down</i>
                  <i class="material-icons arrow-right" v-if="!order_by_date && active_arrow_up_message">keyboard_arrow_up</i>
                </a>
                <a class="dropdown-item float-left" href="#" v-on:click="orderByMessageDate()">
                  <i class="material-icons float-left">event</i>
                  <p class="float-left">Created</p>
                  <i class="material-icons arrow-right" v-if="order_by_date && active_arrow_down_message">keyboard_arrow_down</i>
                  <i class="material-icons arrow-right" v-if="order_by_date && active_arrow_up_message">keyboard_arrow_up</i>
                </a>
              </div>
            </div>
            <div v-for="message of this.getMessages" :key="message.id" class="col-12">
              <div class="row">
                <div class="col-12">
                  <p>
                    {{message.message}}
                  </p>
                </div>
                <div class="col-9">
                  <i style="color: #c2c7d0;">{{message.sender}} / {{new Date(message.sendDate).toISOString().substring(0, 10)}}</i>
                </div>
                <div class="col-3">
                  <a class="float-right" @click="setSelectedMessage" href="#" data-target="#message-confirmation-modal" :data-id="message.id" data-toggle="modal" data-backdrop="static" data-keyboard="false">Delete</a>
                </div>
                <div class="col-12">
                  <hr style="width: 84%;">
                </div>
              </div>
            </div>
            <div v-if="getMessages.length === 0" class="col-12">
              <span class="comment-font-style">There are no comments. Please, add a comment</span>
            </div>
          </dl>
        </div>
      </aside>
    </transition>
</template>
<script>
import CommentIco from '@/components/Icons/CommentIco.vue'
import { mapMutations, mapGetters, mapState } from 'vuex'
export default {
  name: 'MessagesSection',
  components: {
    CommentIco
  },
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      message: '',
      active_arrow_down_message: true,
      active_arrow_up_message: false,
      order_by_date: true,
      order_by_user: false
    }
  },
  computed: {
    ...mapGetters('target', ['getTargetMessages', 'getRootDomainMessages', 'getSubDomainMessages']),
    ...mapState('target', ['idMessage', 'currentView']),
    ...mapState('agent', ['isMessageSectionOpened']),
    getMessages: function () {
      if (this.order_by_date) {
        if (this.active_arrow_down_message) {
          if (this.currentView === 'TargetDetail') {
            return this.getTargetMessages(parseInt(this.$route.params.id)).sort(
              this.sortDescendingOrderByDateFn
            )
          } else if (this.currentView === 'RootDomainDetails') {
            return this.getRootDomainMessages({
              idTarget: parseInt(this.$route.params.idTarget),
              idRootDomain: parseInt(this.$route.params.id)
            }).sort(
              this.sortDescendingOrderByDateFn
            )
          } else {
            return this.getSubDomainMessages({
              idTarget: parseInt(this.$route.params.idTarget),
              idRootDomain: parseInt(this.$route.params.id),
              idSubDomain: parseInt(this.$route.params.idsubdomain)
            }).sort(
              this.sortDescendingOrderByDateFn
            )
          }
        } else {
          if (this.currentView === 'TargetDetail') {
            return this.getTargetMessages(parseInt(this.$route.params.id)).sort(
              this.sortAscendingOrderByDateFn
            )
          } else if (this.currentView === 'RootDomainDetails') {
            return this.getRootDomainMessages({
              idTarget: parseInt(this.$route.params.idTarget),
              idRootDomain: parseInt(this.$route.params.id)
            }).sort(
              this.sortAscendingOrderByDateFn
            )
          } else {
            return this.getSubDomainMessages({
              idTarget: parseInt(this.$route.params.idTarget),
              idRootDomain: parseInt(this.$route.params.id),
              idSubDomain: parseInt(this.$route.params.idsubdomain)
            }).sort(
              this.sortAscendingOrderByDateFn
            )
          }
        }
      } else { // order by user
        if (this.active_arrow_down_message) {
          if (this.currentView === 'TargetDetail') {
            return this.getTargetMessages(parseInt(this.$route.params.id)).sort(
              this.sortDescendingOrderByUserNameFn
            )
          } else if (this.currentView === 'RootDomainDetails') {
            return this.getRootDomainMessages({
              idTarget: parseInt(this.$route.params.idTarget),
              idRootDomain: parseInt(this.$route.params.id)
            }).sort(
              this.sortDescendingOrderByUserNameFn
            )
          } else {
            return this.getSubDomainMessages({
              idTarget: parseInt(this.$route.params.idTarget),
              idRootDomain: parseInt(this.$route.params.id),
              idSubDomain: parseInt(this.$route.params.idsubdomain)
            }).sort(
              this.sortDescendingOrderByUserNameFn
            )
          }
        } else {
          if (this.currentView === 'TargetDetail') {
            return this.getTargetMessages(parseInt(this.$route.params.id)).sort(
              this.sortAscendingOrderByUserNameFn
            )
          } else if (this.currentView === 'RootDomainDetails') {
            return this.getRootDomainMessages({
              idTarget: parseInt(this.$route.params.idTarget),
              idRootDomain: parseInt(this.$route.params.id)
            }).sort(
              this.sortAscendingOrderByUserNameFn
            )
          } else {
            return this.getSubDomainMessages({
              idTarget: parseInt(this.$route.params.idTarget),
              idRootDomain: parseInt(this.$route.params.id),
              idSubDomain: parseInt(this.$route.params.idsubdomain)
            }).sort(
              this.sortAscendingOrderByUserNameFn
            )
          }
        }
      }
    }
  },
  methods: {
    ...mapMutations('agent', ['setIsMessageSectionOpened']),
    sendMessage: function () {
      if (this.$route.name === 'TargetDetail') {
        this.sendTargetMessage({
          idTarget: parseInt(this.$route.params.id),
          message: this.message
        })
      } else if (this.$route.name === 'RootDomainDetails') {
        this.sendRootDomainMessage({
          idTarget: parseInt(this.$route.params.idTarget),
          idRootDomain: parseInt(this.$route.params.id),
          message: this.message
        })
      } else if (this.$route.name === 'SubDomainDetails') {
        this.sendSubDomainMessage({
          idTarget: parseInt(this.$route.params.idTarget),
          idRootDomain: parseInt(this.$route.params.id),
          idSubDomain: parseInt(this.$route.params.idsubdomain),
          message: this.message
        })
      }
      this.message = ''
    },
    setSelectedMessage: function (e) {
      const selectedId = e.currentTarget.getAttribute('data-id')
      this.setIdMessage(selectedId)
    },
    closeComments: function () {
      const isDeleteWindowsOpened = document.getElementById('message-confirmation-modal').getAttribute('aria-modal')
      if (this.isMessageSectionOpened && isDeleteWindowsOpened) {
        this.setIsMessageSectionOpened(true)
      } else {
        this.setIsMessageSectionOpened(false)
      }
    },
    ...mapMutations('target', ['sendTargetMessage', 'setIdMessage', 'sendRootDomainMessage', 'sendSubDomainMessage']),
    orderByUserName: function () {
      this.order_by_date = false
      this.changeArrowDirection()
    },
    orderByMessageDate: function () {
      this.order_by_date = true
      this.changeArrowDirection()
    },
    changeArrowDirection: function () {
      if (this.active_arrow_down_message === true) {
        this.active_arrow_down_message = false
        this.active_arrow_up_message = true
      } else if (this.active_arrow_up_message === true) {
        this.active_arrow_down_message = true
        this.active_arrow_up_message = false
      }
    },
    sortDescendingOrderByDateFn: function (a, b) {
      return new Date(b.sendDate) - new Date(a.sendDate)
    },
    sortAscendingOrderByDateFn: function (a, b) {
      return new Date(a.sendDate) - new Date(b.sendDate)
    },
    sortDescendingOrderByUserNameFn: function (a, b) {
      if (b.sender < a.sender) {
        return -1
      }
      if (b.sender > a.sender) {
        return 1
      }
      return 0
    },
    sortAscendingOrderByUserNameFn: function (a, b) {
      if (a.sender < b.sender) {
        return -1
      }
      if (a.sender > b.sender) {
        return 1
      }
      return 0
    }
  },
  directives: {
    clickOutside: {
      beforeMount (el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event, el)
          }
        }
        document.body.addEventListener('click', el.clickOutsideEvent)
      },
      unmounted (el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
      }
    }
  }
}
</script>
<style>
/* .p-overlaypanel .p-overlaypanel-content {
    padding: 0rem!important;
} */
.icon-right{
  padding-left: 24% !important;
  margin-bottom: auto;
}
.dropdown-item {
    font-weight: 600;
}
.control-sidebar-content-target-details {
  background-color: #ffffff;
  border-radius: 5px;
}

div.message-container input {
  border-radius: 10px;
}

div.message-container button {
  color: #949191;
}

div.sidebar-list.comments-list {
  background-color: #ffffff;
  border-radius: 0.5rem;
  margin: auto;
  margin-top: 10px;
  overflow: visible;
}
div.control-sidebar-dark.main-messages-container{
 border-radius: 12px;
}

div.comments-list h5 {
  color: #000000;
  padding: 8px;
  font-weight: 600;;
}

div.comments-list p {
  font-weight: normal;
}

button.sortby-comments {
  background-color: rgba(230, 233, 237, 0.4);
    border-color: rgba(221, 221, 221, 0.03);
    color: #000000;
    padding: 0.1rem;
    border-radius: 0.4rem;
    /* width: 26px; */
    height: 30px;
}
div.sidebar-list.comments-list p{
  color: #000000;
  font-size: 14px;
  font-weight: normal ;
  padding: 5px;
}

div.sidebar-list.comments-list a.sortby-lnk{
  position: relative;
  margin-top: 5px;
  color: #000000;
}

div.sidebar-list.comments-list a{
  color: #000000;
  font-weight: normal;
  color: #ff4545
}

div.sidebar-list.comments-list i{
  color: #000000;
  font-weight: normal;
}
aside.control-sidebar-dark.main-messages-container {
  /* width: 48%; */
  /*width: 23%;usar media queries*/
  width: 350px;
  height: 100%
}
.control-sidebar-content-target-details svg {
  position: absolute;
  z-index: 2;
  display: block;
  line-height: 2.375rem;
  text-align: center;
  pointer-events: none;
  top: 24px;
  right: 9%;
}
.control-sidebar-content-target-details input.target-input-borders {
  padding-right: 13%;
}
.comment-font-style {
  font-size: 14px;
  font-weight: normal ;
}
</style>
