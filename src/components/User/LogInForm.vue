<template>
    <div class="col-12">
        <div class="login-main-container d-flex align-items-center flex-column justify-content-center">
      <div class="welcome-container d-flex mb-3">
          <hr class="login-welcome-line mr-2"/><span class="login-form-header-welcome-font white-text">WELCOME</span><hr class="login-welcome-line ml-2"/>
      </div>
      <div class="login-container">
          <div class="row">
              <div class="col-12">
                <div class="pt-3 d-flex justify-content-center flex-column mb-3">
                  <span class="black-text  m-auto login-form-header-font">SIGN IN</span>
                  <hr class="login-welcome-blue-line"/>
                </div>
              </div>
              <div class="col-12">
                <div class="avatar_container d-flex justify-content-center">
                  <!-- <span class="material-icons text-blue">account_circle</span> -->
                  <img src="@/assets/user-icon.png" class="login-logo" alt="User Logo">
                </div>
              </div>
              <div class="col-12">
                <div class="pt-4 d-flex flex-column align-items-center">
                  <input v-model="user.username" @keyup.enter="authenticate" placeholder="username" class="ph-center login-input w-75 form-control">
                  <input type="password" @keyup.enter="authenticate" v-model="user.password" placeholder="password" class="ph-center login-input w-75 form-control mt-2">
                  <button type="button" class="mt-4 btn btn-block login-button login-form-action-button w-50pc white-text" @click="authenticate">LOGIN</button>
                  <p v-if="validators.emptyInputs" class="mt-2 text-center invalid">You need to specify your username and password to access the system</p>
                  <p v-if="invalidCredentials && !validators.emptyInputs" class="mt-2 text-center invalid">Invalid Credentials</p>
                  <p v-if="authenticationError" class="mt-2 text-center invalid">An error ocurred during the authentication process. Please contact the administrator</p>
                  <SpinnerCircle addCss="blue-text spinner-circle-size mt-3" :show="isBackgroundProcessRunning"/>
                </div>
              </div>
              <div class="col-12">
                  <div class="bottom-border-radius-12px mt-5 login-bottom-section d-flex justify-content-center ligth-gray-background">
                      <span @click="goToForgotPasswordForm" class="d-none cursor-pointer blue-text my-3 login-form-footer-link">Forgot Password?</span>
                  </div>
              </div>
          </div>
      </div>
        </div>
    </div>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
import SpinnerCircle from '@/components/General/SpinnerCircle.vue'
export default {
  name: 'LogInForm',
  components: {
    SpinnerCircle
  },
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      invalidCredentials: false,
      authenticationError: false,
      validators: {
        emptyInputs: false
      },
      isBackgroundProcessRunning: false
    }
  },
  computed: {
    areInputInBlank () {
      return (this.$validateIsBlank(this.user.username) || this.$validateIsBlank(this.user.password))
    },
    areCredentialsInvalid () {
      return this.invalidCredentials && !this.areInputInBlank
    }
  },
  methods: {
    ...mapMutations('auth', ['goToForgotPasswordForm', 'updateIsUserLogged']),
    ...mapMutations('user', ['updateLoggedUserName']),
    ...mapActions('auth', ['updateUserLogFlagAfterSeconds']),
    ...mapActions('auth', ['login']),
    ...mapActions('user', ['loadUsers']),
    authenticate () {
      this.validateEntryData()
      if (!this.areInputInBlank) {
        this.authenticationError = false
        this.invalidCredentials = false
        this.isBackgroundProcessRunning = true
        this.login({
          username: this.user.username,
          password: this.user.password
        }).then(response => {
          this.isBackgroundProcessRunning = false
          this.updateLoggedUserName(response.message.userName)
          if (response.status) {
            this.loadUsers().then(response => {
              this.invalidCredentials = false
              this.updateIsUserLogged(true)
              this.$router.push({ name: 'Home' })
            })
          } else {
            if (response.message === 'unknownError') {
              this.authenticationError = true
            } else {
              this.invalidCredentials = true
            }
          }
        })
      }
    },
    resetForm () {
      this.user.username = ''
      this.user.password = ''
    },
    validateEntryData () {
      this.validators.emptyInputs = this.areInputInBlank
    }
  }
}
</script>
<style scoped>
.login-logo{
  width: 130px;
}
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
div.avatar_container span.material-icons {
  font-size: 8rem
}

.login-form-header-welcome-font{
  font: normal normal normal 27px/22px Poppins;
  letter-spacing: 0px;
}

.spinner-circle-size{
  height: 20px;
  width: 20px;
}
</style>
