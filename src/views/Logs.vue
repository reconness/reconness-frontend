<template>
  <div></div>
</template>
<script>
export default {
  name: 'Logs',
  mounted () {
    this.$store.commit('agent/updateLocView', 'Logs', true)
  }
}
</script>
