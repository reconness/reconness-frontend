const TargetMixin = {
  methods: {
    addListTargetId (e) {
      const selectedId = Number(e.currentTarget.getAttribute('data-id'))
      const selectedTargetName = e.currentTarget.getAttribute('data-name')
      if (document.getElementById(selectedId).checked === false) {
        this.addIdTarget({ id: selectedId, name: selectedTargetName })
      } else {
        this.removebyIdTarget(selectedId)
      }
    }
  }
}
export { TargetMixin }
