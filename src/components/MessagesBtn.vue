<template>
  <a class="nav-link float-left control-sidebar-right btn-messages-container"
      href="#" data-slide="true" @mouseenter="mouseEnter">
    <button type="button message-icon" class="btn btn-sm control-sidebar-right" id="dropdownMenuButton">
      <CommentIco/>
    </button>
  </a>
</template>
<script>
import { mapMutations } from 'vuex'
import CommentIco from '@/components/CommentIco.vue'
export default {
  components: {
    CommentIco
  },
  methods: {
    ...mapMutations(['setIsMessageSectionOpened']),
    mouseEnter: function () {
      this.setIsMessageSectionOpened(true)
    }
  }
}
</script>
<style>
#dropdownMenuButton {
  fill: #B3B3B3
}
</style>
