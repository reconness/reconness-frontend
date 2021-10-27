<template>
    <div class="col-12">
        <form>
        <div class="modal fade" id="targetModalForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content agent-containers">
              <div class="modal-header remove-flex">
                <div class="row">
                  <div class="col-12">
                      <div class="row">
                        <div class="col-8">
                          <div class="d-flex">
                            <div class="d-flex align-items-center" :class="{'w-100': showNameInput}">
                              <input v-if="showNameInput" v-model="target.name" :placeholder="target.name" @keyup="enableValidationMessageName" class="form-control agent-placeholder w-100 agent-name-input" :readonly="this.$store.state.agent.fromDetailsLink">
                              <span v-if="!showNameInput" class="agent-name-input flex-fill pl-2">{{target.name}}</span>
                              <span v-if="!showNameInput" class="material-icons cursor-pointer ml-2 blue-text" @click="switchNameInput"> open_in_new</span>
                            </div>
                          </div><!-- /.d-flex -->
                        </div><!-- /.col-12 -->
                        <div class="col-4">
                          <div class="d-flex flex-row-reverse">
                            <span v-if="editable" class="title-target-admin-form agent-mini-color-gray mr-1">Settings</span>
                            <span v-else class="title-target-admin-form agent-mini-color-gray mr-1">New Target</span>
                          </div>
                        </div>
                        <div class="col-12" v-if="validators.blank.name">
                            <span :class="{invalid: validators.blank.name}">The field name is required</span>
                        </div>
                        <div class="col-12" v-if="validators.exist.name">
                            <span :class="{invalid: validators.exist.name}">The written name is already being used by another target</span>
                        </div>
                        <div class="col-12" v-if="targetNameContainsHyphens">
                            <span :class="{invalid: targetNameContainsHyphens}">The written name cannot contain hyphens</span>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
                <div class="modal-body ligth-gray-background">
                <div class="row" id="middle-section">
                    <div class="col-12 col-sm-8">
                        <div class="col-12 target-chips mt-3">
                          <Chips placeholder="Root Domain" v-model="rootDomainsTextItems" @add="addItemToRootDomains" @remove="removeItemToRootDomains" :allowDuplicate="false" :addOnBlur="true" @keyup="checkSeparator" id="chips_el" :separator="','"/>
                        </div><!-- /.col-12 -->
                        <div class="col-12" v-if="validators.blank.rootDomains">
                            <span :class="{invalid: validators.blank.rootDomains}">The field root domain is required</span>
                        </div>
                        <div class="col-12" v-if="validators.url.rootDomains">
                            <span :class="{invalid: validators.url.rootDomains}">Invalid character. Please enter a valid URL or press Enter or Space key to add a new root domain</span>
                        </div>
                        <div class="col-12">
                          <input placeholder="Bug Bounty Program URL" :readonly="this.$store.state.agent.fromDetailsLink" v-model="target.bugBountyUrl" @keyup="enableValidationMessageBugBountyUrl" class="ligth-gray-background form-control border-right-0 border-top-0 border-left-0 mt-3">
                        </div><!-- /.col-12 -->
                        <div class="col-12" v-if="validators.url.bugBountyUrl">
                            <span :class="{invalid: validators.url.bugBountyUrl}">The field bug bounty is not a valid URL</span>
                        </div>
                        <div class="col-12">
                          <div class="custom-control custom-checkbox form-check private-program-container">
                            <input class="form-check-input custom-control-input" type="checkbox" id="target_customCheckbox" v-model="target.isPrivateProgram">
                            <label class="form-check-label custom-control-label float-right" for="target_customCheckbox">Is Private Program?</label>
                          </div>
                        </div>
                        <div class="col-12">
                          <label class="target-inputs-separator"><b>In Scope</b></label>
                          <textarea class="ligth-gray-background form-control target-input-borders" rows="3" v-model="target.inScope" />
                        </div>
                        <div class="col-12">
                          <label class="target-inputs-separator"><b>Out of Scope</b></label>
                          <textarea class="ligth-gray-background form-control target-input-borders" rows="3" v-model="target.outScope" @keyup="enableValidationMessageOutScope"/>
                        </div>
                    </div>
                    <div class="col-12 col-sm-4 pt-1">
                      <div class="target-color-section mt-4 pt-3 border-radios-8px pl-2 pr-2">
                      <div class="row">
                        <div class="col-12">
                          <div class="info-box d-flex infobox-radius infobox-padding-bordered">
                            <div class="w-100 infobox-radius d-flex infobox-border-line infobox-padding-bordered d-flex align-items-center">
                            <span class="color-sample-area ml-1 info-box-icon icon-style" :style ="{background: 'linear-gradient(135deg,'+target.primaryColor+' '+ '0%,' + target.secondaryColor + ' ' + '100%) 0% 0% no-repeat padding-box'}"><BullseyeArrowIco class="w-75 h-75"/></span>
                            <div class="info-box-content info-box-content-custom ml-2">
                            <span class="info-box-text domain-names-target">
                            {{target.name}}
                            </span>
                            <span v-if="editable"  class="agent-mini-agent-details pt-0 pb-0 black-text border-right-0 mt-1">Editing...</span>
                            <span v-else class="agent-mini-agent-details pt-0 pb-0 black-text border-right-0 mt-1">Creating...</span>
                            </div> <!-- /.info-box-content -->
                            </div>
                          </div> <!-- /.info-box -->
                        </div>
                        <div class="col-12 text-center mt-2">
                          <h3 class="font-weight-bold card-title disable-float mt-4">
                                Pick a Color
                                </h3>
                            <div class="pl-0 w-100 agent-containers target-combo-box-size target-color-section">
                            <div class="pl-0 combo-box-left-padding">
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-4">
                                      <button :disabled="this.$store.state.agent.fromDetailsLink" type="button" @click="setRandomColor" class="agent-colorpicker btn btn-block target-form-color-components agentform-color-components-align image-button"></button>
                                  </div>
                                  <div class="col-4">
                                      <button :disabled="this.$store.state.agent.fromDetailsLink" type="button" @click="setBlueColor" class="blue-btn-backg btn btn-block btn-default target-form-color-components agentform-color-components-align btn-colors-size"></button>
                                  </div>
                                  <div class="col-4">
                                      <button :disabled="this.$store.state.agent.fromDetailsLink" type="button" @click="setVioletColor" class="violet-btn-backg btn btn-block btn-default target-form-color-components agentform-color-components-align btn-colors-size"></button>
                                  </div>
                                  <div class="col-4">
                                      <button :disabled="this.$store.state.agent.fromDetailsLink" type="button" @click="setRedColor" class="red-btn-backg btn btn-block btn-default target-form-color-spacing-bottom target-form-color-components agentform-color-components-align btn-colors-size"></button>
                                  </div>
                                  <div class="col-4">
                                      <button :disabled="this.$store.state.agent.fromDetailsLink" type="button" @click="setOrangeColor" class="orange-btn-backg btn btn-block btn-default target-form-color-spacing-bottom target-form-color-components agentform-color-components-align btn-colors-size"></button>
                                  </div>
                                  <div class="col-4">
                                      <button :disabled="this.$store.state.agent.fromDetailsLink" type="button" @click="setGreenColor" class="green-btn-back btn btn-block btn-default target-form-color-spacing-bottom target-form-color-components agentform-color-components-align btn-colors-size"></button>
                                  </div>
                                </div>
                            </div>
                            </div><!-- /.card-body -->
                        </div><!-- /.card-->
                            <!-- asd -->
                        </div>
                      </div>
                      </div>
                    </div>
                </div><!-- /.row -->
                </div><!-- /.modal-body -->
                <div class="border-top-none modal-footer">
                  <button type="button" :disabled="isFormValid" @click="addTarget(this.target)" class="blue-text agent-border btn create-agent-buttons-main-action">Accept</button>
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
import BullseyeArrowIco from '@/components/Icons/BullseyeArrowIco.vue'
import Chips from 'primevue/chips'
import { TargetMixin } from '@/mixins/TargetMixin'
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'TargetForm',
  components: {
    BullseyeArrowIco,
    Chips
  },
  data () {
    return {
      target: {
        name: 'My target ',
        id: -1,
        date: new Date().toString(),
        rootDomains: [],
        bugBountyUrl: '',
        isPrivateProgram: false,
        inScope: '',
        outScope: '',
        primaryColor: '#737be5',
        secondaryColor: '#7159d3'
      },
      rootDomainsTextItems: [],
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
          rootDomains: false,
          bugBountyUrl: false,
          inScope: false,
          outScope: false
        },
        url: {
          bugBountyUrl: false,
          rootDomains: false
        },
        exist: {
          name: false
        }
      },
      nextTargetSequence: 30,
      showNameInput: false,
      transformedName: 'my-target',
      typedOnNameInput: false
    }
  },
  mixins: [TargetMixin],
  computed: {
    loadSelectedTarget () {
      const id = this.$store.getters['target/idTarget']
      return this.$store.getters['target/getTargetById'](parseInt(id))
    },
    isFormValid () {
      return (this.validators.blank.name && this.validators.blank.rootDomains && this.validators.url.bugBountyUrl && this.validators.exist.name && !this.targetNameContainsHyphens)
    },
    ...mapGetters('target', ['checkIfTargetExistsByName']),
    targetNameContainsHyphens () {
      return this.target.name.indexOf('-') > -1 && this.typedOnNameInput
    }
  },
  watch: {
    loadSelectedTarget: function (value) {
      if (value !== undefined) {
        this.target.name = this.$convertHyphensToSpacesByString(value.name)
        this.target.primaryColor = value.primaryColor
        this.target.secondaryColor = value.secondaryColor
        this.target.id = value.id
        this.target.bugBountyUrl = value.bugBountyUrl
        this.target.isPrivateProgram = value.isPrivateProgram
        this.target.inScope = value.inScope
        this.target.outScope = value.outScope
        this.editable = true

        this.target.rootDomains = value.rootDomains.slice(0)
        this.target.rootDomains.forEach(element => {
          this.rootDomainsTextItems.push(element.root)
        })
      } else {
        this.resetTargetForm()
      }
    },
    'target.name': function (value) {
      this.transformedName = this.$convertSpacesToHyphensByString(value).toLowerCase()
    }
  },
  methods: {
    ...mapMutations('agent', ['setIsDeletetFromForm']),
    setBlueColor: function () {
      this.target.primaryColor = '#03DCED'
      this.target.secondaryColor = '#0cb8e0'
    },
    setVioletColor: function () {
      this.target.primaryColor = '#737be5'
      this.target.secondaryColor = '#7159d3'
    },
    setRedColor: function () {
      this.target.primaryColor = '#F96767'
      this.target.secondaryColor = '#FF4343'
    },
    setOrangeColor: function () {
      this.target.primaryColor = '#FF9966'
      this.target.secondaryColor = '#f36a33'
    },
    setGreenColor: function () {
      this.target.primaryColor = '#3adb99'
      this.target.secondaryColor = '#16c465'
    },
    addTarget () {
      this.enableValidationMessages()
      if (!this.validators.blank.name && !this.validators.blank.rootDomains && !this.validators.url.bugBountyUrl && !this.validators.exist.name && !this.targetNameContainsHyphens) {
        const randomResult = this.$randomBooleanResult()
        if (this.editable) {
          if (randomResult) {
            this.target.id = parseInt(this.$store.getters['target/idTarget'])
            this.target.name = this.transformedName
            this.$store.commit('target/updateTarget', this.target)
            this.$store.commit('target/setIdTarget', -1)
            this.updateOperationStatus(this.$entityStatus.SUCCESS, this.$message.successMessageForTargetEdition)
          } else {
            this.$store.commit('target/setIdTarget', -1)
            this.updateOperationStatus(this.$entityStatus.FAILED, this.$message.errorMessageForEditionPurpose)
          }
        } else {
          if (randomResult) {
            this.target.id = this.nextTargetSequence++
            this.target.name = this.transformedName
            this.$store.commit('target/addTarget', this.target)
            this.updateOperationStatus(this.$entityStatus.SUCCESS, this.$message.successMessageForTargetInsertion)
          } else {
            this.updateOperationStatus(this.$entityStatus.FAILED, this.$message.errorMessageForInsertionPurpose)
          }
        }
        this.resetTargetForm()
        jQuery('#targetModalForm').modal('hide')
        this.editable = false
      }
    },
    close () {
      this.resetTargetForm()
      this.editable = false
      this.$store.commit('target/setIdTarget', -1)
      this.$store.commit('agent/setDetailsLinks', false)
    },
    resetTargetForm () {
      this.typedOnNameInput = false
      this.showNameInput = false
      this.target = {
        name: 'My target',
        primaryColor: '#737be5',
        secondaryColor: '#7159d3',
        id: -1,
        date: new Date().toString(),
        rootDomains: [],
        bugBountyUrl: '',
        isPrivateProgram: false,
        inScope: '',
        outScope: ''
      }
      this.target.rootDomains.splice(0)
      this.rootDomainsTextItems.splice(0)
      this.validators = {
        blank: {
          name: false,
          repository: false,
          target: false,
          command: false
        },
        url: {
          bugBountyUrl: false
        },
        exist: {
          name: false
        }
      }
    },
    enableValidationMessageName () {
      this.typedOnNameInput = true
      if (this.target.name === '') {
        this.validators.blank.name = true
      } else {
        this.validators.blank.name = false
      }
    },
    enableValidationMessageRootDomains (event) {
      if (this.target.rootDomains.length === 0) {
        this.validators.blank.rootDomains = true
      } else {
        this.validators.blank.rootDomains = false
      }
      const chipsActualValue = document.getElementById('chips_el').value
      if (this.isStrWithSpaces(chipsActualValue)) {
        this.validators.url.rootDomains = true
      } else {
        this.validators.url.rootDomains = false
      }
      if (chipsActualValue !== '' && !this.$validateUrl(chipsActualValue)) {
        this.validators.url.rootDomains = true
      } else {
        this.validators.url.rootDomains = false
      }
    },
    enableValidationMessageBugBountyUrl () {
      if (this.target.bugBountyUrl !== '' && !this.$validateUrl(this.target.bugBountyUrl)) {
        this.validators.url.bugBountyUrl = true
      } else {
        this.validators.url.bugBountyUrl = false
      }
    },
    enableValidationMessageInScope () {
      if (this.target.inScope === '') {
        this.validators.blank.inScope = true
      } else {
        this.validators.blank.inScope = false
      }
    },
    enableValidationMessageOutScope () {
      if (this.target.outScope === '') {
        this.validators.blank.outScope = true
      } else {
        this.validators.blank.outScope = false
      }
    },
    enableValidationMessageUniqueName () {
      if (this.target.name) {
        this.validators.exist.name = this.checkIfTargetExistsByName({
          name: this.target.name,
          id: this.target.id
        })
      }
    },
    enableValidationMessages () {
      this.enableValidationMessageName()
      this.enableValidationMessageBugBountyUrl()
      this.enableValidationMessageRootDomains()
      this.enableValidationMessageUniqueName()
    },
    setRandomColor () {
      const predefinedColors = this.$store.state.agent.systemColors
      const randomColor = predefinedColors[Math.floor(Math.random() * predefinedColors.length)]
      this.target.primaryColor = randomColor.primaryColor
      this.target.secondaryColor = randomColor.secondaryColor
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
    addItemToRootDomains (item) {
      const urlElem = typeof item === 'object' && item !== null ? item.value[item.value.length - 1] : item
      if (!this.$validateUrl(urlElem)) {
        this.rootDomainsTextItems.pop()
        this.validators.url.rootDomains = false
      } else {
        this.target.rootDomains.push(
          {
            root: urlElem,
            id: this.target.rootDomains.length,
            date: new Date(),
            subdomain: [],
            agent: []
          }
        )
      }
    },
    removeItemToRootDomains (rootDomainParam) {
      const index = this.target.rootDomains.findIndex(item => item.root === rootDomainParam.value[0])
      this.target.rootDomains.splice(index, 1)
    },
    isStrWithSpaces (item) {
      return /\s/.test(item)
    },
    checkSeparator (event) {
      const chipsActualValue = document.getElementById('chips_el').value
      if (this.isStrWithSpaces(chipsActualValue) && chipsActualValue.replace(/\s/g, '').length > 0 && chipsActualValue.charAt(0) !== ' ') {
        this.rootDomainsTextItems.push(chipsActualValue.trim())
        this.addItemToRootDomains(chipsActualValue.trim())
        document.getElementById('chips_el').value = ''
      }
      this.enableValidationMessageRootDomains(event)
    },
    onBlurExecute () {
      this.isPencilVisible = false
      this.isPencilVisibleAndClick = false
      this.enableValidationMessageUniqueName()
    },
    switchNameInput () {
      this.showNameInput = !this.showNameInput
    }
  }
}
</script>
<style>
    .targetform-action{
        bottom: -28%;
        position: absolute;
        right: 8%;
        font-size: .875rem;
    }
    .color-sample-area{
      width: 56px !important;
      height: 56px !important;
      border-radius: 13px !important
    }
    .target-form-color-components{
        width: 30px;
        height: 30px;
        margin-top: 23px !important;
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
        height: 144px;
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

/* input.agent-name-input:hover{
  background-color: #afd9e647;
} */

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

.private-program-container {
  /* float: right; */
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

@media (max-width: 480px) {
   .agent-name-input {
    font-size: 20px;
   }
}
</style>
