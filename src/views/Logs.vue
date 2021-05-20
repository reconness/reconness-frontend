<template>
  <div></div>
</template>
<script>
export default {
  name: 'Logs',
  mounted () {
    this.$store.commit('updateLocView', 'Logs', true)
  }
}
</script>
