export default {
  install: (app, options) => {
    app.config.globalProperties.$randomBooleanResult = function () {
      var success = Math.random() < 0.5
      return success
    }
  }
}
