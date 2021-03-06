<template>
<div class="row">
  <div class="col-12">
    <Toast :baseZIndex="200"/>
    <div class="modal fade" id="confirmation-modal" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header dialog-without-lines-header">
                <!-- PARAMETERIZABLE -->
                  <h5 class="modal-title"><b>Are you sure you want to delete selected {{nameIs}}?</b></h5>
              </div>
              <div class="modal-body">
                <!-- PARAMETERIZABLE -->
                  <p>Please, confirm the name of the {{nameIs}} <b>{{valueName}} </b> before delete it</p>
                  <input autofocus required v-model="nameTyped"  class="form-control input-line" placeholder="Name">
              </div>
              <div class="modal-footer dialog-without-lines-footer">
                  <button :disabled="nameTyped !== valueName" type="button" class="btn btn-primary btn-danger delete_btn" @click="removeTarget(this.nameTyped)">Delete</button>
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
      nameTyped: '',
      nameIs: ''
    }
  },
  props: {
    type: String,
    valueName: String
  },
  components: {
    Toast
  },
  methods: {
    removeTarget: function () {
      if (this.nameTyped === this.valueName) {
        if (this.$randomBooleanResult()) {
          if (this.$route.name === 'TargetDetail' || this.$route.name === 'Targets' || this.$route.name === 'Home') {
            this.$store.commit('target/removeTarget', this.nameTyped)
            this.$toast.add({ severity: 'success', sumary: 'Success', detail: 'The target has been deleted successfully', life: 3000 })
            if (this.$route.name === 'TargetDetail') {
              this.$router.push({ name: 'Targets' })
              this.setIsElementDeleted(true)
            }
          } else {
            this.$store.commit('target/removeRootDomain', parseInt(this.$route.params.idTarget), parseInt(this.$route.params.id))
            this.$toast.add({ severity: 'success', sumary: 'Success', detail: 'The target has been deleted successfully', life: 3000 })
            this.$router.push({ name: 'Targets' })
          }
        } else {
          this.$toast.add({ severity: 'error', sumary: 'Error', detail: 'An error occured during the removal process', life: 3000 })
        }
        this.nameTyped = ''
        jQuery('#confirmation-modal').modal('hide')
        jQuery('#targetModalForm').modal('hide')
      }
    },
    close () {
      this.nameTyped = ''
    },
    ...mapMutations(['setIsElementDeleted'])
  },
  computed: {
    ...mapGetters('target', ['getTargetById'])
  },
  mounted () {
    if (this.$route.name === 'RootDomainDetails') {
      this.nameIs = 'rootdomains'
    } else {
      this.nameIs = 'target'
    }
  }
}
</script>
