<template>
    <div class="col-12">
        <div class="row header-bottom-line-shadow">
            <div class="offset-sm-1"></div>
            <div class="col-1 my-2 border-left">Color ID</div>
            <div class="col-2 my-2 border-left">Name</div>
            <div class="col-3 my-2 border-left">RootDomains</div>
            <div class="col-1 my-2 border-left border-right">Actions</div>
        </div>
        <div v-for="target of targetListStore" :key="target.id" class="row border-bottom">
            <div class="offset-sm-1"></div>
            <div class="col-1 my-auto d-flex justify-content-center">
                <div class="color-id-size" :style="{background: target.primaryColor}"></div>
            </div>
            <div class="col-2 my-auto d-flex justify-content-center">
                <router-link class="black-text" :to="{ name: 'TargetDetail', params: {id: target.id, targetName: target.transformedName} }">
                    {{target.name}}
                </router-link>
            </div>
            <div class="col-3 my-2">
              <router-link class="agent-mini-color-gray" v-for="rootDomain in target.rootDomains" :key="rootDomain.id" :to="{ name: 'RootDomainDetails', params: {idTarget: target.id , id: rootDomain.id, targetName: target.name,  rootdomainName: rootDomain.root } }">
                  {{rootDomain.root}},
              </router-link>
            </div>
            <div class="col-1 color-action-column d-flex justify-content-center">
              <span class="target-minilist-settings-ico cursor-pointer material-icons my-auto icon-size-action-column target-minilist-settings-ico" @mouseover="toggleSettingsTooltip">settings</span>
              <TrashCan class="target-minilist-trash-ico cursor-pointer material-icons my-auto ml-2 icon-size-delete-action-column" @mouseover="toggleDeleteTooltip"/>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import TrashCan from '@/components/Icons/TrashCan.vue'
export default {
  name: 'TargetMiniList',
  components: {
    TrashCan
  },
  computed: {
    ...mapState('target', ['targetListStore'])
  }
}
</script>
<style scoped>
.header-bottom-line-shadow {
    background: #fbfbfb 0% 0% no-repeat padding-box;
    opacity: 1;
    box-shadow: 0px 6px 10px #0000000F
}
.color-id-size {
    width: 18px;
    height: 18px;
}
.color-action-column {
    background: rgba(0, 177, 255, 0.05);
}
.icon-size-action-column {
    font-size: 21px;
}
.icon-size-delete-action-column {
    width: 21px;
    height: 21px;
}
.target-minilist-settings-ico:hover {
    color: #00B1FF;
}
.target-minilist-trash-ico:hover {
    fill: #FF4545
}

</style>
