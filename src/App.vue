<template>
  <div class="wrapper">
    <!-- Navbar -->
    <nav v-if="!isLoginPage" class="main-header navbar navbar-expand navbar-white navbar-light sticky-top">
      <!-- Left navbar links -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" v-on:click="changeButton" data-widget="pushmenu" href="#" role="button">
           <button type="button" class="btn btn-light margin-right"> <span v-show="button_module" class="material-icons">view_module</span>
            <span v-show="button_vert" class="material-icons">more_vert</span>
              </button>
             <p class="mt-03 float-right loc"><strong>{{viewloc}}</strong></p>
            </a>
        </li>
      </ul>
      <!-- Right navbar links -->
      <ul class="navbar-nav ml-auto right-navbar">
        <!-- Messages Dropdown Menu -->
        <li class="nav-item">
        <form class="form-inline">
      <div class="form-group has-search input-group-sm">
                              <span class="material-icons search-icon form-control-feddback">search</span>
                              <input class="form-control url-input" type="search" placeholder="Search" aria-label="Search">
                            </div>
        </form>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link" data-toggle="dropdown" href="#">
            <span class="material-icons">settings</span>
          </a>
          <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <a href="#" class="dropdown-item">
            Notifications
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            Logs
          </a>
        </div>
        </li>
        <!-- Notifications Dropdown Menu -->
        <li class="nav-item dropdown">
          <a class="nav-link" data-toggle="dropdown" href="#">
            <span class="material-icons">notifications_none</span>
          </a>
        </li>
        <li class="nav-item dropdown">
          <div class="image nav-link cursor-pointer" data-toggle="dropdown">
            <span class="loged-user-name">{{loggedUser.name}}</span>
            <img :src="gravatarURL" onerror="this.onerror=null;this.src='/adminlte/img/reconnes/user2-160x160.jpg'" class="img-circle elevation-2" alt="User Image">
          </div>
          <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <a href="#" @click="this.$router.push({ name: 'LogIn' })" class="dropdown-item">
              My account
            </a>
            <div class="dropdown-divider"></div>
              <a href="#" @click="logoutOfSystem" class="dropdown-item">
                Sign out
              </a>
          </div>
        </li>

      </ul>
    </nav>
    <!-- /.navbar -->
    <!-- Main Sidebar Container -->
    <aside v-if="!isLoginPage" class="main-sidebar sidebar-dark-primary  left-aside position-fixed" @mouseenter="mouseenter" @mouseleave="mouseleave">
      <!-- Brand Logo -->
       <router-link :to="{name: 'Home'}">
      <a href="#" class="brand-link">
        <img src="/adminlte/img/reconnes/logo2x.png" v-show="hide_logo" alt="ReconNess Logo" class="brand-image img-circle elevation-3 opacity-08">
        <div class="text-center">
          <span class="brand-text"><strong>Recon</strong></span><span>Ness</span>
        </div>
      </a></router-link>
      <!-- Sidebar -->
      <div class="sidebar">
        <nav class="mt-2">
          <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li class="nav-item">
               <router-link :to="{name: 'Home'}" >
              <a href="#" class="nav-link" v-on:click="addLocation('Home')" >
               <span class="material-icons">home</span>
                <p>Home</p>
              </a></router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'Targets'}" >
              <a href="#" class="nav-link" id ='targetNav'  v-on:click="addLocation('Targets'), this.$store.commit('target/setIsDefaultViewOnTarget', true)" v-bind:class="{'nav2': styleTargetState}">
                <BullseyeArrowIco/>
                <p class="align-top">Targets </p>
              </a>
            </router-link>
            </li>
            <li class="nav-item has-treeview cursor-pointer">
                <a class="nav-link" v-on:click="switchArrowsPipeline">
                <span class="material-icons badge badge-dark float-left">code</span>
                <p>Pipelines</p>
                <span v-show="arrow_down" class="material-icons float-right">arrow_drop_down</span>
                <span v-show="arrow_up" class="material-icons float-right">arrow_drop_up</span>
                </a>
              <ul class="nav nav-treeview">
                <li class="nav-item" ><router-link :to="{ name: 'Pipelines'}">
                  <a class="nav-link" id ='pipelineNav' v-on:click="this.$store.commit('pipelines/setIsDefaultViewOnPipelines', true)" v-bind:class="{'nav2': stylePipelinesState}">
                    <span class="material-icons badge badge-dark float-left" v-bind:class="{'style-badge': stylePipelinesState}">code</span>
                        <p>Pipelines</p>
                  </a></router-link>
                </li>
                <li class="nav-item" ><router-link :to="{name: 'Agent'}">
                  <a href="#" class="nav-link" id ='agentNav'  v-on:click="addLocation('Agents')" v-bind:class="{'nav2': styleAgentState}" >
                    <span class="material-icons">font_download</span>
                        <p>Agents</p>
                  </a></router-link>
                </li>
              </ul>
            </li>
            <li class="nav-item has-treeview">
              <a href="#" class="nav-link" v-on:click="addLocation('Settings')">
                <span class="material-icons">settings</span>
                <p>Settings</p>
                <span v-show="arrow_down_settings" class="material-icons float-right">arrow_drop_down</span>
                <span v-show="arrow_up_settings" class="material-icons float-right">arrow_drop_up</span>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item" ><router-link :to="{ name: 'Notifications' }" >
                  <a href="#" class="nav-link" v-on:click="addLocation('Notifications')" v-bind:class="{'nav2': styleNotificationsState}">
                    <span class="material-icons">font_download</span>
                        <p>Notifications</p>
                  </a></router-link>
                </li>
                <li class="nav-item" ><router-link :to="{ name: 'Logs' }" >
                  <a href="#" class="nav-link" v-on:click="addLocation('Logs')" v-bind:class="{'nav2': styleLogsState}">
                    <span class="material-icons">font_download</span>
                        <p>Logs</p>
                  </a></router-link>
                </li>
              </ul>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link" v-on:click="logoutOfSystem" v-bind:class="{'nav2': styleLogsState}">
                <span class="material-icons">exit_to_app</span>
                <p>
                  Logout
                </p>
                </a>
            </li>
          </ul>
        </nav>
        <!-- /.sidebar-menu -->
      </div>
      <!-- /.sidebar -->
    </aside>
    <!-- Content Wrapper. Contains page content -->
    <div class="wrapper">
      <!-- Main content -->
      <router-view/>
      <div class="container">
        <div class="row">
          <MessageBox />
        </div>
      </div>
    </div><!-- /.content-wrapper -->
  </div><!-- ./wrapper -->
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import md5 from 'md5'
import BullseyeArrowIco from '@/components/Icons/BullseyeArrowIco.vue'
import MessageBox from '@/components/General/MessageBox.vue'
export default {
  name: 'App',
  data: function () {
    return {
      arrow_down: true,
      arrow_up: false,
      arrow_down_settings: true,
      arrow_up_settings: false,
      hide_logo: false,
      button_module: false,
      button_vert: true,
      location: 'Home',
      goAgent: false,
      isNoteSectionOpenedReference: true
    }
  },
  components: {
    BullseyeArrowIco,
    MessageBox
  },
  computed: {
    ...mapState('agent', ['viewloc', 'styleAgentState', 'styleTargetState', 'stylePipelinesState', 'styleNotificationsState', 'styleLogsState', 'isNotesSectionOpened']),
    ...mapState('target', ['loggedUser']),
    isLoginPage () {
      return this.$route.name === 'LogIn'
    },
    gravatarURL () {
      const hashedUrl = md5(this.loggedUser.email)
      return this.$getGravatarUrlByEmail(hashedUrl)
    },
    isAnyPipelineRelatedPage () {
      return this.$route.name === 'Pipelines' || this.$route.name === 'PipelineDetail' || this.$route.name === 'PipelineRunView'
    }
  },
  watch: {
    isNotesSectionOpened: function (value) {
      this.isNoteSectionOpenedReference = value
    }
  },
  mounted () {
    this.location = this.viewloc
  },
  methods: {
    ...mapMutations('auth', ['updateIsUserLogged']),
    mouseenter: function () {
      if (this.button_module) {
        this.hide_logo = !this.hide_logo
      }
    },
    logoutOfSystem: function () {
      this.updateIsUserLogged(false)
      this.$router.push({ name: 'LogOut' })
    },
    mouseleave: function () {
      if (this.button_module) {
        this.hide_logo = !this.hide_logo
      }
    },
    changeButton: function () {
      if (this.button_module || this.button_vert) {
        this.button_module = !this.button_module
        this.button_vert = !this.button_vert
        this.hide_logo = !this.hide_logo
      }
    },
    switchArrowsPipeline: function () {
      this.arrow_down = !this.arrow_down
      this.arrow_up = !this.arrow_up
    },
    addLocation: function (loc) {
      if (loc === 'Settings') {
        this.arrow_down_settings = !this.arrow_down_settings
        this.arrow_up_settings = !this.arrow_up_settings
      } else {
        this.$store.commit('agent/updateLocView', loc)
      }
    },
    redirectToHomePage: function () {
      this.$router.push('/')
    },
    goToPipelinesListPageAndExpandMenu () {
      this.switchArrowsPipeline()
      this.$store.commit('pipelines/setIsDefaultViewOnPipelines', true)
    }
  }
}
</script>
<style>
.login-wallpaper{
  background: #49b1fe url('~@/assets/wallpaper.png') top left no-repeat;
  background-size: cover
}
.default-background-color{
  background: #f2f4f6;
}
</style>
<style scoped>
.vertical-align-0{
  vertical-align: 0px;
}
.opacity-08{
  opacity: .8 !important
}
.mt-03{
  margin-top: 0.3rem !important;
}
.left-aside {
    background: rgba(245, 246, 247, 0.9) 0% 0% no-repeat padding-box;
}
.nav-pills a .material-icons {
    font-size: 20px;
    margin-right: 15px;
}
.menu-open{
  background-color:#fff;
  border-radius: 15px;
}
.nav-sidebar>.nav-item ul a {
    margin-top: 19px;
    margin-bottom: 0px;
}
.badge-dark {
background-color: #000000;
}
.style-badge{
  background-color: #ffffff;
}
.style-badge.material-icons{
color: #007bff!important;
font-weight: 100;
}
.badge{
  padding: 0px;
  font-weight: 100;
}
.nav-sidebar>.nav-item {
    margin-bottom: 19px;
}

.brand-link {
    margin-bottom: 40px;
    margin-top: 10px;
}

.nav-sidebar .nav-link>p>.right{
  right: 1px;
}
.nav.nav-pills.nav-sidebar.flex-column > li p {
    vertical-align: 3.8px;
}
.brand-link .brand-image {
    margin-left: -0.1rem;
    max-height: 60px;
}
.brand-link div {
    font-size: 1.8rem;
}
form .input-group {
    display: -webkit-inline-box;
}
.input-group-sm>.form-control{
    padding: 0;
    font-size: .9rem;
    border-radius: .2rem;
    width: 120px;
}
.navbar-expand .navbar-nav .nav-link {
    padding-left: .5rem;
    padding-top: 3px;
}
.form-inline{
    margin-right: 25px;
}
.input-group-append, .input-group-prepend {
    display: inline-flex;
}
@media (max-width: 480px) {
  .loged-user-name{
  display: none;
}
.navbar-nav.ml-auto.right-navbar input {
  width: 60px;
  font-size: small;
}
.navbar-expand .navbar-nav .nav-link {
  padding-right: .1rem;
}
.loc{
  display: none;
}
}
.margin-right{
  margin-right: 8px;
}
.has-search .form-control{
  padding-left: 2.375rem;
}
.has-search .form-control-feddback{
  position: absolute;
  z-index: 2;
  display: block;
  width: 2.375rem;
  height: 2.375rem;
  line-height: 2.375rem;
  text-align: center;
  pointer-events: none;
  color:#000;
}

div.sidebar nav a.nav-link svg {
  margin-right: 15px;
}
@media (max-width: 480px) {
.navbar-nav.ml-auto.right-navbar input{
    width: 120px!important;
}
}
</style>
