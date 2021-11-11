<template>
  <div class="container-fluid poppins">
    <div class="row">
      <div class="col-12">
        <div class="login-top-banner d-flex mt-5 justify-content-between">
        <div class="text-left reconness-logo ml-2">
          <span class="brand-text"><strong class="white-text">Recon</strong></span><span class="white-text">Ness</span>
        </div>
        <div class="user-manager-selection-bar d-flex" v-if="isUserLogged">
          <span class="logs-section font-size-24px cursor-pointer" :class="{'border-selected-user-section': showLogsSection, 'white-text': showLogsSection, 'unselected-color-user-section': !showLogsSection}" @click="goToLogsSection">Logs</span>
          <span class="logs-section ml-5 font-size-24px cursor-pointer" :class="{'border-selected-user-section': showUsersSection, 'white-text': showUsersSection, 'unselected-color-user-section': !showUsersSection}" @click="goToUsersSection">Users</span>
          <span class="logs-section ml-5 font-size-24px cursor-pointer" :class="{'border-selected-user-section': showSettingsSection, 'white-text': showSettingsSection, 'unselected-color-user-section': !showSettingsSection}" @click="goToSettingsSection">Settings</span>
        </div>
        <div class="quick-access-container d-flex mr-3" v-if="isUserLogged">
          <router-link :to="{name: 'Home'}">
            <div class="quick-access-icon-container d-flex justify-content-center align-items-center">
              <span class="material-icons">home</span>
            </div>
          </router-link>
          <router-link :to="{name: 'Targets'}">
            <div class="ml-3 quick-access-icon-container d-flex justify-content-center align-items-center">
              <BullseyeArrowIco/>
            </div>
          </router-link>
          <router-link :to="{name: 'Pipelines'}">
            <div class="ml-3 quick-access-icon-container d-flex justify-content-center align-items-center">
              <CodeNotEqualVariantIco/>
            </div>
          </router-link>
          <router-link :to="{name: 'Agent'}">
            <div class="ml-3 quick-access-icon-container d-flex justify-content-center align-items-center">
              <AlphaABoxIco/>
            </div>
          </router-link>
          <router-link :to="{name: 'LogOut'}">
            <div class="ml-3 quick-access-icon-container d-flex justify-content-center align-items-center">
              <ExportIco/>
            </div>
          </router-link>
        </div>
      </div>
      </div>
    </div>
    <div class="row">
          <LogInForm v-if="!isUserLogged && showLoginForm" class="mt-5"/>
          <ForgotPasswordForm v-else-if="!isUserLogged && showForgottenPasswordForm" class="mt-5"/>
          <ResetPasswordForm v-else-if="!isUserLogged && showResetPasswordForm" class="mt-5"/>
          <UserManagement v-if="isUserLogged" class="mt-5"/>
    </div>
  </div>
</template>
<script>
import LogInForm from '@/components/User/LogInForm.vue'
import ForgotPasswordForm from '@/components/User/ForgotPasswordForm.vue'
import ResetPasswordForm from '@/components/User/ResetPasswordForm.vue'
import UserManagement from '@/components/User/UserManagement.vue'
import BullseyeArrowIco from '@/components/Icons/BullseyeArrowIco.vue'
import ExportIco from '@/components/Icons/ExportIco.vue'
import AlphaABoxIco from '@/components/Icons/AlphaABoxIco.vue'
import CodeNotEqualVariantIco from '@/components/Icons/CodeNotEqualVariantIco.vue'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'LogIn',
  components: {
    LogInForm,
    ForgotPasswordForm,
    ResetPasswordForm,
    BullseyeArrowIco,
    ExportIco,
    AlphaABoxIco,
    CodeNotEqualVariantIco,
    UserManagement
  },
  computed: {
    ...mapState('auth', ['isUserLogged', 'showForgottenPasswordForm', 'showResetPasswordForm', 'showLoginForm', 'showLogsSection', 'showUsersSection', 'showSettingsSection']),
    ...mapState('user', ['showLogsSection', 'showUsersSection', 'showSettingsSection'])
  },
  mounted () {
    document.body.classList.add('login-wallpaper')
  },
  unmounted () {
    document.body.classList.remove('login-wallpaper')
  },
  methods: {
    ...mapMutations('user', ['goToLogsSection', 'goToUsersSection', 'goToSettingsSection'])
  }
}
</script>
<style>
  .reconness-logo{
    font-size: 1.4rem;
  }
</style>
<style scoped>
.quick-access-icon-container{
  background: rgba(245, 246, 247, 0.5) 0% 0% no-repeat padding-box;
  border-radius: 12px;
  width: 43px;
  height: 43px;
}
.quick-access-icon-svg-size{
  width: 25px;
  height: 21px;
}
.pipeline-quick-access-icon{
  font-size: 14px;
  color: rgba(245, 246, 247, 1);
}
.border-selected-user-section{
  border-bottom: 4px solid #FFFFFF;
}
.unselected-color-user-section{
  color: rgba(255, 255, 255, 0.5)
}
</style>
