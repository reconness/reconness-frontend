<template>
    <div class="col-12">
        <Toast :baseZIndex="200"/>
        <form>
        <div class="modal fade" id="targetModalForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content agent-containers">
                <div class="modal-body">
                <div class="row" id="middle-section">
                    <div class="col-12 col-sm-8">
                        <div class="col-12">
                        <div class="d-flex flex-row" v-bind:class="{ 'justify-content-end': isPencilVisible}">
                            <input  v-model="target.name" @keyup="enableValidationMessageName" v-bind:class="{ 'bordered-input-name-withfocus': isPencilVisibleAndClick}" class="form-control agent-placeholder agent-name-input" placeholder="My Target" @focus="isPencilVisible=true" @blur="onBlurExecute" @mouseover="isPencilVisible=true" @mouseleave="verifyPencilStatus" @click="isPencilVisible=true; isPencilVisibleAndClick=true" @keyup.enter="isPencilVisible=false; isPencilVisibleAndClick=false" :readonly="this.$store.state.agent.fromDetailsLink">
                            <span v-show="isPencilVisible" class="material-icons blue-text pencil-align-main">edit</span>
                        </div><!-- /.d-flex -->
                        </div><!-- /.col-12 -->
                        <div class="col-12" v-if="validators.blank.name">
                            <span :class="{invalid: validators.blank.name}">The field name is required</span>
                        </div>
                        <div class="col-12" v-if="validators.exist.name">
                            <span :class="{invalid: validators.exist.name}">The written name is already being used by another target</span>
                        </div>
                        <div class="col-12">
                          <label style="margin-top: 40px;">Root Domain</label>
                          <Chips v-model="rootDomainsTextItems" class="target-input-borders" @add="addItemToRootDomains" @remove="removeItemToRootDomains" :allowDuplicate="false" :addOnBlur="true" @keyup="checkSeparator" id="chips_el" :separator="','"/>
                        </div><!-- /.col-12 -->
                        <div class="col-12" v-if="validators.blank.rootDomains">
                            <span :class="{invalid: validators.blank.rootDomains}">The field root domain is required</span>
                        </div>
                        <div class="col-12" v-if="validators.url.rootDomains">
                            <span :class="{invalid: validators.url.rootDomains}">Invalid character. Please enter a valid URL or press Enter or Space key to add a new root domain</span>
                        </div>

                        <div class="col-12">
                          <label class="target-inputs-separator">Bug Bounty Program URL</label>
                          <input :readonly="this.$store.state.agent.fromDetailsLink" v-model="target.bugBountyUrl" @keyup="enableValidationMessageBugBountyUrl" class="form-control target-input-borders">
                        </div><!-- /.col-12 -->
                        <div class="col-12" v-if="validators.url.bugBountyUrl">
                            <span :class="{invalid: validators.url.bugBountyUrl}">The field bug bounty is not a valid URL</span>
                        </div>
                        <div class="col-12">
                          <div class="custom-control custom-checkbox form-check private-program-container">
                            <input :disabled="this.$store.state.agent.fromDetailsLink" class="form-check-input custom-control-input" type="checkbox" id="target_customCheckbox" v-model="target.isPrivateProgram">
                            <label class="form-check-label custom-control-label float-right" for="target_customCheckbox">Is Private Program?</label>
                          </div>
                        </div>
                        <div class="col-12">
                          <label class="target-inputs-separator">In Scope</label>
                          <textarea class="form-control target-input-borders" rows="3" v-model="target.inScope" />
                        </div>
                        <div class="col-12">
                          <label class="target-inputs-separator">Out of Scope</label>
                          <textarea class="form-control target-input-borders" rows="3" v-model="target.outScope" @keyup="enableValidationMessageOutScope"/>
                        </div>
                    </div>
                    <div class="col-12 col-sm-4">
                      <div class="row">
                        <div class="col-12">
                          <div v-bind:style ="{background: 'linear-gradient(160deg,'+target.primaryColor+' '+ '0%,' + target.secondaryColor + ' ' + '100%) 0% 0% no-repeat padding-box'}" class="card text-white card-style  mb-3 agentform-default-color-box" style="height: 200px;">
                                <div class="card-body link-color">
                                <div class="d-flex justify-content-between">
                                    <h3 class="card-title postal-title">{{target.name}}</h3>
                                    <BullseyeArrowIco/>
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
                                    <div class="col-12" style="height: 54px">
                                        <span v-if="this.$store.state.agent.fromDetailsLink" class="float-right text-white targetform-action">Target Details...</span>
                                        <span v-else-if="editable" class="float-right text-white targetform-action">Editing Target...</span>
                                        <span v-else class="float-right text-white targetform-action">Creating Target...</span>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div style="margin-top: 16%;" class="col-12 text-center">
                          <h3 style="font-weight: bold;" class="card-title disable-float">
                                Pick a Color
                                </h3>
                            <div style="padding-left: 0px; margin-top: 7%; width: 100%;" class="card agent-containers target-combo-box-size">
                            <div style="padding-left: 0;" class="combo-box-left-padding">
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-4">
                                      <button :disabled="this.$store.state.agent.fromDetailsLink" type="button" @click="setRandomColor" class="agent-colorpicker btn btn-block target-form-color-components agentform-color-components-align image-button"></button>
                                  </div>
                                  <div class="col-4">
                                      <button :disabled="this.$store.state.agent.fromDetailsLink" type="button" @click="setBlueColor" style="background: transparent linear-gradient(160deg,#03DCED 0%, #0cb8e0 100%) 0% 0% no-repeat padding-box" class="btn btn-block btn-default target-form-color-components agentform-color-components-align btn-colors-size"></button>
                                  </div>
                                  <div class="col-4">
                                      <button :disabled="this.$store.state.agent.fromDetailsLink" type="button" @click="setVioletColor" style="background: transparent linear-gradient(160deg,#737be5 0%, #7159d3 100%) 0% 0% no-repeat padding-box" class="btn btn-block btn-default target-form-color-components agentform-color-components-align btn-colors-size"></button>
                                  </div>
                                  <div class="col-4">
                                      <button :disabled="this.$store.state.agent.fromDetailsLink" type="button" @click="setRedColor" style="background: transparent linear-gradient(160deg,#F96767 0%, #FF4343 100%) 0% 0% no-repeat padding-box" class="btn btn-block btn-default target-form-color-spacing-bottom target-form-color-components agentform-color-components-align btn-colors-size"></button>
                                  </div>
                                  <div class="col-4">
                                      <button :disabled="this.$store.state.agent.fromDetailsLink" type="button" @click="setOrangeColor" style="background: #ff8650 0% 0% no-repeat padding-box" class="btn btn-block btn-default target-form-color-spacing-bottom target-form-color-components agentform-color-components-align btn-colors-size"></button>
                                  </div>
                                  <div class="col-4">
                                      <button :disabled="this.$store.state.agent.fromDetailsLink" type="button" @click="setGreenColor" style="background: transparent linear-gradient(135deg,#3adb99 0%, #16c465 100%) 0% 0% no-repeat padding-box" class="btn btn-block btn-default target-form-color-spacing-bottom target-form-color-components agentform-color-components-align btn-colors-size"></button>
                                  </div>
                                </div>
                            </div>
                            </div><!-- /.card-body -->
                        </div><!-- /.card-->
                            <!-- asd -->
                        </div>
                      </div>
                    </div>
                </div><!-- /.row -->
                </div><!-- /.modal-body -->
                <div style="border-top: none;" class="modal-footer">
                  <button @click=" this.setIsDeletetFromForm(true)" v-if="this.editable" :disabled="this.$store.state.agent.fromDetailsLink" type="button" class="agent-border btn create-agent-buttons-main-action btn-block btn-danger delete_btn delete-left-align" data-target="#confirmation-modal" data-toggle="modal" data-backdrop="false">Delete</button>
                  <button @click="onEdit()" v-if="this.$store.state.agent.fromDetailsLink" type="button" style="color: #00B1FF;" class="agent-border btn create-agent-buttons-main-action">Edit</button>
                  <button v-if="!this.$store.state.agent.fromDetailsLink" type="button" :disabled="isFormValid" @click="addTarget(this.target)" style="color: #00B1FF;" class="agent-border btn create-agent-buttons-main-action">Done</button>
                  <button @click="close()" style="color: #FF4545;" type="button" class="agent-border btn create-agent-buttons-main-action" data-dismiss="modal">Cancel</button>
                </div>
            </div>
            </div>
        </div>
    </form>
    </div>
</template>
<style>
    .targetform-action{
        bottom: -28%;
        position: absolute;
        right: 8%;
        font-size: .875rem;
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

    .agent-name-input{
      font-size: 24px;
      font-weight: bold;
      color: #000000;
      border-left: 4px solid #00B1FF;
      border-top: none;
      border-bottom: none;
      border-right: none;
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
<script>
import jQuery from 'jquery'
import BullseyeArrowIco from '@/components/Icons/BullseyeArrowIco.vue'
import Toast from 'primevue/toast'
import Chips from 'primevue/chips'
import { mapMutations, mapGetters } from 'vuex'
export default {
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
      if (!this.validators.blank.name && !this.validators.blank.rootDomains && !this.validators.url.bugBountyUrl && !this.validators.exist.name) {
        const randomResult = this.$randomBooleanResult()
        if (this.editable) {
          if (randomResult) {
            this.target.id = parseInt(this.$store.getters['target/idTarget'])
            this.$store.commit('target/updateTarget', this.target)
            this.$store.commit('target/setIdTarget', -1)
            this.$toast.add({ severity: 'success', sumary: 'Success', detail: 'The target has been updated successfully', life: 3000 })
          } else {
            this.$store.commit('target/setIdTarget', -1)
            this.$toast.add({ severity: 'error', sumary: 'Error', detail: 'An error occured during the update process', life: 3000 })
          }
        } else {
          if (randomResult) {
            this.target.id = this.nextTargetSequence++
            this.$store.commit('target/addTarget', this.target)
            this.$toast.add({ severity: 'success', sumary: 'Success', detail: 'The target has been inserted successfully', life: 3000 })
          } else {
            this.$toast.add({ severity: 'error', sumary: 'Error', detail: 'An error occured during the insertion process', life: 3000 })
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
      this.target = {
        name: '',
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
    }
  },
  data () {
    return {
      target: {
        name: '',
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
      nextTargetSequence: 30
    }
  },
  components: {
    BullseyeArrowIco,
    Toast,
    Chips
  },
  computed: {
    loadSelectedTarget () {
      const id = this.$store.getters['target/idTarget']
      return this.$store.getters['target/getTargetById'](parseInt(id))
    },
    isFormValid () {
      return (this.validators.blank.name && this.validators.blank.rootDomains && this.validators.url.bugBountyUrl && this.validators.exist.name)
    },
    ...mapGetters('target', ['checkIfTargetExistsByName'])
  },
  watch: {
    loadSelectedTarget: function (value) {
      if (value !== undefined) {
        this.target.name = value.name
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
  /* border-radius: 12px !important; */
  opacity: 1;
  /* border: 1px solid #f1f3f5; */
  background: #fffffF 0% 0% no-repeat padding-box;
  font-size: 14px;
  color: #000000;
  /* min-height: calc(1.8125rem + 2px); */
}

@media (max-width: 480px) {
   .agent-name-input {
    font-size: 20px;
   }
}
</style>
