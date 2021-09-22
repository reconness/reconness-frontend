<template>
<div class="w-100 h-50 d-flex justify-content-end pt-2 left-aside pb-2 mt-3 pr-3">
  <span v-if="showStatusBar" :class="{'blue-text': successOperation, 'red-text': failedOperation}" class="material-icons mr-2">check</span>
  <span v-if="showStatusBar">{{operationStatus.message}}</span>
</div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'BottomBar',
  computed: {
    ...mapState('target', ['operationStatus']),
    showStatusBar () {
      return this.operationStatus.status !== this.$entityStatus.WAITING
    },
    successOperation () {
      return this.operationStatus.status === this.$entityStatus.SUCCESS
    },
    failedOperation () {
      return this.operationStatus.status === this.$entityStatus.FAILED
    }
  }
}
</script>
