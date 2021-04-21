<template>
    <!-- Contains navs-bar -->
  <div class="content">
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav d-none d-sm-block">
        <li class="nav-item d-flex">
            <router-link :to="{ name: 'Pipelines' }" class="color-blue">
            <p class="float-left mb-0">{{pipelineName}}</p>
             <span class="material-icons float-right "> open_in_new</span>
            </router-link>
        </li>
      </ul>
      <!-- Right navbar links -->
      <ul class="navbar-nav ml-auto">
        <li class="nav-item nav-margin border-right d-none d-sm-block">
          <a class="nav-link pos" href="#">Pipeline Settings</a>
        </li>
        <li class="nav-item nav-margin border-right d-none d-sm-block">
          <a class="nav-link pos" href="#">Edit Agent List</a>
        </li>
        <li class="nav-item nav-margin border-right d-none d-sm-block">
          <a class="nav-link pos" href="#">Run</a>
        </li>
         <li class="nav-item nav-margin border-right d-none d-sm-block">
          <a class="nav-link pos" href="#">Cancel</a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'NavBarTwoDetailPipeline',
  computed: {
  },
  props: {
    pipelineName: String
  }
}
</script>
