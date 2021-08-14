<template>
  <a class="nav-link float-left control-sidebar-right btn-messages-container"
      href="#" data-slide="true" @mouseenter="mouseEnter">
    <button type="button note-icon" class="btn btn-sm control-sidebar-right" id="dropdownMenuButton">
      <CommentIco/>
    </button>
  </a>
</template>
<script>
import { mapMutations } from 'vuex'
import CommentIco from '@/components/Icons/CommentIco.vue'
export default {
  name: 'NotesBtn',
  components: {
    CommentIco
  },
  methods: {
    ...mapMutations('agent', ['setIsNotesSectionOpened']),
    mouseEnter: function () {
      this.setIsNotesSectionOpened(true)
    }
  }
}
</script>
<style>
#dropdownMenuButton {
  fill: #B3B3B3
}
</style>
