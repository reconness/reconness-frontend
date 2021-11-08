<template>
  <div class="container-fluid poppins">
    <div class="row">
      <div class="col-12">
        <div class="login-top-banner d-flex mt-2 justify-content-between">
        <div class="text-left reconness-logo ml-2">
          <span class="brand-text"><strong class="white-text">Recon</strong></span><span class="white-text">Ness</span>
        </div>
        <div class="quick-access-container d-flex mr-3">
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
import BullseyeArrowIco from '@/components/Icons/BullseyeArrowIco.vue'
import ExportIco from '@/components/Icons/ExportIco.vue'
import AlphaABoxIco from '@/components/Icons/AlphaABoxIco.vue'
import CodeNotEqualVariantIco from '@/components/Icons/CodeNotEqualVariantIco.vue'
import { mapState } from 'vuex'
export default {
  name: 'LogIn',
  components: {
    LogInForm,
    ForgotPasswordForm,
    ResetPasswordForm,
    BullseyeArrowIco,
    ExportIco,
    AlphaABoxIco,
    CodeNotEqualVariantIco
  },
  computed: {
    ...mapState('auth', ['showForgottenPasswordForm', 'showResetPasswordForm', 'showLoginForm'])
  }
}
</script>
<style>
  body{
    background: red url('~@/assets/wallpaper.jpg') top left no-repeat;
    background-size: cover
  }
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
</style>
