<template>
<div>
    <h6 class="text-center mt-2">List of Services</h6>
  <div class="card card-style">
    <div class="card-body">
      <div class="card card-table">
        <div class=" row mb-2"  >
          <div class="col border-left-radius border-right text-light-white domain-names-list p-2" v-bind:style ="{'background':gradient}"> <p class="ml-2 m-0" v-on:click="orderByName()"> Name
           <i class="material-icons right float-right" v-show="active_arrow_down">keyboard_arrow_down</i>
           <i class="material-icons right float-right" v-show="active_arrow_up">keyboard_arrow_up</i></p>
          </div>
          <div class="col border-right-radius text-light-white p-2 text-center domain-names-list" v-bind:style ="{'background':gradient}" v-on:click="orderByPort()">Port
           <i class="material-icons right float-right" v-show="active_arrow_port_down">keyboard_arrow_down</i>
           <i class="material-icons right float-right" v-show="active_arrow_port_up">keyboard_arrow_up</i>
          </div>
        </div>
      <div class="row mb-2" v-for="item of listServices" :key="item.id">
        <div class="col  border-left-radius border"><p class="m-2"> {{item.name}}</p></div>
        <div class="col border border-left-0 border-right-radius text-center"><p class="m-2">{{item.port}}</p></div>
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
      active_arrow_port_down: true,
      active_arrow_port_up: false
    }
  },
  props: {
    gradient: String
  },
  computed: {
    ...mapGetters('target', ['getSubDomain']),
    listServices () {
      return this.getSubDomain({
        idtarget: parseInt(this.$route.params.idTarget),
        idrootdomain: parseInt(this.$route.params.id),
        idsubdomain: parseInt(this.$route.params.idsubdomain)
      }).services
    }
  },
  methods: {
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
      return this.listServices.sort(this.$compareNamesAsc)
    },
    orderByNameDesc: function () {
      this.active_arrow_down = false
      this.active_arrow_up = true
      return this.listServices.sort(this.$compareNamesDesc)
    },
    orderByPort: function () {
      if (this.active_arrow_port_down === true) {
        return this.orderByPortDesc()
      } else if (this.active_arrow_port_up === true) {
        return this.orderByPortAsc()
      }
    },
    orderByPortAsc: function () {
      this.active_arrow_port_down = true
      this.active_arrow_port_up = false
      return this.listServices.sort(function (a, b) {
        if (b.port > a.port) {
          return -1
        }
        if (b.port < a.port) {
          return 1
        }
        return 0
      })
    },
    orderByPortDesc: function () {
      this.active_arrow_port_down = false
      this.active_arrow_port_up = true
      return this.listServices.sort(function (a, b) {
        if (b.port < a.port) {
          return -1
        }
        if (b.port > a.port) {
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
