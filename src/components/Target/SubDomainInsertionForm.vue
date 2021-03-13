<template>
    <div class="col-12">
        <form>
            <div class="modal fade" id="subDomainInsertionForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div class="modal-content root-domain-window custom-border-radius ">
                        <div class="modal-body">
                             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                                <p class="agent-placeholder agent-name-input root-domain-name mt-3 pl-2" v-bind:style ="{borderImage:gradient, 'border-image-slice': 1}">New Subdomain</p>
                            <p class="description-text pl-3">Choose an option to add a new subdomain</p>
                            <div class="form-container">
                                <input v-for="item in subdomains" :key="item" v-model="item.name" class="form-control agent-placeholder mb-4 subdomains-items-field" placeholder="New subdomain" v-bind:style ="{borderImage:gradient, 'border-image-slice': 1}">
                                <a href="#" class="text-body d-inline-flex" @click="createSubdomains">
                                    <span class="material-icons gradient-style" v-bind:style ="{background: gradient}">add_circle</span>
                                    <span class="ml-2 gradient-style" v-bind:style ="{background:gradient}">Add New</span>
                                </a>
                            </div>
                        </div>
                        <div class="modal-footer border-top-0 m-auto">
                            <button type="button" class="btn add-subdomain-btn-primary" v-bind:style ="{background: gradient}" @click="insertSubdomains">Add Subdomain</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import { mapMutations } from 'vuex'
import jQuery from 'jquery'
export default {
  data: function () {
    return {
      subdomains: []
    }
  },
  methods: {
    createSubdomains: function () {
      this.subdomains.push({
        name: '',
        added: '2020-12-01',
        checking: true,
        interesting: false,
        vulnerable: true,
        boubty: true,
        ignore: false,
        scope: true,
        agent: [],
        ipAddress: '34.234.345.34',
        http: true
      })
    },
    insertSubdomains: function () {
      var params = {
        idTarget: parseInt(this.$route.params.idTarget),
        idRootDomain: parseInt(this.$route.params.id),
        subdomainsItems: this.subdomains
      }
      this.addSubdomain(params)
      jQuery('#subDomainInsertionForm').modal('hide')
      this.resetForm()
    },
    resetForm: function () {
      this.subdomains = [{
        name: '',
        added: new Date().toLocaleDateString('es-Es'),
        checking: true,
        interesting: false,
        vulnerable: true,
        boubty: true,
        ignore: false,
        scope: true,
        agent: [],
        ipAddress: '34.234.345.34',
        http: true
      }]
    },
    ...mapMutations('target', ['addSubdomain'])
  },
  created: function () {
    this.subdomains.push({
      name: '',
      added: new Date().toLocaleDateString('es-Es'),
      checking: true,
      interesting: false,
      vulnerable: true,
      boubty: true,
      ignore: false,
      scope: true,
      agent: [],
      ipAddress: '34.234.345.34',
      http: true
    })
  },
  props: {
    gradient: String
  }
}
</script>
<style scoped>
    .root-domain-window {
        height: 413px;
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
</style>
