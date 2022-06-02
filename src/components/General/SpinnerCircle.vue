<template>
    <div v-show="show" :class="cssClass"></div>
</template>
<script>
export default {
  name: 'SpinnerCircle',
  props: {
    addCss: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    cssClass () {
      const classes = ['sbl-circ']
      if ((this.addCss || '').trim().length > 0) {
        classes.push(this.addCss.trim())
      }
      return classes.join(' ')
    }
  }
}
</script>
<style>
.sbl-circ {
  height: 48px;
  width: 48px;
  color: #5a5a5a;
  position: relative;
  display: inline;
  border: 2px solid;
  border-radius: 50%;
  border-top-color: transparent;
  animation: rotate 1s linear infinite;
}
@keyframes rotate {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
