<template>
  <!-- Contains navs-bar -->
  <div class="content">
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav d-none d-sm-block">
        <li class="nav-item d-flex">
           <a href="#" class="color-blue" data-toggle="modal" data-target="#pipelinesModalForm">
            <span class="material-icons">control_point</span>
            <p class="float-right">New Pipeline</p>
          </a>
        </li>
      </ul>
      <!-- Right navbar links -->
      <ul class="navbar-nav ml-auto">
        <li class="nav-item nav-margin border-right d-none d-sm-block">
          <a class="nav-link pos" v-show= "check" href="#" @click="close()">Cancel</a>
        </li>
        <li class="nav-item nav-margin border-right d-none d-sm-block">
          <a class="nav-link pos" href="#" v-show= "!check" v-on:click="editList()" >Edit List</a>
           <span :class="{'isLinkDisabled' : pipelinesIdList.length <= 0}">
            <a class="nav-link pos " v-show= "check" href="#" v-bind:style ="{color:colorDelete}" @click="onBashRemovePipelines">Delete Pipelines</a>
          </span>
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
            <button type="button"  class="btn btn-light margin-right" @click="this.$store.commit('pipelines/setIsDefaultViewOnPipelines', false)">
                <i class="material-icons">format_list_bulleted</i>
            </button></a>
            <a v-bind:class="{ 'router-link-exact-active': isListView} " v-on:click="activeNavButton('isListView')">
            <button type="button" class="btn btn-light" @click="this.$store.commit('pipelines/setIsDefaultViewOnPipelines', true)">
              <i class="material-icons">grid_view</i>
            </button></a>
            <!-- </router-link> -->
            </a>
        </li>
      </ul>
    </nav>
    <ConfirmationPipelinesList :nameRoute= 'this.$route.name'></ConfirmationPipelinesList>
    <PipelinesForm :routeName= 'this.$route.name'></PipelinesForm>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import jQuery from 'jquery'
import ConfirmationPipelinesList from '@/components/Pipelines/ConfirmationPipelinesList.vue'
import PipelinesForm from '@/components/Pipelines/PipelinesForm.vue'
export default {
  name: 'NavBarTwoPipelines',
  data: function () {
    return {
      active_arrow_down: true,
      active_arrow_up: false,
      isMiniView: false,
      isListView: true
    }
  },
  components: {
    ConfirmationPipelinesList,
    PipelinesForm
  },
  computed: {
    ...mapState('pipelines', ['pipelinesListStore', 'check', 'colorDelete', 'pipelinesIdList'])
  },
  methods: {
    ...mapMutations('pipelines', ['editList', 'cancelIdPipelines']),
    orderByName: function () {
      if (this.active_arrow_down === true) {
        return this.orderByNameDesc()
      } else if (this.active_arrow_up === true) {
        return this.orderByNameAsc()
      }
    },
    orderByNameAsc: function () {
      this.active_arrow_down = true
      this.active_arrow_up = false
      return this.pipelinesListStore.sort(this.$compareNamesAsc)
    },
    orderByNameDesc: function () {
      this.active_arrow_down = false
      this.active_arrow_up = true
      return this.pipelinesListStore.sort(this.$compareNamesDesc)
    },
    orderByCalendar: function () {
      return this.pipelinesListStore.sort(this.$orderByCalendarSplitting)
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
    onBashRemovePipelines () {
      if (this.pipelinesIdList.length > 0) {
        jQuery('#confirmationList-modal').modal()
      } else {
        return false
      }
    },
    close () {
      const checkboxes = document.getElementsByName('checkitem')
      for (let i = 0, n = checkboxes.length; i < n; i++) {
        checkboxes[i].checked = false
      }
      this.nameTyped = ''
      this.cancelIdPipelines()
    }
  }
}
</script>
<style scoped>
.router-link-exact-active  button{
  background-color:#00B1FF;
  color: #fff;
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
</style>
