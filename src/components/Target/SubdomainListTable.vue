<template>
<div>
  <div class="mt-3 ml-4">
    <nav class="navbar navbar-expand">
      <ul class="navbar-nav">
        <li class="nav-item nav-margin border-right  border-left d-none d-sm-block mr-4 pr-4 pl-4">
        <a href="#" class="text-body" data-toggle="modal" data-target="#subDomainInsertionForm"> <span class="material-icons icon-color-style gradient-style" v-bind:style ="{background: gradient}">add_circle</span>
         Add Subdomain</a></li>
        <li class="nav-item nav-margin border-right d-none d-sm-block mr-4 pr-4">
         <a href="#" class="text-body"> Import Subdomains</a></li>
        <li class="nav-item nav-margin border-right d-none d-sm-block mr-4 pr-4">
          <a href="#" class="text-body">   Export All Subdomains</a></li>
        <li class="nav-item nav-margin border-right d-none d-sm-block mr-4 pr-4">
        <a href="#" class="text-body" ><span class="material-icons icon-color-style gradient-style" v-bind:style ="{background: gradient}">delete</span> Delete All Subdomains</a></li>
      </ul>
    </nav>
    <div class="row mt-4">
      <div class="col-lg-8">
        <div class="mb-3 has-search">
          <span class="material-icons search-icon form-control-feddback">search</span>
          <input class="form-control form-style" type="search" placeholder="Find">
        </div>
      </div>
      <div class="col-lg-4">
        <label class="float-left mr-3 ml-3 label-style" for="dropdownMenuButton">Filter by</label>
        <div class="dropdown">
          <button class="btn btn-style  dropdown-toggle pt-2 pb-1 w-50" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Label
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="card card-style">
    <div class="card-body">
      <div class="card card-table">
        <div class=" row mb-2"  >
          <div class="col-2 border-left-radius border-right text-light p-2" v-bind:style ="{'background':gradient}"> <p class="ml-2 m-0"> Subdomain</p> </div>
          <div class="col-3 border-right text-light p-2 text-center" v-bind:style ="{'background':gradient}"> Details</div>
          <div class="col mr-3 border-right-radius text-light p-2 text-center" v-bind:style ="{'background':gradient}"> Labels</div>
          <div class="col-2 p-0" >
            <button class="border-table text-light p-2 text-center w-100" v-bind:style ="{'background':gradient}"> Edit List</button></div>
          </div>
          <div class="row mb-2" v-for="item of rootDomain.subdomain" :key="item.id">
            <div class="col-2  border-left-radius border">
              <p class="m-2 mb-2">{{item.agent}}</p>
            </div>
            <div class="col-3 border-top border-bottom">
              <div class="row mt-2 mb-2">
                <div class="col-8">
                  <dl class="ml-2">
                    <dd>Agents: ping,regsg </dd>
                    <dd>IpAddress:123.34.34.5 </dd>
                    <dd>Added:2020-08-09</dd>
                  </dl>
                </div>
              <div class="col">
                <span class="material-icons gradient-style" v-bind:style ="{background: gradient}">http</span>
              </div>
            </div>
          </div>
          <div class="col mr-3 border border-right-radius">
            <div class="row mt-2 mx-4">
              <div class="col">
                <div class="form-check">
                  <input disabled class="form-check-input" type="checkbox"  id="checking" :checked= item.checking v-bind:style ="{background: gradient}">
                  <label class="form-check-label text-body" for="checking">Checking</label>
                </div>
                <div class="form-check">
                  <input disabled class="form-check-input" type="checkbox" id="interest" :checked= item.interesting>
                  <label class="form-check-label text-body" for="interest">Interesting</label>
                </div>
              </div>
              <div class="col">
                <div class="form-check">
                  <input disabled class="form-check-input" type="checkbox" id="vulnerable" :checked= item.vulnerable >
                  <label class="form-check-label text-body" for="vulnerable">Vulnerable</label>
                </div>
                <div class="form-check">
                  <input  disabled class="form-check-input" type="checkbox" id="bounty" :checked= item.boubty>
                  <label class="form-check-label text-body" for="bounty">Bounty</label>
                </div>
              </div>
              <div class="col">
                <div class="form-check">
                  <input disabled class="form-check-input" type="checkbox" id="ignore" :checked= item.ignore>
                  <label class="form-check-label text-body" for="ignore">Ignore</label>
                </div>
                <div class="form-check">
                  <input disabled class="form-check-input" type="checkbox" id="scope" :checked= item.scope>
                  <label class="form-check-label text-body" for="scope">Scope</label>
                </div>
              </div>
              <SubDomainInsertionForm/>
            </div>
          </div>
          <div class="col-2 border-table border">
            <div class="border-right h-100 w-75 float-left">
              <div class="text-center pt-3"><span class="material-icons gradient-style" style="font-size:44px;" v-bind:style ="{background: gradient}">forward</span></div>
            </div>
            <div class="text-center pt-4">
              <span class="material-icons icon-color-style gradient-style" v-bind:style ="{background: gradient}">delete</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import SubDomainInsertionForm from '@/components/Target/SubDomainInsertionForm.vue'

export default {
  name: 'SubdomainListTable',
  data: function () {
    return {
    }
  },
  props: {
    gradient: String,
    rootDomain: Object
  },
  components: {
    SubDomainInsertionForm
  }
}
</script>

<style scoped>
.form-style{
    background-color: transparent!important;
    border-radius: 9px;
}
.btn-style {
    background-color: transparent;
    border-color: #495057;
    color: #495057;
    border: 1px solid #ced4da;
    font-weight: 400;
    font-size: 1rem;
}
.icon-color-style{
  font-size: 19px;
}
.label-style{
  font-weight: 400!important;
  padding:.375rem .75rem;
}
.border-table {
    border: 1px solid transparent;
    border-radius: 8px;
}
.border-right-radius {
    border-right: 1px solid transparent;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
}
.border-left-radius {
    border-left: 1px solid transparent;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
}
.card-table, .card-table ul li{
  background: transparent;
  box-shadow: none;
}
.list-style-item{
  display: block;
  border: 1px solid rgba(0,0,0,.125);
}
.card-style{
  background: #f2f4f6;
  box-shadow: 13px 11px 41px #d6d6d6;
}
</style>
