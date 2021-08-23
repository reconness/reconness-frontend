<template>
<div class="row">
  <div class="col-12">
    <Toast :baseZIndex="200"/>
    <div class="modal fade" id="confirmation-modald">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header dialog-without-lines-header">
                <!-- PARAMETERIZABLE -->
                  <h5 class="modal-title"><b>Are you sure you want to delete following target?</b></h5>
              </div>
              <div class="modal-body">
                <select multiple class="form-control pt-0" id="exampleFormControlSelect2">
                  <option v-for="item of targetIdList" :key="item.id">{{item.name}}</option>
                </select>
                <!-- PARAMETERIZABLE -->
                  <p class="mt-3 mb-0">Please, type "yes" to confirm the delete action</p>
                  <input autofocus required v-model="nameTyped" style="border-top: none; border-left: none; border-right: none;" class="form-control" placeholder="">
              </div>
              <div class="modal-footer dialog-without-lines-footer">
                  <button :disabled="nameTyped !== 'yes'" type="button" class="btn btn-primary btn-danger delete_btn" @click="removeTarget()">Delete</button>
                  <button @click="close()" type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
              </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /#confirmation-modal -->
    </div>
    </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import jQuery from 'jquery'
import Toast from 'primevue/toast'
export default {
  name: 'TargetConfirmList',
  components: {
    Toast
  },
  data () {
    return {
      nameTyped: '',
      selectedTargetName: ''
    }
  },
  computed: {
    ...mapState('target', ['targetIdList']),
    ...mapGetters('target', ['idTarget', 'getTargetById']),
    loadSelectedTarget2 () {
      const id = this.idTarget
      return this.getTargetById(parseInt(id))
    }
  },
  watch: {
    loadSelectedTarget2: function (value) {
      if (value !== undefined) {
        this.selectedTargetName = value.name
      }
    }
  },
  methods: {
    ...mapMutations('target', ['removeTargets']),
    removeTarget: function () {
      this.removeTargets(this.nameTyped)
      this.$toast.add({ severity: 'success', sumary: 'Success', detail: 'The target has been deleted successfully', life: 3000 })
      this.close()
      jQuery('#confirmation-modald').modal('hide')
      jQuery('#exampleModalCenter').modal('hide')
      this.nameTyped = ''
    },
    close () {
      var checkboxes = document.getElementsByName('checkitem')
      for (var i = 0, n = checkboxes.length; i < n; i++) {
        checkboxes[i].checked = false
      }
      this.nameTyped = ''
      this.$store.commit('target/cancelIdTarget')
    }
  }
}
</script>
