<template>
    <div class="col-12">
        <div class="login-main-container d-flex align-items-center flex-column justify-content-center">
      <div class="welcome-container d-flex mb-3">
          <hr class="login-welcome-line mr-2"/><span class="white-text">WELCOME</span><hr class="login-welcome-line ml-2"/>
      </div>
      <div class="login-container">
          <div class="row">
              <div class="col-12">
                <div class="pt-3 d-flex justify-content-center flex-column mb-3">
                  <span class="black-text font-weight-bold m-auto">SIGN IN</span>
                  <hr class="login-welcome-blue-line"/>
                </div>
              </div>
              <div class="col-12">
                <div class="avatar_container d-flex justify-content-center">
                  <span class="material-icons text-blue">account_circle</span>
                </div>
              </div>
              <div class="col-12">
                <div class="pt-4 d-flex flex-column align-items-center">
                  <input v-model="user.username" placeholder="username" class="ph-center login-input w-75 form-control">
                  <input v-model="user.password" placeholder="password" class="ph-center login-input w-75 form-control mt-2">
                  <button type="button" class="mt-4 btn btn-block login-button w-50pc white-text">LOGIN</button>
                </div>
              </div>
              <div class="col-12">
                  <div class="bottom-border-radius-12px mt-5 login-bottom-section d-flex justify-content-center ligth-gray-background">
                      <span @click="goToForgotPasswordForm" class="cursor-pointer blue-text my-3">Forgot Password?</span>
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
  name: 'LogInForm',
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapMutations('auth', ['goToForgotPasswordForm'])
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
    width: 25vw;
}
.login-main-container{
    height: 100vh;
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
div.avatar_container span.material-icons {
  font-size: 8rem
}
</style>
