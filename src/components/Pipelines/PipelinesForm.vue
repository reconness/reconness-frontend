<template>
  <div class="row">
    <div class="col-12">
      <div class="modal fade" id="pipelinesModalForm"  tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog modal-lg modal-dialog-top" role="document">
          <div class="modal-content agent-containers">
            <div class="modal-header">
              <blockquote class="blockquote-style">
                <h5 v-show="this.step === 1">Select some agents to create your Pipeline</h5>
                <h5 v-show="this.step === 2">Select one to start your pipeline</h5>
                <h5 v-show="this.step === 3">Pipeline Settings</h5>
              </blockquote>
              <div class="card-tools" v-show="this.step === 1">
                <a class="domain-names-list mr-2">Selected {{listAgents.length}}</a>
                <a v-if="listAgents.length === 0" class="domain-names-list" @click="SelectedAll()" style="color: #00B1FF">Selected All</a>
                <a v-else class="domain-names-list" @click="DeSelectedAll()" style="color: #00B1FF">Deselected All</a>
              </div>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-12 col-lg-3 p-3" v-for="item of iterList" :key="item.id" v-show="this.step !== 3">
                   <div class="info-box float-left  abs-center"   :style ="{background:item.background}" @click="selectAndDeselectedItem(item.id)" :id="'agent' + item.id">
                      <div class="info-box-content mt-2 mb-2 pl-0 pr-1 border-right">
                        <span class="info-box-text  text-custom agent-mini-agent-name">{{item.name }}</span>
                        <small class="small-text">Details</small>
                      </div>
                      <span class="number float-right ml-2 abs-center"  :style ="{background:item.background}" >
                      <div><AccountCogIco/></div>
                      </span>
                    </div>
                </div>
                <div class="" v-show="this.step === 3">
                </div>
              </div>
            </div>
            <div class="modal-footer">
               <button @click="nextPage()" :class="{'isLinkDisabled' : statusButton}" style="color: #00B1FF;" class="agent-border btn create-agent-buttons-main-action">NEXT</button>
               <button @click="cancelAll()" style="color: #FF4545;" type="button" class="agent-border btn create-agent-buttons-main-action" data-dismiss="modal">CANCEL</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AccountCogIco from '@/components/Icons/AccountCogIco.vue'
export default {
  name: 'PipelinesForm',
  data: function () {
    return {
      listAgents: [],
      step: 1,
      agentStartingPoint: 0
    }
  },
  computed: {
    ...mapState(['agentListStore']),
    iterList () {
      if (this.step === 1) {
        return this.agentListStore
      }
      if (this.step === 2) {
        const list = this.agentListStore.filter(item2 => ((this.listAgents).includes(item2.id)))
        for (var item of list) {
          document.getElementById('agent' + item.id).classList.remove('style-border-item')
        }
        return list
      }
      return 0
    },
    statusButton () {
      if (this.listAgents.length === 0 && this.step === 1) {
        return true
      } else
      if (this.agentStartingPoint === 0 && this.step === 2) {
        return true
      } else {
        return false
      }
    }
  },
  components: {
    AccountCogIco
  },
  methods: {
    selectAndDeselectedItem (itemID) {
      if (this.step === 1) {
        if (this.listAgents.includes(itemID)) {
          var index = this.listAgents.indexOf(itemID)
          if (index !== -1) {
            this.listAgents.splice(index, 1)
          }
        } else {
          this.listAgents.push(itemID)
        }
        document.getElementById('agent' + itemID).classList.toggle('style-border-item')
      }
      if (this.step === 2) {
        if (this.agentStartingPoint === itemID) {
          this.agentStartingPoint = 0
          document.getElementById('agent' + itemID).classList.toggle('style-border-item')
        } else
        if (this.agentStartingPoint !== itemID && this.agentStartingPoint === 0) {
          this.agentStartingPoint = itemID
          document.getElementById('agent' + itemID).classList.toggle('style-border-item')
        }
      }
    },
    DeSelectedAll () {
      this.listAgents = []
      for (var item of this.agentListStore) {
        document.getElementById('agent' + item.id).classList.remove('style-border-item')
      }
    },
    SelectedAll () {
      for (var item of this.agentListStore) {
        document.getElementById('agent' + item.id).classList.add('style-border-item')
        this.listAgents.push(item.id)
      }
    },
    nextPage () {
      if (this.step === 1) {
        this.step = 2
      } else {
        if (this.step === 2) {
          this.step = 3
        }
      }
    },
    cancelAll () {
      if (this.step === 1) {
        this.DeSelectedAll()
        this.step = 1
      }
      if (this.step === 2 && this.agentStartingPoint !== 0) {
        document.getElementById('agent' + this.agentStartingPoint).classList.remove('style-border-item')
      }
      if (this.step === 3 || this.step === 2) {
        this.listAgents = []
        this.agentStartingPoint = 0
        this.step = 1
      }
    }
  }

}
</script>
<style scoped>
.text-custom{
    color: #fff;
    font-size: 20px;
}
.small-text{
  color:rgb(228, 229, 230);
  font-size: 90%;
}
.info-box{
 border-radius: 12px;
 box-shadow: 13px 11px 41px #d6d6d6;
 opacity: 1;
}
.info-box span svg {
    fill: #ffffff;
    width: 25px;
    height: 25px;
}
.blockquote-style {
  background: none;
  border-left: 4px solid;
  margin:0;
  opacity: 1;
  padding: 0px;
  padding-left: .5rem !important;
  color: #00B1FF;
}
blockquote > h5{
    color: #000;
    margin-bottom: auto;
}
.style-border-item{
    border: 2px solid;
    color: #fff;
}
.isLinkDisabled {
  color: currentColor;
  pointer-events: none;
  opacity: 0.5 !important;
  cursor: not-allowed;
}
</style>
