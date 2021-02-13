export default {
  install: (app, options) => {
    app.config.globalProperties.$randomBooleanResult = function () {
      var success = Math.random() < 0.5
      return success
    }

    app.config.globalProperties.$compareNamesDesc = function (a, b) {
      if (b.name < a.name) {
        return -1
      }
      if (b.name > a.name) {
        return 1
      }
      return 0
    }

    app.config.globalProperties.$compareNamesAsc = function (a, b) {
      if (b.name > a.name) {
        return -1
      }
      if (b.name < a.name) {
        return 1
      }
      return 0
    }

    app.config.globalProperties.$orderByCalendarSplitting = function (a, b) {
      const as = a.date.split('/')
      const ad = new Date(as[2], as[1] - 1, as[0])
      const bs = b.date.split('/')
      const bd = new Date(bs[2], bs[1] - 1, bs[0])
      return ad - bd
    }

    app.config.globalProperties.$orderByCalendar = function (a, b) {
      if (a.date < b.date) {
        return -1
      }
      if (a.date > b.date) {
        return 1
      }
      return 0
    }

    app.config.globalProperties.$validateUrl = function (url) {
      var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i') // fragment locator
      return !!pattern.test(url)
    }
  }
}
