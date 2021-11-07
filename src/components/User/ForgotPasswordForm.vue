<template>
    <div class="col-12">
        <div class="login-main-container mt-4 d-flex align-items-center flex-column justify-content-center">
      <div class="login-container">
          <div class="row">
              <div class="col-12">
                <div class="pt-3 d-flex justify-content-center flex-column mb-3">
                  <span class="black-text font-weight-bold m-auto">Forgot password</span>
                  <hr class="login-welcome-blue-line"/>
                </div>
              </div>
              <div class="col-12">
                  <p class="text-center">Enter your number or email address below and our system will send you a confirmation code</p>
              </div>
              <div class="col-12">
                <div class="pt-4 d-flex flex-column align-items-center">
                  <input v-model="user.email" type="email" @change="setWrittenInputFlag" placeholder="email" class="mb-2 ph-center login-input w-75 form-control">
                  <span class="blue-text">O</span>
                  <input v-model="user.phone" @change="setWrittenInputFlag" placeholder="phone number" class="ph-center login-input w-75 form-control mt-2">
                  <button type="button" @click="checkIfInputDataAreValid" class="mt-4 btn btn-block login-button w-50pc white-text">ENTER</button>
                  <div class="mt-4">
                    <p v-if="!isValidEmail" class="text-center invalid">The specified email is not correct</p>
                    <p v-if="isValidPhone" class="text-center invalid">The specified phone is not correct</p>
                    <p v-if="areEmptyEmailAndPhoneVar" class="text-center invalid">You must specify your phone or email to continue</p>
                  </div>
                </div>
              </div>
              <div class="col-12">
                  <div class="bottom-border-radius-12px mt-5 login-bottom-section d-flex justify-content-center ligth-gray-background">
                      <span @click="goToLoginForm" class="cursor-pointer blue-text my-3">Back to login</span>
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
      user: {
        email: '',
        phone: ''
      },
      areEmptyEmailAndPhoneVar: false
    }
  },
  computed: {
    isValidEmail () {
      if (this.$validateIsBlank(this.user.email)) {
        return true
      }
      return this.$validateEmail(this.user.email)
    },
    isValidPhone () {
      if (this.$validateIsBlank(this.user.phone)) {
        return false
      }
      return this.$validatePhone(this.user.phone)
    },
    arePhoneAndEmailEmpty () {
      return (this.$validateIsBlank(this.user.email) && this.$validateIsBlank(this.user.phone))
    }
  },
  watch: {
    'user.email': function (value) {
      if (!this.$validateIsBlank(this.user.email)) {
        this.areEmptyEmailAndPhoneVar = false
      }
    },
    'user.phone': function (value) {
      if (!this.$validateIsBlank(this.user.phone)) {
        this.areEmptyEmailAndPhoneVar = false
      }
    }
  },
  methods: {
    ...mapMutations('auth', ['goToLoginForm', 'goToResetPasswordForm']),
    checkIfInputDataAreValid () {
      if (this.arePhoneAndEmailEmpty) {
        this.areEmptyEmailAndPhoneVar = true
      }
      if ((this.isValidEmail && !this.isValidPhone) && !this.arePhoneAndEmailEmpty) {
        this.goToResetPasswordForm()
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
  line-height: 100px
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
