<template>
    <div class="col-12">
            <div class="modal fade" id="rootDomainInsertionForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div class="modal-content root-domain-window custom-border-radius ">
                        <div class="modal-body">
                             <button type="button" @click="resetForm" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                                <p class="agent-placeholder agent-name-input root-domain-name mt-3 pl-2" v-bind:style ="{borderImage:gradient, 'border-image-slice': 1}">New Root Domain</p>
                            <p class="description-text pl-3">Choose an option to add a new rootdomain</p>
                            <div class="form-container">
                                <div v-for="(item, index) in rootdomains" :key="item" class="subdomain-form-container mt-2">
                                  <input :data-index="index" v-model="item.root" @keyup.enter="createRootDomains" class="form-control agent-placeholder subdomains-items-field" placeholder="New rootdomain" @blur="enableValidationMessageRootDomainBlankName" @keyup="enableValidations" :id="'rootd-form-input-' + index">
                                  <div style="height: 0;">
                                    <span @click="removeRootDomainName" class="circle-minus-properties cursor-pointer" :data-index="index" v-show="index>0">
                                      <MinusCircleIco/>
                                    </span>
                                  </div>
                                </div>
                                <a href="#" class="text-body d-inline-flex mt-3" @click="createRootDomains">
                                    <span class="material-icons gradient-style" v-bind:style ="{background: gradient}">add_circle</span>
                                    <span class="ml-2 gradient-style" v-bind:style ="{background:gradient}">Add New</span>
                                </a>
                            </div>
                        </div>
                        <div class="modal-footer border-top-0 m-auto">
                            <div class="row text-center">
                              <div class="col-12">
                                <button type="button" class="btn add-subdomain-btn-primary" v-bind:style ="{background: gradient}" @click="insertRootDomains">Add Rootdomain</button>
                              </div>
                              <div class="col-12 mt-2" v-if="this.validators.blank.rootDomainName.indexOf(true) >= 0">
                                <span :class="{invalid: this.validators.blank.rootDomainName.indexOf(true) >= 0}">You must not leave any text field blank</span>
                              </div>
                              <div class="col-12 mt-1" v-if="validators.url.rootDomainName.indexOf(true) >= 0">
                                <span :class="{invalid: validators.url.rootDomainName.indexOf(true) >= 0}">Some of the specified urls are not valid</span>
                              </div>
                              <div class="col-12 mt-1" v-if="this.validators.exist.rootDomainName.indexOf(true) >= 0">
                                <span :class="{invalid: this.validators.exist.rootDomainName.indexOf(true) >= 0}">Some of the the specified values already exist</span>
                              </div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import { TargetMixin } from '@/mixins/TargetMixin'
import jQuery from 'jquery'
import MinusCircleIco from '@/components/Icons/MinusCircleIco.vue'
export default {
  name: 'RootDomainInsertionForm',
  components: {
    MinusCircleIco
  },
  props: {
    gradient: String
  },
  data: function () {
    return {
      rootdomains: [],
      validators: {
        url: {
          rootDomainName: [false]
        },
        blank: {
          rootDomainName: [false]
        },
        exist: {
          rootDomainName: [false]
        }
      }
    }
  },
  mixins: [TargetMixin],
  computed: {
    isFormValid () {
      return (this.validators.url.rootDomainName || this.validators.exist.rootDomainName)
    },
    target () {
      return this.getTargetByTransformedName(this.$route.params.targetName)
    },
    ...mapGetters('target', ['checkIfRootdomainExistsByName', 'getTargetByTransformedName', 'getTargetAndRootDomainByName'])
  },
  created: function () {
    this.rootdomains.push({
      root: '',
      date: new Date().toISOString().slice(0, 10),
      subdomain: [],
      messages: [],
      agent: []
    })
  },
  methods: {
    createRootDomains: function () {
      if (this.isFormValid || !this.enableValidationMessageRootDomainBlankNameManual()) {
        this.rootdomains.push({
          root: '',
          date: new Date().toISOString().slice(0, 10),
          subdomain: [],
          messages: [],
          agent: []
        })
        const self = this
        setTimeout(
          function () {
            document.getElementById('rootd-form-input-' + (self.rootdomains.length - 1)).focus()
          },
          100
        )
      }
    },
    insertRootDomains: function () {
      if (this.$validateIsBlank(this.rootdomains[0].root)) {
        this.validators.blank.rootDomainName[0] = true
      }
      if (!this.enableValidationMessageRootDomainBlankNameManual() && !this.enableValidationMessageRootDomainUniqueNameManual() && this.validators.url.rootDomainName.indexOf(true) < 0 && this.validators.exist.rootDomainName.indexOf(true) < 0 && this.validators.blank.rootDomainName.indexOf(true) < 0) {
        const params = {
          idTarget: parseInt(this.target.id),
          rootdomainsItems: this.rootdomains
        }
        this.addRootDomain(params)
        this.updateOperationStatus(this.$entityStatus.SUCCESS, this.$message.successMessageForRootDomainInsertion)
        this.validators.exist.rootDomainName.length = this.validators.exist.rootDomainName.length + 1
        jQuery('#rootDomainInsertionForm').modal('hide')
        this.resetForm()
      }
    },
    resetForm: function () {
      this.rootdomains = [{
        root: '',
        date: new Date().toISOString().slice(0, 10),
        subdomain: [],
        messages: [],
        agent: []
      }]
      this.validators = {
        url: {
          rootDomainName: [false]
        },
        blank: {
          rootDomainName: [false]
        },
        exist: {
          rootDomainName: [false]
        }
      }
    },
    enableValidationMessageRootDomainUrlName: function (e) {
      const textFieldIndex = e.currentTarget.getAttribute('data-index')
      if (!this.$validateIsBlank(this.rootdomains[textFieldIndex].root) && !this.$validateUrlWithoutProtocol(this.rootdomains[textFieldIndex].root)) {
        this.validators.url.rootDomainName[textFieldIndex] = true
      } else {
        this.validators.url.rootDomainName[textFieldIndex] = false
      }
    },
    enableValidationMessageRootDomainUniqueName: function (e) {
      const textFieldIndex = parseInt(e.currentTarget.getAttribute('data-index'))
      let founded = false
      let index = 0
      while (index < this.rootdomains.length && !founded) {
        if (index !== textFieldIndex) {
          if (this.rootdomains[textFieldIndex].root === this.rootdomains[index].root) {
            this.validators.exist.rootDomainName[textFieldIndex] = true
            founded = true
          }
        }
        index++
      }
      if (!founded) {
        this.validators.exist.rootDomainName[textFieldIndex] = false
      }
    },
    enableValidationMessageRootDomainBlankName: function (e) {
      const textFieldIndex = e.currentTarget.getAttribute('data-index')
      if (this.rootdomains[textFieldIndex].root === '') {
        this.validators.blank.rootDomainName[textFieldIndex] = true
      } else {
        this.validators.blank.rootDomainName[textFieldIndex] = false
      }
    },
    enableValidationMessageRootDomainBlankNameManual: function () {
      let founded = false
      let index = 0
      while (index < this.rootdomains.length) {
        if (this.$validateIsBlank(this.rootdomains[index].root)) {
          this.validators.blank.rootDomainName[index] = true
          founded = true
        }
        index++
      }
      return founded
    },
    enableValidationMessageRootDomainUniqueNameManual: function () {
      let founded = false
      let index = 0
      const params = {
        name: '',
        idtarget: parseInt(this.target.id)
      }
      while (index < this.rootdomains.length && !founded) {
        params.name = this.rootdomains[index].root
        if (this.checkIfRootdomainExistsByName(params)) {
          this.validators.exist.rootDomainName[index] = true
          founded = true
        } else {
          if (this.validators.exist.rootDomainName[index] === false) {
            this.validators.exist.rootDomainName[index] = false
          }
        }
        index++
      }
      return founded
    },
    enableValidations: function (e) {
      this.enableValidationMessageRootDomainUniqueName(e)
      this.enableValidationMessageRootDomainUrlName(e)
      this.enableValidationMessageRootDomainBlankName(e)
    },
    ...mapMutations('target', ['addRootDomain']),
    removeRootDomainName: function (e) {
      const rootdomainIndex = parseInt(e.currentTarget.getAttribute('data-index'))
      if (rootdomainIndex !== 0) {
        this.rootdomains.splice(rootdomainIndex, 1)
        this.validators.blank.rootDomainName.splice(rootdomainIndex, 1)
        this.validators.exist.rootDomainName.splice(rootdomainIndex, 1)
      }
    }
  }
}
</script>
<style scoped>
    .root-domain-window {
        height: 434px;
        background: #FFFFFF 0% 0% no-repeat padding-box;
    }
    .root-domain-name {
        border-radius: 0;
    }
    .add-subdomain-btn-primary {
        width: 14rem;
        height: 56px;
        color: #fff;
        background: transparent linear-gradient(105deg, #737BE5 0%, #7159D3 100%) 0% 0% no-repeat padding-box;
        box-shadow: 3px 12px 23px #0C1F6A17;
        border-radius: 1rem;
    }
    .custom-border-radius {
        border-radius: 25px !important;
    }
    div.modal-content.root-domain-window {
        padding:  0 3% 3% 3%;
    }
    .form-container {
        height: 159px;
        overflow: auto;
        padding-right: 10px;
        bottom: 0 !important;
    }
    span.circle-minus-properties{
      position: relative;
      z-index: 2;
      display: block;
      line-height: 2.375rem;
      text-align: center;
      top: -41px;
      right: -94%;
      width: 25px;
    }
    .subdomains-items-field{
      padding-right: 5%;
    }
    .remove-space-generated-ico{
      margin-top: -3%;
    }
    span.circle-minus-properties svg{
      fill: #ff4545
    }
    input.subdomains-items-field{
      border-radius: 11px;
    }
</style>
