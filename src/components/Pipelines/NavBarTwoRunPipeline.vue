<template>
    <!-- Contains navs-bar -->
  <div class="content">
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav d-none d-sm-block">
        <li class="nav-item d-flex color-blue">
            <router-link :to="{ name: 'Pipelines' }" class="color-blue">
              <span class="material-icons" @mouseover="toggle" aria:haspopup="true" aria-controls="overlay_panel">arrow_back</span>
            </router-link>
            <p class="float-left mb-0 ml-2">{{pipelineName}}</p>
          <!-- <span class="material-icons float-right cursor-pointer" @click="editPipelineName"> open_in_new</span> -->
        </li>
      </ul>
      <!-- Right navbar links -->
      <ul class="navbar-nav ml-auto">
        <li class="nav-item nav-margin border-right d-none d-sm-block">
          <a class="nav-link pos" href="#">Show Terminal</a>
        </li>
        <li class="nav-item nav-margin border-right d-none d-sm-block">
          <a class="nav-link pos" href="#" data-toggle="modal" data-target="#pipelinesModalFormSettings" :data-id="parseInt(this.$route.params.id)" @click="openSettings">Pipeline Settings</a>
        </li>
        <li class="nav-item nav-margin border-right d-none d-sm-block">
          <a class="nav-link pos red-font-color" href="#">Close</a>
        </li>
        <!-- <li class="nav-item nav-margin border-right d-none d-sm-block">
          <a class="nav-link pos" v-show= "checkDetail" href="#" @click="close()">Cancel Remove</a>
        </li> -->
      </ul>
    </nav>
    <!-- <ConfirmationPipelinesList :nameRoute= 'this.$route.name'></ConfirmationPipelinesList> -->
    <!-- <PipelinesForm :routeName="this.$route.name"/> -->
    <!-- <OverlayPanel :baseZIndex=100 ref="op" appendTo="body" id="overlay_panel"  >
      <small class="font-weight-bold">Back to main</small>
    </OverlayPanel> -->
  </div>
</template>
<script>
// import { mapState, mapMutations } from 'vuex'
// import jQuery from 'jquery'
// import ConfirmationPipelinesList from '@/components/Pipelines/ConfirmationPipelinesList.vue'
// import PipelinesForm from '@/components/Pipelines/PipelinesForm.vue'
// import OverlayPanel from 'primevue/overlaypanel'
export default {
  name: 'NavBarTwoRunPipeline',
  data: function () {
    return {
      name: String
      // isPencilVisible: false,
      // isPencilVisibleAndClick: false,
      // showInputPipelineName: true
    }
  },
  // components: {
  //   ConfirmationPipelinesList,
  //   PipelinesForm,
  //   OverlayPanel
  // },
  // computed: {
  //   ...mapState('pipelines', ['checkDetail', 'colorDeleteDetail', 'pipelinesIdAgentsList'])
  // },
  props: {
    pipelineName: String
  },
  methods: {
    // ...mapMutations('pipelines', ['editListDetail', 'cancelIdAgentPipelinesDetail']),
    // verifyPencilStatus () {
    //   if (this.isPencilVisibleAndClick) {
    //     this.isPencilVisible = true
    //   } else {
    //     this.isPencilVisible = false
    //   }
    // },
    // onBlurExecute () {
    //   this.isPencilVisible = false
    //   this.isPencilVisibleAndClick = false
    //   this.showInputPipelineName = true
    //   this.editPipeline()
    // },
    // editPipeline () {
    //   this.showInputPipelineName = true
    //   this.$store.commit('pipelines/updatePipelineName', { id: parseInt(this.$route.params.id), name: this.name })
    // },
    // close () {
    //   const checkboxes = document.getElementsByName('checkitem')
    //   for (let i = 0, n = checkboxes.length; i < n; i++) {
    //     checkboxes[i].checked = false
    //   }
    //   this.nameTyped = ''
    //   this.cancelIdAgentPipelinesDetail()
    // },
    // onBashRemoveAgentsPipeline () {
    //   if (this.pipelinesIdAgentsList.length > 0) {
    //     jQuery('#confirmationList-modal').modal()
    //   } else {
    //     return false
    //   }
    // },
    openSettings (e) {
      const selectedId = Number(e.currentTarget.getAttribute('data-id'))
      this.$store.commit('pipelines/setIdPipeline', selectedId)
    }
    // editPipelineName () {
    //   this.showInputPipelineName = false
    //   this.name = this.pipelineName
    //   const self = this
    //   setTimeout(
    //     function () {
    //       self.$refs.pipeline_name.focus()
    //     },
    //     10
    //   )
    // },
    // toggle (event) {
    //   this.$refs.op.toggle(event)
    // }
  }
}
</script>
<style scoped>
.agent-name-input{
  background-color: transparent;
  font-size: 16px;
}
.pencil-align-main{
  font-size: 17px;
}
</style>
