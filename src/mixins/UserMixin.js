const UserMixin = {
  computed: {
    getLoggedUserDataFirstName () {
      if (this.getLoggedUserData) {
        return this.getLoggedUserData.firstname
      }
      return ''
    },
    getLoggedUserDataLastName () {
      if (this.getLoggedUserData) {
        return this.getLoggedUserData.lastname
      }
      return ''
    },
    getLoggedUserDataEmail () {
      if (this.getLoggedUserData) {
        return this.getLoggedUserData.email
      }
      return ''
    },
    getLoggedUserDataRoleId () {
      if (this.getLoggedUserData) {
        return this.getLoggedUserData.role
      }
      return this.roles.MEMBER
    },
    getLoggedUserDataImage () {
      if (this.getLoggedUserData) {
        if (!this.$validateIsBlank(this.getLoggedUserData.profilePicture)) {
          return this.getLoggedUserData.profilePicture
        }
      }
      return ''
    }
  }
}
export { UserMixin }
