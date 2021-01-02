<template>
  <div class="row">
    <div v-for="item of arrayFilterList"  :key="item.id"
    @mouseover="hoverCard(item.id)"
    @mouseout="hoverCard(-1)"
    class="col-12 col-md-4 col-lg-3 col-lgg-5 container-card">
      <div class="card text-white card-style  mb-3" v-bind:style ="{background:item.background}">
        <div class="card-body link-color">
          <div class="d-flex justify-content-between">
            <h3 class="card-title">{{item.name}}</h3>
            <a href="#">
              <span class="material-icons agent-mini-color-gray">person</span>
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
            <div class="col-7 col-sm-6 col-xl-8 pad">
              <hr class="line-bottom" />
            </div>
            <div class="col-5 col-sm-6 col-xl-4">
              <a href="#" class="btn btn-info float-right btn-style" @click="onEdit" data-toggle="modal" :data-id="item.id" data-target="#exampleModalCenter">Edit</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AgentForm></AgentForm>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import AgentForm from '@/components/AgentForm.vue'

export default {
  name: 'AgentsList',
  computed: {
    ...mapState(['agentListStore']),
    ...mapState(['filterColour']),
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
      selectedCard: -1
    }
  },
  methods: {
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
    AgentForm
  }
}
</script>

<style scoped>
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

@media (min-width: 1400px) {
  .col-lgg-5 {
    float: left;
        max-width: 20%;
  }
}
</style>
