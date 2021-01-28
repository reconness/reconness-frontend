<template>
  <div>
  <!-- Contains navs-bar -->
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <div class="container-fluid">
        <hr class="reset-margin-top" />
        <div class="content">
          <TargetsList></TargetsList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TargetsList from '@/components/Target/TargetsList.vue'
export default {
  name: 'TargetsListView',
  components: {
    TargetsList
  },
  mounted () {
    this.$store.commit('updateLocView', 'Targets', true)
  }
}
</script>
