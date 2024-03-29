<template>
<div class="w-100 pt-2 h-8vh left-aside pb-2 mt-3 pr-3 d-flex position-sticky bottom-0" style="height: 35px !important">
  <div v-if="showPagination" class="d-flex justify-content-center align-items-center w-100">
    <span v-if="!isOnTargetDetailView" class="border-right pr-2 mr-3 font-size-15">{{showPageNumberFromOne}} - {{numberEndRange}} from {{entitiesAmount}}</span>
    <div v-if="!isOnTargetDetailView">
      <v-pagination v-model="page" :pages="numberOfPages" @update:modelValue="updatePaginatorInStore(page)"/>
    </div>
    <span v-if="!isOnTargetDetailView" class="border-left pl-2 ml-3 font-size-15">Go to page</span>
    <input v-if="!isOnTargetDetailView" type="number" min="0" step="1" class="form-control w-25 ml-2 paginator-page-input" v-model="manualPageEntered" @keyup.enter="validateEnteredPage"/>
  </div>
  <div class="d-flex justify-content-end w-100 position-absolute pr-3">
    <span v-if="showStatusBar" :class="{'blue-text': successOperation, 'red-text': failedOperation}" class="material-icons mr-2">check</span>
    <span v-if="showStatusBar">{{operationStatus.message}}</span>
  </div>
</div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import { AgentMixin } from '@/mixins/AgentMixin'
import { TargetMixin } from '@/mixins/TargetMixin'
import { StatusMessageMixin } from '@/mixins/StatusMessageMixin'
import VPagination from '@hennge/vue3-pagination'
import jQuery from 'jquery'
export default {
  name: 'BottomBar',
  components: {
    VPagination
  },
  props: {
    showPagination: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      page: 1,
      numberElementsInGroup: 20,
      manualPageEntered: null
    }
  },
  mixins: [AgentMixin, TargetMixin, StatusMessageMixin],
  computed: {
    ...mapState('target', ['operationStatus', 'targetListStore', 'filterColour', 'paginator']),
    ...mapState('agent', ['agentListStore']),
    ...mapGetters('target', ['filterByColor']),
    entitiesAmount () {
      if (this.filterColour !== '' && this.isOnTargetView) {
        return this.arrayTargetFilterList.length
      }
      if (this.filterColour !== '' && this.isOnAgentView) {
        return this.arrayAgentFilterList.length
      }
      if (this.isOnTargetView) {
        return this.targetListStore.length
      }
      if (this.$isOnAgentView) {
        return this.agentListStore.length
      }
      return 0
    },
    numberOfPages () {
      return Math.ceil(this.entitiesAmount / this.numberElementsInGroup)
    },
    numberStartsRange () {
      if (this.page === this.numberOfPages) {
        return (this.page * this.numberElementsInGroup) - this.numberElementsInGroup
      }
      if (this.activateThePager) {
        return this.numberEndRange - this.numberElementsInGroup
      }
      return 0
    },
    numberEndRange () {
      if (this.numberElementsInGroup > this.entitiesAmount) {
        return this.entitiesAmount
      }
      if (this.page === this.numberOfPages) {
        return this.entitiesAmount
      }
      if (this.activateThePager) {
        return this.page * this.numberElementsInGroup
      }
      return this.numberElementsInGroup
    },
    showPageNumberFromOne () {
      if (this.page === this.numberOfPages) {
        if (this.numberStartsRange === 0) {
          return this.numberStartsRange + 1
        }
        return this.numberStartsRange
      }
      return this.numberStartsRange + 1
    },
    activateThePager () {
      return this.page > 0
    },
    isEnteredPageValid () {
      return this.manualPageEntered >= 1 && this.manualPageEntered <= this.numberOfPages
    }
  },
  watch: {
    entitiesAmount: function (value) {
      if (this.numberEndRange > value) {
        this.page--
      }
      this.updatePaginatorInStore(this.page)
    }
  },
  mounted () {
    this.updatePaginator({
      page: this.page,
      startIndex: parseInt(this.numberStartsRange),
      endIndex: parseInt(this.numberEndRange)
    })
    this.paintFirstButtonOfPaginatorPage()
  },
  methods: {
    ...mapMutations('target', ['updatePaginator']),
    updatePaginatorInStore (page) {
      let newStartRange = parseInt(this.numberStartsRange)
      let newEndRange = parseInt(this.numberEndRange)
      if (this.page === this.numberOfPages) {
        newEndRange = this.page * this.numberElementsInGroup
        newStartRange = newEndRange - this.numberElementsInGroup
      }
      if (this.page === this.numberOfPages) {
        newEndRange = this.page * this.numberElementsInGroup
      }
      this.updatePaginator({
        page: this.page,
        startIndex: newStartRange,
        endIndex: newEndRange
      })
      if (page > 1) {
        this.removePaintFirstButtonOfPaginatorPage()
      }
    },
    validateEnteredPage () {
      if (this.isEnteredPageValid) {
        this.page = this.manualPageEntered
      }
      if (this.page > 1) {
        this.removePaintFirstButtonOfPaginatorPage()
      }
    },
    paintFirstButtonOfPaginatorPage () {
      jQuery('.Pagination :button').first().addClass('Page-active')
    },
    removePaintFirstButtonOfPaginatorPage () {
      jQuery('.Pagination :button').first().removeClass('Page-active')
    }
  }
}
</script>
<style scoped>
.paginator-page-input{
  width: 45px !important;
  height: 1.5rem;
  background-color: #f4f6f9;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button{
  -webkit-appearance: none;
  margin: 0
}
input[type=number]{
  -moz-appearance: textfield
}
.bottom-0{
  bottom: 0 !important;
}
.h-8vh{
  height: 8vh !important
}
</style>
