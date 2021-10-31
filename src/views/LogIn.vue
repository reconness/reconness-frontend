<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="text-left reconness-logo mt-2 ml-2">
          <span class="brand-text"><strong class="white-text">Recon</strong></span><span class="white-text">Ness</span>
        </div>
      </div>
    </div>
    <div class="row">
          <LogInForm v-if="showLoginForm"/>
          <ForgotPasswordForm v-else-if="showForgottenPasswordForm"/>
          <ResetPasswordForm v-else-if="showResetPasswordForm"/>
    </div>
  </div>
</template>
<script>
import LogInForm from '@/components/User/LogInForm.vue'
import ForgotPasswordForm from '@/components/User/ForgotPasswordForm.vue'
import ResetPasswordForm from '@/components/User/ResetPasswordForm.vue'
import { mapState } from 'vuex'
export default {
  name: 'LogIn',
  components: {
    LogInForm,
    ForgotPasswordForm,
    ResetPasswordForm
  },
  computed: {
    ...mapState('auth', ['showForgottenPasswordForm', 'showResetPasswordForm', 'showLoginForm'])
  }
}
</script>
<style>
  body{
    background: red url('~@/assets/wallpaper.jpg') top left no-repeat;
  }
  .reconness-logo{
    font-size: 1.4rem;
  }
</style>
