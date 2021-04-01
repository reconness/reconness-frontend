<template>
<div>
    <h6 class="text-center mt-2">List of Directories</h6>
  <div class="card card-style">
    <div class="card-body">
      <div class="card card-table">
        <div class=" row mb-2"  >
          <div class="col-6 border-left-radius border-right text-light-white domain-names-list p-2" v-bind:style ="{'background':color}"> <p class="ml-2 m-0" v-on:click="orderByPath()"> Directories
           <i class="material-icons right float-right" v-show="active_arrow_down">keyboard_arrow_down</i>
           <i class="material-icons right float-right" v-show="active_arrow_up">keyboard_arrow_up</i></p>
          </div>
          <div class="col border-right text-light-white p-2 text-center domain-names-list" v-bind:style ="{'background':color}"> <p class="ml-2 m-0" v-on:click="orderByMethod()"> Method
           <i class="material-icons right float-right" v-show="active_arrow_met_down">keyboard_arrow_down</i>
           <i class="material-icons right float-right" v-show="active_arrow_met_up">keyboard_arrow_up</i> </p>
          </div>
          <div class="col border-right text-light-white p-2 text-center domain-names-list" v-bind:style ="{'background':color}" v-on:click="orderByStatus()">Status Code
           <i class="material-icons right float-right" v-show="active_arrow_st_down">keyboard_arrow_down</i>
           <i class="material-icons right float-right" v-show="active_arrow_st_up">keyboard_arrow_up</i>
          </div>
          <div class="col border-right-radius text-light-white p-2 text-center domain-names-list" v-bind:style ="{'background':color}" v-on:click="orderBySize()">Size
           <i class="material-icons right float-right" v-show="active_arrow_size_down">keyboard_arrow_down</i>
           <i class="material-icons right float-right" v-show="active_arrow_size_up">keyboard_arrow_up</i>
          </div>
        </div>
      <div class="row mb-2" v-for="item of listDirectories" :key="item.id">
        <div class="col-6  border-left-radius border p-2">{{item.path}}</div>
        <div class="col border-top border-bottom text-center p-2">{{item.method}}</div>
        <div class="col border-left border-top border-bottom text-center p-2" >{{item.status}}</div>
        <div class="col border border-right-radius text-center p-2">{{item.size}}</div>
      </div>
      </div>
    </div>
  </div></div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SubDomainDetailsDirectories',
  data: function () {
    return {
      active_arrow_down: true,
      active_arrow_up: false,
      lastrun_arrow_down: true,
      lastrun_arrow_up: false,
      active_arrow_met_down: true,
      active_arrow_met_up: false,
      active_arrow_st_down: true,
      active_arrow_st_up: false,
      active_arrow_size_down: true,
      active_arrow_size_up: false,
      loadedSubdomain: Object
    }
  },
  props: {
    color: String
  },
  computed: {
    ...mapGetters('target', ['getSubDomain']),
    listDirectories () {
      return this.getSubDomain({
        idtarget: parseInt(this.$route.params.idTarget),
        idrootdomain: parseInt(this.$route.params.id),
        idsubdomain: parseInt(this.$route.params.idsubdomain)
      }).directories
    }
  },
  methods: {
    orderByPath: function () {
      if (this.active_arrow_down === true) {
        return this.orderByPathDesc()
      } else if (this.active_arrow_up === true) {
        return this.orderByPathAsc()
      }
    },
    orderByPathAsc: function () {
      this.active_arrow_down = true
      this.active_arrow_up = false
      return this.listDirectories.sort(function (a, b) {
        if (b.name > a.name) {
          return -1
        }
        if (b.name < a.name) {
          return 1
        }
        return 0
      })
    },
    orderByPathDesc: function () {
      this.active_arrow_down = false
      this.active_arrow_up = true
      return this.listDirectories.sort(function (a, b) {
        if (b.path < a.path) {
          return -1
        }
        if (b.path > a.path) {
          return 1
        }
        return 0
      })
    },
    orderByMethod: function () {
      if (this.active_arrow_met_down === true) {
        return this.orderByMethodDesc()
      } else if (this.active_arrow_met_up === true) {
        return this.orderByMethodAsc()
      }
    },
    orderByMethodAsc: function () {
      this.active_arrow_met_down = true
      this.active_arrow_met_up = false
      return this.listDirectories.sort(function (a, b) {
        if (b.method > a.method) {
          return -1
        }
        if (b.method < a.method) {
          return 1
        }
        return 0
      })
    },
    orderByMethodDesc: function () {
      this.active_arrow_met_down = false
      this.active_arrow_met_up = true
      return this.listDirectories.sort(function (a, b) {
        if (b.method < a.method) {
          return -1
        }
        if (b.method > a.method) {
          return 1
        }
        return 0
      })
    },
    orderByStatus: function () {
      if (this.active_arrow_st_down === true) {
        return this.orderByStatusDesc()
      } else if (this.st === true) {
        return this.orderByStatusAsc()
      }
    },
    orderByStatusAsc: function () {
      this.active_arrow_st_down = true
      this.active_arrow_st_up = false
      return this.listDirectories.sort(function (a, b) {
        if (b.status > a.status) {
          return -1
        }
        if (b.status < a.status) {
          return 1
        }
        return 0
      })
    },
    orderByStatusDesc: function () {
      this.active_arrow_st_down = false
      this.active_arrow_st_up = true
      return this.listDirectories.sort(function (a, b) {
        if (b.status < a.status) {
          return -1
        }
        if (b.status > a.status) {
          return 1
        }
        return 0
      })
    },
    orderBySize: function () {
      if (this.active_arrow_size_down === true) {
        return this.orderBySizeDesc()
      } else if (this.active_arrow_size_up === true) {
        return this.orderBySizeAsc()
      }
    },
    orderBySizeAsc: function () {
      this.active_arrow_size_down = true
      this.active_arrow_size_up = false
      return this.listDirectories.sort(function (a, b) {
        if (b.size > a.size) {
          return -1
        }
        if (b.size < a.size) {
          return 1
        }
        return 0
      })
    },
    orderBySizeDesc: function () {
      this.active_arrow_size_down = false
      this.active_arrow_size_up = true
      return this.listDirectories.sort(function (a, b) {
        if (b.size < a.size) {
          return -1
        }
        if (b.size > a.size) {
          return 1
        }
        return 0
      })
    }
  }
}

</script>
<style scoped>
.agent-border {
    border: 1px solid #e3e5e8;
    border-radius: 12px;
    width: 60px;
    height: 30px;
}
</style>
