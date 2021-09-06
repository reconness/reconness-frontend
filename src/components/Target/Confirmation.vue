<template>
<div class="row">
  <div class="col-12">
    <Toast :baseZIndex="200"/>
    <div class="modal fade" id="confirmation-modal" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header dialog-without-lines-header">
                <!-- PARAMETERIZABLE -->
                  <h5  class="modal-title">
                    <b v-if="this.$store.state.agent.valueDelete === '' && this.$store.state.agent.nameRoute === 'subdomains'">Are you sure you want to delete all subdomains below?</b>
                    <b v-else >Are you sure you want to delete selected {{this.$store.state.agent.nameRoute}}?</b>
                  </h5>
              </div>
              <div class="modal-body">
                <!-- PARAMETERIZABLE -->
                  <div  v-if="this.$store.state.agent.valueDelete === '' && this.$store.state.agent.nameRoute === 'subdomains'">
                  <p class="mb-0">Please, type "yes" to confirm the delete action </p>
                   <input autofocus required v-model="nameTyped"  class="form-control input-line" placeholder="">
                  </div>
                  <div v-else>
                  <p class="mb-0">Please, confirm the name of the {{$store.state.agent.nameRoute}} <b> {{$store.state.agent.valueDelete}} </b> before delete it</p>
                  <input autofocus required v-model="nameTyped"  class="form-control input-line" placeholder="Name">
              </div></div>
              <div class="modal-footer dialog-without-lines-footer">
                  <button :disabled="nameTyped !== 'yes'"
                  v-if="this.$store.state.agent.valueDelete === '' && this.$store.state.agent.nameRoute === 'subdomains'"
                  type="button" class="btn btn-primary btn-danger delete_btn" @click="remove(this.nameTyped)">Delete</button>

                  <button v-else :disabled="nameTyped !== this.$store.state.agent.valueDelete"
                  type="button" class="btn btn-primary btn-danger delete_btn" @click="remove(this.nameTyped)">Delete</button>
                  <button @click="close()" type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
              </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /#confirmation-modal -->
    </div>
    </div>
</template>
<script>
import jQuery from 'jquery'
import Toast from 'primevue/toast'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Confirmation',
  components: {
    Toast
  },
  data () {
    return {
      nameTyped: ''
    }
  },
  computed: {
    ...mapGetters('target', ['getTargetById', 'getRootDomainByIdTargetAndIdRootDomain']),
    getRouteName () {
      return this.$store.state.agent.nameRoute
    },
    isRouteNameTargetDetail () {
      return this.$route.name === 'TargetDetail'
    },
    userTypeYes () {
      return this.nameTyped === 'yes'
    }
  },
  methods: {
    removeTargetOrRootDomainOrSubDomainByRoutName: function () {
      switch (this.getRouteName) {
        case 'target':
          this.removeTargetAndShowNotificationOnFinish()
          if (this.isRouteNameTargetDetail) {
            this.redirectToTargetsList()
          }
          break
        case 'subdomains':
          if (this.userTypeYes) {
            this.removeSubDomainsAndShowNotificationOnFinish()
          } else if (!this.$route.params.idsubdomain) {
            this.removeSubDomainAndShowNotificationOnFinish()
          } else {
            this.removeSubDomainAndRedirectToRootDomainDetails()
          }
          break
        case 'rootdomains':
          this.removeRootDomainAndRedirectToTargetDetails()
          break
        default:
          break
      }
    },
    removeTargetAndShowNotificationOnFinish: function () {
      this.removeTargetByName()
      this.$toast.add({ severity: 'success', sumary: this.$message.successSumary, detail: this.$message.successMessageForTargetDeletion, life: 3000 })
    },
    removeRootDomainAndRedirectToTargetDetails: function () {
      var params = { idTarget: parseInt(this.$route.params.idTarget), idRootDomain: parseInt(this.$route.params.id) }
      this.$store.commit('target/removeRootDomain', params)
      this.setIsElementDeleted(true)
      this.$router.push({ name: 'TargetDetail', params: { id: this.$route.params.idTarget, targetName: this.getTargetById(parseInt(this.$route.params.idTarget)).transformedName } })
    },
    removeSubDomainAndRedirectToRootDomainDetails: function () {
      this.$store.commit('target/removeSubDomain', { idTarget: parseInt(this.$route.params.idTarget), idRoot: parseInt(this.$route.params.id), nameSubd: this.nameTyped })
      const nameRootDomain = this.getRootDomainByIdTargetAndIdRootDomain(
        {
          idTarget: parseInt(this.$route.params.idTarget),
          idRootDomain: parseInt(this.$route.params.id)
        }
      ).root
      const transformedName = this.getTargetById(parseInt(this.$route.params.idTarget)).transformedName
      this.$router.push({ name: 'RootDomainDetails', params: { idTarget: parseInt(this.$route.params.idTarget), id: parseInt(this.$route.params.id), targetName: transformedName, rootdomainName: nameRootDomain } })
      this.setIsElementDeleted(true)
    },
    removeSubDomainAndShowNotificationOnFinish: function () {
      this.$store.commit('target/removeSubDomain', { idTarget: parseInt(this.$route.params.idTarget), idRoot: parseInt(this.$route.params.id), nameSubd: this.nameTyped })
      this.$toast.add({ severity: 'success', sumary: this.$message.successSumary, detail: this.$successMessageForSubDomainDeletion, life: 3000 })
    },
    removeSubDomainsAndShowNotificationOnFinish: function () {
      this.removeSubDomains()
      this.$toast.add({ severity: 'success', sumary: this.$message.successSumary, detail: this.$successMessageForSubDomainDeletion, life: 3000 })
    },
    remove: function () {
      if (this.$randomBooleanResult()) {
        this.removeTargetOrRootDomainOrSubDomainByRoutName()
      } else {
        this.$toast.add({ severity: 'error', sumary: this.$message.errorSumary, detail: this.$message.errorMessageForAllPurpose, life: 3000 })
      }
      this.nameTyped = ''
      jQuery('#confirmation-modal').modal('hide')
      jQuery('#targetModalForm').modal('hide')
    },
    close () {
      this.nameTyped = ''
    },
    ...mapMutations('agent', ['setIsElementDeleted']),
    removeTargetByName () {
      this.$store.commit('target/removeTarget', this.nameTyped)
    },
    redirectToTargetsList () {
      this.$router.push({ name: 'Targets' })
      this.setIsElementDeleted(true)
    },
    removeSubDomains () {
      this.$store.commit('target/removeSubDomains', { idTarget: parseInt(this.$route.params.idTarget), idRoot: parseInt(this.$route.params.id) })
    }
  }
}
</script>
