const PipelineMixin = {
  methods: {
    addListPipelinesId (e) {
      const selectedId = Number(e.currentTarget.getAttribute('data-id'))
      const selectedPipelinesName = e.currentTarget.getAttribute('data-name')
      if (document.getElementById(selectedId).checked === false) {
        this.addIdPipeline({ id: selectedId, name: selectedPipelinesName })
      } else {
        this.removebyIdPipelines(selectedId)
      }
    }
  }
}
export { PipelineMixin }
