<template>
<div class="poppins w-100 pt-2 h-8vh left-aside pb-2 mt-3 pr-3 d-flex position-sticky bottom-0" style="height: 35px !important">
  <div class="d-flex justify-content-center align-items-center w-100">
    <span class="font-size-14px">{{total}} results</span>
  </div>
</div>
</template>
<script>
export default {
  name: 'SearchBottomBar',
  props: {
    total: {
      type: Number,
      default: 0
    }
  }
}
</script>
