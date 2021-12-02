<template>
  <div class="container-fluid poppins">
    <div class="row">
      <div class="col-12">
        <div class="login-top-banner d-flex mt-5 justify-content-between">
        <div class="text-left reconness-logo ml-2">
          <span class="brand-text"><strong class="white-text">Recon</strong></span><span class="white-text">Ness</span>
        </div>
      </div>
      </div>
    </div>
    <div class="row">
          <LogInForm v-if="showLoginForm" class="mt-5"/>
          <ForgotPasswordForm v-else-if="showForgottenPasswordForm" class="mt-5"/>
          <ResetPasswordForm v-else-if="showResetPasswordForm" class="mt-5"/>
    </div>
  </div>
</template>
<script>
import LogInForm from '@/components/User/LogInForm.vue'
import ForgotPasswordForm from '@/components/User/ForgotPasswordForm.vue'
import ResetPasswordForm from '@/components/User/ResetPasswordForm.vue'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'LogIn',
  components: {
    LogInForm,
    ForgotPasswordForm,
    ResetPasswordForm
  },
  computed: {
    ...mapState('auth', ['showForgottenPasswordForm', 'showResetPasswordForm', 'showLoginForm']),
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
