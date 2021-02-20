<template>
  <div class="row">
    <div v-for="item of arrayFilterList" :key="item.id" @mouseover="hoverCard(item.id)" @mouseout="hoverCard(-1)"
    class="col-12 col-md-4 col-lg-3 col-lgg-5 container-card">
      <div class="card text-white card-style  mb-3" v-bind:style ="{background:item.background}">
        <input type="checkbox" :id="item.id+1" :checked="isChecked(item.id)" name="checkitem" ><label :for="item.id+1" v-show= check @click="addListAgentId" :data-id="item.id" :data-name="item.name" ></label>
        <div class="card-body  link-color" v-bind:style="{paddingTop:styleList}">
          <div class="d-flex justify-content-between">
            <h3 class="card-title">{{item.name}}</h3>
            <a href="#">
              <AccountCogIco/>
            </a>
          </div>
          <hr />
          <div class="direct-chat-infos clearfix">
            <em>
              <a href="#" class="float-left">Category</a>
            </em>
            <em>
              <a href="#" class="float-right under-line" @click="setDetailsLink" data-toggle="modal" :data-id="item.id" data-target="#exampleModalCenter">Details</a>
            </em>
          </div>
          <div class="card-body-inside">
            <ul class="list-unstyled">
              <li>
                <a href="#">Agents Subdomain</a>
              </li>
              <li>
                <a href="#">Enum</a>
              </li>
              <li>
                <a href="#">Agents Scan</a>
              </li>
            </ul>
          </div>
          <div class="row">
            <div class="col-12">
              <hr class="line-bottom float-left mt-4 widhtLine" />
              <div class="float-right">
               <a href="#" class="btn btn-sm btn-info  mr-1 btn-style" data-toggle="modal" @click="setAgentId" data-target="#confirmation-modal" :data-id="item.id" >Delete</a>
               <a href="#" class="btn btn-sm btn-info  btn-style " @click="onEdit" data-toggle="modal" :data-id="item.id" data-target="#exampleModalCenter">Edit</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AgentForm></AgentForm>
    <AgentConfirmation></AgentConfirmation>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import AgentForm from '@/components/AgentForm.vue'
import AgentConfirmation from '@/components/AgentConfirmation.vue'
import AccountCogIco from '@/components/AccountCogIco.vue'

export default {
  name: 'AgentsList',
  computed: {
    ...mapState(['agentListStore', 'check', 'filterColour', 'styleList', 'agentIdList']),
    ...mapGetters(['filterByColor']),
    arrayFilterList () {
      if (this.filterColour === '') {
        return this.agentListStore
      } else {
        return this.filterByColor(this.filterColour)
      }
    }
  },
  data: function () {
    return {
      selectedCard: -1,
      checkSelected: false,
      checkDeleted: -1
    }
  },
  methods: {
    isChecked (itemID) {
      if (this.checkSelected === false && this.agentIdList.length !== 0) {
        if (this.agentIdList.find(agent => agent.id === itemID)) {
          if (this.checkDeleted === itemID) {
            return false
          } else {
            return true
          }
        } else {
          if (this.checkDeleted === itemID) {
            return true
          } else {
            return false
          }
        }
      }
    },
    hoverCard (selectedIndex) {
      this.selectedCard = selectedIndex
    },
    isSelected (cardIndex) {
      return this.selectedCard === cardIndex
    },
    setAgentId (e) {
      const selectedAgentId = e.currentTarget.getAttribute('data-id')
      this.$store.commit('setIdAgent', selectedAgentId)
    },
    addListAgentId (e) {
      const selectedId = Number(e.currentTarget.getAttribute('data-id'))
      const selectedAgentName = e.currentTarget.getAttribute('data-name')
      if (document.getElementById(selectedId + 1).checked === false) {
        if (this.agentIdList.length !== 0 && this.checkSelected === false) {
          this.checkSelected = false
          this.checkDeleted = selectedId
        } else {
          this.checkSelected = true
        }
        this.$store.commit('addIdAgent', { id: selectedId, name: selectedAgentName })
      } else {
        this.$store.commit('removebyIdAgent', selectedId)
        if (this.checkSelected === false) {
          this.checkDeleted = selectedId
        }
      }
    },
    setDetailsLink (e) {
      const selectedAgentId = e.currentTarget.getAttribute('data-id')
      this.$store.commit('setIdAgent', selectedAgentId)
      this.$store.commit('setDetailsLinks', true)
    },
    onEdit (e) {
      this.setAgentId(e)
      this.$store.commit('setDetailsLinks', false)
    }
  },
  components: {
    AgentForm,
    AgentConfirmation,
    AccountCogIco
  }
}
</script>

<style scoped>
.widhtLine{
  width: 30%;
}
.agent-mini-color-gray{
  color: #B3B3B3;
}
.card {
transition: all .25s ease;
width:100%;
}
.container-card:hover {
-webkit-transform:scale(1.25);
-moz-transform:scale(1.25);
-ms-transform:scale(1.25);
-o-transform:scale(1.25);
transform:scale(1.05);
transition: all .25s ease;
}

.col-lgg-5 {
  min-height: 1px;
  position: relative;
}

.btn:hover {
    background-color: rgba(49, 137, 231, 0) !important;
    opacity: 0.6 !important;
    border: 2px solid #FFFFFF !important;
}

.btn-info.focus, .btn-info:focus {
    background-color: rgba(49, 137, 231, 0);
    opacity: 0.6;
    border: 2px solid #FFFFFF;
}

@media (min-width: 1440px) {
  .col-lgg-5 {
    float: left;
    max-width: 20%;
    padding: 17.5px !important;
  }
}
@media (min-width: 2550px) {
  .col-lgg-5 {
    float: left;
    max-width: 20%;
    padding: 40.5px!important;
  }
    .widhtLine {
    width: 50%;
  }
}
@media (width: 1024px) {
.widhtLine {
    width: 15%;
  }
}
@media (width: 425px) {
.widhtLine {
    width: 50%;
  }
}

@media (min-width: 992px) {
.col-lg-3 {
    padding: 10px;
}
}
input[type="checkbox"] + label:before {
  content: "";
  width: 26px;
  height: 26px;
  float: right;
 /* margin: 0.5em 0.5em 0 0;*/
  border: 2px solid #ccc;
  background: #fff;
  border-radius: .7rem;
}
input[type="checkbox"]:checked + label:before {
  border-color: #00B1FF;
}

input[type="checkbox"]:checked + label:after {
    content: "";
    width: 12px;
    height: 6px;
    border: 4px solid #00B1FF;
    float: right;
    margin-right: -1.2em;
    border-right: 0;
    border-top: 0;
    margin-top: .6em;
    transform: rotate(-55deg);
}

input[type="checkbox"] {
  display: none;
}
</style>
