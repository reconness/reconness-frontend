<template>
  <!-- Contains navs-bar -->
  <div class="content">
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav d-none d-sm-block">
        <li class="nav-item d-flex">
            <router-link to="/targets/list" class="color-blue">
            <span class="material-icons" @mouseover="toggle" aria:haspopup="true" aria-controls="overlay_panel">arrow_back</span>
            </router-link>
            <p class="float-right ml-2 font-weight-bold">{{TargetName}}</p>
        </li>
      </ul>
      <!-- Right navbar links -->
      <ul class="navbar-nav ml-auto">
        <li class="nav-item nav-margin border-right d-none d-sm-block">
          <a class="nav-link pos" href="#" data-toggle="modal" data-target="#confirmation-modal" @click="setTargetId">Delete Target</a>
        </li>
        <li class="nav-item nav-margin border-right d-none d-sm-block">
          <label for="export-target" class="nav-link pos mb-0"> Export Target </label>
          <input type="file" id="export-target" accept=".json"/>
        </li>
        <li class="nav-item dropdown border-right d-none d-sm-block">
          <a class="nav-link" data-toggle="dropdown" href="#" role="button"
            aria-haspopup="true"  aria-expanded="false" >
            <p class="float-left">Sort by</p>
            <button type="button" class="btn btn-light">
              <i class="material-icons">sort</i>
            </button>
          </a>
          <div class="dropdown-menu dropdown-menu-right">
           <a class="dropdown-item" href="#" v-on:click="orderByName()">
              <i class="material-icons float-left">title</i>
              <p class="float-left">Name</p>
              <i class="material-icons right" v-show="active_arrow_down">keyboard_arrow_down</i>
              <i class="material-icons right" v-show="active_arrow_up">keyboard_arrow_up</i>
            </a>
            <a class="dropdown-item" href="#" v-on:click="orderByCalendar()">
              <i class="material-icons float-left">event</i>
              <p class="right">Created</p>
            </a>
          </div>
        </li>
        <li class="nav-item border-right d-none d-sm-block">
          <a
            class="nav-link float-left control-sidebar-right"
            href="#"
            data-slide="true"
            @mouseenter="mouseEnter">
            <button type="button message-icon" class="btn btn-sm control-sidebar-right" id="dropdownMenuButton">
              <CommentIco/>
            </button>
          </a>
        </li>
      </ul>
    </nav>

    <nav class="main-header navbar d-sm-none navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav d-sm-none">
        <li class="nav-item d-none d-sm-inline-block d-flex">
            <span class="material-icons">arrow_back</span>
            <router-link to="/targets/list" class="color-blue">
            <p class="float-right ml-2">{{TargetName}}</p>
            </router-link>
        </li>
      </ul>
      <!-- Right navbar links -->
      <ul class="navbar-nav d-sm-none ml-auto">
        <li class="nav-item dropdown border-right">
          <a
            class="nav-link"
            data-toggle="dropdown"
            href="#"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="material-icons">more_vert</i>
          </a>
          <div class="dropdown-menu dropdown-menu-right scroll">
            <a class="dropdown-item">Delete Target</a>
            <div class="dropdown-divider"  ></div>
            <label for="export-target" class="nav-link pos mb-0 comments-page"> Export Target </label>
            <input type="file" id="export-target" accept=".json"/>
           <div class="dropdown-divider"></div>
            <h6 class="dropdown-header header-style">Sort by</h6>
             <div class="dropdown-item">
               <a class="dropdown-item item-sort" href="#" v-on:click="orderByName()">
              <i class="material-icons float-left">title</i>
              <p class="float-left">Name</p>
              <i class="material-icons right" v-show="active_arrow_down">keyboard_arrow_down</i>
              <i class="material-icons right" v-show="active_arrow_up">keyboard_arrow_up</i>
            </a></div>
            <div class="dropdown-item">
            <a class="dropdown-item item-sort" href="#" v-on:click="orderByCalendar()">
              <i class="material-icons float-left">event</i>
              <p class="right">Calendar</p>
            </a>
          </div>
          </div>
        </li>
      </ul>
    </nav>
    <transition name="slide-fade">
      <aside v-if="isCommentsSectionOpen" class="control-sidebar-dark main-messages-container overflow-auto" v-click-outside="closeComments">
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
            <div class="col-5">
              <a class="float-right sortby-lnk" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"  aria-expanded="false" >
                <p class="float-left">Sort by</p>
                <button type="button" class="btn btn-light sortby-comments">
                  <i class="material-icons">sort</i>
                </button>
              </a>
              <div class="dropdown-menu dropdown-menu-right">
              <a class="dropdown-item" href="#" v-on:click="orderByUserName()">
                  <i class="material-icons float-left">title</i>
                  <p class="float-left">User Name</p>
                  <i class="material-icons arrow-right" v-show="active_arrow_down_message">keyboard_arrow_down</i>
                  <i class="material-icons arrow-right" v-show="active_arrow_up_message">keyboard_arrow_up</i>
                </a>
                <a class="dropdown-item" href="#" v-on:click="orderByMessageDate()">
                  <i class="material-icons float-left">event</i>
                  <p class="icon-right">Created</p>
                </a>
              </div>
            </div>
            <div v-for="message of this.getTargetMessages(parseInt(this.$route.params.id))" :key="message.id" class="col-12">
              <div class="row">
                <div class="col-12">
                  <p>
                    {{message.message}}
                  </p>
                </div>
                <div class="col-9">
                  <i style="color: #c2c7d0;">{{message.sender}} / {{message.sendDate}}</i>
                </div>
                <div class="col-3">
                  <a class="float-right" @click="setSelectedMessage" href="#" data-target="#message-confirmation-modal" :data-id="message.id" data-toggle="modal" data-backdrop="static" data-keyboard="false">Delete</a>
                </div>
                <div class="col-12">
                  <hr style="width: 84%;">
                </div>
              </div>
            </div>
          </dl>
        </div>
      </aside>
    </transition>

  <OverlayPanel :baseZIndex=100 ref="op" appendTo="body" id="overlay_panel"  >
    <small class="font-weight-bold">Back to main</small>
  </OverlayPanel>
  <TargetConfirmation></TargetConfirmation>
     </div>
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex'
import TargetConfirmation from '@/components/Target/TargetConfirmation.vue'
import OverlayPanel from 'primevue/overlaypanel'
import CommentIco from '@/components/CommentIco.vue'
export default {
  name: 'NavBarTwoTarget',
  props: {
    TargetName: String
  },
  data: function () {
    return {
      active_arrow_down: true,
      active_arrow_up: false,
      active_arrow_down_message: true,
      active_arrow_up_message: false,
      isCommentsSectionOpen: false,
      message: ''
    }
  },
  computed: {
    ...mapGetters('target', ['getTargetMessages']),
    ...mapState('target', ['idMessage'])
  },
  components: {
    OverlayPanel,
    TargetConfirmation,
    CommentIco
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
  },
  methods: {
    ...mapMutations('target', ['orderDomainsByCalendar', 'orderMessagesByCalendar', 'orderMessagesByUserNameAsc', 'orderMessagesByUserNameDesc', 'orderDomainByNameDesc', 'orderDomainsByNameAsc', 'sendTargetMessage', 'setIdMessage']),
    orderByMessageDate: function () {
      this.orderMessagesByCalendar(parseInt(this.$route.params.id))
    },
    orderByCalendar: function () {
      this.orderDomainsByCalendar(parseInt(this.$route.params.id))
    },
    orderByName: function () {
      if (this.active_arrow_down === true) {
        this.active_arrow_down = false
        this.active_arrow_up = true
        return this.orderDomainByNameDesc(parseInt(this.$route.params.id))
      } else if (this.active_arrow_up === true) {
        this.active_arrow_down = true
        this.active_arrow_up = false
        return this.orderDomainsByNameAsc(parseInt(this.$route.params.id))
      }
    },
    orderByUserName: function () {
      if (this.active_arrow_down_message === true) {
        this.active_arrow_down_message = false
        this.active_arrow_up_message = true
        return this.orderMessagesByUserNameDesc(parseInt(this.$route.params.id))
      } else if (this.active_arrow_up_message === true) {
        this.active_arrow_down_message = true
        this.active_arrow_up_message = false
        return this.orderMessagesByUserNameAsc(parseInt(this.$route.params.id))
      }
    },
    toggle (event) {
      this.$refs.op.toggle(event)
    },
    setTargetId (e) {
      this.$store.commit('target/setIdTarget', parseInt(this.$route.params.id))
    },
    mouseEnter: function () {
      this.isCommentsSectionOpen = true
    },
    mouseleave: function () {
      this.isCommentsSectionOpen = !this.isCommentsSectionOpen
    },
    sendMessage: function () {
      this.sendTargetMessage({
        idTarget: parseInt(this.$route.params.id),
        message: this.message
      })
      this.message = ''
    },
    setSelectedMessage: function (e) {
      const selectedId = e.currentTarget.getAttribute('data-id')
      this.setIdMessage(selectedId)
    },
    closeComments: function () {
      const isDeleteWindowsOpened = document.getElementById('message-confirmation-modal').getAttribute('aria-modal')
      if (this.isCommentsSectionOpen && isDeleteWindowsOpened) {
        this.isCommentsSectionOpen = true
      } else {
        this.isCommentsSectionOpen = false
      }
    }
  }
}
</script>
<style scoped>
.p-overlaypanel .p-overlaypanel-content {
    padding: 0rem!important;
}
.dropdown-menu {
    min-width: 10rem;
}

.arrow-right{
  margin-left: 3%;
  margin-bottom: auto;
}

.icon-right{
  padding-left: 24% !important;
  margin-bottom: auto;
}

.right{
  margin-left: 30px;
  margin-bottom: auto;
}
.pos{
  margin-top: 2.5px;
}
.item-sort{
  padding: .15rem .1rem;
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
}
#export-target {
  opacity: 0;
  position: absolute;
  z-index: -1;
  display: none;
}
label {
  cursor: pointer;
}
#dropdownMenuButton {
  fill: #B3B3B3
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

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from, .slide-fade-leave-to {
  transform: translateX(100px);
  opacity: 0;
}

.dropdown-menu label.comments-page {
  padding: .25rem 1rem;
}

</style>
