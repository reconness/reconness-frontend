<template>
    <div class="col-12">
        <div class="login-main-container mt-4 d-flex align-items-center flex-column justify-content-center">
      <div class="login-container">
          <div class="row">
              <div class="col-12">
                <div class="pt-3 d-flex justify-content-center flex-column mb-3">
                  <span class="black-text login-form-header-font m-auto">Reset Password</span>
                  <hr class="login-welcome-blue-line"/>
                </div>
              </div>
              <div class="col-12">
                  <p class="text-center mt-2 login-form-info-font">Enter the confirmation code and our system will let you reset your password</p>
              </div>
              <div class="col-12">
                <div class="pt-2 d-flex flex-column align-items-center">
                  <input v-model="confirmation_code" placeholder="confirmation code" class="mb-2 ph-center login-input w-75 form-control">
                </div>
              </div>
              <div class="col-12">
                  <p class="text-center mx-2 mt-2 login-form-info-font">Please provide a new password and we'll redirect you to the login page</p>
              </div>
              <div class="col-12">
                <div class="d-flex flex-column align-items-center">
                  <input v-model="user.password" placeholder="password" :disabled="this.$validateIsBlank(confirmation_code)" class="mb-2 ph-center login-input w-75 form-control">
                  <input v-model="confirm_password" placeholder="confirm password" :disabled="this.$validateIsBlank(confirmation_code)" class="ph-center login-input w-75 form-control mt-2">
                  <button type="button" :disabled="this.$validateIsBlank(confirmation_code)" @click="changeUserPassword" class="mt-4 btn btn-block login-button login-form-action-button w-50pc white-text">SUBMIT</button>
                  <div class="mt-4">
                    <p v-if="!passwordsAreEquals" class="mt-2 login-form-info-font text-center invalid">The specified passwords do not match</p>
                    <p v-if="areInputInBlank" class="mt-2 login-form-info-font text-center invalid">Please specify and confirm the new password to continue</p>
                  </div>
                </div>
              </div>
              <div class="col-12">
                  <div class="bottom-border-radius-12px mt-5 login-bottom-section d-flex justify-content-center ligth-gray-background">
                      <span @click="goToLoginForm" class="cursor-pointer blue-text my-3 login-form-footer-link">Back to login</span>
                  </div>
              </div>
          </div>
      </div>
        </div>
    </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  name: 'ForgotPasswordForm',
  data () {
    return {
      confirmation_code: '',
      confirm_password: '',
      user: {
        username: '',
        password: ''
      },
      wereWrittenInput: false
    }
  },
  computed: {
    passwordsAreEquals () {
      return this.user.password === this.confirm_password
    },
    areInputInBlank () {
      return (this.$validateIsBlank(this.confirm_password) || this.$validateIsBlank(this.user.password)) && this.wereWrittenInput
    }
  },
  watch: {
    'user.password': function (value) {
      this.wereWrittenInput = true
    },
    confirm_password: function (value) {
      this.wereWrittenInput = true
    }
  },
  methods: {
    ...mapMutations('auth', ['goToLoginForm']),
    ...mapMutations('target', ['updateUserPassword']),
    changeUserPassword () {
      if (this.$validateIsBlank(this.confirm_password) || this.$validateIsBlank(this.user.password)) {
        this.wereWrittenInput = true
      }
      if (this.passwordsAreEquals && !this.$validateIsBlank(this.user.password)) {
        this.updateUserPassword(this.user.password)
        this.goToLoginForm()
      }
    }
  }
}
</script>
<style scoped>
.login-container {
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 19px 45px #0c1f6a6e;
    border: 1px solid #e5e9ec;
    border-radius: 12px;
    opacity: 1;
    width: 350px;
}
.login-main-container{
    height: 100%;
}
.login-welcome-line{
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #ffffff;
  width: 45px;
  margin-bottom: unset;
  margin-top: unset;
  margin: auto;
}
.login-welcome-blue-line{
  display: block;
  height: 1px;
  border: 0;
  border-top: 3px solid #00B1FF;
  width: 45px;
  margin-bottom: unset;
  margin-top: unset;
  margin: auto;
}
.login-input{
  background: #f5f6f7 0% 0% no-repeat padding-box;
  border-radius: 6px;
}
.ph-center::-webkit-input-placeholder, .ph-center{
  text-align: center;
  line-height: 100px;
  font: normal normal 300 14px/19px Poppins;
}
.login-button{
  background: #00b1ff 0% 0% no-repeat padding-box;
  box-shadow: 0px 9px 22px #00b1ff54;
  border-radius: 6px;
  opacity: 1;
}
.w-50pc{
  width: 50%
}
.bottom-border-radius-12px{
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px
}
</style>
