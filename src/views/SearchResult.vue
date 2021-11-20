<template>
  <div>
  <!-- Contains navs-bar -->
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <div class="container-fluid">
        <hr class="reset-margin-top mb-0" />
          <SearchResultItem/>
      </div>
    </div>
  </div>
</template>
<script>
import SearchResultItem from '@/components/General/SearchResultItem.vue'
export default {
  name: 'SearchList',
  components: {
    SearchResultItem
  }
}
</script>
<style>
  body{
    background: #f2f4f6;
    background-size: cover
  }
</style>
