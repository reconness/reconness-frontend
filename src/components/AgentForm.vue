<template>
    <div class="col-12">
        <Toast :baseZIndex="200"/>
        <form>
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content agent-containers">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12 collapse multi-collapse" id="top-section" style="margin-bottom: 20px;">
                        <div style="float: left;" class="d-flex flex-row agent-name-container">
                            <input style="width: 65%" v-model="agent.name" v-bind:class="{ 'bordered-input-name-withfocus': isPencilVisibleAndClick}" class="form-control agent-placeholder agent-name-input" placeholder="My agent" @focus="isPencilVisible=true" @blur="isPencilVisible=false;isPencilVisibleAndClick=false" @mouseover="isPencilVisible=true" @mouseleave="verifyPencilStatus" @click="isPencilVisible=true; isPencilVisibleAndClick=true" @keyup.enter="isPencilVisible=false; isPencilVisibleAndClick=false" :readonly="$store.state.fromDetailsLink">
                            <span v-show="isPencilVisible" class="material-icons blue-text pencil-align-secondary">edit</span>
                        </div><!-- /.d-flex -->
                    </div><!-- /.col-12 -->
                </div>
                <div class="row show multi-collapse" id="middle-section">
                    <div class="col-12 col-sm-8">
                        <div class="col-12">
                        <div class="d-flex flex-row" v-bind:class="{ 'justify-content-end': isPencilVisible}">
                            <input  v-model="agent.name" @keyup="enableValidationMessageName" v-bind:class="{ 'bordered-input-name-withfocus': isPencilVisibleAndClick}" class="form-control agent-placeholder agent-name-input" placeholder="My agent" @focus="isPencilVisible=true" @blur="isPencilVisible=false;isPencilVisibleAndClick=false" @mouseover="isPencilVisible=true" @mouseleave="verifyPencilStatus" @click="isPencilVisible=true; isPencilVisibleAndClick=true" @keyup.enter="isPencilVisible=false; isPencilVisibleAndClick=false" :readonly="$store.state.fromDetailsLink">
                            <span v-show="isPencilVisible" class="material-icons blue-text pencil-align-main">edit</span>
                        </div><!-- /.d-flex -->
                        </div><!-- /.col-12 -->
                        <div class="col-12" v-if="validators.blank.name">
                            <span :class="{invalid: validators.blank.name}">The field agent is required</span>
                        </div>
                        <div class="col-12">
                            <div class="d-flex flex-row justify-content-end file-import-container">
                            <span style="text-align: right; opacity: 1; font-size: 14px;" class="mr-2">
                            Add
                            <br>
                            your logo
                            </span>
                            <input :disabled="$store.state.fromDetailsLink" id="uploadimage" type="file" @change="onFileChange">
                            <label for="uploadimage">
                            <FileCodeIco/>

                            </label>
                        </div><!-- /.d-flex -->
                        </div>
                        <div class="col-12">
                          <input :readonly="$store.state.fromDetailsLink" v-model="agent.repository" @keyup="enableValidationMessageRepository" style="border-top: none; border-left: none; border-right: none;" class="form-control" placeholder="Repository">
                        </div><!-- /.col-12 -->
                        <div class="col-12" v-if="validators.blank.repository">
                            <span :class="{invalid: validators.blank.repository}">The field repository is required</span>
                        </div>
                        <div class="col-12">
                          <input :readonly="$store.state.fromDetailsLink" v-model="agent.target" @keyup="enableValidationMessageTarget" style="border-top: none; border-left: none; border-right: none;" class="form-control" placeholder="Target">
                        </div><!-- /.col-12 -->
                        <div class="col-12" v-if="validators.blank.target">
                          <span :class="{invalid: validators.blank.target}">The field target is required</span>
                        </div>
                        <div class="col-12">
                          <input :readonly="$store.state.fromDetailsLink" v-model="agent.command" @keyup="enableValidationMessageCommand" style="border-top: none; border-left: none; border-right: none;" class="form-control" placeholder="Command">
                        </div>
                        <div class="col-12" v-if="validators.blank.command">
                          <span :class="{invalid: validators.blank.command}">The field command is required</span>
                        </div>
                        <div class="col-12">
                        <a href="https://docs.reconness.com/agents/add-agent#add-new-agent" style="margin-bottom: 1rem;" class="blue-text float-right">Learn more</a>
                        </div><!-- /.col-12 -->
                    </div>
                    <div class="col-12 col-sm-4">
                        <div v-bind:style="{background: agent.background}" class="card text-white card-style  mb-3 agentform-default-color-box" style="height: 200px;">
                                <div class="card-body link-color">
                                <div class="d-flex justify-content-between">
                                    <h3 class="card-title postal-title">{{agent.name}}</h3>
                                    <AccountCogIco v-if="!agent.image"/>
                                    <img v-if="agent.image" class="logo-image" :src="agent.image">
                                </div>
                                <hr />
                                <div class="card-body-inside">
                                    <ul class="list-unstyled">
                                        <li>
                                            <a href="#">>...</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="row">
                                    <div
                                     class="col-12" style="height: 54px">
                                        <span v-if="editable" class="float-right text-white agentform-action">Editing Agent...</span>
                                        <span v-else class="float-right text-white agentform-action">Creating Agent...</span>
                                    </div>
                                </div>
                                </div>
                            </div>
                    </div>
                </div><!-- /.row -->
                <div class="row show multi-collapse">
                    <div class="col-12 col-md-4">
                        <div class="card agent-containers combo-box-size">
                            <div class="card-header" style="border-bottom: none;">
                              <div style="overflow: hidden; padding-bottom: 9px; border-bottom: 1px solid rgba(0,0,0,.125);">
                                  <h3 style="font-weight: bold;" class="card-title">
                                  Agent Type
                                  </h3>
                              </div>
                            </div><!-- /.card-header -->
                            <div class="combo-box-left-padding">
                            <div class="form-group">
                                <div class="custom-control custom-radio form-check">
                                <input :disabled="$store.state.fromDetailsLink" class="form-check-input custom-control-input" type="radio" id="agent_customCheckbox1" :value="this.$agentType.TARGET" v-model="agent.type">
                                <label class="form-check-label custom-control-label" for="agent_customCheckbox1">Target</label>
                                </div>
                                <div class="custom-control custom-radio form-check">
                                <input :disabled="$store.state.fromDetailsLink" class="form-check-input custom-control-input" type="radio" id="agent_customCheckbox2" :value="this.$agentType.ROOTDOMAIN" v-model="agent.type">
                                <label class="form-check-label custom-control-label" for="agent_customCheckbox2">RootDomain</label>
                                </div>
                                <div class="custom-control custom-radio form-check">
                                <input :disabled="$store.state.fromDetailsLink" class="form-check-input custom-control-input" type="radio" id="agent_customCheckbox3" :value="this.$agentType.SUBDOMAIN" v-model="agent.type">
                                <label class="form-check-label custom-control-label" for="agent_customCheckbox3">Subdomain</label>
                                </div>
                            </div>
                            </div><!-- /.card-body -->
                        </div><!-- /.card-->
                        </div><!-- /.col-12-->
                    <div class="col-12 col-md-4">
                        <div class="card agent-containers combo-box-size">
                            <div class="card-header" style="border-bottom: none;">
                            <div style="overflow: hidden; padding-bottom: 9px; border-bottom: 1px solid rgba(0,0,0,.125);">
                                <h3 style="font-weight: bold;" class="card-title">
                                Triggers
                                </h3>
                            </div>
                            </div><!-- /.card-header -->
                            <div class="combo-box-left-padding">
                            <div class="form-group">
                                <div class="custom-control custom-checkbox form-check">
                                <input :disabled="$store.state.fromDetailsLink" class="form-check-input custom-control-input" type="checkbox" id="agent_customCheckbox4" v-model="agent.isAliveTrigger">
                                <label class="form-check-label custom-control-label" for="agent_customCheckbox4">Run Only if it is Alive</label>
                                </div>
                                <div class="custom-control custom-checkbox form-check">
                                <input :disabled="$store.state.fromDetailsLink" class="form-check-input custom-control-input" type="checkbox" id="agent_customCheckbox5" v-model="agent.isHttpOpenTrigger">
                                <label class="form-check-label custom-control-label" for="agent_customCheckbox5">Run Only if has Http Open</label>
                                </div>
                                <div style="text-align: right;"  class="form-check more-option-padding">
                                <a href="#" @click="showBottomSection" aria-controls="top-section triggers-section" data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false"><span class="form-check-label blue-text">More Options</span></a>
                                </div>
                            </div>
                            </div><!-- /.card-body -->
                        </div><!-- /.card-->
                        </div>
                        <div class="col-12 col-md-4">
                            <div style="padding-left: 0px;" class="card agent-containers combo-box-size">
                            <div class="card-header" style="border-bottom: none;">
                            <div style="overflow: hidden; padding-bottom: 9px; border-bottom: 1px solid rgba(0,0,0,.125);">
                                <h3 style="font-weight: bold;" class="card-title">
                                Pick a Color
                                </h3>
                            </div>
                            </div><!-- /.card-header -->
                            <div style="padding-left: 0;" class="combo-box-left-padding">
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-4">
                                      <button :disabled="$store.state.fromDetailsLink" type="button" @click="setRandomColor" class="agent-colorpicker btn btn-block agentform-color-components agentform-color-components-align image-button"></button>
                                  </div>
                                  <div class="col-4">
                                      <button :disabled="$store.state.fromDetailsLink" type="button" @click="setBlueColor" style="background: transparent linear-gradient(160deg,#03DCED 0%, #0cb8e0 100%) 0% 0% no-repeat padding-box" class="btn btn-block btn-default agentform-color-components agentform-color-components-align btn-colors-size"></button>
                                  </div>
                                  <div class="col-4">
                                      <button :disabled="$store.state.fromDetailsLink" type="button" @click="setVioletColor" style="background: transparent linear-gradient(160deg,#737be5 0%, #7159d3 100%) 0% 0% no-repeat padding-box" class="btn btn-block btn-default agentform-color-components agentform-color-components-align btn-colors-size"></button>
                                  </div>
                                  <div class="col-4">
                                      <button :disabled="$store.state.fromDetailsLink" type="button" @click="setRedColor" style="background: transparent linear-gradient(160deg,#F96767 0%, #FF4343 100%) 0% 0% no-repeat padding-box" class="btn btn-block btn-default agentform-color-spacing-bottom agentform-color-components agentform-color-components-align btn-colors-size"></button>
                                  </div>
                                  <div class="col-4">
                                      <button :disabled="$store.state.fromDetailsLink" type="button" @click="setOrangeColor" style="background: #ff8650 0% 0% no-repeat padding-box" class="btn btn-block btn-default agentform-color-spacing-bottom agentform-color-components agentform-color-components-align btn-colors-size"></button>
                                  </div>
                                  <div class="col-4">
                                      <button :disabled="$store.state.fromDetailsLink" type="button" @click="setGreenColor" style="background: transparent linear-gradient(135deg,#3adb99 0%, #16c465 100%) 0% 0% no-repeat padding-box" class="btn btn-block btn-default agentform-color-spacing-bottom agentform-color-components agentform-color-components-align btn-colors-size"></button>
                                  </div>
                                </div>
                            </div>
                            </div><!-- /.card-body -->
                        </div><!-- /.card-->
                        </div>
                        <div class="col-12" v-if="validators.blank.type">
                          <span :class="{invalid: validators.blank.type}">The field agent type is required</span>
                        </div>
                </div>
                <div class="row" v-show="isVisibleMiddleSection">
                    <div class="col-12">
                    <div style="min-height: auto;" class="info-box my-3 agent-containers">
                        <div class="info-box-content">
                        <span class="info-box-text"><b style="padding-right: 10px;">Script</b><a href="https://docs.reconness.com/agents/script-agent" class="blue-text">Learn more</a></span><a href="#" @click="showMiddleSection" aria-controls="top-section middle-section bottom-section" data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false"><span v-show="arrow_up" style="position: absolute; right: 1rem; top: .5rem;" class="material-icons">keyboard_arrow_up</span><span v-show="arrow_down" style="position: absolute; right: 1rem; top: 0.4rem;" class="material-icons">keyboard_arrow_down</span></a>
                        </div>
                        <!-- /.info-box-content -->
                    </div>
                    </div><!-- /.col-12 -->
                    <div  v-if="!isVisibleBottomSection" id="bottom-section" class="col-12 collapse multi-collapse">
                      <v-ace-editor v-model:value="agent.script" lang="csharp" style="height:300px" theme="monokai"/>
                    </div><!-- #bottom-section -->
                </div><!-- /.row -->
                <div class="row" v-show="isVisibleBottomSection">
                  <div class="col-12">
                    <div id="triggers-section" class="collapse multi-collapse">
                      <div><b class="triggers-label-space">Triggers</b><a href="#" @click="showTopSection" aria-controls="top-section triggers-section" data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false"><span style="position: absolute; right: 1rem; top: 0;" class="material-icons">keyboard_arrow_down</span></a></div>
                      <div style="border: 1px solid #EFE6E6;" class="combo-box-left-padding rounded-corners triggers-more-options-area-size">
                        <div class="form-group triggers-options-space">
                            <div class="custom-control custom-checkbox form-check">
                            <input class="form-check-input custom-control-input" type="checkbox" id="agent_customCheckbox4" v-model="agent.isAliveTrigger">
                            <label style="opacity: none;" class="form-check-label custom-control-label" for="agent_customCheckbox4">Run Only if it is Alive</label>
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
                </div><!-- /.modal-body -->
                <div style="border-top: none;" class="modal-footer">
                  <button @click="setIsDeletetFromForm(true)" v-if="this.editable && !readOnly" :disabled="$store.state.fromDetailsLink" type="button" class="agent-border btn create-agent-buttons-main-action btn-block btn-danger delete_btn delete-left-align" data-target="#confirmation-modal" data-toggle="modal" data-backdrop="false">Delete</button>
                  <button @click="onEdit()" v-if="this.$store.state.fromDetailsLink && !readOnly" type="button" style="color: #00B1FF;" class="agent-border btn create-agent-buttons-main-action">Edit</button>
                  <button v-if="!this.$store.state.fromDetailsLink && !readOnly" type="button" :disabled="isFormValid" @click="addAgent(this.agent)" style="color: #00B1FF;" class="agent-border btn create-agent-buttons-main-action">Done</button>
                  <button @click="close()" style="color: #FF4545;" type="button" class="agent-border btn create-agent-buttons-main-action" data-dismiss="modal">Cancel</button>
                </div>
            </div>
            </div>
        </div>
    </form>
    </div>
</template>
<style>
    .agentform-action{
        bottom: -28%;
        position: absolute;
        right: 8%;
        font-size: .875rem;
    }

    .agentform-color-components{
        width: 30px;
        height: 30px;
    }

    .agentform-color-spacing-bottom{
        margin-top: 18px !important;
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

    .combo-box-size{
        height: 153px;
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
<script>
import jQuery from 'jquery'
import { VAceEditor } from 'vue3-ace-editor'
import AccountCogIco from '@/components/Icons/AccountCogIco.vue'
import FileCodeIco from '@/components/Icons/FileCodeIco.vue'
import Toast from 'primevue/toast'
import { mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations(['setIsDeletetFromForm']),
    setBlueColor: function () {
      this.agent.background = 'transparent linear-gradient(160deg,#03DCED 0%, #0cb8e0 100%) 0% 0% no-repeat padding-box'
    },
    setVioletColor: function () {
      this.agent.background = 'transparent linear-gradient(160deg,#737be5 0%, #7159d3 100%) 0% 0% no-repeat padding-box'
    },
    setRedColor: function () {
      this.agent.background = 'transparent linear-gradient(160deg,#F96767 0%, #FF4343 100%) 0% 0% no-repeat padding-box'
    },
    setOrangeColor: function () {
      this.agent.background = '#ff8650 0% 0% no-repeat padding-box'
    },
    setGreenColor: function () {
      this.agent.background = 'transparent linear-gradient(135deg,#3adb99 0%, #16c465 100%) 0% 0% no-repeat padding-box'
    },
    addAgent () {
      this.enableValidationMessages()
      if (!this.validators.blank.name && !this.validators.blank.repository && !this.validators.blank.target && !this.validators.blank.command && !this.validators.blank.type) {
        const randomResult = this.$randomBooleanResult()
        if (this.editable) {
          if (randomResult) {
            this.agent.id = parseInt(this.$store.getters.idAgent)
            this.$store.commit('updateAgent', this.agent)
            this.$store.commit('setIdAgent', -1)
            this.$toast.add({ severity: 'success', sumary: 'Success', detail: 'The agent has been updated successfully', life: 3000 })
          } else {
            this.$store.commit('setIdAgent', -1)
            this.$toast.add({ severity: 'error', sumary: 'Error', detail: 'An error occured during the update process', life: 3000 })
          }
        } else {
          if (randomResult) {
            this.agent.id = this.nextAgentSequence++
            this.$store.commit('addAgent', this.agent)
            this.$toast.add({ severity: 'success', sumary: 'Success', detail: 'The agent has been inserted successfully', life: 3000 })
          } else {
            this.$toast.add({ severity: 'error', sumary: 'Error', detail: 'An error occured during the update process', life: 3000 })
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
      this.$store.commit('setIdAgent', -1)
      this.$store.commit('setDetailsLinks', false)
    },
    resetAgentForm () {
      this.agent = {
        name: '',
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
        status: this.$agentStatus.PAUSED
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
      this.disableMiddleSection()
      this.enableBottomSection()
      this.disableTopSection()
    },
    showMiddleSection () {
      this.enableMiddleSection()
      this.disableBottomSection()
      this.enableTopSection()
      this.arrow_down = !this.arrow_down
      this.arrow_up = !this.arrow_up
    },
    showTopSection () {
      this.enableTopSection()
      this.enableMiddleSection()
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
      const predefinedColors = this.$store.state.systemColors
      this.agent.background = predefinedColors[Math.floor(Math.random() * predefinedColors.length)]
    },
    verifyPencilStatus () {
      if (this.isPencilVisibleAndClick) {
        this.isPencilVisible = true
      } else {
        this.isPencilVisible = false
      }
    },
    onEdit () {
      this.$store.commit('setDetailsLinks', false)
    }
  },
  data () {
    return {
      agent: {
        name: '',
        background: 'transparent linear-gradient(160deg,#737be5 0%, #7159d3 100%) 0% 0% no-repeat padding-box',
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
        status: this.$agentStatus.PAUSED,
        lastRun: null
      },
      colorpickerData: '',
      isVisibleTopSection: true,
      isVisibleMiddleSection: true,
      isVisibleBottomSection: false,
      middleSection: 'collapse',
      editable: false,
      arrow_down: true,
      arrow_up: false,
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
      nextAgentSequence: 30
    }
  },
  components: {
    VAceEditor,
    AccountCogIco,
    FileCodeIco,
    Toast
  },
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
      const id = this.$store.getters.idAgent
      return this.$store.getters.getAgentById(parseInt(id))
    },
    isFormValid () {
      return (this.validators.blank.name && this.validators.blank.repository && this.validators.blank.target && this.validators.blank.command)
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
      } else {
        this.resetAgentForm()
        this.agent.script = ''
      }
    }
  },
  props: {
    readOnly: {
      type: Boolean,
      default: false
    }
  }
}
</script>

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

input.agent-name-input:hover{
  background-color: #afd9e647;
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

@media (max-width: 480px) {
   .agent-name-input {
    font-size: 20px;
   }
}
</style>
