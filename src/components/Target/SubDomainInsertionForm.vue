<template>
    <div class="col-12">
            <div class="modal fade" id="subDomainInsertionForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div class="modal-content root-domain-window custom-border-radius ">
                        <div class="modal-body">
                             <button type="button" @click="resetForm" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                                <p class="agent-placeholder agent-name-input root-domain-name mt-3 pl-2" v-bind:style ="{borderImage:gradient, 'border-image-slice': 1}">New Subdomain</p>
                            <p class="description-text pl-3">Choose an option to add a new subdomain</p>
                            <div class="form-container">
                                <div v-for="(item, index) in subdomains" :key="item" class="subdomain-form-container mt-2">
                                  <input :data-index="index" v-model="item.name" @keyup.enter="createSubdomains" class="form-control agent-placeholder subdomains-items-field" placeholder="New subdomain" @blur="enableValidationMessageSubDomainBlankName" @keyup="enableValidations" :id="'subd-form-input-' + index">
                                  <div style="height: 0;">
                                    <span @click="removeSubdomainName" class="circle-minus-properties cursor-pointer" :data-index="index" v-show="index>0">
                                      <MinusCircleIco/>
                                    </span>
                                  </div>
                                </div>
                                <a href="#" class="text-body d-inline-flex mt-3" @click="createSubdomains">
                                    <span class="material-icons gradient-style" v-bind:style ="{background: gradient}">add_circle</span>
                                    <span class="ml-2 gradient-style" v-bind:style ="{background:gradient}">Add New</span>
                                </a>
                            </div>
                        </div>
                        <div class="modal-footer border-top-0 m-auto">
                            <div class="row text-center">
                              <div class="col-12">
                                <button type="button" class="btn add-subdomain-btn-primary" v-bind:style ="{background: gradient}" @click="insertSubdomains">Add Subdomain</button>
                              </div>
                              <div class="col-12 mt-2" v-if="this.validators.blank.subDomainName.indexOf(true) >= 0">
                                <span :class="{invalid: this.validators.blank.subDomainName.indexOf(true) >= 0}">You must not leave any text field blank</span>
                              </div>
                              <div class="col-12 mt-1" v-if="validators.url.subDomainName.indexOf(true) >= 0">
                                <span :class="{invalid: validators.url.subDomainName.indexOf(true) >= 0}">Some of the specified urls are not valid</span>
                              </div>
                              <div class="col-12 mt-1" v-if="this.validators.exist.subDomainName.indexOf(true) >= 0">
                                <span :class="{invalid: this.validators.exist.subDomainName.indexOf(true) >= 0}">Some of the the specified values already exist</span>
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
import jQuery from 'jquery'
import MinusCircleIco from '@/components/Icons/MinusCircleIco.vue'
export default {
  components: {
    MinusCircleIco
  },
  data: function () {
    return {
      subdomains: [],
      validators: {
        url: {
          subDomainName: [false]
        },
        blank: {
          subDomainName: [false]
        },
        exist: {
          subDomainName: [false]
        }
      }
    }
  },
  methods: {
    createSubdomains: function () {
      if (this.isFormValid || !this.enableValidationMessageSubDomainBlankNameManual()) {
        this.subdomains.push({
          name: '',
          added: new Date().toISOString().slice(0, 10),
          checking: false,
          interesting: false,
          vulnerable: false,
          boubty: false,
          ignore: false,
          scope: false,
          agent: [],
          ipAddress: '',
          http: false,
          isAlive: false,
          ports: [],
          services: [],
          directories: []
        })
        // console.log('subd-form-input-' + (this.subdomains.length - 1))
        const self = this
        setTimeout(
          function () {
            document.getElementById('subd-form-input-' + (self.subdomains.length - 1)).focus()
          },
          100
        )
      }
    },
    insertSubdomains: function () {
      if (this.$validateIsBlank(this.subdomains[0].name)) {
        this.validators.blank.subDomainName[0] = true
      }
      if (!this.enableValidationMessageSubDomainBlankNameManual() && !this.enableValidationMessageSubDomainUniqueNameManual() && this.validators.url.subDomainName.indexOf(true) < 0 && this.validators.exist.subDomainName.indexOf(true) < 0 && this.validators.blank.subDomainName.indexOf(true) < 0) {
        const params = {
          idTarget: parseInt(this.$route.params.idTarget),
          idRootDomain: parseInt(this.$route.params.id),
          subdomainsItems: this.subdomains
        }
        this.addSubdomain(params)
        this.validators.exist.subDomainName.length = this.validators.exist.subDomainName.length + 1
        jQuery('#subDomainInsertionForm').modal('hide')
        this.resetForm()
      }
    },
    resetForm: function () {
      this.subdomains = [{
        name: '',
        added: new Date().toLocaleDateString('es-Es'),
        checking: false,
        interesting: false,
        vulnerable: false,
        boubty: false,
        ignore: false,
        scope: false,
        agent: [],
        ipAddress: '',
        http: false,
        isAlive: false,
        ports: [],
        services: [],
        directories: []
      }]
      this.validators = {
        url: {
          subDomainName: [false]
        },
        blank: {
          subDomainName: [false]
        },
        exist: {
          subDomainName: [false]
        }
      }
    },
    enableValidationMessageSubDomainUrlName: function (e) {
      const textFieldIndex = e.currentTarget.getAttribute('data-index')
      if (!this.$validateIsBlank(this.subdomains[textFieldIndex].name) && !this.$validateUrlWithoutProtocol(this.subdomains[textFieldIndex].name)) {
        this.validators.url.subDomainName[textFieldIndex] = true
      } else {
        this.validators.url.subDomainName[textFieldIndex] = false
      }
    },
    enableValidationMessageSubDomainUniqueName: function (e) {
      const textFieldIndex = parseInt(e.currentTarget.getAttribute('data-index'))
      let founded = false
      let index = 0
      while (index < this.subdomains.length && !founded) {
        if (index !== textFieldIndex) {
          if (this.subdomains[textFieldIndex].name === this.subdomains[index].name) {
            this.validators.exist.subDomainName[textFieldIndex] = true
            founded = true
          }
        }
        index++
      }
      if (!founded) {
        this.validators.exist.subDomainName[textFieldIndex] = false
      }
    },
    enableValidationMessageSubDomainBlankName: function (e) {
      const textFieldIndex = e.currentTarget.getAttribute('data-index')
      if (this.subdomains[textFieldIndex].name === '') {
        this.validators.blank.subDomainName[textFieldIndex] = true
      } else {
        this.validators.blank.subDomainName[textFieldIndex] = false
      }
    },
    enableValidationMessageSubDomainBlankNameManual: function () {
      let founded = false
      let index = 0
      while (index < this.subdomains.length) {
        if (this.$validateIsBlank(this.subdomains[index].name)) {
          this.validators.blank.subDomainName[index] = true
          founded = true
        }
        index++
      }
      return founded
    },
    enableValidationMessageSubDomainUniqueNameManual: function () {
      let founded = false
      let index = 0
      const params = {
        name: '',
        idtarget: parseInt(this.$route.params.idTarget),
        idrootdomain: parseInt(this.$route.params.id)
      }
      while (index < this.subdomains.length && !founded) {
        params.name = this.subdomains[index].name
        if (this.checkIfSubdomainExistsByName(params)) {
          this.validators.exist.subDomainName[index] = true
          founded = true
        } else {
          if (this.validators.exist.subDomainName[index] === false) {
            this.validators.exist.subDomainName[index] = false
          }
        }
        index++
      }
      return founded
    },
    enableValidations: function (e) {
      this.enableValidationMessageSubDomainUniqueName(e)
      this.enableValidationMessageSubDomainUrlName(e)
      this.enableValidationMessageSubDomainBlankName(e)
    },
    ...mapMutations('target', ['addSubdomain']),
    removeSubdomainName: function (e) {
      const subdomainIndex = parseInt(e.currentTarget.getAttribute('data-index'))
      if (subdomainIndex !== 0) {
        this.subdomains.splice(subdomainIndex, 1)
        this.validators.blank.subDomainName.splice(subdomainIndex, 1)
        this.validators.exist.subDomainName.splice(subdomainIndex, 1)
      }
    }
  },
  created: function () {
    this.subdomains.push({
      name: '',
      added: new Date().toISOString().slice(0, 10),
      checking: false,
      interesting: false,
      vulnerable: false,
      boubty: false,
      ignore: false,
      scope: false,
      agent: [],
      ipAddress: '',
      http: false,
      isAlive: false,
      ports: [],
      services: [],
      directories: []
    })
  },
  computed: {
    isFormValid () {
      return (this.validators.url.subDomainName || this.validators.exist.subDomainName)
    },
    ...mapGetters('target', ['checkIfSubdomainExistsByName'])
  },
  props: {
    gradient: String
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
