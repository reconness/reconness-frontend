<template>
<div class="content-wrapper mb-3">
  <div class="container-fluid">
  <div class="row">
    <div class="col-12 col-lg-9 col-xll-10">
      <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="content-header">
          <strong><h1 class="m-0 text-dark home-main-text">Welcome Reconness!!</h1></strong>
           <hr class="blueline"/>
        </div><!-- /.content-header -->
      </div><!-- /.col -->
      <div class="col-lg-12">
          <!-- <div class="container"> -->
            <div class="row">
              <div class="col-lg-12">
                <div class="row">
                  <div class="col-lg-8 ml-auto mr-auto">
                    <div class="home-secondary-text">
                      <blockquote class="blockquote text-center">
                      <p class="mb-0 app-description">
                        <span class="home-secondary-text">
                       A web app tool to run and keep all your <span class="blue-text">#recon</span>
                          in the same place and allow you to query your targets in an user friendly way
                        </span></p>
                      </blockquote>
                      </div>
                  </div><!-- /.col -->
                  <div class="col-lg-12">
                    <p class="float-right bold-text separator-content inline-material-icons">Last week resumee<span class="material-icons search-icon blue-text">keyboard_arrow_right</span></p>
                  </div>
                  <div class="col-12 col-lg-4 pr-4">
                  <TargetsHighestInteraction :background="'#03dced'" :title= "'Targets with the most interactions in the last week'" :subdomainByDirectories="subdomainByDirectories"></TargetsHighestInteraction>
                  </div>
                  <div class="col-12 col-lg-4">
                  <DaysHighestInteraction></DaysHighestInteraction>
                  </div>
                  <div class="col-12 col-lg-4 pl-4">
                  <TargetsHighestInteraction :background="'rgb(134, 98, 202)'" :title= "'Targets with the most interactions in the last week'" :subdomainByDirectories="subdomainByDirectories"></TargetsHighestInteraction>
                  </div>
                  </div></div>
                  <div class="col-lg-12">
                    <span class="refandres">References and resources</span><span> ></span>
                  </div><!-- /.col -->
                  <div class="col-lg-12">
                    <div class="home-quote-box">
                      <div class="row">
                        <div class="col-lg-12">
                          <span class="home-quote"><em>"A smart person is not one that knows the answers, but one who knows where to find them..." </em></span>
                        </div>
                        <div class="col-lg-12">
                          <div class="row">
                            <div class="col-lg-6">
                              <div class="form-group has-search">
                                <span class="material-icons search-icon form-control-feddback">search</span>
                                <input class="form-control" type="search" placeholder="URL" v-model="resource.url">
                              </div>
                              <p v-if="validators.url.name && !validators.blank.name" :class="{invalid: validators.url.name}">The text is not a valid URL address. Please do not forget to specify the http or https protocol</p>
                            </div>
                            <div class="col-lg-6">
                              <div class="row">
                                <div class="col-lg-7">
                                  <div class="position-relative">
                                  <Chips ref="chips" id="category_item" v-model="resource.categories" placeholder="Categories" @keyup="getData(); isCategoriesMenuClosed=false" :addOnBlur="true"/>
                                  <div v-click-outside="closeMenu" class="dropdown-menu" v-if="search_data.length && !isCategoriesMenuClosed">
                                    <button class="dropdown-item" href="#" v-for="item in search_data" :key="item" @click="getName(item)">{{ item }}</button>
                                  </div>
                                  </div>
                                </div>
                                <div class="col-lg-5">
                                  <button :disabled="areReferentsInputInvalid" type="submit" class="btn button-clolour rounded btn-block height-40px add-submit-btn" @click="addReference">Add</button></div>
                                </div><!--./col-lg-5-->
                              </div><!--./row -->
                            </div><!--./col-lg-6 -->
                          </div><!--./row -->
                          <!-- </form> -->
                          <!-- </div>           -->
                        <div class="col-lg-12 input-group-sm">
                          <hr v-if="this.resources.length > 0"/>
                          <div class="row" v-for="item of resources"  :key="item.id">
                            <div class="col-lg-6">
                              <a :href="item.url" class="reference-text-color form-control url-input without-bordered-lines">{{item.url}}</a>
                            </div>
                            <div class="col-lg-4">
                              <input :value="item.categories.toString()" class="form-control url-input without-bordered-lines">
                            </div>
                            <div class="col-lg-2">
                              <button data-target="#message-box-notification-modal" @click="setSelectedReference" data-toggle="modal" :data-id="item.id" type="button" class="btn btn-primary btn-block btn-danger delete_btn font-size-14px rounded-corners">Delete</button>
                            </div>
                          </div>
                        </div>
                      </div><!-- /.row -->
                    </div><!-- /.home-quote-box -->
                  </div> <!-- /.col-sm-12 -->
                </div><!-- /.row -->
              </div><!-- /.col-sm-12 -->
            </div><!-- /.row -->
          </div><!-- /.container -->
      </div><!-- /.col -->
      <HomeRigthSidebar> </HomeRigthSidebar>
      </div><!-- /.row -->
  </div><!-- col-xs-12 -->
</div>
</template>

<script>
// @ is an alias to /src
import HomeRigthSidebar from '@/components/General/HomeRigthSidebar.vue'
import TargetsHighestInteraction from '@/components/General/TargetsHighestInteraction.vue'
import DaysHighestInteraction from '@/components/General/DaysHighestInteraction.vue'
import { mapState, mapActions, mapMutations } from 'vuex'
import Chips from 'primevue/chips'
import jQuery from 'jquery'
export default {
  name: 'SystemHome',
  components: {
    HomeRigthSidebar,
    TargetsHighestInteraction,
    DaysHighestInteraction,
    Chips
  },
  computed: {
    ...mapState('auth', ['authentication_token']),
    ...mapState('referent', ['resources']),
    ...mapState('general', ['notificationMessageActionSelected']),
    areReferentsInputInvalid () {
      return (this.validators.url.name || this.validators.blank.name || this.resource.categories.length === 0)
    }
  },
  watch: {
    resource: {
      handler: function (value) {
        this.validators.url.name = !this.$validateUrlWithProtocol(value.url)
        this.validators.blank.name = this.$validateIsBlank(value.url)
      },
      deep: true
    },
    notificationMessageActionSelected: function (value) {
      if (value) {
        this.removeResource()
      }
    }
  },
  created () {
    this.updateSystemData()
  },
  methods: {
    ...mapActions('referent', ['loadResources', 'addResource', 'deleteResource']),
    ...mapActions('target', ['loadTargets']),
    ...mapMutations('general', ['updateNotificationMessageDescription', 'updateNotificationMessageActionSelected']),
    setSelectedReference (e) {
      const selectedId = e.currentTarget.getAttribute('data-id')
      this.$store.commit('referent/setSelectedResource', selectedId)
      const notificationMessageDesc = 'Are you sure to remove the selected resource'
      this.updateNotificationMessageDescription(notificationMessageDesc)
      jQuery('#message-box-notification-modal').modal()
    },
    addReference () {
      if (!this.validators.url.name && !this.validators.blank.name) {
        this.addResource({
          url: this.resource.url,
          categories: this.resource.categories
        }).then(success => {
          this.resetResource()
        })
      }
    },
    resetResource: function () {
      this.resource = {
        url: '',
        categories: [],
        id: -1
      }
    },
    getData: function () {
      const filterItem = document.getElementById('category_item').value
      this.search_data = this.getUniqueCategories().filter(item => filterItem && item.includes(filterItem))
    },
    getName: function (name) {
      this.resource.categories.pop()
      this.resource.categories.push(name)
      this.search_data = []
    },
    getUniqueCategories () {
      const mergedReferences = []
      this.resources.forEach(resource => {
        resource.categories.forEach(categorie => {
          mergedReferences.push(categorie)
        })
      })
      this.resource.categories.forEach(element => {
        mergedReferences.push(element)
      })
      return [...new Set(mergedReferences)]
    },
    closeMenu () {
      this.isCategoriesMenuClosed = true
    },
    resetData: function () {
      this.updateNotificationMessageActionSelected(false)
    },
    removeResource: function () {
      this.deleteResource(this.$store.state.referent.idResource)
        .then(success => {
          if (success) {
            this.resetData()
          }
          jQuery('#simple-confirmation-modal').modal('hide')
        })
    },
    updateSystemData () {
      this.loadResources()
      this.loadTargets()
    }
  },
  data () {
    return {
      categories: [
        { name: 'searcher', id: '1' },
        { name: 'docs', id: '2' }
      ],
      search_data: [],
      resource: {
        url: '',
        categories: [],
        id: -1
      },
      selectedResource: -1,
      isCategoriesMenuClosed: false,
      validators: {
        url: {
          name: false
        },
        blank: {
          name: true
        }
      },
      subdomainByDirectories: [{ port: 88, subdomain: 'Portraite' }, { port: 70, subdomain: 'Yanet' }, { port: 60, subdomain: 'Portraite' }, { port: 51, subdomain: 'Yanet' }]
    }
  }
}
</script>
<style>
  body{
    background: #f2f4f6;
    background-size: cover
  }
</style>
<style scoped>
.content-header h1 {
    font-size: 40px;
    color: #000000!important;
    font-weight: bold;
}

blockquote {
    background: none;
    border-left: none;
    font-size: inherit;
    margin: .1rem .1rem;
    padding: .5em .7rem;
}
.content-header {
    padding: 5px .5rem;
}
.target3 {
    background: rgba(110, 25, 249, 0.88);
    box-shadow: 13px 31px 41px #0C1F6A3B;
}
.btn-outline-primary {
    color: rgb(0, 177, 255);
    border-color: rgba(56, 70, 84, 0.24);
}
.rounded{
  border-radius: 12px !important;
  opacity: 1;
  border: 1px solid #f1f3f5;
  background: #fffffF 0% 0% no-repeat padding-box;
  font-size: 14px;
  color: #000000;
}

.without-bordered-lines{
  border-top: 0px;
  border-right: 0px;
  border-left: 0px;
  border-bottom: 0px;
}

.p-multiselect .p-multiselect-label.p-placeholder {
    color: #000000 !important;
}

.button-clolour{
  color: #00b1ff;
}
.font-size-14px{
  font-size: 14px
}
.p-chips{
  width: 100%;
  border-radius: 12px !important;
  opacity: 1;
  /* border: 1px solid #f1f3f5; */
  background: #fffffF 0% 0% no-repeat padding-box;
  font-size: 14px;
  color: #000000;
  /* min-height: calc(1.8125rem + 2px); */
}

.panel-footer{
  position: absolute;
  z-index: 1;
  width: 100%;
}

.dropdown-menu{
  display: inherit !important;
  width: 100%;
}
.height-40px{
  height: 40px;
}
.reference-text-color{
  color: #007bff;
}
.add-submit-btn:disabled{
  color: #a9a9a9
}
.target-details-trashcan:hover{
  fill: #FF4545
}

@media (min-width: 2560px) {
.col-xll-10 {
    -ms-flex: 0 0 83.333333%;
    flex: 0 0 83.333333%;
    max-width: 83.333333%;
}
}

@media (min-width: 2560px) {
  .container, .container-lg, .container-md, .container-sm, .container-xl {
      max-width: 2000px;
  }
}

@media (max-width: 1024px) {
  .pr-4 {padding-right: 1rem!important;}
  .pl-4 {padding-left: 1rem!important;}
}
@media (min-width: 1440px) {
  .pr-4 {padding-right: 2rem!important;}
  .pl-4 {padding-left: 2rem!important;}
}
@media (min-width: 2560px) {
  .pr-4 {padding-right: 3rem!important;}
  .pl-4 {padding-left: 3rem!important;}
}
</style>
