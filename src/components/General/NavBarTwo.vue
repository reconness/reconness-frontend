<template>
  <!-- Contains navs-bar -->
  <div class="content">
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav d-none d-sm-block">
        <li class="nav-item d-flex">
           <a href="#" class="color-blue" data-toggle="modal" data-target="#exampleModalCenter">
            <span class="material-icons font-weight-bold">add</span>
            <p class="float-right">New Agent</p>
          </a>
        </li>
      </ul>
      <!-- Right navbar links -->
      <ul class="navbar-nav ml-auto">
        <li class="nav-item nav-margin d-none d-sm-block border-right">
          <a class="nav-link pos navbar-option blue-text" href="#" data-toggle="modal" data-target="#debug-modal" role="button">Debug</a>
        </li>
        <li class="nav-item nav-margin d-none d-sm-block">
          <a class="nav-link pos navbar-option blue-text" href="#" data-toggle="modal" data-target="#wordlistModal">Wordlist</a>
        </li>
        <li class="nav-item nav-margin border-right d-none d-sm-block">
          <a class="nav-link pos " v-show= "check" href="#" @click="close()">Cancel</a>
        </li>
        <li class="nav-item nav-margin border-right d-none d-sm-block">
          <a class="nav-link pos" href="#" v-show= "!check" v-on:click="editList()">Edit List</a>
          <span :class="{'isLinkDisabled' : entitiesToDelete.length <= 0}"><a class="nav-link pos" v-show= "check" href="#" :class="{'red-text':entitiesToDelete.length > 0}" data-toggle="modal" data-target="#message-box-modal">Delete Agents</a></span>
        </li>
        <li class="nav-item dropdown border-right d-none d-sm-block">
          <a class="nav-link float-left" data-toggle="dropdown" href="#" role="button">
            <button type="button" class="btn btn-light">
              <img src="@/assets/Rect.png" class="img-icon-nav" alt="User Image" />
            </button>
          </a>
          <div class="dropdown-menu scroll">
            <h6 class="dropdown-header header-style">Filter by color</h6>
            <div class="dropdown-divider "></div>
            <div class="force-scroll dropdown-item">
              <button v-on:click="isFilter('')" type="button" class="btn btn-light rainbow">
               <img src="@/assets/Rect.png" class="img-icon-nav float-lefth" alt="User Image" />
               </button>
            <button v-for="item of arrayUniqueColours" :key="item" v-bind:style ="{background:item}"
             v-on:click="isFilter(item)" type="button" class="btn btn-light btn-list">
            </button> </div>
          </div>
        </li>
        <li class="nav-item dropdown border-right d-none d-sm-block">
          <a
            class="nav-link"
            data-toggle="dropdown"
            href="#"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <p class="float-left">Sort by</p>
            <button type="button" class="btn btn-light">
              <i class="material-icons">sort</i>
            </button>
          </a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#" v-on:click="orderByName()">
              <i class="material-icons float-left">title</i>
              <p class="float-left">Name</p>
              <i class="material-icons right" v-show="active_arrow_down">keyboard_arrow_down</i>
              <i class="material-icons right" v-show="active_arrow_up">keyboard_arrow_up</i>
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" v-on:click="orderByCalendar()">
              <i class="material-icons float-left">event</i>
              <p class="right">Created</p>
            </a>
          </div>
        </li>
        <li class="nav-item nav-margin border-right d-none d-sm-block  ">
            <a class="nav-link">
            <p class="float-left">View Mode</p>
            <a v-bind:class="{ 'router-link-exact-active': isMiniView} " v-on:click="activeNavButton('isMiniView')">
            <button type="button" class="btn btn-light margin-right" @click="this.$store.commit('agent/setIsDefaultViewOnAgent', false)">
                <i class="material-icons">format_list_bulleted</i>
            </button>
            </a>
             <a v-bind:class="{ 'router-link-exact-active': isListView} " v-on:click="activeNavButton('isListView')">
            <button type="button" class="btn btn-light" @click="this.$store.commit('agent/setIsDefaultViewOnAgent', true)">
              <i class="material-icons">grid_view</i>
            </button>
            </a>
            </a>
        </li>
        <li class="nav-item border-right d-none d-sm-block">
          <a
            class="nav-link float-left control-sidebar-right"
            href="#"
            data-slide="true"
            @mouseenter="mouseenter"
          >
            <button type="button" class="btn btn-sm control-sidebar-right" id="dropdownMenuButton">
              <LocalMallIco />
            </button>
          </a>
        </li>
      </ul>
    </nav>

    <nav class="main-header navbar d-sm-none navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav d-sm-none">
        <li class="nav-item d-none d-sm-inline-block d-flex">
                   <a href="#" class="color-blue" data-toggle="modal" data-target="#exampleModalCenter">
            <span class="material-icons">control_point</span>
            <p class="float-right">New Agent</p>
          </a>
        </li>
      </ul>
      <!-- Right navbar links -->
      <ul class="navbar-nav d-sm-none ml-auto">
        <li class="nav-item float-left border-right">
          <a class="nav-link" href="#"><router-link :to="{name: 'Agent'}">
            <button type="button" class="btn btn-sm" id="dropdownMenuButton">
              <i class="material-icons">format_list_bulleted</i>
            </button></router-link>
            <button type="button" class="btn btn-light" @click="this.$store.commit('agent/setIsDefaultViewOnAgent', true)">
              <i class="material-icons">grid_view</i>
            </button>
          </a>
        </li>
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
            <a class="dropdown-item" v-show= "check" @click="close()">Cancel</a>
            <div class="dropdown-divider" v-show= "check" ></div>
            <a class="dropdown-item" href="#" v-show= "!check" v-on:click="editList()">Edit List</a>
            <span :class="{'isLinkDisabled' : entitiesToDelete.length <= 0}">
            <a class="dropdown-item" v-show= "check" href="#" v-bind:style ="{color:colorDelete}" data-toggle="modal" data-target="#message-box-modal">Delete Agents</a>
            </span>
            <div class="dropdown-divider"></div>
            <h6 class="dropdown-header header-style">Sort by</h6>
             <div class="dropdown-item">
            <a class="dropdown-item item-sort" href="#" v-on:click="orderByName()">
              <i class="material-icons float-left">title</i>
              <p class="float-left">Name</p>
              <i class="material-icons right" v-show="active_arrow_down">keyboard_arrow_down</i>
              <i class="material-icons right" v-show="active_arrow_up">keyboard_arrow_up</i>
            </a>
            <a class="dropdown-item item-sort" href="#" v-on:click="orderByCalendar()">
              <i class="material-icons float-left">event</i>
              <p class="right">Calendar</p>
            </a>
          </div>
            <div class="dropdown-divider"></div>
            <h6 class="dropdown-header header-style">Filter by colours</h6>
             <div class="force-scroll dropdown-item">
              <button v-on:click="isFilter('')" type="button" class="btn btn-light rainbow">
               <img src="@/assets/Rect.png" class="img-icon-nav float-lefth" alt="User Image" />
               </button>
            <button v-for="item of arrayUniqueColours" :key="item" v-bind:style ="{background:item}"
             v-on:click="isFilter(item)" type="button" class="btn btn-light btn-list">
            </button> </div>
          </div>
        </li>
        <li class="nav-item border-right">
          <a class="nav-link float-left" href="#" data-widget="control-sidebar" data-slide="true">
            <button
              type="button"
              class="btn btn-sm control-sidebar-right"
              id="dropdownMenuButton"
              @mouseenter="mouseenter">
              <LocalMallIco />
            </button>
          </a>
        </li>
      </ul>
    </nav>
    <div v-show="active">
      <aside class="control-sidebar-dark installer-agents" @mouseleave="mouseleave" id="marketplace-agent">
        <div class="p-3 control-sidebar-content sticky-top">
            <h5 class="marketplace-title-font">Marketplace</h5>
        </div>

        <div class="sidebar-list marketplace-agent-container" v-for="agentInstaller of agentsInstallers" :key="agentInstaller.id">
          <dl class="row">
            <dt class="col-3">
              <p class="marketplace-agent-name-font">{{  agentInstaller.name  }}</p>
            </dt>
            <dd class="col-9">
              <dl class="row">
                <dt class="col-7 reset-col">
                  <em>
                    <a href="#" class="marketplace-agent-details-font sidebar-right marketplace-detail-option float-right" @click="toggle" aria:haspopup="true" aria-controls="overlay_panel" :data-agent="agentInstaller.name" :data-description="agentInstaller.description">Details</a>
                  </em>
                </dt>
                <dd class="col-5 reset-col">
                  <a v-if="!agentInstaller.installed" href="#" class="marketplace-agent-install-font float-right marketplace-installer-option" data-toggle="modal" data-target="#debug-installer-modal" @click="this.optionNumber = agentInstaller.id; this.optionName = agentInstaller.name">Install</a>
                  <a v-if="agentInstaller.installed" href="#" class="marketplace-agent-install-font float-right marketplace-installer-option" data-toggle="modal" data-target="#debug-uninstaller-modal" @click="this.optionNumber = agentInstaller.id; this.optionName = agentInstaller.name">Uninstall</a>
                </dd>
              </dl>
            </dd>
          </dl>
        </div>
        <div class="sticky-bottom sidebar-list marketplace-total-agents-container">
          <dl class="row">
            <dt class="col-12">
              <p class="text-center marketplace-total-agents-font">{{ agentsInstallers.length }} Agents</p>
            </dt>
          </dl>
        </div>
        <OverlayPanel :baseZIndex=1000 ref="op" appendTo="body" id="overlay_panel">
          <h5><b>{{ optionName }}</b></h5>
          <p>{{ selectedAgentDescription }}</p>
        </OverlayPanel>
      </aside>
    </div>
   <div class="row">
      <AgentForm></AgentForm>
      <Debug></Debug>
      <InstallOnDebug :installerOption="optionNumber"/>
      <UninstallOnDebug :installerOption="optionNumber" :installerOptionName="optionName"/>
      <Toast :baseZIndex="200"/>
  </div>
  <ConfirmDeleteList></ConfirmDeleteList>
  <Wordlist/>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import AgentForm from '@/components/Agent/AgentForm.vue'
import Debug from '@/components/General/AgentDebug.vue'
import InstallOnDebug from '@/components/General/InstallOnDebug'
import UninstallOnDebug from '@/components/General/UninstallOnDebug'
import Toast from 'primevue/toast'
import OverlayPanel from 'primevue/overlaypanel'
import ConfirmDeleteList from '@/components/General/ConfirmDeleteList.vue'
import jQuery from 'jquery'
import LocalMallIco from '@/components/Icons/LocalMallIco.vue'
import Wordlist from '@/components/General/Wordlist.vue'
export default {
  name: 'NavBarTwo',
  components: {
    AgentForm,
    Debug,
    InstallOnDebug,
    UninstallOnDebug,
    Toast,
    OverlayPanel,
    ConfirmDeleteList,
    LocalMallIco,
    Wordlist
  },
  data: function () {
    return {
      active: false,
      active_arrow_down: true,
      active_arrow_up: false,
      optionNumber: '-1',
      optionName: '',
      selectedAgentDescription: '',
      isMiniView: false,
      isListView: true
    }
  },
  computed: {
    ...mapState('agent', ['agentListStore', 'check', 'colorDelete', 'agentsInstallers', 'agentIdList']),
    ...mapState('target', ['entitiesToDelete']),
    arrayUniqueColours () {
      return [...new Set(this.agentListStore.map(item => item.primaryColor))]
    }
  },
  mounted () {
    if (!this.$store.state.agent.isDefaultViewOnAgent) {
      this.isMiniView = true
      this.isListView = false
    }
    if (this.authentication_token !== '') {
      this.loadMarketplace()
    }
  },
  methods: {
    mouseenter: function () {
      this.active = !this.active
    },
    mouseleave: function () {
      this.active = !this.active
    },
    ...mapMutations('agent', ['isFilter', 'editList']),
    ...mapActions('agent', ['loadMarketplace']),
    orderByName: function () {
      if (this.active_arrow_down === true) {
        return this.orderByNameDesc()
      } else if (this.active_arrow_up === true) {
        return this.orderByNameAsc()
      }
    },
    installationResult: function (event) {
      this.isSubfinderInstalled = event
    },
    orderByNameAsc: function () {
      this.active_arrow_down = true
      this.active_arrow_up = false
      return this.agentListStore.sort(this.$compareNamesAsc)
    },
    orderByNameDesc: function () {
      this.active_arrow_down = false
      this.active_arrow_up = true
      return this.agentListStore.sort(this.$compareNamesDesc)
    },
    orderByCalendar: function () {
      return this.agentListStore.sort(this.$orderByCalendar)
    },
    toggle (event) {
      this.selectedAgentDescription = event.currentTarget.getAttribute('data-description')
      this.optionName = event.currentTarget.getAttribute('data-agent')
      this.$refs.op.toggle(event)
    },
    onBashRemoveAgents () {
      if (this.$store.state.agent.agentIdList.length > 0) {
        jQuery('#confirmation-modald').modal()
      } else {
        return false
      }
    },
    close () {
      const checkboxes = document.getElementsByName('checkitem')
      for (let i = 0, n = checkboxes.length; i < n; i++) {
        checkboxes[i].checked = false
      }
      this.nameTyped = ''
      this.$store.commit('agent/cancelIdAgent')
    },
    activeNavButton: function (valueIn) {
      if (valueIn === 'isMiniView') {
        this.isMiniView = true
        this.isListView = false
      } else {
        if (valueIn === 'isListView') {
          this.isListView = true
          this.isMiniView = false
        }
      }
    }
  }
}
</script>
<style scoped>
.force-scroll{
  overflow-x: scroll!important;
  width: 200px;
}
.dropdown-menu {
    min-width: 10rem;
}

.force-scroll .rainbow{
margin-right: 20px;
}

.force-scroll .btn-list {
    border-radius: 0rem;
    width: 15px;
    height: 15px;
    margin-right: 10px;
}
.navbar-expand .navbar-nav .scroll {
    position: absolute;
    padding-bottom: 0px;
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
.margin-right{
  margin-right: 1px;
}

li.nav-item.border-right.d-none.d-sm-block svg.local-mall-ico {
  fill: #000000 !important
}

.router-link-exact-active  button{
  background-color:#00B1FF;
  color: #fff;
}
a.sidebar-right.marketplace-detail-option:hover{
  color: #000000
}
a.marketplace-installer-option:hover{
  color: #00b1ff
}
.marketplace-title-font{
  font: normal normal medium 20px/32px Poppins;
  letter-spacing: 0px;
}
.marketplace-agent-name-font{
  font: normal normal 300 14px/45px Poppins;
  letter-spacing: 0px;
}
.marketplace-agent-details-font{
  font: italic normal 300 12px/45px Poppins;
  letter-spacing: 0px;
}
.marketplace-agent-install-font{
  font: normal normal 300 14px/45px Poppins;
}
.marketplace-agent-container{
  height: 48px;
  padding: 0 .5rem 0 .5rem;
}
.marketplace-total-agents-font{
  font: normal normal normal 14px/45px Poppins;
  letter-spacing: 0px;
}
.marketplace-total-agents-container{
  height: 46px;
  padding: 0 .5rem 0 .5rem;
}
aside.installer-agents{
  overflow-y: auto;
}
aside.installer-agents::-webkit-scrollbar{
  display: none;
}
aside.installer-agents{
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
