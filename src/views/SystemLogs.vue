<template>
  <div></div>
</template>
<script>
export default {
  name: 'SystemLogs',
  mounted () {
    this.$store.commit('agent/updateLocView', 'Logs', true)
  }
}
</script>
