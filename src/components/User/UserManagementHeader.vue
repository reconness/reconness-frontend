<template>
    <div class="user-management-roles d-flex align-items-center">
    <span class="material-icons font-size-16px green-text" v-if="getLoggedUserData.role === this.roles.MEMBER.id">person</span>
    <span v-else :class="{'blue-text': getLoggedUserData.role === this.roles.OWNER.id, 'green-text': getLoggedUserData.role === this.roles.ADMIN.id}" class="material-icons font-size-16px">manage_accounts</span>
    <span class="font-size-16px user-management-role-name ml-1">{{getRoleById(getLoggedUserData.role).longName}}</span>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'UserManagementHeader',
  computed: {
    ...mapGetters('user', ['getLoggedUserData', 'roles', 'getRoleById'])
  }
}
</script>
