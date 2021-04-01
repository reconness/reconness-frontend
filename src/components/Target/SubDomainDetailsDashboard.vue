<template>
    <div class="card card-style">
        <div class="card-body">
            <div class="card card-table">
                <div class=" row">
                <div class="col-12">
                    <div class="ml-4">
                    <p>Ip: <b>{{ loadedSubdomain.ipAddress }}</b></p>
                    <p>Agents: <b>{{ printAgent(loadedSubdomain.agent) }}</b></p>
                    <p>Ports: <b>{{ loadedSubdomain.ports.join(', ') }}</b></p>
                    <div class="custom-control custom-checkbox form-check private-program-container" :class= "'check-color-' + loadedTarget.secondaryColor.substring(1)">
                        <input class="form-check-input custom-control-input" type="checkbox" id="is_alive" v-model="loadedSubdomain.isAlive">
                        <label class="form-check-label custom-control-label" for="is_alive">Is Alive</label>
                    </div>
                    <div class="custom-control custom-checkbox form-check private-program-container mt-2" :class= "'check-color-' + loadedTarget.secondaryColor.substring(1)">
                        <input class="form-check-input custom-control-input" type="checkbox" id="http_open" v-model="loadedSubdomain.http">
                        <label class="form-check-label custom-control-label" for="http_open">Has HTTP Open</label>
                    </div>
                    <p class="mt-3 mb-2">Labels</p>
                    </div>
                    </div>
                </div>
                    <div class="row w-50 border rounded-table pt-3 pb-3 pl-4 pr-4">
                        <div class="col ">
                            <div class="custom-control custom-checkbox form-check private-program-container" :class= "'check-color-' + loadedTarget.secondaryColor.substring(1)">
                            <input class="form-check-input custom-control-input" type="checkbox" id="checking" v-model="loadedSubdomain.checking">
                            <label class="form-check-label custom-control-label" for="checking">Checking</label>
                           </div>
                           <div class="custom-control custom-checkbox form-check private-program-container mt-3" :class= "'check-color-' + loadedTarget.secondaryColor.substring(1)">
                            <input class="form-check-input custom-control-input" type="checkbox" id="interesting" v-model="loadedSubdomain.interesting">
                            <label class="form-check-label custom-control-label" for="interesting">Interesting</label>
                        </div>
                        </div>
                        <div class="col">
                           <div class="custom-control custom-checkbox form-check private-program-container " :class= "'check-color-' + loadedTarget.secondaryColor.substring(1)">
                            <input class="form-check-input custom-control-input" type="checkbox" id="vulnerable" v-model="loadedSubdomain.vulnerable">
                            <label class="form-check-label custom-control-label" for="vulnerable">Vulnerable</label>
                           </div>
                              <div class="custom-control custom-checkbox form-check private-program-container  mt-3" :class= "'check-color-' + loadedTarget.secondaryColor.substring(1)">
                            <input class="form-check-input custom-control-input" type="checkbox" id="bounty" v-model="loadedSubdomain.bounty">
                            <label class="form-check-label custom-control-label" for="bounty">Bounty</label>
                        </div>
                        </div>
                        <div class="col">
                          <div class="custom-control custom-checkbox form-check private-program-container " :class= "'check-color-' + loadedTarget.secondaryColor.substring(1)">
                            <input class="form-check-input custom-control-input" type="checkbox" id="ignore" v-model="loadedSubdomain.ignore">
                            <label class="form-check-label custom-control-label" for="ignore">Ignore</label>
                          </div>
                          <div class="custom-control custom-checkbox form-check private-program-container  mt-3" :class= "'check-color-' + loadedTarget.secondaryColor.substring(1)">
                            <input class="form-check-input custom-control-input" type="checkbox" id="scope" v-model="loadedSubdomain.scope">
                            <label class="form-check-label custom-control-label" for="scope">Scope</label>
                          </div>
                        </div>
                    </div>
                <div class=" row mb-2 ml-4">
                  <div class="col-12">
                    <div class="custom-control custom-checkbox form-check private-program-container mt-3" :class= "'check-color-' + loadedTarget.secondaryColor.substring(1)">
                        <input class="form-check-input custom-control-input" type="checkbox" id="is_main_portal" v-model="loadedSubdomain.isMainPortal">
                        <label class="form-check-label custom-control-label" for="is_main_portal">Is main Portal</label>
                    </div>
                    <div class="mt-5">
                        <button type="button" style="color: #00B1FF;" class="subdomain-border btn create-agent-buttons-main-action">Save</button>
                        <button type="button" class="agent-border btn create-agent-buttons-main-action btn-danger delete_btn ml-4" data-target="#confirmation-modal" data-toggle="modal" data-backdrop="false" @click="updateConfirm(loadedSubdomain.name)">Delete</button>
                    </div>
                 </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data: function () {
    return {
      loadedSubdomain: {},
      loadedTarget: {}
    }
  },
  computed: {
    ...mapGetters('target', ['getSubDomain', 'getTargetById'])
  },
  created () {
    this.loadedSubdomain = this.getSubDomain({
      idtarget: parseInt(this.$route.params.idTarget),
      idrootdomain: parseInt(this.$route.params.id),
      idsubdomain: parseInt(this.$route.params.idsubdomain)
    })
    this.loadedTarget = this.getTargetById(parseInt(this.$route.params.idTarget))
  },
  methods: {
    updateConfirm (itemName) {
      return this.$store.commit('confirm', { name: itemName, route: 'subdomains' })
    },
    printAgent (agents) {
      var listAgent = []
      for (var index1 of agents) {
        listAgent.push(index1.name)
      }
      return listAgent.join(', ')
    }
  }
}
</script>
<style>
.subdomain-border{
    border: 1px solid #e8e8e8;
    border-radius: 12px;
    width: 90px;
    height: 47px;
}
.rounded-table{
    border-radius: 12px;
}
</style>
