<template>
  <div>
  </div>
</template>
<script>
export default {
  name: 'Notifications',
  mounted () {
    this.$store.commit('updateLocView', 'Notifications', true)
  }
}
</script>
