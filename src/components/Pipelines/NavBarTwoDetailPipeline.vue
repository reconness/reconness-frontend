<template>
    <!-- Contains navs-bar -->
  <div class="content">
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav d-none d-sm-block">
        <li class="nav-item d-flex color-blue" v-if="showInputPipelineName">
          <router-link :to="{ name: 'Pipelines' }">
            <p class="float-left mb-0">{{pipelineName}}</p>
          </router-link>
          <span class="material-icons float-right cursor-pointer" @click="showInputPipelineName = false; name = this.pipelineName"> open_in_new</span>
        </li>
        <li class="nav-item d-flex" v-if="!showInputPipelineName">
          <div class="d-flex flex-row float-left" v-bind:class="{ 'justify-content-end': isPencilVisible}" >
              <input  v-model="name"
                v-bind:class="{ 'bordered-input-name-withfocus': isPencilVisibleAndClick}"
                class="form-control agent-placeholder agent-name-input" placeholder="My Pipeline"
                @focus="isPencilVisible=true" @blur="onBlurExecute" @mouseover="isPencilVisible=true"
                @mouseleave="verifyPencilStatus" @click="isPencilVisible=true; isPencilVisibleAndClick=true"
                @keyup.enter="isPencilVisible=false; isPencilVisibleAndClick=false; editPipeline()" >
              <span v-show="isPencilVisible" class="material-icons blue-text pencil-align-main">edit</span>
            </div><!-- /.d-flex -->
        </li>
      </ul>
      <!-- Right navbar links -->
      <ul class="navbar-nav ml-auto">
        <li class="nav-item nav-margin border-right d-none d-sm-block">
          <a class="nav-link pos" href="#">Pipeline Settings</a>
        </li>
        <li class="nav-item nav-margin border-right d-none d-sm-block">
          <a class="nav-link pos" href="#" v-show= "!checkDetail" v-on:click="editListDetail()">Edit Agent List</a>
          <span :class="{'isLinkDisabled' : pipelinesIdAgentsList.length <= 0}">
            <a class="nav-link pos" v-show= "checkDetail" href="#" v-bind:style ="{color:colorDeleteDetail}" @click="onBashRemoveAgentsPipeline">Remove Agents</a>
          </span>
        </li>
        <li class="nav-item nav-margin border-right d-none d-sm-block">
          <a class="nav-link pos" href="#">Run</a>
        </li>
         <li class="nav-item nav-margin border-right d-none d-sm-block">
          <a class="nav-link pos" href="#" @click="close()">Cancel</a>
        </li>
      </ul>
    </nav>
    <ConfirmationPipelinesList :nameRoute= 'this.$route.name'></ConfirmationPipelinesList>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import jQuery from 'jquery'
import ConfirmationPipelinesList from '@/components/Pipelines/ConfirmationPipelinesList.vue'
export default {
  name: 'NavBarTwoDetailPipeline',
  data: function () {
    return {
      name: String,
      isPencilVisible: false,
      isPencilVisibleAndClick: false,
      showInputPipelineName: true
    }
  },
  components: {
    ConfirmationPipelinesList
  },
  computed: {
    ...mapState('pipelines', ['checkDetail', 'colorDeleteDetail', 'pipelinesIdAgentsList'])
  },
  props: {
    pipelineName: String
  },
  methods: {
    ...mapMutations('pipelines', ['editListDetail', 'cancelIdAgentPipelinesDetail']),
    verifyPencilStatus () {
      if (this.isPencilVisibleAndClick) {
        this.isPencilVisible = true
      } else {
        this.isPencilVisible = false
      }
    },
    onBlurExecute () {
      this.isPencilVisible = false
      this.isPencilVisibleAndClick = false
      this.showInputPipelineName = true
    },
    editPipeline () {
      this.showInputPipelineName = true
      this.$store.commit('pipelines/updatePipelineName', { id: parseInt(this.$route.params.id), name: this.name })
    },
    close () {
      var checkboxes = document.getElementsByName('checkitem')
      for (var i = 0, n = checkboxes.length; i < n; i++) {
        checkboxes[i].checked = false
      }
      this.nameTyped = ''
      this.cancelIdAgentPipelinesDetail()
    },
    onBashRemoveAgentsPipeline () {
      if (this.pipelinesIdAgentsList.length > 0) {
        jQuery('#confirmationList-modal').modal()
      } else {
        return false
      }
    }
  }
}
</script>
<style scoped>
.agent-name-input{
  background-color: transparent;
}
</style>
