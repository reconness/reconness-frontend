<template>
<div class="w-100 pt-2 h-8vh left-aside pb-2 mt-3 pr-3 d-flex position-sticky bottom-0" style="height: 35px !important">
  <div class="d-flex justify-content-center align-items-center w-100">
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
import { mapState, mapMutations } from 'vuex'
import { AgentMixin } from '@/mixins/AgentMixin'
import { TargetMixin } from '@/mixins/TargetMixin'
import VPagination from '@hennge/vue3-pagination'
import jQuery from 'jquery'
export default {
  name: 'BottomBar',
  components: {
    VPagination
  },
  data () {
    return {
      page: 0,
      numberElementsInGroup: 3,
      manualPageEntered: null
    }
  },
  mixins: [AgentMixin, TargetMixin],
  computed: {
    ...mapState('target', ['operationStatus', 'targetListStore']),
    ...mapState('agent', ['agentListStore']),
    showStatusBar () {
      return this.operationStatus.status !== this.$entityStatus.WAITING
    },
    successOperation () {
      return this.operationStatus.status === this.$entityStatus.SUCCESS
    },
    failedOperation () {
      return this.operationStatus.status === this.$entityStatus.FAILED
    },
    entitiesAmount () {
      if (this.isOnTargetView) {
        return this.targetListStore.length
      } else {
        return this.agentListStore.length
      }
    },
    numberOfPages () {
      return Math.ceil(this.entitiesAmount / this.numberElementsInGroup)
    },
    numberStartsRange () {
      if (this.activateThePager) {
        return this.numberEndRange - this.numberElementsInGroup
      }
      return 0
    },
    numberEndRange () {
      if (this.page === this.numberOfPages) {
        return this.entitiesAmount
      }
      if (this.activateThePager) {
        return this.page * this.numberElementsInGroup
      }
      return this.numberElementsInGroup
    },
    showPageNumberFromOne () {
      return this.numberStartsRange + 1
    },
    activateThePager () {
      return this.page > 0
    },
    isEnteredPageValid () {
      return this.manualPageEntered >= 1 && this.manualPageEntered <= this.numberOfPages
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
      this.updatePaginator({
        page: this.page,
        startIndex: parseInt(this.numberStartsRange),
        endIndex: parseInt(this.numberEndRange)
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
