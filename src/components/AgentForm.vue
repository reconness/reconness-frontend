<template>
    <div class="col-12">
        <form @submit.prevent="onSubmit">
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content agent-containers">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12 collapse multi-collapse" id="top-section" style="margin-bottom: 20px;">
                        <div style="float: left;" class="d-flex flex-row">
                            <input v-model="agent.name" class="form-control agent-placeholder agent-name-input" placeholder="My agent" @blur="$v.agent.name.$touch()">
                            <span class="material-icons blue-text pencil-align-secondary">edit</span>
                        </div><!-- /.d-flex -->
                    </div><!-- /.col-12 -->
                </div>
                <div class="row show multi-collapse" id="middle-section">
                    <div class="col-12 col-sm-8">
                        <div class="col-12">
                        <div class="d-flex flex-row justify-content-end">
                            <input  v-model="agent.name" class="form-control agent-placeholder agent-name-input" placeholder="My agent" @blur="$v.agent.name.$touch()" ><!--:value="loadFormOnEdition"-->
                            <span class="material-icons blue-text pencil-align-main">edit</span>
                        </div><!-- /.d-flex -->
                        </div><!-- /.col-12 -->
                        <div class="col-12" v-if="$v.agent.name.$errors.length">
                            <span :class="{invalid: $v.agent.name.$errors.length}">The field agent is required</span>
                        </div>
                        <div class="col-12">
                            <div class="d-flex flex-row justify-content-end">
                            <span style="text-align: right; opacity: 1; font-size: 14px;" class="mr-2">
                            Add
                            <br>
                            your logo
                            </span>
                            <input id="uploadimage" type="file" @change="onFileChange">
                            <label for="uploadimage">
<span type="file"  style="opacity: 1; color: #B3B3B3; font-size: 50px;" class="material-icons">
                            note</span>

                            </label>
                        </div><!-- /.d-flex -->
                        </div>
                        <div class="col-12">
                          <input v-model="agent.repository" @blur="$v.agent.repository.$touch()" style="border-top: none; border-left: none; border-right: none;" class="form-control" placeholder="Repository">
                        </div><!-- /.col-12 -->
                        <div class="col-12" v-if="$v.agent.repository.$errors.length">
                            <span :class="{invalid: $v.agent.repository.$errors.length}">The field repository is required</span>
                        </div>
                        <div class="col-12">
                          <input v-model="agent.target" @blur="$v.agent.target.$touch()" style="border-top: none; border-left: none; border-right: none;" class="form-control" placeholder="Target">
                        </div><!-- /.col-12 -->
                        <div class="col-12" v-if="$v.agent.target.$errors.length">
                          <span :class="{invalid: $v.agent.target.$errors.length}">The field target is required</span>
                        </div>
                        <div class="col-12">
                          <input v-model="agent.command" @blur="$v.agent.command.$touch()" style="border-top: none; border-left: none; border-right: none;" class="form-control" placeholder="Command">
                        </div><!-- /.col-12 -->
                        <div class="col-12" v-if="$v.agent.command.$errors.length">
                          <span :class="{invalid: $v.agent.command.$errors.length}">The field command is required</span>
                        </div>
                        <div class="col-12">
                        <a href="https://docs.reconness.com/agents/add-agent#add-new-agent" style="margin-bottom: 1rem;" class="blue-text float-right">Learn more</a>
                        </div><!-- /.col-12 -->
                    </div>
                    <div class="col-12 col-sm-4">
                        <div v-bind:style="{background: agent.background}" class="card text-white card-style  mb-3 agentform-default-color-box">
                                <div class="card-body link-color">
                                <div class="d-flex justify-content-between">
                                    <h3 class="card-title postal-title">{{agent.name}}</h3>
                                    <span v-if="!agent.image" class="material-icons agent-mini-color-gray">person</span>
                                    <img v-if="agent.image" class="logo-image" :src="agent.image">
                                </div>
                                <hr />
                                <div class="direct-chat-infos clearfix">
                                    <em>
                                        <a href="#" class="float-left">Category</a>
                                    </em>
                                </div>
                                <div class="card-body-inside">
                                    <ul class="list-unstyled">
                                        <li>
                                            <a href="#">...</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="row">
                                    <div class="col-12" style="height: 54px">
                                        <span class="float-right text-white agentform-action">Creating Agent...</span>
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
                                <div class="custom-control custom-checkbox form-check">
                                <input class="form-check-input custom-control-input" type="checkbox" id="agent_customCheckbox1" v-model="agent.isTargetType">
                                <label class="form-check-label custom-control-label" for="agent_customCheckbox1">Target</label>
                                </div>
                                <div class="custom-control custom-checkbox form-check">
                                <input class="form-check-input custom-control-input" type="checkbox" id="agent_customCheckbox2" v-model="agent.isRootDomainType">
                                <label class="form-check-label custom-control-label" for="agent_customCheckbox2">RootDomain</label>
                                </div>
                                <div class="custom-control custom-checkbox form-check">
                                <input class="form-check-input custom-control-input" type="checkbox" id="agent_customCheckbox3" v-model="agent.isSubDomainType">
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
                                <input class="form-check-input custom-control-input" type="checkbox" id="agent_customCheckbox4" v-model="agent.isAliveTrigger">
                                <label class="form-check-label custom-control-label" for="agent_customCheckbox4">Run Only if it is Alive</label>
                                </div>
                                <div class="custom-control custom-checkbox form-check">
                                <input class="form-check-input custom-control-input" type="checkbox" id="agent_customCheckbox5" v-model="agent.isHttpOpenTrigger">
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
                                      <!-- <ColorPicker v-model="colorpickerData"/> -->
                                      <!-- <button type="button" style="background-color: #8929e0;" class="btn btn-block btn-default agentform-color-components agentform-color-components-align"></button> -->
                                      <button type="button" @click="setRandomColor" class="agent-colorpicker btn btn-block btn-default agentform-color-components agentform-color-components-align image-button"></button>
                                  </div>
                                  <div class="col-4">
                                      <button type="button" @click="setBlueColor" style="background-color: #00d2e0;" class="btn btn-block btn-default agentform-color-components agentform-color-components-align"></button>
                                  </div>
                                  <div class="col-4">
                                      <button type="button" @click="setVioletColor" style="background-color: #8929e0;" class="btn btn-block btn-default agentform-color-components agentform-color-components-align"></button>
                                  </div>
                                  <div class="col-4">
                                      <button type="button" @click="setRedColor" style="background-color: #ff1b4c;" class="btn btn-block btn-default agentform-color-spacing-bottom agentform-color-components agentform-color-components-align"></button>
                                  </div>
                                  <div class="col-4">
                                      <button type="button" @click="setOrangeColor" style="background-color: #ff7f46;" class="btn btn-block btn-default agentform-color-spacing-bottom agentform-color-components agentform-color-components-align"></button>
                                  </div>
                                  <div class="col-4">
                                      <button type="button" @click="setGreenColor" style="background-color: #00eb74;" class="btn btn-block btn-default agentform-color-spacing-bottom agentform-color-components agentform-color-components-align"></button>
                                  </div>
                                </div>
                            </div>
                            </div><!-- /.card-body -->
                        </div><!-- /.card-->
                        </div>
                </div>
                <div class="row" v-show="isVisibleMiddleSection">
                    <div class="col-12">
                    <div style="min-height: auto;" class="info-box mb-3 agent-containers">
                        <div class="info-box-content">
                        <span class="info-box-text"><b style="padding-right: 10px;">Script</b><a href="https://docs.reconness.com/agents/script-agent" class="blue-text">Learn more</a></span><a href="#" @click="showMiddleSection" aria-controls="top-section middle-section bottom-section" data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false"><span v-show="arrow_up" style="position: absolute; right: 1rem; top: .5rem;" class="material-icons">keyboard_arrow_up</span><span v-show="arrow_down" style="position: absolute; right: 1rem; top: .5rem;" class="material-icons">keyboard_arrow_down</span></a>
                        </div>
                        <!-- /.info-box-content -->
                    </div>
                    </div><!-- /.col-12 -->
                    <div  v-if="!isVisibleBottomSection" id="bottom-section" class="col-12 collapse multi-collapse">
                    <textarea style="color: #0af31dce; background-color: #000000;" class="form-control" rows="11" v-model="agent.script"></textarea>
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
                  <button :disabled="isValid || $v.$errors.length" data-dismiss="modal" type="submit" @click="addAgent(this.agent)" style="color: #00B1FF;" class="agent-border btn create-agent-buttons-main-action">Done</button>
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
        bottom: 0px;
        position: absolute;
        right: 0;
        font-size: .875rem;
    }

    .agentform-color-components{
        width: 30px;
        height: 30px;
    }

    .custom-control-input:checked~.custom-control-label::before {
      color: #fff;
      border-color: #00B1FF;
      background-color: #00B1FF;
      box-shadow: none;
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
      overflow: auto;
    }

    .p-colorpicker-panel .p-colorpicker-color {
      background: transparent url("/primevue-colorpicker/color.png") no-repeat left top;
    }

    .p-colorpicker-panel .p-colorpicker-hue {
      background: transparent url("/primevue-colorpicker/hue.png") no-repeat left top;
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

</style>
<script>
import { required } from '@vuelidate/validators'
// import ColorPicker from 'primevue/colorpicker'
export default {
  methods: {
    setBlueColor: function () {
      this.agent.background = '#4bd6f2'
    },
    setVioletColor: function () {
      this.agent.background = '#9a25b6'
    },
    setRedColor: function () {
      this.agent.background = '#e91013'
    },
    setOrangeColor: function () {
      this.agent.background = '#f36e1c'
    },
    setGreenColor: function () {
      this.agent.background = '#4cb45f'
    },
    addAgent () {
      if (this.editable) {
        this.agent.id = parseInt(this.$store.getters.idAgent)
        this.$store.commit('updateAgent', this.agent)
        this.editable = false
      } else {
        this.$store.commit('addAgent', this.agent)
      }
      this.resetAgentForm()
      this.$v.$reset()
    },
    close () {
      this.resetAgentForm()
    },
    resetAgentForm () {
      this.agent = {
        background: '#7159D3'
      }
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
      this.agent.background = '#' + predefinedColors[Math.floor(Math.random() * predefinedColors.length)]
    }
  },
  data () {
    return {
      agent: {
        name: '',
        background: '#7159D3',
        repository: '',
        target: '',
        command: '',
        isTargetType: false,
        isRootDomainType: false,
        isSubDomainType: false,
        isAliveTrigger: false,
        isHttpOpenTrigger: false,
        category: '',
        script: '',
        id: -1,
        creationDate: new Date().toString(),
        image: ''
      },
      colorpickerData: '',
      isVisibleTopSection: true,
      isVisibleMiddleSection: true,
      isVisibleBottomSection: false,
      middleSection: 'collapse',
      editable: false,
      arrow_down: true,
      arrow_up: false
    }
  },
  validations: {
    agent: {
      name: { required },
      background: { required },
      repository: { required },
      target: { required },
      command: { required },
      isTargetType: { required },
      isRootDomainType: { required },
      isSubDomainType: { required },
      isAliveTrigger: { required },
      isHttpOpenTrigger: { required },
      category: { required }
    }
  },
  components: {
    // ColorPicker
  },
  computed: {
    isValid () {
      if (this.agent.name !== '' &&
      this.agent.repository !== '' &&
      this.agent.target !== '' &&
      this.agent.command !== '' &&
      (this.agent.isTargetType || this.agent.isRootDomainType || this.agent.isSubDomainType) &&
      (this.agent.isAliveTrigger || this.agent.isHttpOpenTrigger)) {
        return false
      }
      return true
    },
    loadSelectedAgent () {
      const id = this.$store.getters.idAgent
      return this.$store.getters.getAgentById(parseInt(id))
    }
  },
  watch: {
    colorpickerData: function (value) {
      this.agent.background = '#' + value
    },
    loadSelectedAgent: function (value) {
      this.agent.name = value.name
      this.agent.background = value.background
      this.agent.repository = value.repository
      this.agent.target = value.target
      this.agent.command = value.command
      this.agent.isTargetType = value.isTargetType
      this.agent.isRootDomainType = value.isRootDomainType
      this.agent.isSubDomainType = value.isSubDomainType
      this.agent.isAliveTrigger = value.isAliveTrigger
      this.agent.isHttpOpenTrigger = value.isHttpOpenTrigger
      this.agent.script = value.script
      this.editable = true
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
}

@media (max-width: 480px) {
   .agent-name-input {
    font-size: 20px;
   }
}
</style>
