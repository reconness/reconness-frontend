<template>
<div>
<div class="mt-3 ml-4">
    <nav class="navbar navbar-expand">
      <ul class="navbar-nav">
        <li class="nav-item nav-margin border-right  border-left d-none d-sm-block mr-4 pr-4 pl-4">
        <a href="#" data-toggle="modal" data-target="#subDomainInsertionForm"> <span class="material-icons icon-color-style gradient-style" v-bind:style ="{background: gradient}">add_circle</span>
         Add Subdomain</a></li>
        <li class="nav-item nav-margin border-right d-none d-sm-block mr-4 pr-4">
          <FileImportIco  v-bind:style ="{ 'fill': color, 'width': 20, 'height': 20, 'opacity': 1 }" style="width: 20px, height: 20px, opacity: 1;"/>
          <label for="export-target" class=" mb-0"> Import Subdomains </label>
          <input type="file" id="export-target"/>
        </li>
        <li :class="{'isLinkDisabled' : this.getSubdomainSize(this.routeParams) === 0}" class="nav-item nav-margin border-right d-none d-sm-block mr-4 pr-4">
          <a href="#" > <FileExportIco  v-bind:style ="{'fill': color}" />  Export All Subdomains</a></li>
        <li :class="{'isLinkDisabled' : this.getSubdomainSize(this.routeParams) === 0}" class="nav-item nav-margin border-right d-none d-sm-block mr-4 pr-4">
        <a href="#" data-toggle="modal" data-target="#confirmation-modal"  @click="updateConfirm('')"><span class="material-icons icon-color-style gradient-style" v-bind:style ="{background: gradient}">delete</span> Delete All Subdomains</a></li>
      </ul>
    </nav>
    <div class="row mt-4">
    <div class="col-lg-8">
    <div class="mb-3 has-search" :class="{'isLinkDisabled' : this.getSubdomainSize(this.routeParams) === 0}">
      <span class="material-icons search-icon form-control-feddback">search</span>
      <input  class="form-control form-style" type="search" placeholder="Find"  >
    </div>
    </div>
       <div class="col-lg-4" :class="{'isLinkDisabled' : this.getSubdomainSize(this.routeParams) === 0}">
         <label class="float-left mr-3 ml-3 label-style" for="dropdownMenuButton">Filter by</label>
         <div class="dropdown" >
  <button class="btn btn-style-dropd  dropdown-toggle pt-2 pb-1 w-50" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
   Label
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="#">Service</a>
    <a class="dropdown-item" href="#">Port</a>
    <a class="dropdown-item" href="#">Agent</a>
    <a class="dropdown-item" href="#">Date</a>
  </div>
</div>
       </div>
      </div></div>
<div class="card card-style">
  <div class="card-body">
<div class="card card-table" v-if=" this.getSubdomainSize(this.routeParams) > 0">
  <div class=" row mb-2"  v-if="this.showHeader">
   <div class="col-2 border-left-radius border-right text-light-white p-2" v-bind:style ="{'background':gradient}"> <p class="ml-2 m-0"> Subdomain</p> </div>
   <div class="col-3 border-right text-light-white p-2 text-center" v-bind:style ="{'background':gradient}"> Details</div>
   <div class="col mr-3 border-right-radius text-light-white p-2 text-center" v-bind:style ="{'background':gradient}"> Labels</div>
   <div class="col-2 p-0" >
     <button class="border-table text-light-white p-2 text-center w-100"  @click="this.showHeader = !this.showHeader"   v-bind:style ="{'background':gradient}"> Edit List</button></div>
  </div>
  <div class=" row mb-2" v-else>
     <div class="col-2 border-left-radius border-right text-light-white p-2" v-bind:style ="{'background':gradient}">
        <p class="ml-2 mr-2 m-0"> Selected <span class="badge badge-pill badge-light" v-bind:style ="{'color':color}"> {{$store.state.target.countElementSelected}} </span></p> </div>
     <div class="col-2 border-right text-light-white p-2 text-center domain-names-list" v-bind:style ="{'background':gradient}" @click="selectedAll()"> Selected All</div>
     <div class="col-2 border-right text-light-white p-2 text-center domain-names-list" v-bind:style ="{'background':gradient}" @click="unselectedAll()"> Unselected All</div>
     <div class="col border-right text-light-white p-2 text-center" v-bind:style ="{'background':gradient}"> </div>
     <div :class="{'isLinkDisabled' : isElementSelected, 'domain-names-list' : !isElementSelected}" class="col-1 border-right text-light-white p-2 text-center" v-bind:style ="{'background':gradient}"> <a>Export</a></div>
     <div data-toggle="modal" data-target="#confirmationList-modal" :class="{'isLinkDisabled' : isElementSelected, 'domain-names-list' : !isElementSelected}" class="col-1 border-right text-light-white p-2 text-center" v-bind:style ="{'background':gradient}">
       <a>Delete</a></div>
     <div class="col-1 border-right-radius text-light-white p-2 text-center domain-names-list" v-bind:style ="{'background':gradient}" @click="done()"> Done</div>
  </div>
     <div class="row mb-2" v-for="item of rootDomain.subdomain" :key="item.id" :id="'row' + item.id" :class="{'background-row' : !showHeader}">
    <div class="col-2  border-left-radius border">
      <p class="m-2 mb-2">{{item.name}}</p>
    </div>
    <div class="col-3 border-top border-bottom">
    <div class="row mt-2 mb-2">
      <div class="col-8">
      <dl class="ml-2">
        <dd> <p class="text-muted-b3 mr-2 m-0 float-left"> Agents: {{color.substring(2)}} </p> <p class="text-dark-0 m-0">Ping, Dnsprobe  </p></dd>
        <dd> <p class="text-muted-b3 mr-2 m-0 float-left">IpAddress: </p> <p class="text-dark-0 m-0"> {{item.ipAddress}} </p></dd>
        <dd> <p class="text-muted-b3 mr-2 m-0 float-left">Added: </p><p class="text-dark-0 m-0"> {{item.added}}</p> </dd>
      </dl>
      </div><div class="col abs-center mx-auto">
        <div class="row abs-center icons-size">
          <div class="col-12">
            <div class="abs-center mx-auto mb-1">
              <HeartIco/>
            </div>
          </div>
          <div class="col-12 border-top">
            <span class="badge abs-center mx-auto mt-1 icon-badge-style" v-bind:style ="{background: gradient, color: '#ffffff'}"> H T<br>T P</span>
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
          <input  readonly="readonly" onclick="return false;"  class="custom-control-input form-check-input" type="checkbox" id="bounty" :checked= item.boubty>
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
          <span class="material-icons gradient-style" style="font-size:44px; opacity: 1;" v-bind:style ="{background: gradient}">forward</span>
        </div>
        <div class="abs-center mx-auto">
          <span class="material-icons icon-color-style gradient-style delete-hover"
          data-toggle="modal" data-target="#confirmation-modal"
          v-bind:style ="{background: '#B3B3B3', opacity:0.5}" @mouseover="toggle"
          aria:haspopup="true" aria-controls="overlay_panel"
          :data-name="item.name" @click="updateConfirm(item.name)"
          >delete</span>
        </div>
    </div>
    <div class="col-2 border-right-radius abs-center border p-0" v-else>
      <div class="custom-control custom-checkbox">
        <input type="checkbox" :id="'customCheckbox' + item.id" class="custom-control-input" name="checkbox-dinamic" @click="selectRow(item.id, item.name)">
        <label class="custom-control-label" :for="'customCheckbox' + item.id" ></label>
      </div>
    </div>
</div></div>
<div v-else>
  <p class="lead text-center">
There are no subdomains associated with this root domain. <br>
 Please, click <strong> Add Subdomain </strong> button to insert some subdomains.</p>
</div>
</div>
</div>
  <OverlayPanel :baseZIndex=100 ref="op" appendTo="body" id="overlay_panel"  >
    <small class="font-weight-bold">Delete</small>
  </OverlayPanel>
  <Confirmation></Confirmation>
  <ConfirmationList :nameRoute= 'rName'></ConfirmationList>
  <SubDomainInsertionForm :gradient="gradient"/>
</div>
</template>
<script>
import SubDomainInsertionForm from '@/components/Target/SubDomainInsertionForm.vue'
import OverlayPanel from 'primevue/overlaypanel'
import Confirmation from '@/components/Target/Confirmation.vue'
import ConfirmationList from '@/components/Target/ConfirmationList.vue'
import FileExportIco from '@/components/Icons/FileExportIco.vue'
import FileImportIco from '@/components/Icons/FileImportIco.vue'
import HeartIco from '@/components/Icons/HeartIco.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'SubdomainListTable',
  data: function () {
    return {
      dataColor: '',
      routeParams: {
        idTarget: parseInt(this.$route.params.idTarget),
        idRootDomain: parseInt(this.$route.params.id)
      },
      showHeader: true,
      isElementSelected: true,
      rName: 'subdomains'
    }
  },
  props: {
    color: String,
    gradient: String,
    rootDomain: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    SubDomainInsertionForm,
    OverlayPanel,
    Confirmation,
    FileExportIco,
    FileImportIco,
    HeartIco,
    ConfirmationList
  },
  methods: {
    toggle (event) {
      this.$refs.op.toggle(event)
    },
    updateConfirm (itemName) {
      return this.$store.commit('confirm', { name: itemName, route: 'subdomains' })
    },
    selectRow (id, name) {
      if (document.getElementById('customCheckbox' + id).checked) {
        document.getElementById('row' + id).style.background = 'rgb(242, 244, 246)'
        this.$store.commit('target/addSelectedList', { idTarget: parseInt(this.$route.params.idTarget), idRoot: this.rootDomain.id, idSubdom: id, nameSubdom: name })
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
      var checkboxes = document.getElementsByName('checkbox-dinamic')
      for (var i = 0, n = checkboxes.length; i < n; i++) {
        checkboxes[i].checked = true
        this.isElementSelected = false
        document.getElementById('row' + checkboxes[i].id.substr(14)).style.background = 'rgb(242, 244, 246)'
        const subdom = this.rootDomain.subdomain.find(item => item.id === Number(checkboxes[i].id.substr(14)))
        this.$store.commit('target/addSelectedList', { idTarget: parseInt(this.$route.params.idTarget), idRoot: this.rootDomain.id, idSubdom: checkboxes[i].id.substr(14), nameSubdom: subdom.name })
        this.$store.commit('target/addCountElementSelected')
      }
    },
    unselectedAll () {
      if (this.$store.state.target.countElementSelected !== 0) {
        var checkboxes = document.getElementsByName('checkbox-dinamic')
        for (var i = 0, n = checkboxes.length; i < n; i++) {
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
    }
  },
  computed: {
    ...mapGetters('target', ['getSubdomainSize'])
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
    margin-left: 5em;
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
.icons-size div svg{
  fill: #FF4545;
  width: 25px;
  height: 25px;
  opacity: 1;
}
.nav-item a svg{
    width: 20px;
    height: 20px;
    opacity: 1;
}
#export-target {
  opacity: 0;
  position: absolute;
  z-index: -1;
  display: none;
}
.check-color-0cb8e0 .custom-control-input:checked~.custom-control-label::before {
    color: #fff;
    border-color: #0cb8e0;
    background-color: #0cb8e0;
    box-shadow: none;
}
.check-color-FF4343 .custom-control-input:checked~.custom-control-label::before {
    color: #fff;
    border-color: #FF4343;
    background-color: #FF4343;
    box-shadow: none;
}
.check-color-16c465 .custom-control-input:checked~.custom-control-label::before {
    color: #fff;
    border-color: #16c465;
    background-color: #16c465;
    box-shadow: none;
}
.check-color-f36a33 .custom-control-input:checked~.custom-control-label::before {
    color: #fff;
    border-color: #f36a33;
    background-color: #f36a33;
    box-shadow: none;
}
.check-color-7159d3 .custom-control-input:checked~.custom-control-label::before {
    color: #fff;
    border-color: #7159d3;
    background-color: #7159d3;
    box-shadow: none;
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
</style>
