<template>
  <div class="container-fluid">
    <div class="row">
          <LogInForm v-if="showLoginForm"/>
          <ForgotPasswordForm v-else-if="showForgottenPasswordForm"/>
    </div>
  </div>
</template>
<script>
import LogInForm from '@/components/User/LogInForm.vue'
import ForgotPasswordForm from '@/components/User/ForgotPasswordForm.vue'
import { mapState } from 'vuex'
export default {
  name: 'LogIn',
  components: {
    LogInForm,
    ForgotPasswordForm
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
</style>
