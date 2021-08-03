const TargetMixin = {
  methods: {
    isTargetChecked (targetId) {
      const self = this
      setTimeout(
        function () {
          return self.targetIdList.find(target => target.id === targetId)
        },
        1000
      )
    }
  }
}
export { TargetMixin }
