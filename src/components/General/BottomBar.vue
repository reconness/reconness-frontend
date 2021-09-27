<template>
<div class="w-100 h-50 pt-2 left-aside pb-2 mt-3 pr-3 d-flex">
  <div class="d-flex justify-content-center align-items-center w-100">
    <span class="border-right pr-2 mr-3 font-size-15">{{numberStartsRange}} - {{numberEndRange}} de {{targetsAmount}}</span>
    <div>
      <v-pagination v-model="page" :pages="numberOfPages"/>
    </div>
    <span class="border-left pl-2 ml-3 font-size-15">Go to page</span>
    <input class="form-control w-25 ml-2 paginator-page-input" v-model="page"/>
  </div>
  <div class="d-flex justify-content-end">
    <span v-if="showStatusBar" :class="{'blue-text': successOperation, 'red-text': failedOperation}" class="material-icons mr-2">check</span>
    <span v-if="showStatusBar">{{operationStatus.message}}</span>
  </div>
</div>
</template>
<script>
import { mapState } from 'vuex'
import VPagination from '@hennge/vue3-pagination'
export default {
  name: 'BottomBar',
  components: {
    VPagination
  },
  data () {
    return {
      page: 0,
      numberElementsInGroup: 3
    }
  },
  computed: {
    ...mapState('target', ['operationStatus', 'targetListStore']),
    showStatusBar () {
      return this.operationStatus.status !== this.$entityStatus.WAITING
    },
    successOperation () {
      return this.operationStatus.status === this.$entityStatus.SUCCESS
    },
    failedOperation () {
      return this.operationStatus.status === this.$entityStatus.FAILED
    },
    targetsAmount () {
      return this.targetListStore.length
    },
    numberOfPages () {
      return Math.ceil(this.targetsAmount / this.numberElementsInGroup)
    },
    numberStartsRange () {
      return this.numberEndRange - this.numberElementsInGroup + 1
    },
    numberEndRange () {
      return this.page * this.numberElementsInGroup
    }
  }
}
</script>
<style scoped>
.font-size-15{
  font-size: 15px
}
.paginator-page-input{
  width: 4% !important;
  height: 1.5rem;
  background-color: #f4f6f9;
}
</style>
