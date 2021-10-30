<template>
  <div class="container-fluid">
    <div class="row">
          <LogInForm/>
    </div>
  </div>
</template>
<script>
import LogInForm from '@/components/User/LogInForm.vue'
export default {
  name: 'LogIn',
  components: {
    LogInForm
  }
}
</script>
<style>
  body{
    background: red url('~@/assets/wallpaper.jpg') top left no-repeat;
  }
</style>
