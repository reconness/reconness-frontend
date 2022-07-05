<template>
    <div class="user-management-roles d-flex align-items-center">
    <span class="material-icons font-size-16px green-text" v-if="getLoggedUserDataRoleId === this.roles.MEMBER.id">person</span>
    <span v-else :class="{'blue-text': getLoggedUserDataRoleId === this.roles.OWNER.id, 'green-text': getLoggedUserDataRoleId === this.roles.ADMIN.id}" class="material-icons font-size-16px">manage_accounts</span>
    <span class="font-size-16px user-management-role-name ml-1">{{getRoleById(getLoggedUserDataRoleId).longName}}</span>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { UserMixin } from '@/mixins/UserMixin'
export default {
  name: 'UserManagementHeader',
  mixins: [UserMixin],
  computed: {
    ...mapGetters('user', ['getLoggedUserData', 'roles', 'getRoleById'])
  }
}
</script>
