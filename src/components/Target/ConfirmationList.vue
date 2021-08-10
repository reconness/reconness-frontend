<template>
<div class="row">
  <div class="col-12">
    <Toast :baseZIndex="200"/>
    <div class="modal fade" id="confirmationList-modal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header dialog-without-lines-header">
                <!-- PARAMETERIZABLE -->
                  <h5 class="modal-title"><b>Are you sure you want to delete following {{nameRoute}}?</b></h5>
              </div>
              <div class="modal-body">
                <select multiple class="form-control pt-0" id="exampleFormControlSelect2">
                  <option v-for="item of elementSelectedList" :key="item.id">{{item.nameSubdom}}</option>
                </select>
                <!-- PARAMETERIZABLE -->
                  <p class="mt-3 mb-0">Please, type "yes" to confirm the delete action</p>
                  <input autofocus required v-model="nameTyped" style="border-top: none; border-left: none; border-right: none;" class="form-control" placeholder="">
              </div>
              <div class="modal-footer dialog-without-lines-footer">
                  <button :disabled="nameTyped !== 'yes'" type="button" class="btn btn-primary btn-danger delete_btn" @click="remove()">Delete</button>
                  <button @click="close()" type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
              </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /#confirmation-modal -->
    </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import jQuery from 'jquery'
import Toast from 'primevue/toast'
export default {
  name: 'ConfirmationList',
  components: {
    Toast
  },
  props: {
    nameRoute: String
  },
  data () {
    return {
      nameTyped: ''
    }
  },
  computed: {
    ...mapState('target', ['elementSelectedList'])
  },
  methods: {
    ...mapMutations('target', ['removeSubdomainChecked']),
    remove: function () {
      this.removeSubdomainChecked()
      this.$toast.add({ severity: 'success', sumary: 'Success', detail: 'The subdomain has been deleted successfully', life: 3000 })
      this.close()
      jQuery('#confirmationList-modal').modal('hide')
      jQuery('#exampleModalCenter').modal('hide')
      this.nameTyped = ''
    },
    close () {
      const checkboxes = document.getElementsByName('checkbox-dinamic')
      for (let i = 0, n = checkboxes.length; i < n; i++) {
        checkboxes[i].checked = false
        document.getElementById('row' + checkboxes[i].id.substr(14)).style.background = '#fff'
      }
      this.nameTyped = ''
      this.$store.commit('target/cancelElementSelected')
    }
  }
}
</script>
