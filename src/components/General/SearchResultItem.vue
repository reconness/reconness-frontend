<template>
<div >
    <div class="entity-result-main-container poppins">
        <div class="entity-result-header d-flex align-items-center">
            <div class="ml-5">
                <span class="font-size-20px font-weight-semibold">Results for targets</span>
                <span class="ml-2 font-size-14px">{{targetsSearchResult.length + rootdomainsSearchResult.length + subdomainsSearchResult.length }} results</span>
            </div>
        </div>
        <div class="entity-result-items">
            <div v-for="target of targetsSearchResult" :key="target.relativeUrl" class="entity-result-items-cell pt-2 pb-2">
                <router-link :to="generateRouteFromRelativeUrl(target.relativeUrl)"><span class="ml-5  font-size-14px">{{target.name}}</span></router-link>
            </div>
        </div>
        <div class="entity-result-items">
            <div v-for="rootDomain of rootdomainsSearchResult" :key="rootDomain.relativeUrl" class="entity-result-items-cell pt-2 pb-2">
                <router-link :to="generateRouteFromRelativeUrl(rootDomain.relativeUrl)"><span class="ml-5  font-size-14px">{{rootDomain.name}}</span></router-link>
            </div>
        </div>
        <div class="entity-result-items">
            <div v-for="subdomain of subdomainsSearchResult" :key="subdomain.relativeUrl" class="entity-result-items-cell pt-2 pb-2">
                <router-link :to="generateRouteFromRelativeUrl(subdomain.relativeUrl)"><span class="ml-5  font-size-14px">{{subdomain.name}}</span></router-link>
            </div>
        </div>
    </div>
    <div class="entity-result-main-container poppins">
        <div class="entity-result-header d-flex align-items-center">
            <div class="ml-5">
                <span class="font-size-20px font-weight-semibold">Results for pipelines</span>
                <span class="ml-2 font-size-14px">{{getFilteredPipelinesByName(textToSearch).length}} results</span>
            </div>
        </div>
        <div class="entity-result-items">
            <div v-for="pipeline of getFilteredPipelinesByName(textToSearch)" :key="pipeline.id" class="entity-result-items-cell pt-2 pb-2">
                <span class="ml-5  font-size-14px">{{pipeline.name}}</span>
            </div>
        </div>
    </div>
    <div class="entity-result-main-container poppins">
        <div class="entity-result-header d-flex align-items-center">
            <div class="ml-5">
                <span class="font-size-20px font-weight-semibold">Others</span>
                <span class="ml-2 font-size-14px">{{ getFilteredOthers.length }} results</span>
            </div>
        </div>
        <div class="entity-result-items">
            <div v-for="other of getFilteredOthers" :key="other.relativeUrl" class="entity-result-items-cell pt-2 pb-2">
                <span class="ml-5  font-size-14px">{{ other.name }}</span>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'SearchResultItem',
  computed: {
    ...mapGetters('pipelines', ['getFilteredPipelinesByName']),
    ...mapState('target', ['textToSearch']),
    ...mapState('searcher', ['agentsSearchResult', 'targetsSearchResult', 'rootdomainsSearchResult', 'subdomainsSearchResult']),
    getFilteredOthers () {
      const concatenatedEntities = []
      this.agentsSearchResult.forEach(element => {
        concatenatedEntities.push(element)
      })
      return concatenatedEntities
    }
  },
  methods: {
    generateRouteFromRelativeUrl (relativeUrl) {
      return '/targets/' + relativeUrl
    }
  }
}
</script>
<style scoped>
.font-size-20px{
  font-size: 20px;
}
.entity-result-header{
    height: 54px;
    background: #FBFBFB 0% 0% no-repeat padding-box;
    box-shadow: 0px 6px 10px #0000000F;
}
.entity-result-items-cell{
    border-bottom: 1px solid #e5e9ec;
}
</style>
