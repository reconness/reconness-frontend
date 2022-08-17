<template>
<div>
<div class="mt-3 ml-4">
    <nav class="navbar navbar-expand">
      <ul class="navbar-nav">
        <li class="nav-item nav-margin border-right  border-left d-none d-sm-block mr-4 pr-4 pl-4">
        <a href="#" data-toggle="modal" data-target="#subDomainInsertionForm"> <span class="material-icons icon-color-style gradient-style" v-bind:style ="{background: color}">add_circle</span>
         Add Subdomain</a></li>
        <li class="nav-item nav-margin border-right d-none d-sm-block mr-4 pr-4">
          <FileImportIco  v-bind:style ="{ 'fill': color}"/>
          <label for="export-target" class="domain-names-list mb-0"> Import Subdomains </label>
          <input type="file" id="export-target"/>
        </li>
        <li :class="{'isLinkDisabled' : this.getSubdomainSizeByReferencesName(this.routeParams) === 0}" class="nav-item nav-margin border-right d-none d-sm-block mr-4 pr-4">
         <a href="#"><FileExportIco  v-bind:style ="{'fill': color}"/>  Export All Subdomains</a></li>
        <li :class="{'isLinkDisabled' : this.getSubdomainSizeByReferencesName(this.routeParams) === 0}" class="nav-item nav-margin border-right d-none d-sm-block mr-4 pr-4">
        <a href="#" data-toggle="modal" data-target="#message-box-modal"  @click="removeAllSubDomains()"><span class="material-icons icon-color-style gradient-style" v-bind:style ="{background: color}">delete</span> Delete All Subdomains</a></li>
      </ul>
    </nav>
    <div class="row mt-4">
    <div class="col-lg-8">
    <div class="mb-3 has-search" :class="{'isLinkDisabled' : this.getSubdomainSizeByReferencesName(this.routeParams) === 0}">
      <span class="material-icons search-icon form-control-feddback">search</span>
      <input  id="input-search" class="form-control form-style" type="search" placeholder="Find"  v-model= "searchModel"  v-on:keyup.enter="enableSearchFilter" @mouseup="searchEvent(this.searchModel)">
    </div>
    </div>
       <div class="col-lg-4" :class="{'isLinkDisabled' : this.getSubdomainSizeByReferencesName(this.routeParams) === 0}">
         <label class="float-left mr-3 ml-3 label-style" for="dropdownMenuButton">Filter by</label>
         <div class="dropdown" >
    <button class="btn btn-style-dropd  dropdown-toggle pt-2 pb-1 w-50" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
   <p class="float-left m-0">  {{elementSelected}}</p>
  </button>
  <div class="dropdown-menu w-50" aria-labelledby="dropdownMenuButton">
    <div v-for="element in this.selectList" :key="element.id" @click="this.elementSelected = element.name">
      <a  v-if="this.elementSelected !== element.name" class="dropdown-item" href="#" @click="this.dropdownCriteria = element.id" >{{element.name}} </a>
    </div>
  </div>
</div>
       </div>
      </div></div>
<div class="card card-style">
<div v-if="!isFilterResultEmpty" class="card-body">
<div class="card card-table" v-if=" this.getSubdomainSizeByReferencesName(this.routeParams) > 0">
  <div class=" row mb-2"  v-if="this.showHeader">
   <div class="col-2 border-left-radius border-right text-light-white p-2" v-bind:style ="{'background':color}"> <p class="ml-2 m-0"> Subdomain</p> </div>
   <div class="col-3 border-right text-light-white p-2 text-center" v-bind:style ="{'background':color}"> Details</div>
   <div class="col mr-3 border-right-radius text-light-white p-2 text-center" v-bind:style ="{'background':color}"> Labels</div>
   <div class="col-2 p-0" >
     <button class="border-table text-light-white p-2 text-center w-100"  @click="this.showHeader = !this.showHeader"   v-bind:style ="{'background':color}"> Edit List</button></div>
  </div>
  <div class=" row mb-2" v-else>
     <div class="col-2 border-left-radius border-right text-light-white p-2" v-bind:style ="{'background':color}">
        <p class="ml-2 mr-2 m-0"> Selected <span class="badge badge-pill badge-light" v-bind:style ="{'color':color}"> {{$store.state.target.countElementSelected}} </span></p> </div>
     <div class="col-2 border-right text-light-white p-2 text-center domain-names-list" v-bind:style ="{'background':color}" @click="selectedAll()"> Selected All</div>
     <div class="col-2 border-right text-light-white p-2 text-center domain-names-list" v-bind:style ="{'background':color}" @click="unselectedAll()"> Unselected All</div>
     <div class="col border-right text-light-white p-2 text-center" v-bind:style ="{'background':color}"> </div>
     <div :class="{'isLinkDisabled' : isElementSelected, 'domain-names-list' : !isElementSelected}" class="col-1 border-right text-light-white p-2 text-center" v-bind:style ="{'background':color}"> <a>Export</a></div>
     <div data-toggle="modal" data-target="#message-box-modal" :class="{'isLinkDisabled' : isElementSelected, 'domain-names-list' : !isElementSelected}" class="col-1 border-right text-light-white p-2 text-center" v-bind:style ="{'background':color}">
       <a>Delete</a></div>
     <div class="col-1 border-right-radius text-light-white p-2 text-center domain-names-list" v-bind:style ="{'background':color}" @click="done()"> Done</div>
  </div>
     <div class="row mb-2" v-for="item of this.search()" :key="item.id" :id="'row' + item.id" :class="{'background-row' : !showHeader}">
    <div class="col-2  border-left-radius border">
      <p class="m-2 mb-2">{{item.name}}</p>
    </div>
    <div class="col-3 border-top border-bottom">
    <div class="row mt-2 mb-2">
      <div class="col-9">
      <dl class="ml-2">
        <dd class="clearfix"> <p class="text-muted-b3 mr-2 m-0 float-left"> Agents: </p>
        <p class="text-dark-0 m-0 float-left">{{ printAgent(item.agent)}} </p>
        </dd>
        <dd class="clearfix"> <p class="text-muted-b3 mr-2 m-0 float-left">IpAddress: </p> <p class="text-dark-0 m-0"> {{item.ipAddress}} </p></dd>
        <dd class="clearfix"> <p class="text-muted-b3 mr-2 m-0 float-left"> Ports: </p>
          <p class="text-dark-0 m-0 float-left">{{item.ports.join(', ')}} </p>
        </dd>
        <dd> <p class="text-muted-b3 mr-2 m-0 float-left">Added: </p><p class="text-dark-0 m-0"> {{item.added}}</p> </dd>
      </dl>
      </div><div class="col abs-center ml-2 mr-2">
        <div class="row abs-center icons-size">
          <div class="col-12">
            <div v-if="item.isAlive == true" class="abs-center mx-auto mb-1">
              <HeartIco/>
            </div>
            <div v-else class="abs-center mx-auto mb-1 inactive-ico">
              <HeartIco/>
            </div>
          </div>
          <div class="col-12 border-top">
            <span v-if="item.http == true" class="badge abs-center mx-auto mt-1 icon-badge-style" v-bind:style ="{background: '#00B1FF 0% 0% no-repeat padding-box', color: '#ffffff'}"> H T<br>T P</span>
            <span v-else class="badge abs-center mx-auto mt-1 icon-badge-style inactive-gradient" v-bind:style ="{background: gradient, color: '#ffffff'}"> H T<br>T P</span>
          </div>
        </div>
     </div></div></div>
    <div class="col border" :class="{'border-right-radius' : showHeader, 'border-right-0': !showHeader}" >
      <div class="row mt-2 mx-4">
        <div class="col">
          <div class="custom-control custom-checkbox form-check mb-2" :class= "'check-color-' + color.substring(1)">
          <input readonly="readonly" onclick="return false;" class="custom-control-input form-check-input " type="checkbox"  id="checking" :checked= item.checking>
          <label class="custom-control-label form-check-label text-body" for="checking">Checking</label>
          </div>
          <div class="custom-control custom-checkbox form-check" :class= "'check-color-' + color.substring(1)">
          <input readonly="readonly" onclick="return false;"  class="custom-control-input form-check-input" type="checkbox" id="interest" :checked= item.interesting>
          <label class="custom-control-label form-check-label text-body" for="interest">Interesting</label>
          </div>
        </div>
        <div class="col">
          <div class="form-check mb-2 custom-control custom-checkbox" :class= "'check-color-' + color.substring(1)">
          <input readonly="readonly" onclick="return false;" class="custom-control-input form-check-input" type="checkbox" id="vulnerable" :checked= item.vulnerable >
          <label class="form-check-label text-body custom-control-label" for="vulnerable">Vulnerable</label>
          </div>
          <div class="form-check custom-control custom-checkbox" :class= "'check-color-' + color.substring(1)">
          <input  readonly="readonly" onclick="return false;"  class="custom-control-input form-check-input" type="checkbox" id="bounty" :checked= item.bounty>
          <label class="form-check-label text-body custom-control-label" for="bounty">Bounty</label>
          </div>
        </div>
        <div class="col">
           <div class="form-check mb-2 custom-control custom-checkbox" :class= "'check-color-' + color.substring(1)">
          <input readonly="readonly" onclick="return false;"  class="custom-control-input form-check-input" type="checkbox" id="ignore" :checked= item.ignore>
          <label class="form-check-label text-body custom-control-label" for="ignore">Ignore</label>
          </div>
          <div class="form-check custom-control custom-checkbox" :class= "'check-color-' + color.substring(1)">
          <input readonly="readonly" onclick="return false;"  class="custom-control-input form-check-input" type="checkbox" id="scope" :checked= item.scope>
          <label class="form-check-label text-body custom-control-label" for="scope">Scope</label>
          </div>
        </div>
  </div>
    </div>
    <div class="col-2 ml-3 border-table abs-center border p-0" v-if="this.showHeader">
        <div class="border-right abs-center h-100 w-75 float-left">
          <router-link :to="{ name: 'SubDomainDetails', params: {idTarget: routeParams.idTarget, id: routeParams.idRootDomain, idsubdomain: item.id, subdomainName: item.name} }">
          <span class="material-icons gradient-style" style="font-size:44px; opacity: 1;" v-bind:style ="{background: color}">forward</span>
          </router-link>
        </div>
        <div class="abs-center mx-auto">
          <span class="material-icons icon-color-style gradient-style delete-hover"
          data-toggle="modal" data-target="#message-box-modal" :data-id="item.id" :data-name="item.name"
          v-bind:style ="{background: '#B3B3B3', opacity:0.5}" @mouseover="toggle"
          aria:haspopup="true" aria-controls="overlay_panel"
          @click="prepareToDelete($event, this.$entityTypeData.SUBDOMAIN.id)">delete</span>
        </div>
    </div>
    <div class="col-2 border-right-radius abs-center border p-0 custom-control-container-rounded" v-else>
      <div class="roundedOne" :class="'check-color-' + color.substring(1)">
        <input type="checkbox" class="custom-control-input-rounded" :id="'remove_customCheckbox' + item.id" name="checkbox-dinamic" @click="selectRow(item.id, item.name)">
        <label class="custom-control-label-rounded" :for="'remove_customCheckbox' + item.id" :data-id="item.id" :data-name="item.name" @click="prepareToDeleteFromMultipleSelections($event, this.$entityTypeData.SUBDOMAIN.id)"></label>
      </div>
    </div>
</div></div>
<div v-else>
  <p class="lead text-center">
There are no subdomains associated with this root domain. <br>
 Please, click <strong> Add Subdomain </strong> button to insert some subdomains.</p>
</div>
</div>
  <div v-else>
    <p class="lead text-center mt-3">
      <strong> There is no subdomain  matching with your query. Please, change your query and search again.</strong>
    </p>
  </div>
</div>
  <OverlayPanel :baseZIndex=100 ref="op" appendTo="body" id="overlay_panel"  >
    <small class="font-weight-bold">Delete</small>
  </OverlayPanel>
  <SubDomainInsertionForm :gradient="gradient"/>
</div>
</template>
<script>
import SubDomainInsertionForm from '@/components/Target/SubDomainInsertionForm.vue'
import OverlayPanel from 'primevue/overlaypanel'
import FileExportIco from '@/components/Icons/FileExportIco.vue'
import FileImportIco from '@/components/Icons/FileImportIco.vue'
import HeartIco from '@/components/Icons/HeartIco.vue'
import { TargetMixin } from '@/mixins/TargetMixin'
import { RemoveEntitiesMixin } from '@/mixins/RemoveEntitiesMixin'
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'SubdomainListTable',
  components: {
    SubDomainInsertionForm,
    OverlayPanel,
    FileExportIco,
    FileImportIco,
    HeartIco
  },
  props: {
    color: String,
    gradient: String,
    rootDomain: {
      type: Object,
      default: () => {}
    },
    routeParams: Object
  },
  data: function () {
    return {
      dataColor: '',
      showHeader: true,
      isElementSelected: true,
      rName: 'subdomains',
      selectList: [{ id: 1, name: 'Subdomain' }, { id: 2, name: 'Label' }, { id: 3, name: 'Service' }, { id: 4, name: 'Port' }, { id: 5, name: 'Agent' }, { id: 6, name: 'Date' }],
      elementSelected: 'Subdomain',
      searchModel: '',
      searchCriteria: '',
      dropdownCriteria: 1,
      isFilterResultEmpty: false
    }
  },
  mixins: [RemoveEntitiesMixin, TargetMixin],
  computed: {
    ...mapGetters('target', ['getSubdomainSizeByReferencesName']),
    ...mapState('agent', ['isElementDeleted']),
    ...mapState('general', ['entitiesToDelete'])
  },
  mounted () {
    if (this.isElementDeleted) {
      this.$toast.add({ severity: 'success', sumary: 'Success', detail: 'The SubDomain has been deleted successfully', life: 3000 })
      this.setIsElementDeleted(false)
    }
  },
  methods: {
    ...mapMutations('agent', ['setIsElementDeleted']),
    ...mapMutations('target', ['updateRemoveAllOption']),
    ...mapMutations('general', ['addEntityToDelete']),
    toggle (event) {
      this.$refs.op.toggle(event)
    },
    updateConfirm (itemName) {
      return this.$store.commit('agent/confirm', { name: itemName, route: 'subdomains' })
    },
    selectRow (id, name) {
      if (document.getElementById('remove_customCheckbox' + id).checked) {
        document.getElementById('row' + id).style.background = 'rgb(242, 244, 246)'
        this.$store.commit('target/addSelectedList', { idTarget: this.$route.params.idTarget, idRoot: this.rootDomain.id, idSubdom: id, nameSubdom: name })
        this.$store.commit('target/addCountElementSelected')
      } else {
        document.getElementById('row' + id).style.background = '#fff'
        this.$store.commit('target/removeCountElementSelected', id)
      }
      if (this.$store.state.target.countElementSelected !== 0) {
        this.isElementSelected = false
      } else {
        this.isElementSelected = true
      }
    },
    selectedAll () {
      this.$store.commit('target/cancelElementSelected')
      const checkboxes = document.getElementsByName('checkbox-dinamic')
      for (let i = 0, n = checkboxes.length; i < n; i++) {
        checkboxes[i].checked = true
        this.isElementSelected = false
        document.getElementById('row' + checkboxes[i].id.substr(14)).style.background = 'rgb(242, 244, 246)'
        const subdom = this.rootDomain.subdomain.find(item => item.id === Number(checkboxes[i].id.substr(14)))
        this.$store.commit('target/addSelectedList', { idTarget: this.$route.params.idTarget, idRoot: this.rootDomain.id, idSubdom: checkboxes[i].id.substr(14), nameSubdom: subdom.name })
        this.$store.commit('target/addCountElementSelected')
      }
    },
    unselectedAll () {
      if (this.$store.state.target.countElementSelected !== 0) {
        const checkboxes = document.getElementsByName('checkbox-dinamic')
        for (let i = 0, n = checkboxes.length; i < n; i++) {
          if (checkboxes[i].checked === true) {
            checkboxes[i].checked = false
            this.isElementSelected = true
            document.getElementById('row' + checkboxes[i].id.substr(14)).style.background = '#fff'
            this.$store.commit('target/removeCountElementSelected')
          }
        }
        this.$store.commit('target/cancelElementSelected')
      }
    },
    done () {
      this.isElementSelected = true
      this.showHeader = true
      this.$store.commit('target/cancelElementSelected')
    },
    searchEvent (oldValue) {
      setTimeout(function () {
        const newValue = document.getElementById('input-search').value
        if (newValue === '' && oldValue !== '') {
          this.searchCriteria = ''
        }
      }.bind(this), 1)
    },
    search () {
      if (this.searchCriteria === '' || this.searchCriteria === undefined) {
        if (this.dropdownCriteria === 1) {
          const countElementList = this.getSubdomainSizeByReferencesName(this.routeParams)
          this.$store.commit('target/changeCounterSubdom', countElementList)
          return this.rootDomain.subdomain
        }
      } else if (this.dropdownCriteria === 2) {
        if ('interesting'.includes(this.searchCriteria.toLowerCase())) {
          const listSubdomain = this.rootDomain.subdomain.filter(item => (item.interesting === true))
          this.$store.commit('target/changeCounterSubdom', listSubdomain.length)
          return listSubdomain
        } else if ('checking'.includes(this.searchCriteria.toLowerCase())) {
          const listSubdomain = this.rootDomain.subdomain.filter(item => (item.checking === true))
          this.$store.commit('target/changeCounterSubdom', listSubdomain.length)
          return listSubdomain
        } else if ('vulnerable'.includes(this.searchCriteria.toLowerCase())) {
          const listSubdomain = this.rootDomain.subdomain.filter(item => (item.vulnerable === true))
          this.$store.commit('target/changeCounterSubdom', listSubdomain.length)
          return listSubdomain
        } else if ('bounty'.includes(this.searchCriteria.toLowerCase())) {
          const listSubdomain = this.rootDomain.subdomain.filter(item => (item.bounty === true))
          this.$store.commit('target/changeCounterSubdom', listSubdomain.length)
          return listSubdomain
        } else if ('ignore'.includes(this.searchCriteria.toLowerCase())) {
          const listSubdomain = this.rootDomain.subdomain.filter(item => (item.ignore === true))
          this.$store.commit('target/changeCounterSubdom', listSubdomain.length)
          return listSubdomain
        } else if ('scope'.includes(this.searchCriteria.toLowerCase())) {
          const listSubdomain = this.rootDomain.subdomain.filter(item => (item.scope === true))
          this.$store.commit('target/changeCounterSubdom', listSubdomain.length)
          return listSubdomain
        }
      } else if (this.dropdownCriteria === 3) {
        const listSubdomain = this.rootDomain.subdomain.filter(item => (item.services.find(item2 => item2.name.toLowerCase().includes(this.searchCriteria.toLowerCase()))))
        this.$store.commit('target/changeCounterSubdom', listSubdomain.length)
        return listSubdomain
      } else if (this.dropdownCriteria === 4) {
        const listSubdomain = this.rootDomain.subdomain.filter(item => (item.ports.find(item2 => item2 === Number(this.searchCriteria))))
        this.$store.commit('target/changeCounterSubdom', listSubdomain.length)
        return listSubdomain
      } else if (this.dropdownCriteria === 5) {
        const listSubdomain = this.rootDomain.subdomain.filter(item => (item.agent.find(item2 => item2.name.toLowerCase().includes(this.searchCriteria.toLowerCase()))))
        this.$store.commit('target/changeCounterSubdom', listSubdomain.length)
        return listSubdomain
      } else if (this.dropdownCriteria === 6) {
        const listSubdomain = this.rootDomain.subdomain.filter(item => (item.added === this.searchCriteria))
        this.$store.commit('target/changeCounterSubdom', listSubdomain.length)
        return listSubdomain
      }
      const listSubdomain = this.rootDomain.subdomain.filter(item => (item.name.toLowerCase().includes(this.searchCriteria.toLowerCase())))
      this.$store.commit('target/changeCounterSubdom', listSubdomain.length)
      return listSubdomain
    },
    printAgent (agents) {
      const listAgent = []
      for (const index1 of agents) {
        listAgent.push(index1.name)
      }
      return listAgent.join(', ')
    },
    enableSearchFilter () {
      this.searchCriteria = this.searchModel
      if (this.searchModel !== '') {
        if (this.search().length === 0) {
          this.isFilterResultEmpty = true
        } else {
          this.isFilterResultEmpty = false
        }
      } else {
        this.isFilterResultEmpty = false
      }
    },
    removeAllSubDomains () {
      this.updateRemoveAllOption(true)
      this.addEntityToDelete({
        id: this.rootDomain.subdomain[0].id,
        name: this.rootDomain.subdomain[0].name,
        type: this.$entityTypeData.SUBDOMAIN.id // this.$agentType.TARGET
      })
    }
  }
}
</script>

<style scoped>
.form-style{
    background-color: transparent!important;
    border-radius: 12px;
    opacity: 1;
}
.btn-style-dropd{
    background-color: transparent;
    border-color: #495057;
    color: #495057;
    border: 1px solid #ced4da;
    font-weight: 400;
    font-size: 1rem;
    border-radius: 12px;
    opacity: 1;
}
.btn-style-dropd.dropdown-toggle::after {
    float: right;
    margin-top: 9px;
}

.icon-color-style{
  font-size: 20px;
  opacity: 1;
}
.label-style{
  font-weight: 400!important;
  padding:.375rem .75rem;
}

.list-style-item{
  display: block;
  border: 1px solid rgba(0,0,0,.125);
}

.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.delete-hover:hover{
  background-color: red!important;
  cursor: pointer;
}
.nav-item a, .nav-item label{
color: #000000;
opacity: 1;
font-weight: initial;
font-size: 16px;
}
.text-dark-0{
  color: #000000;
}
.icons-size div span{
  font-size: 25px;
}
.icons-size div.abs-center.mx-auto.mb-1{
  fill: #FF4545;
  width: 25px;
  height: 25px;
  opacity: 1;
}
.nav-item svg{
    width: 20px;
    height: 20px;
    opacity: 1;
    cursor: pointer;
}
.nav-item svg, .nav-item .material-icons{
    vertical-align: text-bottom;
}
#export-target {
  opacity: 0;
  position: absolute;
  z-index: -1;
  display: none;
}
.background-row {
  background: #fff;
  border-radius: 12px;
}
.icon-badge-style {
 font-weight: 400;
 font-size:10px!important;
 width: 23px;
 height: 23px;
 opacity: 1;
 border-radius: 4px;
}
div.inactive-ico {
  fill: #B3B3B3 !important;
}
.inactive-gradient{
  background: linear-gradient(160deg, rgb(177, 177, 177) 0%, rgb(177, 177, 177) 100%) !important;
}

.roundedOne {
  width: 28px;
  height: 28px;
  position: relative;
  margin: 20px auto;
  background: #fcfff4;
  border-radius: 50px;
  box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0, 0, 0, 0.5);
}
.roundedOne label {
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  left: 1px;
  top: 1px;
  border-radius: 50px;
}
.roundedOne label:after {
  content: "";
  width: 16px;
  height: 16px;
  position: absolute;
  top: 2px;
  left: 2px;
  opacity: 0;
  border-radius: 50px;
}
.roundedOne label:hover::after {
  opacity: 0.3;
}
.roundedOne input[type="checkbox"] {
  visibility: hidden;
}
.roundedOne input[type="checkbox"]:checked + label:after {
  opacity: 1;
}

.roundedOne.check-color-0cb8e0 {
  border: 3px solid #0cb8e0;
}
.roundedOne.check-color-0cb8e0 label:after {
   background:  #0cb8e0;
}

.roundedOne.check-color-FF4343 {
  border: 3px solid #FF4343;
}
.roundedOne.check-color-FF4343 label:after {
   background:  #FF4343;
}

.roundedOne.check-color-16c465 {
  border: 3px solid #16c465;
}
.roundedOne.check-color-16c465 label:after {
   background:  #16c465;
}

.roundedOne.check-color-f36a33 {
  border: 3px solid #f36a33;
}
.roundedOne.check-color-f36a33 label:after {
   background:  #f36a33;
}

.roundedOne.check-color-7159d3 {
  border: 3px solid #7159d3;
}
.roundedOne.check-color-7159d3 label:after {
   background:  #7159d3;
}

</style>
