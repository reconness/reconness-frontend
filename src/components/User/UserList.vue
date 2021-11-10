<template>
    <div class="user-management-content m-2">
              <div class="user-management-content-header mt-5 mx-5 d-flex justify-content-between align-items-center">
                    <div class="user-management-main-info d-flex align-items-center">
                      <div class="user-management-main-info-img rounded-circle user-border-admin-role">
                          <img src="/adminlte/img/reconnes/user2-160x160.jpg" class="rounded-circle user-management-logo-avatar" alt="User Logo">
                      </div>
                      <div class="ml-3 user-management-main-info-gdata d-flex flex-column">
                          <span class="user-management-username">John Smith</span>
                          <div class="user-management-roles">
                              <AccountCogIco class="user-role-ico"/>
                              <span class="font-size-16px user-management-role-name ml-1">Administrator Owner</span>
                          </div>
                      </div>
                  </div>
                  <div class="user-management-new-container d-flex flex-column align-items-center">
                     <img src="@/assets/user-icon.png" class="rounded-circle user-management-plus-logo" alt="User Logo">
                      <div class="user-management-new-container-action-btn d-flex align-items-center">
                        <span class="material-icons blue-text font-size-16px m-auto">add</span>
                        <span class="blue-text font-size-16px">New User</span>
                      </div>
                  </div>
              </div>
              <div class="user-management-content-body mt-5 mx-5">
                  <div>
                  <div class="card border box-shadow-none">
              <div class="user-management-listing-users card-body table-responsive p-0">
                <table class="table table-head-fixed text-nowrap">
                  <thead>
                    <tr>
                      <th class="box-shadow-none border-bottom"><div class="font-weight-medium font-size-14px">User Name</div></th>
                      <th class="box-shadow-none border-bottom"><div class="font-weight-medium border-left pl-2 font-size-14px">Email</div></th>
                      <th class="box-shadow-none border-bottom"><div class="font-weight-medium border-left pl-2 font-size-14px">Role</div></th>
                      <th class="box-shadow-none border-bottom user-management-action-width"><div class="font-weight-medium border-left pl-2 font-size-14px">Actions</div></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user of users" :key="user.id">
                      <td class="border-top-0 pl-4 font-size-14px">{{user.username}}</td>
                      <td class="border-top-0 pl-4 font-size-14px">{{user.email}}</td>
                      <td class="border-top-0 pl-4 font-size-14px">-</td>
                      <td class="border-top-0 d-flex justify-content-between user-management-action-width">
                        <button type="button" class="font-size-14px user-management-btn-size blue-text agent-border btn create-agent-buttons-main-action rounded wordlist-download-btn">Edit</button>
                        <button @click="removeWordListItem(wordlistItem.id)" type="button" class="user-management-btn-size font-size-14px ml-1 red-text agent-border btn create-agent-buttons-main-action rounded">Delete</button>
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
import AccountCogIco from '@/components/Icons/AccountCogIco.vue'
import { mapState } from 'vuex'
export default {
  name: 'UserList',
  components: {
    AccountCogIco
  },
  computed: {
    ...mapState('user', ['users'])
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
    height: 212px;
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

</style>
