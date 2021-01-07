<template>
  <!-- Contains navs-bar -->
  <div class="content">
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav d-none d-sm-block">
        <li class="nav-item d-flex">
           <a href="#" class="color-blue" data-toggle="modal" data-target="#exampleModalCenter">
            <span class="material-icons">control_point</span>
            <p class="float-right">New Agent</p>
          </a>
        </li>
      </ul>
      <!-- Right navbar links -->
      <ul class="navbar-nav ml-auto">
        <li class="nav-item nav-margin border-right d-none d-sm-block">
          <a class="nav-link pos" href="#">Edit List</a>
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
            <p class="float-left">View Mode</p> <router-link to="/agent/list">
            <button type="button" class="btn btn-light margin-right">
                <i class="material-icons">format_list_bulleted</i>
            </button> </router-link>
             <router-link to="/agents/list">
            <button type="button" class="btn btn-light">
              <i class="material-icons">grid_view</i>
            </button></router-link></a>
        </li>
        <li class="nav-item border-right d-none d-sm-block">
          <a
            class="nav-link float-left control-sidebar-right"
            href="#"
            data-slide="true"
            @mouseenter="mouseenter"
          >
            <button type="button" class="btn btn-sm control-sidebar-right" id="dropdownMenuButton">
              <i class="material-icons">local_mall</i>
            </button>
          </a>
        </li>
      </ul>
    </nav>

    <nav class="main-header navbar d-sm-none navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav d-sm-none">
        <li class="nav-item d-none d-sm-inline-block d-flex">
                   <a href="#" class="color-blue" data-toggle="modal" data-target="#exampleModalCenter">
            <span class="material-icons">control_point</span>
            <p class="float-right">New Agent</p>
          </a>
        </li>
      </ul>
      <!-- Right navbar links -->
      <ul class="navbar-nav d-sm-none ml-auto">
        <li class="nav-item float-left border-right">
          <a class="nav-link" href="#"><router-link to="/agent/list">
            <button type="button" class="btn btn-sm" id="dropdownMenuButton">
              <i class="material-icons">format_list_bulleted</i>
            </button></router-link>
            <router-link to="/agents/list">
            <button type="button" class="btn btn-light">
              <i class="material-icons">grid_view</i>
            </button></router-link>
          </a>
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
            <a class="dropdown-item" href="#">Edit List</a>
            <div class="dropdown-divider"></div>
            <h6 class="dropdown-header header-style">Sort by</h6>
             <div class="dropdown-item">
            <a class="dropdown-item item-sort" href="#" v-on:click="orderByName()">
              <i class="material-icons float-left">title</i>
              <p class="float-left">Name</p>
              <i class="material-icons right" v-show="active_arrow_down">keyboard_arrow_down</i>
              <i class="material-icons right" v-show="active_arrow_up">keyboard_arrow_up</i>
            </a>
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
        <li class="nav-item border-right">
          <a class="nav-link float-left" href="#" data-widget="control-sidebar" data-slide="true">
            <button
              type="button"
              class="btn btn-sm control-sidebar-right"
              id="dropdownMenuButton"
              @mouseenter="mouseenter"
            >
              <i class="material-icons">local_mall</i>
            </button>
          </a>
        </li>
      </ul>
    </nav>

    <div v-show="active">
      <aside class="control-sidebar-dark" @mouseleave="mouseleave">
        <!-- Control sidebar content goes here -->
        <div class="p-3 control-sidebar-content">
          <div class="d-flex justify-content-between">
            <i class="material-icons">local_mall</i>
            <h5>Marketplace</h5>
            <a class="btn btn-sm btn-style btn-outline-primary" href="#" role="button">Debug</a>
          </div>
        </div>
        <div class="sidebar-list">
          <dl class="row">
            <dt class="col-3">
              <p>Subfinder</p>
            </dt>
            <dd class="col-9">
              <dl class="row">
                <dt class="col-8 reset-col">
                  <em>
                    <a href="#" class="sidebar-right float-right">Details</a>
                  </em>
                </dt>
                <dd class="col-4 reset-col">
                  <a href="#" class="float-right">Install</a>
                </dd>
              </dl>
            </dd>
          </dl>
        </div>

        <div class="sidebar-list">
          <dl class="row">
            <dt class="col-3">
              <p>Amass</p>
            </dt>
            <dd class="col-9">
              <dl class="row">
                <dt class="col-8 reset-col">
                  <em>
                    <a href="#" class="sidebar-right float-right">Details</a>
                  </em>
                </dt>
                <dd class="col-4 reset-col">
                  <a href="#" class="float-right">Install</a>
                </dd>
              </dl>
            </dd>
          </dl>
        </div>

        <div class="sidebar-list">
          <dl class="row">
            <dt class="col-3">
              <p>GoBusterMs</p>
            </dt>
            <dd class="col-9">
              <dl class="row">
                <dt class="col-8 reset-col">
                  <em>
                    <a href="#" class="sidebar-right float-right">Details</a>
                  </em>
                </dt>
                <dd class="col-4 reset-col">
                  <a href="#" class="float-right">Install</a>
                </dd>
              </dl>
            </dd>
          </dl>
        </div>

        <div class="sidebar-list">
          <dl class="row">
            <dt class="col-3">
              <p>SubkisteD</p>
            </dt>
            <dd class="col-9">
              <dl class="row">
                <dt class="col-8 reset-col">
                  <em>
                    <a href="#" class="sidebar-right float-right">Details</a>
                  </em>
                </dt>
                <dd class="col-4 reset-col">
                  <a href="#" class="float-right">Install</a>
                </dd>
              </dl>
            </dd>
          </dl>
        </div>

        <div class="sidebar-list">
          <dl class="row">
            <dt class="col-3">
              <p>ForeingBot</p>
            </dt>
            <dd class="col-9">
              <dl class="row">
                <dt class="col-8 reset-col">
                  <em>
                    <a href="#" class="sidebar-right float-right">Details</a>
                  </em>
                </dt>
                <dd class="col-4 reset-col">
                  <a href="#" class="float-right">Install</a>
                </dd>
              </dl>
            </dd>
          </dl>
        </div>
      </aside>
    </div>
   <div class="row">
      <AgentForm></AgentForm>
  </div>
     </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import AgentForm from '@/components/AgentForm.vue'
export default {
  name: 'NavBarTwo',
  data: function () {
    return {
      active: false,
      active_arrow_down: true,
      active_arrow_up: false
    }
  },
  computed: {
    ...mapState(['agentListStore']),
    arrayUniqueColours () {
      return [...new Set(this.agentListStore.map(item => item.background))]
    }
  },
  components: {
    AgentForm
  },
  methods: {
    mouseenter: function () {
      this.active = !this.active
    },
    mouseleave: function () {
      this.active = !this.active
    },
    ...mapMutations(['isFilter']),
    orderByName: function () {
      if (this.active_arrow_down === true) {
        return this.orderByNameDesc()
      } else if (this.active_arrow_up === true) {
        return this.orderByNameAsc()
      }
    },
    orderByNameAsc: function () {
      function compare (a, b) {
        if (a.name < b.name) {
          return -1
        }
        if (a.name > b.name) {
          return 1
        }
        return 0
      }
      this.active_arrow_down = true
      this.active_arrow_up = false
      return this.agentListStore.sort(compare)
    },
    orderByNameDesc: function () {
      function compare (a, b) {
        if (b.name < a.name) {
          return -1
        }
        if (b.name > a.name) {
          return 1
        }
        return 0
      }
      this.active_arrow_down = false
      this.active_arrow_up = true
      return this.agentListStore.sort(compare)
    },
    orderByCalendar: function () {
      function compare (a, b) {
        if (a.date < b.date) {
          return -1
        }
        if (a.date > b.date) {
          return 1
        }
        return 0
      }
      return this.agentListStore.sort(compare)
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
</style>
