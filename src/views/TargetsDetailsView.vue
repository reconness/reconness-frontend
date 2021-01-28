<template>
  <div>
  <!-- Contains navs-bar -->
  <NavBarTwo></NavBarTwo>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <div class="container-fluid">
        <hr class="reset-margin-top" />
        <div class="content">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TargetsDetails',
  components: {
  },
  mounted () {
    this.$store.commit('updateLocView', 'Targets', true)
  }
}
</script>
