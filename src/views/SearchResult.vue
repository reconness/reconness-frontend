<template>
  <div>
  <!-- Contains navs-bar -->
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <div class="container-fluid search-result-main-view">
          <SearchResultItem/>
      </div>
    </div>
    <SearchBottomBar :total="totalSearchedItems"/>
  </div>
</template>
<script>
import SearchResultItem from '@/components/General/SearchResultItem.vue'
import SearchBottomBar from '@/components/General/SearchBottomBar.vue'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'SearchList',
  components: {
    SearchResultItem,
    SearchBottomBar
  },
  computed: {
    ...mapGetters('pipelines', ['getFilteredPipelinesByName']),
    ...mapState('target', ['textToSearch']),
    ...mapState('searcher', ['agentsSearchResult', 'targetsSearchResult', 'rootdomainsSearchResult', 'subdomainsSearchResult']),
    totalSearchedItems () {
      return this.agentsSearchResult.length + this.getFilteredPipelinesByName(this.textToSearch).length + this.targetsSearchResult.length + this.rootdomainsSearchResult.length + this.subdomainsSearchResult.length
    }
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
