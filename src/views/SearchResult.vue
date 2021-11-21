<template>
  <div>
  <!-- Contains navs-bar -->
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <div class="container-fluid search-result-main-view">
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
  .search-result-main-view{
    padding-right:0;
    padding-left: 0;
  }
</style>
