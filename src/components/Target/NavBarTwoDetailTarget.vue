<template>
  <!-- Contains navs-bar -->
  <div class="content">
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav d-none d-sm-block">
        <li class="nav-item d-flex">
            <router-link to="/targets/list" class="color-blue">
            <span class="material-icons" @mouseover="toggle" aria:haspopup="true" aria-controls="overlay_panel">arrow_back</span>
            </router-link>
            <p class="float-right ml-2 font-weight-bold">{{targetName}}</p>
        </li>
      </ul>
      <!-- Right navbar links -->
      <ul class="navbar-nav ml-auto">
        <li class="nav-item nav-margin border-right d-none d-sm-block">
          <a class="nav-link pos" href="#">Delete Target</a>
        </li>
        <li class="nav-item nav-margin border-right d-none d-sm-block">
          <a class="nav-link pos" href="#">Export Target</a>
        </li>
        <li class="nav-item dropdown border-right d-none d-sm-block">
          <a class="nav-link" data-toggle="dropdown" href="#" role="button"
            aria-haspopup="true"  aria-expanded="false" >
            <p class="float-left">Sort by</p>
            <button type="button" class="btn btn-light">
              <i class="material-icons">sort</i>
            </button>
          </a>
          <div class="dropdown-menu dropdown-menu-right">
            <a class="dropdown-item" href="#" v-on:click="orderByCalendar()">
              <i class="material-icons float-left">event</i>
              <p class="right">Created</p>
            </a>
          </div>
        </li>
      </ul>
    </nav>

    <nav class="main-header navbar d-sm-none navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav d-sm-none">
        <li class="nav-item d-none d-sm-inline-block d-flex">
            <span class="material-icons">arrow_back</span>
            <router-link to="/targets/list" class="color-blue">
            <p class="float-right ml-2">{{targetName}}</p>
            </router-link>
        </li>
      </ul>
      <!-- Right navbar links -->
      <ul class="navbar-nav d-sm-none ml-auto">
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
            <a class="dropdown-item">Delete Target</a>
            <div class="dropdown-divider" v-show= "check" ></div>
            <a class="dropdown-item" href="#">Export Target</a>
           <div class="dropdown-divider"></div>
            <h6 class="dropdown-header header-style">Sort by</h6>
             <div class="dropdown-item">
            <a class="dropdown-item item-sort" href="#" v-on:click="orderByCalendar()">
              <i class="material-icons float-left">event</i>
              <p class="right">Calendar</p>
            </a>
          </div>
          </div>
        </li>
      </ul>
    </nav>
  <OverlayPanel :baseZIndex=100 ref="op" appendTo="body" id="overlay_panel" >
    <small class="font-weight-bold">Back to main</small>
  </OverlayPanel>
     </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import OverlayPanel from 'primevue/overlaypanel'
export default {
  name: 'NavBarTwoTarget',
  props: {
    targetName: String
  },
  data: function () {
    return {
    }
  },
  computed: {
    ...mapState('target', ['targetListStore', 'check', 'colorDelete', 'targetIdList'])
  },
  components: {
    OverlayPanel
  },
  methods: {
    ...mapMutations('target', ['isFilter', 'editList', 'cancelIdTarget']),
    orderByCalendar: function () {
      return this.targetListStore.sort((a, b) => {
        const as = a.date.split('/')
        const ad = new Date(as[2], as[1] - 1, as[0])
        const bs = b.date.split('/')
        const bd = new Date(bs[2], bs[1] - 1, bs[0])
        return ad - bd
      })
    },
    toggle (event) {
      this.$refs.op.toggle(event)
    }
  }
}
</script>
<style scoped>
.p-overlaypanel .p-overlaypanel-content {
    padding: 0rem!important;
}
.dropdown-menu {
    min-width: 10rem;
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
