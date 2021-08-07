<template>
<div class="row">
  <div class="col-12">
    <Toast :baseZIndex="200"/>
    <div class="modal fade" id="confirmationList-modal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header dialog-without-lines-header">
                <!-- PARAMETERIZABLE -->
                  <h5 class="modal-title">
                    <b v-show="nameRoute === 'Pipelines'">Are you sure you want to delete following {{nameRoute}}?</b>
                    <b v-show="nameRoute === 'PipelineDetail'">Please, confirm if you want to remove selected agents from this pipeline.</b>
                  </h5>
              </div>
              <div class="modal-body">
                <select multiple class="form-control pt-0" id="exampleFormControlSelect2" >
                  <option v-for="item of pipelinesIdList" :key="item.id" v-show="nameRoute === 'Pipelines'">{{item.name}}</option>
                  <option v-for="item of pipelinesIdAgentsList" :key="item.id" v-show="nameRoute === 'PipelineDetail'">{{item.name}}</option>
                </select>
                <!-- PARAMETERIZABLE -->
                  <p class="mt-3 mb-0" >Please, type "yes" to confirm the delete action</p>
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
  name: 'ConfirmationPipelinesList',
  data () {
    return {
      nameTyped: ''
    }
  },
  components: {
    Toast
  },
  props: {
    nameRoute: String
  },
  computed: {
    ...mapState('pipelines', ['pipelinesIdList', 'pipelinesIdAgentsList'])
  },
  methods: {
    ...mapMutations('pipelines', ['removePipelinesChecked', 'removeAgentsPipelinesChecked', 'cancelElementSelected']),
    remove: function () {
      switch (this.nameRoute) {
        case 'Pipelines':
          this.removePipelinesChecked()
          this.$toast.add({ severity: 'success', sumary: 'Success', detail: 'The pipeline has been deleted successfully', life: 3000 })
          break
        case 'PipelineDetail':
          this.removeAgentsPipelinesChecked(parseInt(this.$route.params.id))
          this.$toast.add({ severity: 'success', sumary: 'Success', detail: 'The agents from this pipeline has been deleted successfully', life: 3000 })
          break
      }
      jQuery('#confirmationList-modal').modal('hide')
      jQuery('#exampleModalCenter').modal('hide')
      this.nameTyped = ''
    },
    close () {
      const checkboxes = document.getElementsByName('checkitem')
      for (let i = 0, n = checkboxes.length; i < n; i++) {
        checkboxes[i].checked = false
        // document.getElementById('row' + checkboxes[i].id.substr(14)).style.background = '#fff'
      }
      this.nameTyped = ''
      this.$store.commit('pipelines/cancelElementSelected', this.nameRoute)
    }
  }
}
</script>
