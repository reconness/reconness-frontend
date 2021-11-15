<template>
    <div class="col-12">
        <form>
        <div class="modal fade" id="user-form-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content agent-containers poppins">
              <div class="modal-header remove-flex">
                <div class="row">
                  <div class="col-12">
                    <div class="row">
                      <div class="col-8">
                        <div class="d-flex flex-column">
                          <div :class="{'w-100': showNameInput}">
                            <input v-if="showNameInput" v-model="user.username" placeholder="Username" @change="updateUserNameWasWritten" class="font-weight-medium form-control agent-placeholder w-100 agent-name-input">
                            <span v-if="!showNameInput" class="agent-name-input flex-fill pl-2 agent-form-name-font font-weight-medium">Username</span>
                            <span v-if="!showNameInput" class="material-icons cursor-pointer ml-2 blue-text" @click="switchNameInput"> open_in_new</span>
                          </div>
                          <span v-if="(isUserNameInBlank && this.userNameWasWritten) || (isUserNameInBlank && userTryToAdd)" :class="{invalid: isUserNameInBlank}" class="mt-2">The field username is required</span>
                        </div><!-- /.d-flex -->
                      </div><!-- /.col-12 -->
                      <div class="col-4">
                        <div class="d-flex flex-row-reverse">
                          <!-- <span v-if="editable" class="title-target-admin-form agent-mini-color-gray mr-1">Settings</span> -->
                          <span class="title-target-admin-form font-size-24px agent-mini-color-gray mr-1">New User</span>
                        </div>
                      </div>
                    </div><!-- /.row -->
                  </div>
                </div>
              </div>
              <div class="modal-body ligth-gray-background">
                <div class="row" id="middle-section">
                  <div class="col-12 col-sm-8">
                    <div class="form-group">
                      <label for="user-form-email" class="font-weight-regular black-text font-size-16px">Email</label>
                      <input id="user-form-email" @blur="updateEmailWasWritten" @change="updateEmailWasWritten" v-model="user.email" class="font-size-14px font-weight-light ligth-gray-background userform-input-text form-control">
                          <span v-if="(isEmailInBlank && this.emailWasWritten) || (isEmailInBlank && userTryToAdd)" :class="{invalid: isEmailInBlank}" class="mt-2">The field email is required</span>
                          <span v-if="(isInValidEmail && this.emailWasWritten) || (isInValidEmail && userTryToAdd)" :class="{invalid: isInValidEmail}" class="mt-2">The specified email is not correct</span>
                    </div>
                    <div class="form-group">
                      <label for="user-form-firstname" class="font-weight-regular black-text font-size-16px">First Name</label>
                      <input id="user-form-firstname" @blur="updateFirstNameWasWritten" @change="updateFirstNameWasWritten" v-model="user.firstname" class="font-size-14px font-weight-light ligth-gray-background userform-input-text form-control">
                          <span v-if="(isFirstNameInBlank && this.firstNameWasWritten) || (isFirstNameInBlank && userTryToAdd)" :class="{invalid: isFirstNameInBlank}" class="mt-2">The field firstname is required</span>
                    </div>
                    <div class="form-group">
                      <label for="user-form-lastname" class="font-weight-regular black-text font-size-16px">Last Name</label>
                      <input id="user-form-lastname" @blur="updateLastNameWasWritten" @change="updateLastNameWasWritten" v-model="user.lastname" class="font-size-14px font-weight-light ligth-gray-background userform-input-text form-control">
                          <span v-if="(isLastNameInBlank && this.lastNameWasWritten) || (isLastNameInBlank && userTryToAdd)" :class="{invalid: isLastNameInBlank}" class="mt-2">The field lastname is required</span>
                    </div>
                    <div class="form-group">
                      <label for="user-form-password" class="font-weight-regular black-text font-size-16px">Password</label>
                      <input id="user-form-password" @blur="updatePasswordWasWritten" @change="updatePasswordWasWritten" v-model="user.password" class="font-size-14px font-weight-light ligth-gray-background userform-input-text form-control">
                          <span v-if="isPasswordInBlank" :class="{invalid: isPasswordInBlank}" class="mt-2">The field password is required</span>
                    </div>
                    <div class="form-group">
                      <label for="user-form-confirm_password" class="font-weight-regular black-text font-size-16px">Confirmation Password</label>
                      <input id="user-form-confirm_password" v-model="confirm_password" class="font-size-14px font-weight-light ligth-gray-background userform-input-text form-control">
                      <span v-if="!isConfirmPasswordEqualToPassword" :class="{invalid: !isConfirmPasswordEqualToPassword}" class="mt-2">The field confirm password must be equal to the password field</span>
                    </div>
                  </div><!-- /.col-12 col-sm-8 -->
                    <div class="col-12 col-sm-4 pt-1">
                        <label for="uploadimage" class="mt-4 userform-image-container d-flex align-items-center flex-column">
                        <!-- <div class="mt-4 userform-image-container d-flex align-items-center flex-column"> -->
                          <div class="rounded-circle userform-border-camera-container p-1">
                            <div class="user-management-main-info-img camera-container align-items-center d-flex justify-content-center rounded-circle user-border-admin-role">
                              <span v-if="!user.profilePicture" class="material-icons white-text userform-camera-icon">camera_alt</span>
                              <!-- <img src="/adminlte/img/reconnes/user2-160x160.jpg" class="rounded-circle user-management-logo-avatar" alt="User Logo"> -->
                              <img v-if="user.profilePicture" class="rounded-circle user-management-logo-avatar" :src="user.profilePicture">
                            </div>
                          </div>
                          <input id="uploadimage" type="file" @change="onFileChange"/>
                          <span class="agent-mini-color-gray mt-3 mb-4 font-weight-normal">Profile Picture</span>
                        <!-- </div> -->
                        </label>
                        <div class="userform-roles-container border">
                            <div class="userform-roles-title-container border-bottom pb-3 pt-2">
                            <span class="font-weight-regular black-text font-size-16px ml-3">Role</span>
                            </div>
                            <div class="userform-role-title">
                              <div class="form-group ml-3user mt-2">
                                <div v-if="isLoggedUserOwner" class="ml-2 custom-control custom-radio form-check">
                                <input v-model="user.role" :value="this.$roles.OWNER.id" class="form-check-input custom-control-input" type="radio" id="agent_customCheckbox1">
                                <label class="form-check-label custom-control-label agent-regular-font black-text agent-disable-weigth d-flex align-items-center" for="agent_customCheckbox1">
                                  <span class="material-icons blue-text">manage_accounts</span>
                                  Owner
                                </label>
                                </div>
                                <div class="ml-2 custom-control custom-radio form-check">
                                <input v-model="user.role" class="form-check-input custom-control-input" type="radio" id="agent_customCheckbox2" :value="this.$roles.ADMIN.id">
                                <label class="form-check-label custom-control-label agent-regular-font black-text agent-disable-weigth d-flex align-items-center" for="agent_customCheckbox2">
                                  <span class="material-icons green-text">manage_accounts</span>
                                  Administrator
                                </label>
                                </div>
                                <div class="ml-2 custom-control custom-radio form-check">
                                <input v-model="user.role" class="form-check-input custom-control-input" type="radio" id="agent_customCheckbox3" :value="this.$roles.MEMBER.id">
                                <label class="form-check-label custom-control-label agent-regular-font black-text agent-disable-weigth d-flex align-items-center" for="agent_customCheckbox3">
                                  <span class="material-icons green-text">person</span>
                                  Member
                                </label>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                  </div><!-- /.row -->
                </div><!-- /.modal-body -->
                <div class="border-top-none modal-footer">
                  <button :disabled="isUserFormInvalid" @click="addUser" type="button" class="blue-text agent-border btn create-agent-buttons-main-action">Add</button>
                  <button @click="close()" type="button" class="red-text agent-border btn create-agent-buttons-main-action" data-dismiss="modal">Cancel</button>
                </div>
            </div>
            </div>
        </div>
    </form>
    </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import jQuery from 'jquery'

export default {
  name: 'UserForm',
  components: {},
  props: {},
  data () {
    return {
      showNameInput: false,
      user: {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        phone: 0,
        role: -1,
        profilePicture: '',
        id: -1
      },
      confirm_password: '',
      userNameWasWritten: false,
      firstNameWasWritten: false,
      lastNameWasWritten: false,
      emailWasWritten: false,
      phoneWasWritten: false,
      passwordWasWritten: false,
      userTryToAdd: false
    }
  },
  computed: {
    ...mapState('user', ['loggedUser']),
    isUserNameInBlank () {
      return this.$validateIsBlank(this.user.username)
    },
    isFirstNameInBlank () {
      return this.$validateIsBlank(this.user.firstname)
    },
    isLastNameInBlank () {
      return this.$validateIsBlank(this.user.lastname)
    },
    isEmailInBlank () {
      return this.$validateIsBlank(this.user.email)
    },
    isInValidEmail () {
      if (!this.$validateIsBlank(this.user.email)) {
        return !this.$validateEmail(this.user.email)
      }
      return false
    },
    isPhoneInBlank () {
      return this.$validateIsBlank(this.user.phone) && this.phoneWasWritten
    },
    isPasswordInBlank () {
      return this.$validateIsBlank(this.user.password) && this.passwordWasWritten
    },
    isConfirmPasswordEqualToPassword () {
      return this.user.password === this.confirm_password
    },
    isUserFormInvalid () {
      return this.isUserNameInBlank || this.isFirstNameInBlank || this.isLastNameInBlank || this.isEmailInBlank || this.isInValidEmail || this.isPasswordInBlank || !this.isConfirmPasswordEqualToPassword
    },
    isLoggedUserOwner () {
      return this.loggedUser.role === this.$roles.OWNER.id
    },
    isLoggedUserAdmin () {
      return this.loggedUser.role === this.$roles.ADMIN.id
    },
    isLoggedUserMember () {
      return this.loggedUser.role === this.$roles.MEMBER.id
    }
  },
  methods: {
    ...mapMutations('user', ['addUserEntity']),
    updateUserNameWasWritten () {
      this.userNameWasWritten = true
    },
    updateFirstNameWasWritten () {
      this.firstNameWasWritten = true
    },
    updateLastNameWasWritten () {
      this.lastNameWasWritten = true
    },
    updateEmailWasWritten () {
      this.emailWasWritten = true
    },
    updatePhoneWasWritten () {
      this.phoneWasWritten = true
    },
    updatePasswordWasWritten () {
      this.passwordWasWritten = true
    },
    switchNameInput () {
      this.showNameInput = !this.showNameInput
    },
    onFileChange (e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      const reader = new FileReader()
      const self = this
      reader.onload = (e) => {
        self.user.profilePicture = e.target.result
      }
      reader.readAsDataURL(files[0])
    },
    addUser () {
      this.userTryToAdd = true
      this.addUserEntity(this.user)
      jQuery('#user-form-modal').modal('hide')
      this.resetUserForm()
    },
    resetUserForm () {
      this.user = {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        phone: 0,
        role: -1,
        profilePicture: '',
        id: -1
      }
      this.showNameInput = false
      this.confirm_password = ''
      this.userNameWasWritten = false
      this.firstNameWasWritten = false
      this.lastNameWasWritten = false
      this.emailWasWritten = false
      this.phoneWasWritten = false
      this.passwordWasWritten = false
      this.userTryToAdd = false
    }
  }
}
</script>
<style>
.user-management-logo-avatar{
  max-width: 160px;
  max-height: 160px;
  width: 160px;
  max: 160px;
}
.color-sample-container{
  box-shadow: 0px 19px 27px #0C1F6A12 !important;
  border-radius: 12px !important;
}

.userform-input-text{
  border: 1px solid #E5E9EC !important;
  border-radius: 6px !important;
}
.green-text{
  color: #1ED675 !important;
}
.w-70{
  width: 70% !important;
}
.agent-form-name-font{
  font: normal normal normal 24px/29px Poppins;
  letter-spacing: 0px;
}
.agent-regular-font{
  font-size: 14px !important;
}
.agent-regular-font-11px{
  font-size: 11px !important;
}
.agent-disable-weigth{
  font-weight: unset !important;
}
div.modal-content.agent-containers{
  border-radius: 12px;
}
  .agent-type-container{
    height: 159px
  }
  .random-color-selection-container{
    padding: 2px !important;
  }
  .color-selection-container{
    border-radius: 8px;
    opacity: 1;
    width: 41px;
    padding: 3px;
  }
  .color-selection-container-border{
    border: 1px solid #00C9FF;
  }
    .targetform-action{
        bottom: -28%;
        position: absolute;
        right: 8%;
        font-size: .875rem;
    }

    .target-form-color-components{
        width: 30px;
        height: 30px;
    }

    .custom-control-input:checked~.custom-control-label::before {
      color: #fff;
      border-color: #00B1FF;
      background-color: #00B1FF;
      box-shadow: none;
    }

    .target-form-color-spacing-bottom{
        margin-top: 44% !important;
    }

    .agentform-color-components-align{
        margin: auto;
    }

    .image-button{
      background-image: url('~@/assets/Rect.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      width: 32px;
      height: 32px;
    }

    .agent-border{
        border: 1px solid #F1F3F5;
        border-radius: 12px;
        width: 90px;
        height: 47px;
    }

    .input.invalid input {
        border: 1px solid red;
    }

    .target-combo-box-size{
        height: 114px;
    }

    .combo-box-left-padding{
        flex: 1 1 auto;
        min-height: 1px;
        padding-left: 19px;
    }

    .combo-box-right-padding{
        padding-right: 15px;
    }

    .more-option-padding{
      padding-top: 12px;
      margin-right: 15px;
    }

    .postal-title{
      overflow: hidden;
    }

    .p-colorpicker-preview {
        width: 30px;
        height: 30px;
        margin: auto;
        background-image: url('~@/assets/Rect.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }

    .p-colorpicker-overlay {
      margin-left: 1.5rem;
    }

    .triggers-label-space {
      margin-left: 1.5rem;
      margin-bottom: 0.5rem;
    }

    .triggers-options-space {
      margin-top: 0.5rem;
    }

    .triggers-container-label-space{
      margin-bottom: 0.2rem;
    }

    .triggers-more-options-area-size{
      height: 335px;
    }

    button.delete-left-align{
      margin-right: auto;
    }

</style>
<style scoped>
input[type="file"]{
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow:hidden;
  position:absolute;
  z-index: -1;
}

div.agent-containers div.agentform-default-color-box svg {
  fill: #B3B3B3;
}

div.file-import-container svg {
  opacity: 1;
  fill: #B3B3B3;
  width: 50px;
  height: 50px;
}

label[for='uploadimage']{
  transition: all .5s;
  cursor: pointer;
}
.agent-name-input {
   width: 50%;
}
.camera-container{
  background-color: #E5E9EC;
  width: 120px;
  height: 120px;
}
.userform-border-camera-container{
  background-color: #ffffff;
  border: 1px solid #E5E9EC;
}
.userform-camera-icon{
  font-size: 55px
}
.logo-image{
  max-width: 1.2rem;
  max-height: 1.2rem;
  width: 1.2rem;
  max: 1.2rem;
}
.logo{
  text-align: right;
  opacity: 1;
  font-size: 14px;
}
.form-control {
  border-radius: 0rem;
}
.pencil-align-main {
  margin: auto;
    margin-left: 1.5rem;
}
.pencil-align-secondary {
  margin: auto;
  margin-left: 10%;
}
.btn-colors-size {
  border-radius: 7px;
}

.bordered-input-name-withfocus{
  border-top: 2px solid #00B1FF;
  border-right: 2px solid #00B1FF;
  border-bottom: 2px solid #00B1FF;
}

.bordered-input-name-withoutfocus{
  border-top: none !important;
  border-right: none !important;
  border-bottom: none !important;
}

.form-control:disabled, .form-control[readonly] {
    background-color: transparent;
    opacity: 1;
}

.target-input-borders {
  border-radius: 0.8rem
}

.target-inputs-separator {
  margin-top: 14px;
}

div.private-program-container label {
  color: #00B1FF;
}

label {
  color: #495057;
}

textarea {
  resize: none;;
}

.disable-float{
  float: none !important;
}

.triggers-border-container{
  border: 1px solid #EFE6E6;
}
.info-box >span{
  width: 56px;
  height: 56px;
  border-radius: 13px;
  box-shadow: 3px 12px 23px #eae9e9;
  opacity: 1;
}
.info-box-content-custom{
  justify-content: unset !important
}
.target-color-section{
  background-color: #f2f4f6
}
.private-program-container label::before{
  border: 2px solid #00B1FF;
  box-shadow: unset;
  background-color: #fbfbfb
}

.learn-more-border-line{
  border: 1px solid #F1F3F5
}

.middle-settings-agent{
  overflow: hidden;
  padding-bottom: 9px;
  border-bottom: 1px solid rgba(0,0,0,.125);
}

.line-height-1-7{
  line-height: 1.7rem;
}

@media (max-width: 480px) {
   .agent-name-input {
    font-size: 20px;
   }
}
</style>
