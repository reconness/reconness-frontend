<template>
    <div class="card card-style">
        <div class="card-body">
            <div class="card card-table">
                <div class=" row mb-2">
                <div class="col-12">
                    <div class="m-4">
                    <p>Ip: <b>{{ loadedSubdomain.ipAddress }}</b></p>
                    <p>Agents: <b>{{ loadedSubdomain.agent.join(", ") }}</b></p>
                    <div class="custom-control custom-checkbox form-check private-program-container">
                        <input class="form-check-input custom-control-input" type="checkbox" id="is_alive" v-model="loadedSubdomain.isAlive">
                        <label class="form-check-label custom-control-label" for="is_alive">Is Alive</label>
                    </div>
                    <div class="custom-control custom-checkbox form-check private-program-container mt-2">
                        <input class="form-check-input custom-control-input" type="checkbox" id="http_open" v-model="loadedSubdomain.http">
                        <label class="form-check-label custom-control-label" for="http_open">Has HTTP Open</label>
                    </div>
                    <p class="mt-3 mb-3 font-weight-bold">
                        Labels
                    </p>
                    <!-- /x<div class="col-12"> -->
                    <div class="">
                        <div class="d-flex">
                        <div class="custom-control custom-checkbox form-check private-program-container">
                            <input class="form-check-input custom-control-input" type="checkbox" id="checking" v-model="loadedSubdomain.checking">
                            <label class="form-check-label custom-control-label" for="checking">Checking</label>
                        </div>
                        <div class="custom-control custom-checkbox form-check private-program-container ml-4">
                            <input class="form-check-input custom-control-input" type="checkbox" id="vulnerable" v-model="loadedSubdomain.vulnerable">
                            <label class="form-check-label custom-control-label" for="vulnerable">Vulnerable</label>
                        </div>
                        <div class="custom-control custom-checkbox form-check private-program-container ml-4">
                            <input class="form-check-input custom-control-input" type="checkbox" id="ignore" v-model="loadedSubdomain.ignore">
                            <label class="form-check-label custom-control-label" for="ignore">Ignore</label>
                        </div>
                        </div>
                        <div class="d-flex">
                        <div class="custom-control custom-checkbox form-check private-program-container mt-3">
                            <input class="form-check-input custom-control-input" type="checkbox" id="interesting" v-model="loadedSubdomain.interesting">
                            <label class="form-check-label custom-control-label" for="interesting">Interesting</label>
                        </div>
                        <div class="custom-control custom-checkbox form-check private-program-container ml-4 mt-3">
                            <input class="form-check-input custom-control-input" type="checkbox" id="bounty" v-model="loadedSubdomain.bounty">
                            <label class="form-check-label custom-control-label" for="bounty">Bounty</label>
                        </div>
                        <div class="custom-control custom-checkbox form-check private-program-container ml-4 mt-3">
                            <input class="form-check-input custom-control-input" type="checkbox" id="scope" v-model="loadedSubdomain.scope">
                            <label class="form-check-label custom-control-label" for="scope">Scope</label>
                        </div>
                        </div>
                    </div>
                    <div class="custom-control custom-checkbox form-check private-program-container mt-4">
                        <input class="form-check-input custom-control-input" type="checkbox" id="is_main_portal" v-model="loadedSubdomain.scope">
                        <label class="form-check-label custom-control-label" for="is_main_portal">Is main Portal</label>
                    </div>
                    <div class="mt-5">
                        <button type="button" style="color: #00B1FF;" class="subdomain-border btn create-agent-buttons-main-action">Save</button>
                        <button type="button" class="agent-border btn create-agent-buttons-main-action btn-danger delete_btn ml-4">Delete</button>
                    </div>
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
      loadedSubdomain: {}
    }
  },
  computed: {
    ...mapGetters('target', ['getSubDomain'])
  },
  created () {
    this.loadedSubdomain = this.getSubDomain({
      idtarget: parseInt(this.$route.params.idTarget),
      idrootdomain: parseInt(this.$route.params.id),
      idsubdomain: parseInt(this.$route.params.idsubdomain)
    })
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
.subdomain_active_tab{
  background: linear-gradient(rgb(242, 244, 246), rgb(242, 244, 246)) padding-box padding-box, linear-gradient(160deg, rgb(255,255,255) 0%, rgb(255,255,255) 100%) border-box border-box;box-shadow: rgb(214, 214, 214) 3px 12px 23px;
}
</style>
