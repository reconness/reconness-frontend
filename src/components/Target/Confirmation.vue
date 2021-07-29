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
                    <b v-if="$store.state.valueDelete === '' && $store.state.nameRoute === 'subdomains'">Are you sure you want to delete all subdomains below?</b>
                    <b v-else >Are you sure you want to delete selected {{$store.state.nameRoute}}?</b>
                  </h5>
              </div>
              <div class="modal-body">
                <!-- PARAMETERIZABLE -->
                  <div  v-if="$store.state.valueDelete === '' && $store.state.nameRoute === 'subdomains'">
                  <p class="mb-0">Please, type "yes" to confirm the delete action </p>
                   <input autofocus required v-model="nameTyped"  class="form-control input-line" placeholder="">
                  </div>
                  <div v-else>
                  <p class="mb-0">Please, confirm the name of the {{$store.state.nameRoute}} <b> {{$store.state.valueDelete}} </b> before delete it</p>
                  <input autofocus required v-model="nameTyped"  class="form-control input-line" placeholder="Name">
              </div></div>
              <div class="modal-footer dialog-without-lines-footer">
                  <button :disabled="nameTyped !== 'yes'"
                  v-if="$store.state.valueDelete === '' && $store.state.nameRoute === 'subdomains'"
                  type="button" class="btn btn-primary btn-danger delete_btn" @click="remove(this.nameTyped)">Delete</button>

                  <button v-else :disabled="nameTyped !== $store.state.valueDelete"
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
  data () {
    return {
      nameTyped: ''
    }
  },
  components: {
    Toast
  },
  methods: {
    remove: function () {
      if (this.$randomBooleanResult()) {
        switch (this.$store.state.nameRoute) {
          case 'target':
            this.$store.commit('target/removeTarget', this.nameTyped)
            this.$toast.add({ severity: 'success', sumary: 'Success', detail: 'The target has been deleted successfully', life: 3000 })
            if (this.$route.name === 'TargetDetail') {
              this.$router.push({ name: 'Targets' })
              this.setIsElementDeleted(true)
            }
            break
          case 'subdomains':
            if (this.nameTyped === 'yes') {
              this.$store.commit('target/removeSubDomains', { idTarget: parseInt(this.$route.params.idTarget), idRoot: parseInt(this.$route.params.id) })
              this.$toast.add({ severity: 'success', sumary: 'Success', detail: 'The subdomain has been deleted successfully', life: 3000 })
            } else if (!this.$route.params.idsubdomain) {
              this.$store.commit('target/removeSubDomain', { idTarget: parseInt(this.$route.params.idTarget), idRoot: parseInt(this.$route.params.id), nameSubd: this.nameTyped })
              this.$toast.add({ severity: 'success', sumary: 'Success', detail: 'The subdomain has been deleted successfully', life: 3000 })
            } else {
              this.$store.commit('target/removeSubDomain', { idTarget: parseInt(this.$route.params.idTarget), idRoot: parseInt(this.$route.params.id), nameSubd: this.nameTyped })
              const nameRootDomain = this.getRootDomainByIdTargetAndIdRootDomain(
                {
                  idTarget: parseInt(this.$route.params.idTarget),
                  idRootDomain: parseInt(this.$route.params.id)
                }
              ).root
              const targetName = this.getTargetById(parseInt(this.$route.params.idTarget)).name
              this.$router.push({ name: 'RootDomainDetails', params: { idTarget: parseInt(this.$route.params.idTarget), id: parseInt(this.$route.params.id), targetName: targetName, rootdomainName: nameRootDomain } })
              this.setIsElementDeleted(true)
            }
            break
          case 'rootdomains':
            var params = { idTarget: parseInt(this.$route.params.idTarget), idRootDomain: parseInt(this.$route.params.id) }
            this.$store.commit('target/removeRootDomain', params)
            this.setIsElementDeleted(true)
            this.$router.push({ name: 'TargetDetail', params: { id: this.$route.params.idTarget, targetName: this.getTargetById(parseInt(this.$route.params.idTarget)).name } })
            break
          default:
            break
        }
      } else {
        this.$toast.add({ severity: 'error', sumary: 'Error', detail: 'An error occured during the removal process', life: 3000 })
      }
      this.nameTyped = ''
      jQuery('#confirmation-modal').modal('hide')
      jQuery('#targetModalForm').modal('hide')
    },
    close () {
      this.nameTyped = ''
    },
    ...mapMutations(['setIsElementDeleted'])
  },
  computed: {
    ...mapGetters('target', ['getTargetById', 'getRootDomainByIdTargetAndIdRootDomain'])
  }
}
</script>
