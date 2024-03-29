<template>
    <div class="user-management-content m-2">
              <div class="user-management-content-header mt-5 mx-5 d-flex justify-content-between align-items-center">
                    <div class="user-management-main-info d-flex align-items-center">
                      <div class="user-management-main-info-img rounded-circle user-border-admin-role">
                          <img v-if="!this.$validateIsBlank(getLoggedUserDataImage)" :src="getLoggedUserDataImage" class="rounded-circle user-management-logo-avatar" alt="User Image">
                          <img v-else :src="getGravatarUrlByEmail(getLoggedUserDataEmail)" class="rounded-circle user-management-logo-avatar" alt="User Image">
                      </div>
                      <div class="ml-3 user-management-main-info-gdata d-flex flex-column">
                          <span class="user-management-username">{{getLoggedUserDataFirstName}} {{getLoggedUserDataLastName}}</span>
                          <UserManagementHeader/>
                      </div>
                  </div>
                  <div v-if="!isLoggedUserMember" class="user-management-new-container d-flex flex-column align-items-center">
                     <img src="@/assets/user-icon.png" class="rounded-circle user-management-plus-logo" alt="User Logo">
                      <div class="user-management-new-container-action-btn d-flex align-items-center">
                        <span class="material-icons blue-text font-size-16px m-auto">add</span>
                        <a href="#" class="blue-text font-size-16px" data-toggle="modal" @click="unlinkUserValues()" data-target="#user-form-modal">New User</a>
                      </div>
                  </div>
              </div>
              <div class="user-management-content-body mt-5 mx-5">
                  <div>
                  <div class="card user-management-list-border box-shadow-none">
              <div class="user-management-listing-users card-body table-responsive p-0">
                <table class="table table-head-fixed text-nowrap">
                  <thead>
                    <tr>
                      <th class="box-shadow-none user-management-list-border-bottom"><div class="font-weight-medium font-size-14px">User Name</div></th>
                      <th class="box-shadow-none user-management-list-border-bottom"><div class="font-weight-medium user-management-list-border-left pl-2 font-size-14px">Email</div></th>
                      <th class="box-shadow-none user-management-list-border-bottom"><div class="font-weight-medium user-management-list-border-left pl-2 font-size-14px">Role</div></th>
                      <th class="box-shadow-none user-management-list-border-bottom user-management-action-width"><div class="font-weight-medium user-management-list-border-left pl-2 font-size-14px">Actions</div></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user of users" :key="user.id">
                      <td class="border-top-0 pl-4 font-size-14px" :class="{'font-weight-medium': getLoggedUserData.id === user.id}">{{user.username}}</td>
                      <td class="border-top-0 pl-4 font-size-14px">{{user.email}}</td>
                      <td class="border-top-0 pl-4 font-size-14px" :class="{'font-weight-medium': getLoggedUserData.id === user.id}">
                        <div class="d-flex align-items-center justify-content-between">
                          {{getRoleById(user.role).shortName}}
                          <span class="material-icons font-size-16px green-text ml-2" v-if="user.role === this.roles.MEMBER.id">person</span>
                          <span v-else :class="{'blue-text': user.role === this.roles.OWNER.id, 'green-text': user.role === this.roles.ADMIN.id}" class="material-icons font-size-16px ml-2">manage_accounts</span>
                        </div>
                      </td>
                      <td :class="{'justify-content-center': isLoggedUserMember, 'justify-content-between': !isLoggedUserMember}" class="border-top-0 d-flex user-management-action-width">
                        <button @click="editUser" data-toggle="modal" data-target="#user-form-modal" :data-id="user.id" type="button" class="font-size-14px user-management-btn-size blue-text agent-border btn create-agent-buttons-main-action rounded wordlist-download-btn">Edit</button>
                        <button v-if="!isLoggedUserMember" @click="removeSelectedUser($event, this.$entityTypeData.USER.id)" :disabled="disableBy(user.id, user.role)" type="button" :data-name="user.username" :data-id="user.id" class="user-management-btn-size font-size-14px ml-1 red-text agent-border btn create-agent-buttons-main-action rounded">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
                  </div>
              </div>
          </div>
</template>
<script>
import UserManagementHeader from '@/components/User/UserManagementHeader.vue'
import { mapState, mapGetters, mapMutations } from 'vuex'
import { RemoveEntitiesMixin } from '@/mixins/RemoveEntitiesMixin'
import { UserMixin } from '@/mixins/UserMixin'
import jQuery from 'jquery'
export default {
  name: 'UserList',
  components: {
    UserManagementHeader
  },
  data () {
    return {
      idUserSelected: -1
    }
  },
  mixins: [RemoveEntitiesMixin, UserMixin],
  computed: {
    ...mapState('user', ['users', 'selectedIdUser', 'isUerFormAccessedFromSystemBar']),
    ...mapGetters('user', ['getGravatarUrlByEmail', 'getRoleById', 'roles', 'isLoggedUserAdmin', 'getLoggedUserData', 'isLoggedUserMember'])
  },
  mounted () {
    this.updateSelectedIdUser(this.getLoggedUserData.id)
    this.showUserFormIfRequired()
  },
  methods: {
    ...mapMutations('general', ['addEntityToDelete', 'removeSelectedEntities']),
    ...mapMutations('user', ['updateSelectedIdUser']),
    editUser (e) {
      const selectedUserId = e.currentTarget.getAttribute('data-id')
      this.updateSelectedIdUser(selectedUserId)
    },
    removeUser (e) {
      const selectedUserId = e.currentTarget.getAttribute('data-id')
      this.idUserSelected = Number(selectedUserId)
    },
    removeSelectedUser (event, userRole) {
      const selectedUserId = event.currentTarget.getAttribute('data-id')
      this.idUserSelected = Number(selectedUserId)
      if (this.getLoggedUserData.id !== this.idUserSelected) {
        jQuery('#message-box-modal').modal()
        this.prepareToDelete(event, this.$entityTypeData.USER.id)
      }
    },
    isCurrentUserOwner (userId, role) {
      if (this.getLoggedUserData.id === userId && this.getLoggedUserData.role === this.roles.OWNER.id) {
        return true
      }
      return false
    },
    isThisUserLogged (userId) {
      if (this.getLoggedUserData.id === userId) {
        return true
      }
      return false
    },
    loggedUserIsAdminAndParameterRoleIsAdminOrOwner (role) {
      if (this.isLoggedUserAdmin && role === this.roles.ADMIN.id) {
        return true
      }
      if (this.isLoggedUserAdmin && role === this.roles.OWNER.id) {
        return true
      }
      return false
    },
    disableBy (userId, userRole) {
      return this.isThisUserLogged(userId) || this.loggedUserIsAdminAndParameterRoleIsAdminOrOwner(userRole)
    },
    showUserFormIfRequired () {
      if (this.selectedIdUser !== '-1' && this.isUerFormAccessedFromSystemBar) {
        jQuery('#user-form-modal').modal()
      }
    },
    unlinkUserValues () {
      this.updateSelectedIdUser('-1')
    }
  }
}
</script>
<style scoped>
.user-management-logo-avatar{
    width: 131px;
    height: 131px
}
table.user-management-users-list{
    border: 1px solid #E5E9EC;
    border-radius: 6px;
}
table.user-management-users-list.table thead th{
    border-bottom: 1px solid #E5E9EC;
}
.user-management-listing-users{
    height: 460px;
}

.user-management-plus-logo{
    width: 58px;
    height: 58px;
}
.agent-border{
    border: 1px solid #F1F3F5;
    border-radius: 12px;
    width: 90px;
    height: 47px;
}
.user-management-username{
    font-size: 24px;
}
.user-management-role-name{
    color: #707070;
}
.user-role-ico{
    width: 19px;
    height: 17px;
}
.font-size-14px{
  font-size: 14px;
}
.font-size-16px{
  font-size: 16px;
}
.user-management-btn-size{
    width: 70px;
    height: 37px;
}
.user-border-admin-role{
    border: 4px solid #00B1FF;
}
.user-management-main-info-img{
    padding: 11px
}
.user-management-action-width{
    width: 190px;
}
.box-shadow-none{
    box-shadow: none !important;
}
.user-management-list-border{
  border: 1px solid #E5E9EC!important;
}
.user-management-list-border-bottom{
  border-bottom: 1px solid #E5E9EC!important;
}
.user-management-list-border-right{
  border-right: 1px solid #E5E9EC!important;
}
.user-management-list-border-left{
  border-left: 1px solid #E5E9EC!important;
}

</style>
