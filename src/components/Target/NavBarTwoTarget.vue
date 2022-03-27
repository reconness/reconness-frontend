<template>
  <!-- Contains navs-bar -->
  <div class="content">
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav d-none d-sm-block">
        <li class="nav-item d-flex">
           <a href="#" class="color-blue" data-toggle="modal" data-target="#targetModalForm">
            <span class="material-icons font-weight-bold">add</span>
            <p class="float-right">New Target</p>
          </a>
        </li>
      </ul>
      <!-- Right navbar links -->
      <ul class="navbar-nav ml-auto">
        <li class="nav-item nav-margin border-right d-none d-sm-block">
          <label for="import-target" class="nav-link pos mb-0"> Import Target </label>
          <input type="file" id="import-target" accept=".json"/>
        </li>
        <li class="nav-item nav-margin border-right d-none d-sm-block">
          <a class="nav-link pos" v-show= "check" href="#" @click="close()">Cancel</a>
        </li>
        <li class="nav-item nav-margin border-right d-none d-sm-block">
          <a class="nav-link pos" href="#" v-show= "!check" v-on:click="editList()" >Edit List</a>
          <span :class="{'isLinkDisabled' : entitiesToDelete.length <= 0}">
            <a class="nav-link pos " v-show= "check" href="#" :class="{'red-text':entitiesToDelete.length > 0}" data-toggle="modal" data-target="#message-box-modal">Delete Targets</a>
          </span>
        </li>
        <li class="nav-item dropdown border-right d-none d-sm-block">
          <a class="nav-link float-left" data-toggle="dropdown" href="#" role="button">
            <button type="button" class="btn btn-light">
              <img src="@/assets/Rect.png" class="img-icon-nav" alt="User Image" />
            </button>
          </a>
          <div class="dropdown-menu scroll">
            <h6 class="dropdown-header header-style">Filter by color</h6>
            <div class="dropdown-divider "></div>
            <div class="force-scroll dropdown-item">
              <button v-on:click="isFilter('')" type="button" class="btn btn-light rainbow">
               <img src="@/assets/Rect.png" class="img-icon-nav float-lefth" alt="User Image" />
               </button>
            <button v-for="item of arrayUniqueColours" :key="item" v-bind:style ="{background:item}"
             v-on:click="isFilter(item)" type="button" class="btn btn-light btn-list">
            </button> </div>
          </div>
        </li>
        <li class="nav-item dropdown border-right d-none d-sm-block">
          <a
            class="nav-link"
            data-toggle="dropdown"
            href="#"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <p class="float-left">Sort by</p>
            <button type="button" class="btn btn-light">
              <i class="material-icons">sort</i>
            </button>
          </a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#" v-on:click="orderByName()">
              <i class="material-icons float-left">title</i>
              <p class="float-left">Name</p>
              <i class="material-icons right" v-show="active_arrow_down">keyboard_arrow_down</i>
              <i class="material-icons right" v-show="active_arrow_up">keyboard_arrow_up</i>
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" v-on:click="orderByCalendar()">
              <i class="material-icons float-left">event</i>
              <p class="right">Created</p>
            </a>
          </div>
        </li>
        <li class="nav-item nav-margin border-right d-none d-sm-block  ">
            <a class="nav-link">
            <p class="float-left">View Mode</p>
            <a v-bind:class="{ 'router-link-exact-active': isMiniView} " v-on:click="activeNavButton('isMiniView')">
            <button type="button"  class="btn btn-light margin-right" @click="this.$store.commit('target/setIsDefaultViewOnTarget', false)">
                <i class="material-icons">format_list_bulleted</i>
            </button></a>
            <a v-bind:class="{ 'router-link-exact-active': isListView} " v-on:click="activeNavButton('isListView')">
            <button type="button" class="btn btn-light" @click="this.$store.commit('target/setIsDefaultViewOnTarget', true)">
              <i class="material-icons">grid_view</i>
            </button></a>
            <!-- </router-link> -->
            </a>
        </li>
      </ul>
    </nav>

    <nav class="main-header navbar d-sm-none navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav d-sm-none">
        <li class="nav-item d-none d-sm-inline-block d-flex">
                   <a href="#" class="color-blue" data-toggle="modal" data-target="#targetModalForm">
            <span class="material-icons">control_point</span>
            <p class="float-right">New Target</p>
          </a>
        </li>
      </ul>
      <!-- Right navbar links -->
      <ul class="navbar-nav d-sm-none ml-auto">
        <li class="nav-item float-left border-right">
              <a v-bind:class="{ 'router-link-exact-active': isMiniView} " v-on:click="activeNavButton('isMiniView')">
            <button type="button"  class="btn btn-light margin-right" @click="this.$store.commit('target/setIsDefaultViewOnTarget', false)">
                <i class="material-icons">format_list_bulleted</i>
            </button></a>
          <a v-bind:class="{ 'router-link-exact-active': isListView} " v-on:click="activeNavButton('isListView')">
            <button type="button" class="btn btn-light" @click="this.$store.commit('target/setIsDefaultViewOnTarget', true)">
              <i class="material-icons">grid_view</i>
            </button></a>
        </li>
        <li class="nav-item dropdown border-right">
          <a
            class="nav-link"
            data-toggle="dropdown"
            href="#"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="material-icons">more_vert</i>
          </a>
          <div class="dropdown-menu dropdown-menu-right scroll">
            <label for="import-target" class="dropdown-item import-font"> Import Target </label>
            <input type="file" id="import-target" accept=".json"/>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" v-show= "check" @click="close()">Cancel</a>
            <div class="dropdown-divider" v-show= "check" ></div>
            <a class="dropdown-item" href="#" v-show= "!check" v-on:click="editList()" >Edit List</a>
            <span :class="{'isLinkDisabled' : targetIdList.length <= 0}">
              <a class="dropdown-item " v-show= "check" href="#" :class="{'red-text':entitiesToDelete.length > 0}">Delete Targets</a>
            </span>
            <div class="dropdown-divider"></div>
            <h6 class="dropdown-header header-style">Sort by</h6>
             <div class="dropdown-item">
            <a class="dropdown-item item-sort" href="#" v-on:click="orderByName()">
              <i class="material-icons float-left">title</i>
              <p class="float-left">Name</p>
              <i class="material-icons right" v-show="active_arrow_down">keyboard_arrow_down</i>
              <i class="material-icons right" v-show="active_arrow_up">keyboard_arrow_up</i>
            </a></div><div class="dropdown-item">
            <a class="dropdown-item item-sort" href="#" v-on:click="orderByCalendar()">
              <i class="material-icons float-left">event</i>
              <p class="right">Calendar</p>
            </a>
          </div>
            <div class="dropdown-divider"></div>
            <h6 class="dropdown-header header-style">Filter by colours</h6>
             <div class="force-scroll dropdown-item">
              <button v-on:click="isFilter('')" type="button" class="btn btn-light rainbow">
               <img src="@/assets/Rect.png" class="img-icon-nav float-lefth" alt="User Image" />
               </button>
            <button v-for="item of arrayUniqueColours" :key="item" v-bind:style ="{background:item}"
             v-on:click="isFilter(item)" type="button" class="btn btn-light btn-list">
            </button> </div>
          </div>
        </li>
      </ul>
    </nav>

   <div class="row">
      <TargetForm/>
      <Toast :baseZIndex="200"/>
  </div>
  <TargetConfirmList></TargetConfirmList>
     </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import TargetForm from '@/components/Target/TargetForm.vue'
import Toast from 'primevue/toast'
import TargetConfirmList from '@/components/Target/TargetConfirmList.vue'
import jQuery from 'jquery'
export default {
  name: 'NavBarTwoTarget',
  components: {
    TargetForm,
    Toast,
    TargetConfirmList
  },
  data: function () {
    return {
      active: false,
      active_arrow_down: true,
      active_arrow_up: false,
      optionNumber: -1,
      optionName: '',
      selectedAgentDescription: '',
      isMiniView: false,
      isListView: true
    }
  },
  computed: {
    ...mapState('target', ['targetListStore', 'check', 'colorDelete', 'targetIdList', 'entitiesToDelete']),
    arrayUniqueColours () {
      return [...new Set(this.targetListStore.map(item => 'linear-gradient(160deg,' + item.primaryColor + ' ' + '0%,' + item.secondaryColor + ' ' + '100%) 0% 0% no-repeat padding-box'))]
    }
  },
  mounted () {
    if (!this.$store.state.target.isDefaultViewOnTarget) {
      this.isMiniView = true
      this.isListView = false
    }
  },
  methods: {

    mouseenter: function () {
      this.active = !this.active
    },
    mouseleave: function () {
      this.active = !this.active
    },
    ...mapMutations('target', ['isFilter', 'editList', 'cancelIdTarget', 'clearReferencesToDelete', 'clearSelectedTargetsList']),
    orderByName: function () {
      if (this.active_arrow_down === true) {
        return this.orderByNameDesc()
      } else if (this.active_arrow_up === true) {
        return this.orderByNameAsc()
      }
    },
    installationResult: function (event) {
      this.isSubfinderInstalled = event
    },
    orderByNameAsc: function () {
      this.active_arrow_down = true
      this.active_arrow_up = false
      return this.targetListStore.sort(this.$compareNamesAsc)
    },
    orderByNameDesc: function () {
      this.active_arrow_down = false
      this.active_arrow_up = true
      return this.targetListStore.sort(this.$compareNamesDesc)
    },
    orderByCalendar: function () {
      return this.targetListStore.sort(this.$orderByCalendarSplitting)
    },
    activeNavButton: function (valueIn) {
      if (valueIn === 'isMiniView') {
        this.isMiniView = true
        this.isListView = false
      } else {
        if (valueIn === 'isListView') {
          this.isListView = true
          this.isMiniView = false
        }
      }
    },
    toggle (event) {
      this.selectedAgentDescription = event.currentTarget.getAttribute('data-description')
      this.optionName = event.currentTarget.getAttribute('data-agent')
      this.$refs.op.toggle(event)
    },
    onBashRemoveTargets () {
      if (this.targetIdList.length > 0) {
        jQuery('#confirmation-modald').modal()
      } else {
        return false
      }
    },
    close () {
      var checkboxes = document.getElementsByName('checkitem')
      for (var i = 0, n = checkboxes.length; i < n; i++) {
        checkboxes[i].checked = false
      }
      this.nameTyped = ''
      this.cancelIdTarget()
      this.clearReferencesToDelete()
      this.clearSelectedTargetsList()
    }
  }
}
</script>
<style scoped>
.router-link-exact-active  button{
  background-color:#00B1FF;
  color: #fff;
}
.force-scroll{
  overflow-x: scroll!important;
  width: 200px;
}
.dropdown-menu {
    min-width: 10rem;
}

.force-scroll .rainbow{
margin-right: 20px;
}

.force-scroll .btn-list {
    border-radius: 0rem;
    width: 15px;
    height: 15px;
    margin-right: 10px;
}
.navbar-expand .navbar-nav .scroll {
    position: absolute;
    padding-bottom: 0px;
}
.right{
  margin-left: 30px;
  margin-bottom: auto;
}
.pos{
  margin-top: 2.5px;
}
.item-sort{
  padding: .15rem .1rem;
}
.dropdown-item {
    font-weight: 600;
}
.margin-right{
  margin-right: 1px;
}
label {
  cursor: pointer;
}
#import-target {
  opacity: 0;
  position: absolute;
  z-index: -1;
  display: none;
}
.import-font{
  font-weight: 600 !important;
}
</style>
