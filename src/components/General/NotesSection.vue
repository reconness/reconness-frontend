<template>
    <transition name="slide-fade">
      <aside v-if="this.isNotesSectionOpened" class="control-sidebar-dark main-notes-container overflow-auto" v-click-outside="closeComments">
        <div class="p-3 control-sidebar-content-target-details overflow-auto note-container">
            <input class="form-control target-input-borders" placeholder="Write your comments here..." v-model="note">
            <CommentIco/>
            <button :disabled="note === ''" class="msg-actions-btn custom-comments btn float-right btn-sm mt-2 px-3 border-right rounded-0" @click="sendNotes">Send</button>
            <button class="msg-actions-btn custom-comments btn float-right btn-sm mt-2 px-3 border-left border-right rounded-0" @click="note = ''">Cancel</button>
        </div>

        <div class="sidebar-list comments-list">
          <dl class="row">
            <div class="col-7">
              <h5>Comments List</h5>
            </div>
            <div v-if="getNotes.length !== 0" class="col-5">
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
                  <i class="material-icons arrow-right" v-if="!order_by_date && active_arrow_down_note">keyboard_arrow_down</i>
                  <i class="material-icons arrow-right" v-if="!order_by_date && active_arrow_up_note">keyboard_arrow_up</i>
                </a>
                <a class="dropdown-item float-left" href="#" v-on:click="orderByNoteDate()">
                  <i class="material-icons float-left">event</i>
                  <p class="float-left">Created</p>
                  <i class="material-icons arrow-right" v-if="order_by_date && active_arrow_down_note">keyboard_arrow_down</i>
                  <i class="material-icons arrow-right" v-if="order_by_date && active_arrow_up_note">keyboard_arrow_up</i>
                </a>
              </div>
            </div>
            <div v-for="note of this.getNotes" :key="note.id" class="col-12">
              <div class="row">
                <div class="col-12">
                  <p>
                    {{note.message}}
                  </p>
                </div>
                <div class="col-9">
                  <i class="note-sender-color">{{note.sender}} / {{new Date(note.sendDate).toISOString().substring(0, 10)}}</i>
                </div>
                <div class="col-3">
                  <a class="float-right mr-2" @click="setSelectedNote" href="#" data-target="#message-box-notification-modal" :data-id="note.id" data-toggle="modal" data-backdrop="static" data-keyboard="false">Delete</a>
                </div>
                <div class="col-12">
                  <hr class="note-separator">
                </div>
              </div>
            </div>
            <div v-if="getNotes.length === 0" class="col-12">
              <span class="comment-font-style">There are no comments. Please, add a comment</span>
            </div>
          </dl>
        </div>
      </aside>
    </transition>
</template>
<script>
import CommentIco from '@/components/Icons/CommentIco.vue'
import { mapMutations, mapGetters, mapState, mapActions } from 'vuex'
import jQuery from 'jquery'
export default {
  name: 'NotesSection',
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
      note: '',
      active_arrow_down_note: true,
      active_arrow_up_note: false,
      order_by_date: true,
      order_by_user: false
    }
  },
  computed: {
    ...mapGetters('target', ['getTargetNotes', 'getRootDomainNotes', 'getSubDomainNotes']),
    ...mapState('target', ['idNote', 'currentView']),
    ...mapState('agent', ['isNotesSectionOpened']),
    ...mapState('user', ['loggedUsername']),
    ...mapState('general', ['notificationMessageActionSelected']),
    getNotes: function () {
      if (this.order_by_date) {
        return this.orderNotesByDate()
      } else {
        return this.orderNotesByUser()
      }
    }
  },
  watch: {
    notificationMessageActionSelected: function (value) {
      if (value) {
        this.removeNoteFn()
      }
    }
  },
  methods: {
    ...mapMutations('agent', ['setIsNotesSectionOpened']),
    ...mapActions('target', ['sendNoteToServer', 'removeTargetNoteFromServer', 'removeRootDomainNoteFromServer', 'sendRootDomainNoteToServer']),
    ...mapMutations('target', ['sendTargetNote', 'removeTargetNote', 'removeRootDomainNote', 'removeSubDomainNote', 'setIdNote', 'sendRootDomainNote', 'sendSubDomainNote']),
    ...mapMutations('general', ['updateNotificationMessageDescription', 'updateNotificationMessageActionSelected']),

    sendNotes: function () {
      if (this.$route.name === 'TargetDetail') {
        this.sendNoteToServer({
          targetName: this.$route.params.targetName,
          message: this.note,
          username: this.loggedUsername,
          id: ''
        })
      } else if (this.$route.name === 'RootDomainDetails') {
        this.sendRootDomainNoteToServer({
          targetName: this.$route.params.targetName,
          rootDomainName: this.$route.params.rootdomainName,
          message: this.note,
          username: this.loggedUsername,
          id: ''
        })
      } else if (this.$route.name === 'SubDomainDetails') {
        this.sendSubDomainNote({
          targetName: this.$route.params.targetName,
          rootdomainName: this.$route.params.rootdomainName,
          subdomainName: this.$route.params.subdomainName,
          message: this.note,
          username: this.loggedUsername
        })
      }
      this.note = ''
    },
    setSelectedNote: function (e) {
      const selectedId = e.currentTarget.getAttribute('data-id')
      this.setIdNote(selectedId)
      const notificationMessageDesc = 'Are you sure to remove the selected note?'
      this.updateNotificationMessageDescription(notificationMessageDesc)
      jQuery('#message-box-notification-modal').modal()
    },
    closeComments: function () {
      const isDeleteWindowsOpened = document.getElementById('note-confirmation-modal').getAttribute('aria-modal')
      if (this.isNotesSectionOpened && isDeleteWindowsOpened) {
        this.setIsNotesSectionOpened(true)
      } else {
        this.setIsNotesSectionOpened(false)
      }
    },
    orderByUserName: function () {
      this.order_by_date = false
      this.changeArrowDirection()
    },
    orderByNoteDate: function () {
      this.order_by_date = true
      this.changeArrowDirection()
    },
    changeArrowDirection: function () {
      if (this.active_arrow_down_note === true) {
        this.active_arrow_down_note = false
        this.active_arrow_up_note = true
      } else if (this.active_arrow_up_note === true) {
        this.active_arrow_down_note = true
        this.active_arrow_up_note = false
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
    },
    orderNotesByDate () {
      if (this.active_arrow_down_note) {
        return this.orderDescendingByDate()
      } else {
        return this.orderAscendingByDate()
      }
    },
    orderNotesByUser () {
      if (this.active_arrow_down_note) {
        return this.orderDescendingByUser()
      } else {
        return this.orderAscendingByUser()
      }
    },
    orderDescendingByDate () {
      if (this.$isOnTargetDetailView()) {
        return this.orderTargetsNotesDescendingByDate()
      }
      if (this.$isOnRootDetailsView()) {
        return this.orderRootDomainsNotesDescendingByDate()
      }
      if (this.$isOnSubDomainView()) {
        return this.orderSubDomainsNotesDescendingByDate()
      }
    },
    orderAscendingByDate () {
      if (this.$isOnTargetDetailView()) {
        return this.orderTargetsNotesAscendingByDate()
      }
      if (this.$isOnRootDetailsView()) {
        return this.orderRootDomainNotesAscendingByDate()
      }
      if (this.$isOnSubDomainView()) {
        return this.orderSubDomainNotesAscendingByDate()
      }
    },
    orderTargetsNotesAscendingByDate () {
      return this.getTargetNotes(this.$route.params.targetName).sort(
        this.sortAscendingOrderByDateFn
      )
    },
    orderRootDomainNotesAscendingByDate () {
      return this.getRootDomainNotes({
        targetName: this.$route.params.targetName,
        rootdomainName: this.$route.params.rootdomainName
      }).sort(
        this.sortAscendingOrderByDateFn
      )
    },
    orderSubDomainNotesAscendingByDate () {
      return this.getSubDomainNotes({
        targetName: this.$route.params.targetName,
        rootdomainName: this.$route.params.rootdomainName,
        subdomainName: this.$route.params.subdomainName
      }).sort(
        this.sortAscendingOrderByDateFn
      )
    },
    orderTargetsNotesDescendingByDate () {
      return this.getTargetNotes(this.$route.params.targetName).sort(
        this.sortDescendingOrderByDateFn
      )
    },
    orderRootDomainsNotesDescendingByDate () {
      return this.getRootDomainNotes({
        targetName: this.$route.params.targetName,
        rootdomainName: this.$route.params.rootdomainName
      }).sort(
        this.sortDescendingOrderByDateFn
      )
    },
    orderSubDomainsNotesDescendingByDate () {
      const subDomainNotes = this.getSubDomainNotes({
        targetName: this.$route.params.targetName,
        rootdomainName: this.$route.params.rootdomainName,
        subdomainName: this.$route.params.subdomainName
      })
      if (subDomainNotes) {
        return subDomainNotes.sort(this.sortDescendingOrderByDateFn)
      }
      return []
    },
    orderDescendingByUser () {
      if (this.$isOnTargetDetailView()) {
        return this.orderTargetsNotesDescendingByUser()
      }
      if (this.$isOnRootDetailsView()) {
        return this.orderRootDomainsNotesDescendingByUser()
      }
      if (this.$isOnSubDomainView()) {
        return this.orderSubDomainsNotesDescendingByUser()
      }
    },
    orderAscendingByUser () {
      if (this.$isOnTargetDetailView()) {
        return this.orderTargetsNotesAscendingByUser()
      }
      if (this.$isOnRootDetailsView()) {
        return this.orderRootDomainsNotesAscendingByUser()
      }
      if (this.$isOnSubDomainView()) {
        return this.orderSubDomainsNotesAscendingByUser()
      }
    },
    orderTargetsNotesAscendingByUser () {
      return this.getTargetNotes(this.$route.params.targetName).sort(
        this.sortAscendingOrderByUserNameFn
      )
    },
    orderRootDomainsNotesAscendingByUser () {
      return this.getRootDomainNotes({
        targetName: this.$route.params.targetName,
        rootdomainName: this.$route.params.rootdomainName
      }).sort(
        this.sortAscendingOrderByUserNameFn
      )
    },
    orderSubDomainsNotesAscendingByUser () {
      return this.getSubDomainNotes({
        targetName: this.$route.params.targetName,
        rootdomainName: this.$route.params.rootdomainName,
        subdomainName: this.$route.params.subdomainName
      }).sort(
        this.sortAscendingOrderByUserNameFn
      )
    },
    orderTargetsNotesDescendingByUser () {
      return this.getTargetNotes(this.$route.params.targetName).sort(
        this.sortDescendingOrderByUserNameFn
      )
    },
    orderRootDomainsNotesDescendingByUser () {
      return this.getRootDomainNotes({
        targetName: this.$route.params.targetName,
        rootdomainName: this.$route.params.rootdomainName
      }).sort(
        this.sortDescendingOrderByUserNameFn
      )
    },
    orderSubDomainsNotesDescendingByUser () {
      return this.getSubDomainNotes({
        targetName: this.$route.params.targetName,
        rootdomainName: this.$route.params.rootdomainName,
        subdomainName: this.$route.params.subdomainName
      }).sort(
        this.sortDescendingOrderByUserNameFn
      )
    },
    resetData: function () {
      this.updateNotificationMessageActionSelected(false)
    },
    removeNoteFn: function () {
      if (this.$route.name === 'TargetDetail') {
        this.removeTargetNoteFromServer(this.$route.params.targetName)
      } else if (this.$route.name === 'RootDomainDetails') {
        this.removeRootDomainNoteFromServer({
          targetName: this.$route.params.targetName,
          rootdomainName: this.$route.params.rootdomainName
        })
      } else if (this.$route.name === 'SubDomainDetails') {
        this.removeSubDomainNote({
          targetName: this.$route.params.targetName,
          rootdomainName: this.$route.params.rootdomainName,
          subdomainName: this.$route.params.subdomainName
        })
      }
      jQuery('#message-box-notification-modal').modal('hide')
      this.resetData()
    }
  }
}
</script>
<style>
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

div.note-container input {
  border-radius: 10px;
}

div.note-container button {
  color: #949191;
}

div.sidebar-list.comments-list {
  background-color: #ffffff;
  border-radius: 0.5rem;
  margin: auto;
  margin-top: 10px;
  overflow: visible;
}
div.control-sidebar-dark.main-notes-container{
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
aside.control-sidebar-dark.main-notes-container {
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
.msg-actions-btn{
  height: 1.7rem;
}
.note-sender-color{
  color: #c2c7d0 !important;
}
.note-separator{
  width: 84%;
}
</style>
