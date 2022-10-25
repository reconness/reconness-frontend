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
        </li>
      </ul>
      <!-- Right navbar links -->
      <ul class="navbar-nav ml-auto">
        <li class="nav-item nav-margin border-right d-none d-sm-block">
          <a v-if="isTerminalHided" class="nav-link pos" href="#" @click="hideTerminal(false)">Show Terminal</a>
          <a v-else class="nav-link pos" @click="hideTerminal(true)" href="#">Hide Terminal</a>
        </li>
        <li class="nav-item nav-margin border-right d-none d-sm-block">
          <a class="nav-link pos" href="#" data-toggle="modal" data-target="#pipelinesModalFormSettings" :data-id="parseInt(this.$route.params.id)" @click="openSettings">Pipeline Settings</a>
        </li>
        <li class="nav-item nav-margin border-right d-none d-sm-block">
          <router-link class="nav-link pos red-font-color" :to="{ name: 'PipelineDetail', params: {pipelineName: pipelineName} }">Close</router-link>
        </li>
      </ul>
    </nav>
    <PipelinesForm :routeName="this.$route.name"/>
    <OverlayPanel :baseZIndex=100 ref="op" appendTo="body" id="overlay_panel"  >
      <small class="font-weight-bold">Back to main</small>
    </OverlayPanel>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import PipelinesForm from '@/components/Pipelines/PipelinesForm.vue'
import OverlayPanel from 'primevue/overlaypanel'
export default {
  name: 'NavBarTwoRunPipeline',
  components: {
    PipelinesForm,
    OverlayPanel
  },
  props: {
    pipelineName: String,
    id: String
  },
  data: function () {
    return {
      name: String
    }
  },
  computed: {
    ...mapState('pipelines', ['isTerminalHided'])
  },
  methods: {
    ...mapMutations('pipelines', ['hideTerminal']),
    openSettings (e) {
      const selectedId = Number(e.currentTarget.getAttribute('data-id'))
      this.$store.commit('pipelines/setIdPipeline', selectedId)
    },
    toggle (event) {
      this.$refs.op.toggle(event)
    }
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
