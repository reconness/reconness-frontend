<template>
    <div class="col-12">
        <form>
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content agent-containers">
              <div class="modal-header remove-flex">
                <div class="row">
                  <div class="col-12">
                    <div class="row">
                      <div class="col-8">
                        <div class="d-flex">
                          <div class="d-flex align-items-center" :class="{'w-100': showNameInput}">
                            <input v-if="showNameInput" v-model="agent.name" :placeholder="agent.name" @keyup="enableValidationMessageName" class="form-control agent-placeholder w-100 agent-name-input" :readonly="this.$store.state.agent.fromDetailsLink">
                            <span v-if="!showNameInput" class="agent-name-input flex-fill pl-2">{{agent.name}}</span>
                            <span v-if="!showNameInput" class="material-icons cursor-pointer ml-2 blue-text" @click="switchNameInput"> open_in_new</span>
                          </div>
                        </div><!-- /.d-flex -->
                      </div><!-- /.col-12 -->
                      <div class="col-4">
                        <div class="d-flex flex-row-reverse">
                          <span v-if="editable" class="title-target-admin-form agent-mini-color-gray mr-1">Settings</span>
                          <span v-else class="title-target-admin-form agent-mini-color-gray mr-1">New Agent</span>
                        </div>
                      </div>
                    </div><!-- /.row -->
                  </div>
                </div>
              </div>
              <div class="modal-body ligth-gray-background">
                <div class="row" id="middle-section">
                  <div class="col-12 col-sm-8" v-if="isVisibleTopSection">
                    <div class="col-12">
                      <div class="d-flex justify-content-between">
                        <input :readonly="this.$store.state.agent.fromDetailsLink" v-model="agent.repository" @keyup="enableValidationMessageRepository" class="ligth-gray-background form-control zero-borders mt-4 w-75" placeholder="Repository">
                        <div class="d-flex flex-row justify-content-end file-import-container mt-2">
                          <div class="mr-2 logo d-flex flex-column">
                            <span>Add</span>
                            <span>your logo</span>
                          </div>
                          <input :disabled="this.$store.state.agent.fromDetailsLink" id="uploadimage" type="file" @change="onFileChange">
                          <label for="uploadimage">
                            <FileCodeIco/>
                          </label>
                        </div><!-- /.d-flex -->
                      </div>
                    </div><!-- /.col-12 -->
                    <div class="col-12" v-if="validators.blank.repository">
                      <span :class="{invalid: validators.blank.repository}">The field repository is required</span>
                    </div>
                        <div class="col-12">
                          <input :readonly="this.$store.state.agent.fromDetailsLink" v-model="agent.target" @keyup="enableValidationMessageTarget" class="ligth-gray-background form-control zero-borders" placeholder="Target">
                        </div><!-- /.col-12 -->
                        <div class="col-12" v-if="validators.blank.target">
                          <span :class="{invalid: validators.blank.target}">The field target is required</span>
                        </div>
                        <div class="col-12">
                          <input :readonly="this.$store.state.agent.fromDetailsLink" v-model="agent.command" @keyup="enableValidationMessageCommand" class="ligth-gray-background form-control zero-borders  mt-1" placeholder="Command">
                        </div>
                        <div class="col-12" v-if="validators.blank.command">
                          <span :class="{invalid: validators.blank.command}">The field command is required</span>
                        </div>
                        <div class="col-12">
                        <a href="https://docs.reconness.com/agents/add-agent#add-new-agent" class="mb-3 blue-text d-flex justify-content-end">Learn more</a>
                        </div><!-- /.col-12 -->
                        <div class="row show multi-collapse">
                    <div class="col-12 col-md-6">
                        <div class="card agent-containers agent-type-container ligth-gray-background combo-box-size">
                            <div class="card-header border-bottom-none">
                              <div class="middle-settings-agent">
                                  <h3 class="card-title font-weight-bold">
                                  Agent Type
                                  </h3>
                              </div>
                            </div><!-- /.card-header -->
                            <div class="combo-box-left-padding">
                            <div class="form-group">
                                <div class="custom-control custom-radio form-check">
                                <input :disabled="this.$store.state.agent.fromDetailsLink" class="form-check-input custom-control-input" type="radio" id="agent_customCheckbox1" :value="this.$agentType.TARGET" v-model="agent.type">
                                <label class="form-check-label custom-control-label" for="agent_customCheckbox1">Target</label>
                                </div>
                                <div class="custom-control custom-radio form-check">
                                <input :disabled="this.$store.state.agent.fromDetailsLink" class="form-check-input custom-control-input" type="radio" id="agent_customCheckbox2" :value="this.$agentType.ROOTDOMAIN" v-model="agent.type">
                                <label class="form-check-label custom-control-label" for="agent_customCheckbox2">RootDomain</label>
                                </div>
                                <div class="custom-control custom-radio form-check">
                                <input :disabled="this.$store.state.agent.fromDetailsLink" class="form-check-input custom-control-input" type="radio" id="agent_customCheckbox3" :value="this.$agentType.SUBDOMAIN" v-model="agent.type">
                                <label class="form-check-label custom-control-label" for="agent_customCheckbox3">Subdomain</label>
                                </div>
                            </div>
                            </div><!-- /.card-body -->
                        </div><!-- /.card-->
                        </div><!-- /.col-12-->
                    <div class="col-12 col-md-6">
                        <div class="card agent-containers combo-box-size ligth-gray-background">
                            <div class="card-header border-bottom-none">
                            <div class="middle-settings-agent">
                                <h3 class="card-title font-weight-bold">
                                Triggers
                                </h3>
                            </div>
                            </div><!-- /.card-header -->
                            <div class="combo-box-left-padding">
                            <div class="form-group">
                                <div class="custom-control custom-checkbox form-check">
                                <input :disabled="this.$store.state.agent.fromDetailsLink" class="form-check-input custom-control-input" type="checkbox" id="agent_customCheckbox4" v-model="agent.isAliveTrigger">
                                <label class="form-check-label custom-control-label" for="agent_customCheckbox4">Run Only if it is Alive</label>
                                </div>
                                <div class="custom-control custom-checkbox form-check">
                                <input :disabled="this.$store.state.agent.fromDetailsLink" class="form-check-input custom-control-input" type="checkbox" id="agent_customCheckbox5" v-model="agent.isHttpOpenTrigger">
                                <label class="form-check-label custom-control-label" for="agent_customCheckbox5">Run Only if has Http Open</label>
                                </div>
                                <div class="form-check text-right more-option-padding">
                                <a href="#" @click="showMiddleSection"><span class="form-check-label blue-text">More Options</span></a>
                                </div>
                            </div>
                            </div><!-- /.card-body -->
                        </div><!-- /.card-->
                        </div>
                        <div class="col-12" v-if="validators.blank.type">
                          <span :class="{invalid: validators.blank.type}">The field agent type is required</span>
                        </div>
                </div>
                    </div><!-- /.col-12 col-sm-8 -->
                    <div class="col-12 col-sm-4 pt-1" v-if="isVisibleTopSection">
                      <div class="target-color-section mt-4 pt-3 border-radios-8px pl-2 pr-2">
                        <div class="row">
                          <div class="col-12">
                            <div class="info-box">
                              <div class="info-box-content info-box-content-custom ml-2 mt-2">
                                <span class="info-box-text domain-names-target">
                                  {{agent.name}}
                                </span>
                                <span v-if="editable"  class="agent-mini-agent-details pt-0 pb-0 black-text border-right-0 mt-1">Editing...</span>
                                <span v-else class="agent-mini-agent-details pt-0 pb-0 black-text border-right-0 mt-1">Creating...</span>
                              </div> <!-- /.info-box-content -->
                              <span class="info-box-icon icon-style mr-2" :style ="{background: 'linear-gradient(135deg,'+agent.primaryColor +' '+ '0%,' + agent.secondaryColor + ' ' + '100%) 0% 0% no-repeat padding-box'}">
                                <AccountCogIco v-if="!agent.image && this.$installedByUser(agent.createdBy)" class="w-75 h-75"/>
                                <ApplicationCogIco v-if="!agent.image && this.$installedBySystem(agent.createdBy)" class="w-75 h-75"/>
                                <img v-if="agent.image" class="logo-image w-75 h-75" :src="agent.image">
                              </span>
                            </div> <!-- /.info-box -->
                          </div>
                          <div class="col-12 text-center mt-2">
                            <h3 class="font-weight-bold card-title disable-float mt-4">
                              Pick a Color
                            </h3>
                            <div class="mt-4 pl-0 w-100 agent-containers target-combo-box-size target-color-section">
                              <div class="pl-0 combo-box-left-padding">
                                <div class="form-group">
                                  <div class="row">
                                    <div class="col-4">
                                      <div :class="{'color-selection-container-border': isRandomColorSelected}" class="d-flex m-auto color-selection-container random-color-selection-container">
                                        <button :disabled="this.$store.state.agent.fromDetailsLink" type="button" @click="setRandomColor" class="agent-colorpicker btn btn-block target-form-color-components agentform-color-components-align image-button"></button>
                                      </div>
                                    </div>
                                    <div class="col-4">
                                      <div :class="{'color-selection-container-border': isBlueColorSelected && !isRandomColorSelected}" class="m-auto color-selection-container">
                                        <button :disabled="this.$store.state.agent.fromDetailsLink" type="button" @click="setBlueColor" class="blue-btn-backg btn btn-block btn-default target-form-color-components agentform-color-components-align btn-colors-size"></button>
                                      </div>
                                    </div>
                                    <div class="col-4">
                                      <div :class="{'color-selection-container-border': isVioletColorSelected && !isRandomColorSelected}" class="m-auto color-selection-container">
                                        <button :disabled="this.$store.state.agent.fromDetailsLink" type="button" @click="setVioletColor" class="violet-btn-backg btn btn-block btn-default target-form-color-components agentform-color-components-align btn-colors-size"></button>
                                      </div>
                                    </div>
                                    <div class="col-4 pt-3">
                                      <div :class="{'color-selection-container-border': isRedColorSelected && !isRandomColorSelected}" class="m-auto color-selection-container">
                                        <button :disabled="this.$store.state.agent.fromDetailsLink" type="button" @click="setRedColor" class="red-btn-backg btn btn-block btn-default target-form-color-components agentform-color-components-align btn-colors-size"></button>
                                      </div>
                                    </div>
                                    <div class="col-4 pt-3">
                                      <div :class="{'color-selection-container-border': isOrangeColorSelected && !isRandomColorSelected}" class="m-auto color-selection-container">
                                        <button :disabled="this.$store.state.agent.fromDetailsLink" type="button" @click="setOrangeColor" class="orange-btn-backg btn btn-block btn-default target-form-color-components agentform-color-components-align btn-colors-size"></button>
                                      </div>
                                    </div>
                                    <div class="col-4 pt-3">
                                      <div :class="{'color-selection-container-border': isGreenColorSelected && !isRandomColorSelected}" class="m-auto color-selection-container">
                                        <button :disabled="this.$store.state.agent.fromDetailsLink" type="button" @click="setGreenColor" class="green-btn-back btn btn-block btn-default target-form-color-components agentform-color-components-align btn-colors-size"></button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div><!-- /.card-body -->
                            </div><!-- /.card-->
                          </div>
                        </div>
                      </div>
                    </div>
                  <div v-if="isVisibleMiddleSection" class="col-12">
                    <div id="triggers-section">
                      <div class="mt-4 mb-2 mx-2 d-flex justify-content-between">
                        <b class="triggers-label-space">Triggers</b>
                        <a href="#" @click="showTopSection">
                          <span class="material-icons line-height-1-7 triggers-label-arrow-space">keyboard_arrow_down</span>
                        </a>
                      </div>
                      <div class="triggers-border-container combo-box-left-padding rounded-corners triggers-more-options-area-size">
                        <div class="form-group triggers-options-space">
                            <div class="custom-control custom-checkbox form-check">
                            <input class="form-check-input custom-control-input" type="checkbox" id="agent_customCheckbox4" v-model="agent.isAliveTrigger">
                            <label class="opacity-none form-check-label custom-control-label" for="agent_customCheckbox4">Run Only if it is Alive</label>
                            </div>
                            <div class="custom-control custom-checkbox form-check">
                            <input class="form-check-input custom-control-input" type="checkbox" id="agent_customCheckbox5" v-model="agent.isHttpOpenTrigger">
                            <label class="form-check-label custom-control-label" for="agent_customCheckbox5">Run Only if has Http Open</label>
                            </div>
                        </div><!-- /.form-group -->
                      </div><!-- /.combo-box-left-padding -->
                    </div><!-- #triggers-section -->
                  </div><!-- /.col-12 -->
                  </div><!-- /.row -->
                  <div class="row" v-if="isVisibleTopSection || isVisibleBottomSection">
                    <div class="col-12">
                      <div :class="{'mt-4': isVisibleBottomSection}" class="my-3 agent-containers min-height-auto">
                        <div class="info-box-content d-flex px-2 border-radius-8px justify-content-between learn-more-border-line">
                          <span class="info-box-text">
                            <b class="mr-2">Script</b>
                            <a href="https://docs.reconness.com/agents/script-agent" class="blue-text">Learn more</a>
                          </span>
                          <a href="#" @click="showBottomSection">
                            <span v-show="arrow_up" class="material-icons learn-more-arrow-up">keyboard_arrow_up</span>
                            <span v-show="arrow_down" class="learn-more-arrow-down material-icons">keyboard_arrow_down</span>
                          </a>
                        </div>
                        <!-- /.info-box-content -->
                      </div>
                    </div><!-- /.col-12 -->
                    <div v-if="isVisibleBottomSection"  id="bottom-section" class="col-12">
                      <v-ace-editor v-model:value="agent.script" lang="csharp" class="mt-4" style="height:300px" theme="monokai"/>
                    </div>
                  </div><!-- /.row -->
                </div><!-- /.modal-body -->
                <div class="border-top-none modal-footer">
                  <button type="button" :disabled="isFormValid" @click="addAgent(this.agent)" class="blue-text agent-border btn create-agent-buttons-main-action">Accept</button>
                  <button @click="close()" type="button" class="red-text agent-border btn create-agent-buttons-main-action" data-dismiss="modal">Cancel</button>
                </div>
            </div>
            </div>
        </div>
    </form>
    </div>
</template>
<script>
import jQuery from 'jquery'
import { VAceEditor } from 'vue3-ace-editor'
import AccountCogIco from '@/components/Icons/AccountCogIco.vue'
import FileCodeIco from '@/components/Icons/FileCodeIco.vue'
import { mapMutations } from 'vuex'
import { TargetMixin } from '@/mixins/TargetMixin'
import ApplicationCogIco from '@/components/Icons/ApplicationCogIco.vue'

export default {
  name: 'AgentForm',
  components: {
    VAceEditor,
    AccountCogIco,
    FileCodeIco,
    ApplicationCogIco
  },
  props: {
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      agent: {
        name: 'My Agent',
        primaryColor: '#737be5',
        secondaryColor: '#7159d3',
        repository: '',
        target: '',
        command: '',
        type: '',
        isRootDomainType: false,
        isSubDomainType: false,
        isAliveTrigger: false,
        isHttpOpenTrigger: false,
        category: '',
        script: '',
        id: -1,
        creationDate: new Date().toString(),
        image: '',
        status: this.$entityStatus.FINISHED,
        lastRun: null,
        createdBy: this.$entitySource.USER.id
      },
      colorpickerData: '',
      isVisibleTopSection: true,
      isVisibleMiddleSection: false,
      isVisibleBottomSection: false,
      middleSection: 'collapse',
      editable: false,
      arrow_down: false,
      arrow_up: true,
      isPencilVisible: false,
      isPencilVisibleAndClick: false,
      validators: {
        blank: {
          name: false,
          repository: false,
          target: false,
          command: false
        }
      },
      nextAgentSequence: 30,
      showNameInput: false,
      isRandomColorSelected: false
    }
  },
  mixins: [TargetMixin],
  computed: {
    isValid () {
      if (this.agent.name !== '' &&
      this.agent.repository !== '' &&
      this.agent.target !== '' &&
      this.agent.command !== '' &&
      this.agent.type !== '' && (this.agent.isAliveTrigger || this.agent.isHttpOpenTrigger)) {
        return false
      }
      return true
    },
    loadSelectedAgent () {
      const id = this.$store.getters['agent/idAgent']
      return this.$store.getters['agent/getAgentById'](parseInt(id))
    },
    isFormValid () {
      return (this.validators.blank.name && this.validators.blank.repository && this.validators.blank.target && this.validators.blank.command)
    },
    isBlueColorSelected () {
      return this.agent.primaryColor === '#03DCED'
    },
    isVioletColorSelected () {
      return this.agent.primaryColor === '#737be5'
    },
    isRedColorSelected () {
      return this.agent.primaryColor === '#F96767'
    },
    isOrangeColorSelected () {
      return this.agent.primaryColor === '#FF9966'
    },
    isGreenColorSelected () {
      return this.agent.primaryColor === '#3adb99'
    }
  },
  watch: {
    loadSelectedAgent: function (value) {
      if (value !== undefined) {
        this.agent.name = value.name
        this.agent.background = value.background
        this.agent.repository = value.repository
        this.agent.target = value.target
        this.agent.command = value.command
        this.agent.type = value.type
        this.agent.isAliveTrigger = value.isAliveTrigger
        this.agent.isHttpOpenTrigger = value.isHttpOpenTrigger
        this.agent.script = value.script
        this.editable = true
        this.agent.id = value.id
        this.agent.createdBy = value.createdBy
        this.agent.primaryColor = value.primaryColor
        this.agent.secondaryColor = value.secondaryColor
      } else {
        this.resetAgentForm()
        this.agent.script = ''
      }
    }
  },
  methods: {
    ...mapMutations('agent', ['setIsDeletetFromForm']),
    setBlueColor: function () {
      this.agent.primaryColor = '#03DCED'
      this.agent.secondaryColor = '#0cb8e0'
      this.isRandomColorSelected = false
    },
    setVioletColor: function () {
      this.agent.primaryColor = '#737be5'
      this.agent.secondaryColor = '#7159d3'
      this.isRandomColorSelected = false
    },
    setRedColor: function () {
      this.agent.primaryColor = '#F96767'
      this.agent.secondaryColor = '#FF4343'
      this.isRandomColorSelected = false
    },
    setOrangeColor: function () {
      this.agent.primaryColor = '#FF9966'
      this.agent.secondaryColor = '#f36a33'
      this.isRandomColorSelected = false
    },
    setGreenColor: function () {
      this.agent.primaryColor = '#3adb99'
      this.agent.secondaryColor = '#16c465'
      this.isRandomColorSelected = false
    },
    addAgent () {
      this.enableValidationMessages()
      if (!this.validators.blank.name && !this.validators.blank.repository && !this.validators.blank.target && !this.validators.blank.command && !this.validators.blank.type) {
        const randomResult = this.$randomBooleanResult()
        if (this.editable) {
          if (randomResult) {
            this.agent.id = parseInt(this.$store.getters['agent/idAgent'])
            this.$store.commit('agent/updateAgent', this.agent)
            this.$store.commit('agent/setIdAgent', -1)
            this.updateOperationStatus(this.$entityStatus.SUCCESS, this.$message.successMessageForTargetEdition)
          } else {
            this.$store.commit('agent/setIdAgent', -1)
            this.updateOperationStatus(this.$entityStatus.FAILED, this.$message.errorMessageForEditionPurpose)
          }
        } else {
          if (randomResult) {
            this.$store.commit('agent/addAgent', this.agent)
            this.updateOperationStatus(this.$entityStatus.SUCCESS, this.$message.successMessageForTargetEdition)
          } else {
            this.updateOperationStatus(this.$entityStatus.FAILED, this.$message.errorMessageForEditionPurpose)
          }
        }
        this.resetAgentForm()
        jQuery('#exampleModalCenter').modal('hide')
        this.editable = false
      }
    },
    close () {
      this.resetAgentForm()
      this.editable = false
      this.$store.commit('agent/setIdAgent', -1)
      this.$store.commit('agent/setDetailsLinks', false)
    },
    resetAgentForm () {
      this.agent = {
        name: 'My Agent',
        background: 'transparent linear-gradient(160deg,#737be5 0%, #7159d3 100%) 0% 0% no-repeat padding-box',
        repository: '',
        target: '',
        command: '',
        type: '',
        isAliveTrigger: false,
        isHttpOpenTrigger: false,
        category: '',
        script: '',
        id: -1,
        creationDate: new Date().toString(),
        image: '',
        lastRun: null,
        status: this.$entityStatus.FINISHED,
        createdBy: this.$entitySource.USER.id
      }
      this.validators = {
        blank: {
          name: false,
          repository: false,
          target: false,
          command: false,
          type: false
        }
      }
    },
    enableValidationMessageName () {
      if (this.agent.name === '') {
        this.validators.blank.name = true
      } else {
        this.validators.blank.name = false
      }
    },
    enableValidationMessageRepository () {
      if (this.agent.repository === '') {
        this.validators.blank.repository = true
      } else {
        this.validators.blank.repository = false
      }
    },
    enableValidationMessageTarget () {
      if (this.agent.target === '') {
        this.validators.blank.target = true
      } else {
        this.validators.blank.target = false
      }
    },
    enableValidationMessageCommand () {
      if (this.agent.command === '') {
        this.validators.blank.command = true
      } else {
        this.validators.blank.command = false
      }
    },
    enableValidationMessageType () {
      if (this.agent.type === '') {
        this.validators.blank.type = true
      } else {
        this.validators.blank.type = false
      }
    },
    enableValidationMessages () {
      this.enableValidationMessageName()
      this.enableValidationMessageTarget()
      this.enableValidationMessageRepository()
      this.enableValidationMessageCommand()
      this.enableValidationMessageType()
    },
    enableBottomSection () {
      this.isVisibleBottomSection = true
    },
    enableMiddleSection () {
      this.isVisibleMiddleSection = true
    },
    disableBottomSection () {
      this.isVisibleBottomSection = false
    },
    disableMiddleSection () {
      this.isVisibleMiddleSection = false
    },
    enableTopSection () {
      this.isVisibleTopSection = true
    },
    disableTopSection () {
      this.isVisibleTopSection = false
    },
    showBottomSection () {
      if (this.isVisibleTopSection) {
        this.disableMiddleSection()
        this.enableBottomSection()
        this.disableTopSection()
      } else {
        this.disableBottomSection()
        this.enableTopSection()
      }
      this.arrow_down = !this.arrow_down
      this.arrow_up = !this.arrow_up
    },
    showMiddleSection () {
      this.enableMiddleSection()
      this.disableBottomSection()
      this.disableTopSection()
    },
    showTopSection () {
      this.enableTopSection()
      this.disableMiddleSection()
    },
    setData (nameExt) {
      this.agent.name = nameExt
    },
    hideArrow: function () {
      this.arrow_down = !this.arrow_down
      this.arrow_up = !this.arrow_up
    },
    onFileChange (e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      const reader = new FileReader()
      const vm = this
      reader.onload = (e) => {
        vm.agent.image = e.target.result
      }
      reader.readAsDataURL(files[0])
    },
    setRandomColor () {
      const predefinedColors = this.$store.state.agent.systemColors
      const randomColor = predefinedColors[Math.floor(Math.random() * predefinedColors.length)]
      this.agent.primaryColor = randomColor.primaryColor
      this.agent.secondaryColor = randomColor.secondaryColor
      this.isRandomColorSelected = true
    },
    verifyPencilStatus () {
      if (this.isPencilVisibleAndClick) {
        this.isPencilVisible = true
      } else {
        this.isPencilVisible = false
      }
    },
    onEdit () {
      this.$store.commit('agent/setDetailsLinks', false)
    },
    switchNameInput () {
      this.showNameInput = !this.showNameInput
    }
  }
}
</script>
<style>
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

    .invalid {
        color: red;
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
  font-size: 18px;
  font-weight: 100 !important;
  font-size: 1.1rem;
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

.p-chips{
  width: 100%;
  opacity: 1;
  background: #fffffF 0% 0% no-repeat padding-box;
  font-size: 14px;
  color: #000000;
}
.title-target-admin-form{
  font-size: 24px
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
