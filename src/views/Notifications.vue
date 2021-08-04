<template>
  <div>
  </div>
</template>
<script>
export default {
  name: 'Notifications',
  mounted () {
    this.$store.commit('agent/updateLocView', 'Notifications', true)
  }
}
</script>
