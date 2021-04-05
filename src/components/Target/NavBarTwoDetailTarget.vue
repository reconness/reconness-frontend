<template>
  <!-- Contains navs-bar -->
  <div class="content">
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav d-none d-sm-block">
        <li class="nav-item d-flex float-left">
            <router-link to="/targets/list" class="color-blue">
            <span class="material-icons" @mouseover="toggle" aria:haspopup="true" aria-controls="overlay_panel">arrow_back</span>
            </router-link>
            <router-link :to="{ name: 'TargetDetail', params: {id: $route.params.idTarget} }" v-if = showRootDomains>
            <p class="float-right ml-2 font-weight-bold color-black">{{TargetName}}</p>
            </router-link>
            <p class="float-right ml-2 font-weight-bold" v-else>{{TargetName}}</p>
        </li>
        <li class="nav-item d-flex float-left" v-if = "showRootDomains && !$route.params.idsubdomain">
          <span v-bind:style ="{background:gradient}"  class="material-icons ml-2 icon-color-style gradient-style" style="line-height: 1.6"> chevron_right </span>
          <span v-bind:style ="{background:gradient}" class="ml-2 gradient-style">{{rootName}}</span>
        </li>
        <li class="nav-item d-flex float-left" v-if = "showRootDomains && $route.params.idsubdomain">
          <router-link :to="{ name: 'RootDomainDetails', params: {idTarget: $route.params.idTarget , id: $route.params.id} }">
          <span class="material-icons ml-2 icon-color-style font-weight-bold" style="line-height: 1.6"> chevron_right </span>
        </router-link></li>
        <li class="nav-item d-flex float-left" v-if = "showRootDomains && $route.params.idsubdomain">
          <router-link :to="{ name: 'RootDomainDetails', params: {idTarget: $route.params.idTarget , id: $route.params.id} }">
          <span class="ml-2 font-weight-bold">{{rootName}}</span>
          </router-link>
        </li>
        <li class="nav-item d-flex" v-if = "$route.params.idsubdomain">
          <span v-bind:style ="{background:gradient}"  class="material-icons ml-2 icon-color-style gradient-style font-weight-bold" style="line-height: 1.6"> chevron_right </span>
          <span v-bind:style ="{background:gradient}" class="ml-2 gradient-style font-weight-bold">{{subDomainName}}</span>
        </li>
      </ul>
      <!-- Right navbar links -->
      <ul class="navbar-nav ml-auto">
        <li class="nav-item nav-margin border-right d-none d-sm-block"  v-if= "!showRootDomains">
          <a class="nav-link pos" href="#" data-toggle="modal" data-target="#confirmation-modal" v-on:click="updateConfirm()" >Delete Target</a>
        </li>
        <li class="nav-item nav-margin border-right d-none d-sm-block" v-if= "showRootDomains && !$route.params.idsubdomain">
          <a class="nav-link pos" href="#" data-toggle="modal" data-target="#confirmation-modal" v-on:click="updateConfirm()" >Delete Root Domain</a>
        </li>
        <li class="nav-item nav-margin border-right d-none d-sm-block"  v-if= "!this.showRootDomains">
          <label for="export-target" class="nav-link pos mb-0"> Export Target </label>
          <input type="file" id="export-target" accept=".json"/>
        </li>
        <li class="nav-item nav-margin border-right d-none d-sm-block" v-if= "showRootDomains && !$route.params.idsubdomain">
          <label for="export-target" class="nav-link pos mb-0"> Export Root Domain </label>
          <input type="file" id="export-target" accept=".json"/>
        </li>
        <li class="nav-item nav-margin border-right border-left d-none d-sm-block" v-if= "showRootDomains && $route.params.idsubdomain">
          <label for="export-target" class="nav-link pos mb-0"> Export SubDomain </label>
          <input type="file" id="export-target" accept=".json"/>
        </li>
        <li class="nav-item dropdown border-right d-none d-sm-block"  v-if= "!this.showRootDomains">
          <a class="nav-link" data-toggle="dropdown" href="#" role="button"
            aria-haspopup="true"  aria-expanded="false" >
            <p class="float-left">Sort by</p>
            <button type="button" class="btn btn-light">
              <i class="material-icons">sort</i>
            </button>
          </a>
          <div class="dropdown-menu dropdown-menu-right"  v-if= "!showRootDomains">
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
          <MessagesBtn/>
        </li>
      </ul>
    </nav>

    <nav class="main-header navbar d-sm-none navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav d-sm-none">
        <li class="nav-item d-none d-sm-inline-block d-flex">
            <router-link to="/targets/list" class="color-blue">
            <span class="material-icons" @mouseover="toggle" aria:haspopup="true" aria-controls="overlay_panel">arrow_back</span>
            </router-link>
            <router-link :to="{ name: 'TargetDetail', params: {id: $route.params.idTarget} }" v-if = showRootDomains>
            <p class="float-right ml-2 font-weight-bold color-black">{{TargetName}}</p>
            </router-link>
            <p class="float-right ml-2 font-weight-bold" v-else>{{TargetName}}</p>
        </li>
        <li class="nav-item d-flex" v-if = showRootDomains>
          <span v-bind:style ="{background:gradient }"  class="material-icons mt-1 ml-2 icon-color-style gradient-style"> chevron_right </span>
          <span v-bind:style ="{background:gradient}" class="ml-2 gradient-style">{{rootName}}</span>
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
            <a class="dropdown-item" v-if= "!this.showRootDomains">Delete Target</a>
            <a class="dropdown-item" v-if="!$route.params.idsubdomain">Delete Root Domain</a>
            <div class="dropdown-divider" v-if="!$route.params.idsubdomain"></div>
            <label for="export-target" class="nav-link pos mb-0 comments-page" v-if= "!this.showRootDomains"> Export Target </label>
            <label for="export-target" v-if="!$route.params.idsubdomain" class="nav-link pos mb-0 comments-page"> Export Root Domain </label>
            <input v-if="!$route.params.idsubdomain" type="file" id="export-target" accept=".json"/>
           <div class="dropdown-divider" v-if="!$route.params.idsubdomain"></div>
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
    <MessagesSection :opened="this.isMessageSectionOpened" :key="messages_component"/>
  <OverlayPanel :baseZIndex=100 ref="op" appendTo="body" id="overlay_panel"  >
    <small class="font-weight-bold">Back to main</small>
  </OverlayPanel>
  <Confirmation ></Confirmation>
  <MessageConfirmation></MessageConfirmation>
     </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import OverlayPanel from 'primevue/overlaypanel'
import MessagesBtn from '@/components/MessagesBtn.vue'
import MessagesSection from '@/components/MessagesSection.vue'
import Confirmation from '@/components/Target/Confirmation.vue'
import MessageConfirmation from '@/components/Target/MessageConfirmation.vue'
export default {
  name: 'NavBarTwoTarget',
  props: {
    TargetName: String,
    gradient: String,
    rootName: String,
    showRootDomains: Boolean,
    subDomainName: String
  },
  data: function () {
    return {
      active_arrow_down: true,
      active_arrow_up: false,
      messages_component: 0
    }
  },
  computed: {
    ...mapState('target', ['targetListStore']),
    ...mapState(['isMessageSectionOpened'])
  },
  components: {
    OverlayPanel,
    Confirmation,
    MessagesBtn,
    MessagesSection,
    MessageConfirmation
  },
  methods: {
    ...mapMutations('target', ['orderDomainsByCalendar', 'orderDomainByNameDesc', 'orderDomainsByNameAsc']),
    orderByCalendar: function () {
      this.targetListStore.find(item => item.id === parseInt(this.$route.params.id)).rootDomains.sort(this.$orderByCalendarSplitting)
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
    toggle (event) {
      this.$refs.op.toggle(event)
    },
    setTargetId (e) {
      this.$store.commit('target/setIdTarget', parseInt(this.$route.params.id))
    },
    updateConfirm () {
      if (this.showRootDomains) {
        return this.$store.commit('confirm', { name: this.rootName, route: 'rootdomains' })
      } else {
        return this.$store.commit('confirm', { name: this.TargetName, route: 'target' })
      }
    }

  }
}
</script>
<style scoped>
.dropdown-menu {
    min-width: 10rem;
}

.arrow-right{
  margin-left: 3%;
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

#export-target {
  opacity: 0;
  position: absolute;
  z-index: -1;
  display: none;
}
label {
  cursor: pointer;
}

.dropdown-menu label.comments-page {
  padding: .25rem 1rem;
}
.color-black {
  color: #000000 !important;
}
.font-weight-bold {
    font-weight: 600 !important;
}
</style>
